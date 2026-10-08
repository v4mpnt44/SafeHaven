import './style.css';
import { pages, appNav, ARMARIO_ITEMS, PUNTOS_DETALLE } from './pages.js';
import { initPWA } from './pwa.js';
import { initSocialAuth, setSocialStatusHandler } from './auth.js';

const routes = {
  bienvenida: { render: pages.bienvenida, title: 'Registro y Bienvenida — SafeHaven' },
  registro: { render: pages.registro, title: 'Crear cuenta — SafeHaven' },
  login: { render: pages.login, title: 'Iniciar sesión — SafeHaven' },
  'auth-google': { render: pages.authGoogle, title: 'Entrar con Google — SafeHaven' },
  'auth-apple': { render: pages.authApple, title: 'Entrar con Apple — SafeHaven' },
  verificar: { render: pages.verificar, title: 'Verificación SMS — SafeHaven' },
  intereses: { render: pages.intereses, title: 'Personaliza tu Protección — SafeHaven' },
  inicio: { render: pages.inicio, title: 'Inicio — SafeHaven' },
  flock: { render: pages.flock, title: 'Círculos de Confianza (Flock) — SafeHaven' },
  'flock-crear': { render: pages.flockCrear, title: 'Crear Círculo Paso 1 — SafeHaven' },
  'flock-unirse': { render: pages.flockUnirse, title: 'Unirse con Código — SafeHaven' },
  armario: { render: pages.armario, title: 'Armario Secreto — SafeHaven' },
  'armario-item': { render: pages.armarioItem, title: 'Inspección de Objeto — SafeHaven' },
  trayecto: { render: pages.trayecto, title: 'Acompañamiento IA — SafeHaven' },
  reportar: { render: pages.reportar, title: 'Reportar Incidencia — SafeHaven' },
  'reportar-luminaria': { render: pages.reportarLuminaria, title: 'Reportar Luminaria Fundida — SafeHaven' },
  'reportar-zona-sospechosa': { render: pages.reportarZonaSospechosa, title: 'Reportar Zona Sospechosa — SafeHaven' },
  'reportar-peligro-vial': { render: pages.reportarPeligroVial, title: 'Reportar Peligro Vial — SafeHaven' },
  'reportar-incidente': { render: pages.reportarIncidente, title: 'Reportar Incidente — SafeHaven' },
  mapa: { render: pages.mapa, title: 'Mapa Seguro — SafeHaven' },
  'puntos-ambar': { render: pages.puntosAmbar, title: 'Puntos Ámbar — SafeHaven' },
  'punto-detalle': { render: pages.puntoDetalle, title: 'Detalle del Punto Seguro — SafeHaven' },
};

const APP_NAV_ROUTES = new Set(['inicio', 'trayecto', 'mapa', 'flock', 'armario', 'puntos-ambar', 'punto-detalle']);

// Armario: equipo por slots (cabeza / mascotas / armadura), persistido en sesión
function gridNameToSlot(gridName) {
  for (const it of Object.values(ARMARIO_ITEMS)) {
    if (it.gridName === gridName) return it.cat;
  }
  return null;
}
function getEquipo() {
  let eq = null;
  try { eq = JSON.parse(sessionStorage.getItem('sh_equipo') || 'null'); } catch {}
  if (!eq || typeof eq !== 'object') {
    eq = { cabeza: 'Gorra Origen', mascotas: null, armadura: null };
    try {
      const legacy = sessionStorage.getItem('sh_equipado');
      if (legacy) {
        const slot = gridNameToSlot(legacy);
        if (slot) eq[slot] = legacy;
        sessionStorage.removeItem('sh_equipado');
      }
      sessionStorage.setItem('sh_equipo', JSON.stringify(eq));
    } catch {}
  }
  return eq;
}
function setEquipoSlot(slot, gridName) {
  const eq = getEquipo();
  eq[slot] = gridName;
  try { sessionStorage.setItem('sh_equipo', JSON.stringify(eq)); } catch {}
  return eq;
}
function getSP() {
  try { return Number(sessionStorage.getItem('sh_sp') ?? 1240) || 0; } catch { return 1240; }
}
function setSP(n) {
  try { sessionStorage.setItem('sh_sp', String(n)); } catch {}
}

// Mapas principalmente de Chile: todo parte de Santiago y se queda en Chile
const SANTIAGO = [-33.4489, -70.6693];
const CHILE_BOUNDS = [[-56.5, -75.5], [-17.0, -66.0]];
function isInChile(lat, lng) {
  return lat >= -56.5 && lat <= -17.0 && lng >= -75.5 && lng <= -66.0;
}
// Validación de email (formato simple, acepta dominios chilenos y extranjeros)
function esEmailValido(email) {
  // Accept common patterns: user@domain.cl, user@gmail.com, user@outlook.com, etc.
  // Rechaza espacios en blanco y requiere dominio y TLD
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length >= 6 && email.length <= 254;
}

// Validación de número de teléfono (Chile-first: +56 9 XXXXXXXX, +56 2 XXXXXXXX o local 9 XXXXXXXX)
// También acepta números internacionales de 7-15 dígitos sin prefijoChile
function esTelefonoValido(phone) {
  const cleaned = phone.replace(/\s+/g, '');
  // Chile móvil: +56 9 6XXXXXXXX a +56 9 9XXXXXXXX (6-9 como dígito inicial de operadora)
  const chileMobile = /^(?:\+56\s?)?9[6-9]\d{7}$/;
  // Chile fijo: +56 2 XXXXXXXX
  const chileFixed = /^(?:\+56\s?)?2\d{8}$/;
  // Local sin código de país: 9 XXXXXXXX
  const local = /^9\d{7}$/;
  // Internacional: 7 a 15 dígitos puros
  const international = /^\d{7,15}$/;
  return chileMobile.test(cleaned) || chileFixed.test(cleaned) || local.test(cleaned) || international.test(cleaned);
}

// Puntos ámbar de ejemplo alrededor del centro (se generan al ubicarte) — Chile
function amberPoints(lat, lng) {
  return [
    [lat + 0.0042, lng + 0.0028, 'Refugio Bellavista'],
    [lat - 0.0031, lng + 0.0045, 'Punto Ámbar Providencia'],
    [lat + 0.0015, lng - 0.0052, 'Refugio Ñuñoa'],
    [lat - 0.0055, lng - 0.0018, 'Punto Ámbar Santiago Centro'],
    [lat + 0.0061, lng - 0.0006, 'Refugio Las Condes'],
  ];
}

// Panel inferior estilo Google Maps: arrastrar o tocar la barra para
// subir (expandido), bajar a la mitad o esconderlo (colapsado).
function initBottomSheet(sheetId, handleId, initial = 'half') {
  const sheet = document.getElementById(sheetId);
  const handle = document.getElementById(handleId);
  if (!sheet || !handle) return null;
  const order = ['expanded', 'half', 'collapsed'];
  let state = sheet.dataset.state || initial;
  let baseY = 0;

  const limits = () => {
    const h = sheet.offsetHeight || 300;
    return { expanded: 0, half: Math.round(h * 0.52), collapsed: Math.max(0, h - 64) };
  };
  const apply = (y) => { sheet.style.transform = y ? `translateY(${y}px)` : ''; };
  const snap = (next) => {
    state = next;
    sheet.dataset.state = next;
    baseY = limits()[next];
    apply(baseY);
  };
  // Estado inicial
  requestAnimationFrame(() => snap(state));

  let startY = 0, startBase = 0, moved = 0, downAt = 0, dragging = false;
  handle.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0; downAt = Date.now();
    startY = e.clientY; startBase = baseY;
    sheet.classList.add('dragging');
    handle.setPointerCapture?.(e.pointerId);
  });
  handle.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dy = e.clientY - startY;
    moved = Math.max(moved, Math.abs(dy));
    const h = sheet.offsetHeight || 300;
    apply(Math.min(Math.max(startBase + dy, 0), h - 40));
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove('dragging');
    // Toque simple: alterna expandido ↔ mitad (nunca colapsa solo,
    // para que el contenido no "desaparezca" por un toque accidental)
    if (moved < 10 && Date.now() - downAt < 350) {
      snap(state === 'expanded' ? 'half' : 'expanded');
      return;
    }
    const L = limits();
    const cur = startBase + (baseY - startBase);
    const y = Number((sheet.style.transform.match(/-?\d+/) || [cur])[0]);
    const nearest = order.reduce((a, b) => (Math.abs(L[b] - y) < Math.abs(L[a] - y) ? b : a));
    snap(nearest);
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      snap(order[(order.indexOf(state) + 1) % order.length]);
    }
  });
  window.addEventListener('resize', () => snap(state));
  return { snap, get state() { return state; } };
}

function initSafeMap(elId, { zoom = 15 } = {}) {
  const el = document.getElementById(elId);
  if (!el || !window.L) return null;
  const fallback = [...SANTIAGO]; // Santiago, Chile
  const map = window.L.map(elId, { zoomControl: false, minZoom: 4, maxBounds: CHILE_BOUNDS, maxBoundsViscosity: 0.8 }).setView(fallback, zoom);
  window.L.control.zoom({ position: 'bottomright' }).addTo(map);
  window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);
  (window._shMaps = window._shMaps || []).push(map);

  let userMarker = null;
  map._shSetUser = (lat, lng, label) => {
    if (userMarker) {
      userMarker.setLatLng([lat, lng]);
      if (label) userMarker.setPopupContent(label);
    } else {
      userMarker = window.L.circleMarker([lat, lng], {
        radius: 10, color: '#fff', weight: 3, fillColor: '#4f378a', fillOpacity: 1,
      }).addTo(map).bindPopup(label || 'Tú estás aquí');
    }
  };
  const paint = (lat, lng, label) => {
    map.setView([lat, lng], zoom);
    map._shSetUser(lat, lng, label);
    amberPoints(lat, lng).forEach(([a, o, name]) => {
      window.L.circleMarker([a, o], {
        radius: 8, color: '#fff', weight: 2, fillColor: '#c9a74d', fillOpacity: 1,
      }).addTo(map).bindPopup(`<b>${name}</b><br>Punto ámbar verificado`);
    });
  };

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Principalmente Chile: si estás fuera de Chile, muestra Santiago
        if (isInChile(latitude, longitude)) paint(latitude, longitude);
        else paint(fallback[0], fallback[1], 'Ubicación aprox. Santiago, Chile');
      },
      () => paint(fallback[0], fallback[1], 'Ubicación aprox. Santiago, Chile'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  } else {
    paint(fallback[0], fallback[1], 'Ubicación aprox. Santiago, Chile');
  }
  // Corrige tamaño cuando el mapa estaba oculto al crear
  setTimeout(() => map.invalidateSize(), 300);
  return map;
}

// Brillitos que salen disparados hacia arriba al apretar el botón (como si los tiraran)
function burstSparklesFromButton(btn, count = 32) {
  try {
    if (!btn) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const rect = btn.getBoundingClientRect();
    const colors = ['#FFE27A', '#FFFFFF', '#FFD83D', '#FFF7CC', '#E9DDFF'];
    const shapes = ['✦', '✦', '★', '✧', '✦', '●'];
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      s.setAttribute('aria-hidden', 'true');
      s.className = 'burst-particle';
      const startX = rect.left + rect.width * (0.15 + Math.random() * 0.7);
      const startY = rect.top + rect.height * 0.3 + Math.random() * rect.height * 0.4;
      s.style.left = `${startX}px`;
      s.style.top = `${startY}px`;
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.fontSize = `${10 + Math.random() * 14}px`;
      document.body.appendChild(s);
      const dx = (Math.random() - 0.5) * 280;
      const up = 140 + Math.random() * 300;
      const spin = (Math.random() - 0.5) * 260;
      const duration = 950 + Math.random() * 850;
      const anim = s.animate(
        [
          { transform: 'translate(-50%, 0) scale(.5) rotate(0deg)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx * 0.6}px), ${-up}px) scale(1.25) rotate(${spin * 0.6}deg)`, opacity: 1, offset: 0.55 },
          { transform: `translate(calc(-50% + ${dx}px), ${-up + 110}px) scale(.7) rotate(${spin}deg)`, opacity: 0 },
        ],
        { duration, easing: 'cubic-bezier(.15,.6,.35,1)' }
      );
      anim.onfinish = () => s.remove();
      setTimeout(() => s.remove(), duration + 150);
    }
  } catch {}
}

function hasSession() {
  try {
    return !!(sessionStorage.getItem('sh_session') || sessionStorage.getItem('sh_user') || sessionStorage.getItem('sh_rol'));
  } catch {
    return false;
  }
}

function currentRoute() {
  const h = location.hash.replace('#/', '').replace('#', '').split('?')[0];
  if (routes[h]) return h;
  // Principal al entrar: inicio si hay sesión, bienvenida si no
  return hasSession() ? 'inicio' : 'bienvenida';
}

function render() {
  const name = currentRoute();
  // Limpia mapas Leaflet anteriores para no fugar memoria ni listeners
  try { (window._shMaps || []).forEach((m) => m.remove()); } catch {}
  window._shMaps = [];
  window._shSheet = null;
  try { if (window._shWatch != null) navigator.geolocation.clearWatch(window._shWatch); } catch {}
  window._shWatch = null;
  const app = document.querySelector('#app');
  // Al crear cuenta (bienvenida/registro/login/verificar/intereses/auth) no hay nav abajo;
  // la navegación aparece solo dentro de la app (inicio/trayecto/mapa).
  app.innerHTML = routes[name].render() + (APP_NAV_ROUTES.has(name) ? appNav(name) : '');
  document.title = routes[name].title;
  window.scrollTo(0, 0);
  wire(name);
  initSocialAuth(document);
}

function wire(name) {
  // Estado en vivo para las pantallas dedicadas Google/Apple
  if (name === 'auth-google' || name === 'auth-apple') {
    setSocialStatusHandler((state, msg) => {
      const box = document.getElementById('social-status');
      if (!box) return;
      box.textContent = msg || '';
      box.style.color = state === 'error' ? '#ba1a1a' : state === 'success' ? '#2e7d32' : '#4f378a';
    });
  } else {
    setSocialStatusHandler(null);
  }

  if (name === 'login') {
    document.querySelectorAll('[data-toggle-pass]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.togglePass);
        const icon = btn.querySelector('span');
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        icon.textContent = show ? 'visibility' : 'visibility_off';
      });
    });
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('login-id').value.trim();
      const pass = document.getElementById('login-pass').value;
      const err = document.getElementById('login-error');
      const ok = document.getElementById('login-ok');
      if (id.length < 3 || pass.length < 4) {
        err.textContent = 'Ingresa tu correo/teléfono y tu contraseña.';
        err.hidden = false;
        return;
      }
      if (!esEmailValido(id) && !esTelefonoValido(id)) {
        err.textContent = 'Ingresa un correo electrónico o número de teléfono válido.';
        err.hidden = false;
        return;
      }
      err.hidden = true;
      try {
        sessionStorage.setItem('sh_user', id);
        sessionStorage.setItem('sh_session', '1');
      } catch {}
      ok.hidden = false;
      setTimeout(() => { location.hash = '#/inicio'; }, 1200);
    });
  }

  if (name === 'registro') {
    document.querySelectorAll('[data-toggle-pass]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.togglePass);
        const icon = btn.querySelector('span');
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        icon.textContent = show ? 'visibility' : 'visibility_off';
      });
    });
    const form = document.getElementById('registro-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const err = document.getElementById('form-error');
      const pass = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      if (pass !== confirm) {
        err.textContent = 'Las contraseñas no coinciden.';
        err.hidden = false;
        return;
      }
      if (!esEmailValido(email)) {
        err.textContent = 'Correo inválido. Ej: juan.perez@gmail.com o usuario@empresa.cl';
        err.hidden = false;
        return;
      }
      if (!esTelefonoValido(phone)) {
        err.textContent = 'Teléfono inválido. Formato: +56 9 XXXXXXXX (Chile) o número internacional de 7-15 dígitos.';
        err.hidden = false;
        return;
      }
      err.hidden = true;
      try { sessionStorage.setItem('sh_phone', phone); } catch {}
      location.hash = '#/verificar';
    });
  }

  if (name === 'verificar') {
    try {
      const p = sessionStorage.getItem('sh_phone');
      if (p) document.getElementById('phone-echo').textContent = `(${p})`;
    } catch {}
    const inputs = [...document.querySelectorAll('#otp-container input')];
    inputs.forEach((input, i) => {
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 1);
        if (e.target.value && i < inputs.length - 1) inputs[i + 1].focus();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) inputs[i - 1].focus();
      });
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const data = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
        data.split('').forEach((ch, k) => { if (inputs[k]) inputs[k].value = ch; });
        if (data.length) inputs[Math.min(data.length, 5)].focus();
      });
    });
    let left = 59;
    const timerEl = document.getElementById('timer');
    const wrap = document.getElementById('timer-wrap');
    const id = setInterval(() => {
      if (!document.body.contains(timerEl)) { clearInterval(id); return; }
      if (left <= 0) {
        clearInterval(id);
        wrap.innerHTML = '<button id="resend" class="text-[#4f378a] font-bold underline underline-offset-2" type="button">Reenviar código ahora</button>';
        document.getElementById('resend')?.addEventListener('click', () => location.reload());
      } else {
        timerEl.textContent = `00:${String(left).padStart(2, '0')}`;
        left -= 1;
      }
    }, 1000);

    document.getElementById('verify-btn')?.addEventListener('click', () => {
      const code = inputs.map((x) => x.value).join('');
      const err = document.getElementById('otp-error');
      if (code.length < 6) { err.hidden = false; return; }
      err.hidden = true;
      document.getElementById('otp-success').hidden = false;
      setTimeout(() => { location.hash = '#/intereses'; }, 1400);
    });
  }

  if (name === 'intereses') {
    let rol = '';
    document.querySelectorAll('#rol-container [data-rol]').forEach((btn) => {
      btn.addEventListener('click', () => {
        rol = btn.dataset.rol;
        document.querySelectorAll('#rol-container [data-rol]').forEach((b) => {
          const on = b === btn;
          b.setAttribute('aria-pressed', String(on));
          b.setAttribute('aria-checked', String(on));
        });
        document.getElementById('intereses-error').hidden = true;
      });
    });
    document.querySelectorAll('#intereses-container [data-interes]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', String(on));
        document.getElementById('intereses-error').hidden = true;
      });
    });
    document.getElementById('intereses-btn')?.addEventListener('click', () => {
      const temas = [...document.querySelectorAll('#intereses-container [data-interes][aria-pressed="true"]')].map((b) => b.dataset.interes);
      const err = document.getElementById('intereses-error');
      if (!rol || temas.length === 0) {
        err.hidden = false;
        return;
      }
      err.hidden = true;
      try {
        sessionStorage.setItem('sh_rol', rol);
        sessionStorage.setItem('sh_intereses', JSON.stringify(temas));
        sessionStorage.setItem('sh_session', '1');
      } catch {}
      location.hash = '#/inicio';
    });
  }

  if (name === 'mapa') {
    document.getElementById('inicio-trayecto-btn')?.addEventListener('click', () => {
      location.hash = '#/trayecto';
    });
  }

  if (name === 'inicio') {
    try {
      const rawUser = sessionStorage.getItem('sh_user') || '';
      const nombre = rawUser.includes('@') ? rawUser.split('@')[0] : rawUser;
      const rol = sessionStorage.getItem('sh_rol') || 'guardian';
      const rolLabel = rol === 'vecino' ? 'Vecino' : rol === 'coordinador' ? 'Coordinador' : 'Guardián';
      document.getElementById('inicio-saludo').textContent = `¡Hola, ${rolLabel}!`;
      if (nombre) document.getElementById('inicio-sub').textContent = `${nombre}, ¿listo para caminar seguro hoy?`;
    } catch {}
    document.getElementById('notif-btn')?.addEventListener('click', () => {
      location.hash = '#/bienvenida';
    });
    document.getElementById('trayecto-btn')?.addEventListener('click', () => {
      location.hash = '#/trayecto';
    });
    // Puntos Ámbar: NO interceptamos el <a> para no romper la navegación
    // nativa (el hashchange ya dispara render). Solo log para depurar.
    document.querySelectorAll('[data-goto-puntos-ambar]').forEach((el) => {
      el.addEventListener('click', () => {
        console.log('[SafeHaven] click Puntos Ámbar ->', el.getAttribute('href'));
      });
    });
    // SOS: mantener presionado 800ms para confirmar (mouse + touch)
    const sosBtn = document.getElementById('sos-btn');
    const sosBox = document.getElementById('sos-confirm');
    let sosTimer = null;
    const sosStart = (e) => {
      if (e?.cancelable) e.preventDefault();
      sosBtn.classList.remove('sos-pulse');
      clearTimeout(sosTimer);
      sosTimer = setTimeout(() => sosBox && (sosBox.hidden = false), 800);
    };
    const sosCancelHold = () => {
      clearTimeout(sosTimer);
      sosBtn.classList.add('sos-pulse');
    };
    sosBtn?.addEventListener('mousedown', sosStart);
    sosBtn?.addEventListener('mouseup', sosCancelHold);
    sosBtn?.addEventListener('mouseleave', sosCancelHold);
    sosBtn?.addEventListener('touchstart', sosStart, { passive: false });
    sosBtn?.addEventListener('touchend', sosCancelHold);
    document.getElementById('sos-cancel')?.addEventListener('click', () => {
      sosBox.hidden = true;
      document.getElementById('sos-done').hidden = true;
    });
    document.getElementById('sos-send')?.addEventListener('click', () => {
      document.getElementById('sos-done').hidden = false;
      setTimeout(() => {
        sosBox.hidden = true;
        document.getElementById('sos-done').hidden = true;
      }, 2500);
    });
  }

  if (name === 'trayecto') {
    // El destino SIEMPRE arranca expandido para que nada quede cortado
    const sheetCtl = initBottomSheet('trayecto-sheet', 'sheet-handle', 'expanded');
    window._shSheet = sheetCtl;
    // Recalcula el alto del panel cuando el contenido cambia (resultados, confirmación)
    const refreshSheet = () => {
      try {
        const s = window._shSheet;
        if (s) s.snap(s.state);
      } catch {}
    };
    const tMap = initSafeMap('trayecto-leaflet', { zoom: 16 });
    let origin = [...SANTIAGO]; // Santiago, Chile
    let routeLayer = null;
    let destMarker = null;
    let totalMin = 12;

    const destInput = document.getElementById('dest-input');
    const destResults = document.getElementById('dest-results');
    const destConfirm = document.getElementById('dest-confirm');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const la = pos.coords.latitude, lo = pos.coords.longitude;
          origin = isInChile(la, lo) ? [la, lo] : [...SANTIAGO];
        },
        () => {},
        { timeout: 8000 }
      );
    }

    const havKm = (a, b) => {
      const R = 6371, dLa = ((b[0] - a[0]) * Math.PI) / 180, dLo = ((b[1] - a[1]) * Math.PI) / 180;
      const s = Math.sin(dLa / 2) ** 2 + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLo / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(s));
    };

    const drawRoute = async (dest, name) => {
      destConfirm.hidden = false;
      refreshSheet();
      document.getElementById('dest-name').textContent = name;
      const meta = document.getElementById('dest-meta');
      meta.textContent = 'Trazando la ruta más segura…';
      try { sessionStorage.setItem('sh_destino', JSON.stringify({ name, lat: dest[0], lng: dest[1] })); } catch {}
      if (!window.L || !tMap) {
        const km = havKm(origin, dest);
        totalMin = Math.max(2, Math.round((km / 4.5) * 60));
        meta.textContent = `${km.toFixed(1)} km · ~${totalMin} min a pie (estimado offline)`;
        return;
      }
      if (routeLayer) tMap.removeLayer(routeLayer);
      if (destMarker) tMap.removeLayer(destMarker);
      destMarker = window.L.circleMarker(dest, {
        radius: 9, color: '#fff', weight: 3, fillColor: '#c9a74d', fillOpacity: 1,
      }).addTo(tMap).bindPopup(`<b>${name}</b><br>Tu destino`);
      try {
        const url = `https://router.project-osrm.org/route/v1/foot/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`;
        const r = await fetch(url);
        const j = await r.json();
        const route = j?.routes?.[0];
        if (!route) throw new Error('no-route');
        const coords = route.geometry.coordinates.map(([o, a]) => [a, o]);
        // Ruta más segura: fondo blanco (borde) + línea verde de seguridad
        routeLayer = window.L.layerGroup([
          window.L.polyline(coords, { color: '#ffffff', weight: 9, opacity: 0.95 }),
          window.L.polyline(coords, { color: '#2E7D32', weight: 5, opacity: 0.95 }),
        ]).addTo(tMap);
        routeLayer.bindPopup('<b>Ruta más segura</b><br>Sigue la línea verde');
        tMap.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });
        const km = route.distance / 1000;
        totalMin = Math.max(2, Math.round(route.duration / 60));
        meta.textContent = `${km.toFixed(1)} km · ~${totalMin} min a pie por la ruta más segura`;
        document.getElementById('ruta-badge')?.removeAttribute('hidden');
      } catch {
        const km = havKm(origin, dest);
        routeLayer = window.L.layerGroup([
          window.L.polyline([origin, dest], { color: '#ffffff', weight: 8, opacity: 0.95 }),
          window.L.polyline([origin, dest], { color: '#2E7D32', weight: 4, dashArray: '10 8', opacity: 0.9 }),
        ]).addTo(tMap);
        tMap.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });
        totalMin = Math.max(2, Math.round((km / 4.5) * 60));
        meta.textContent = `${km.toFixed(1)} km · ~${totalMin} min a pie (ruta directa)`;
        document.getElementById('ruta-badge')?.removeAttribute('hidden');
      }
    };

    let searchTimer = null;
    const runSearch = async () => {
      const q = destInput.value.trim();
      if (q.length < 3) {
        destResults.innerHTML = '<p class="text-xs text-[#494551]">Escribe al menos 3 letras para buscar.</p>';
        refreshSheet();
        return;
      }
      destResults.innerHTML = '<p class="text-xs font-bold text-[#4f378a]">Buscando direcciones…</p>';
      refreshSheet();
      try {
        // Buscador principalmente Chile: país cl + viewbox Chile central, idioma español
        const inCl = isInChile(origin[0], origin[1]);
        const box = inCl
          ? `${origin[1] - 0.15},${origin[0] - 0.15},${origin[1] + 0.15},${origin[0] + 0.15}`
          : `-70.9,-33.7,-70.4,-33.3`;
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=cl&viewbox=${box}&bounded=0&accept-language=es&q=${encodeURIComponent(q)}, Chile`
        );
        const list = await r.json();
        if (!list.length) {
          destResults.innerHTML = '<p class="text-xs text-[#494551]">Sin resultados. Prueba con colonia o punto conocido.</p>';
          refreshSheet();
          return;
        }
        destResults.innerHTML = '';
        list.forEach((p) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'sh-btn-secondary !py-3 text-sm !justify-start text-left';
          const short = p.display_name.split(',').slice(0, 3).join(',');
          b.innerHTML = `<span class="material-symbols-outlined text-[#4f378a]">place</span><span class="truncate">${short}</span>`;
          b.addEventListener('click', () => drawRoute([Number(p.lat), Number(p.lon)], short));
          destResults.appendChild(b);
        });
        refreshSheet();
      } catch {
        destResults.innerHTML = '<p class="text-xs text-[#ba1a1a] font-semibold">Sin conexión para buscar. Usa el destino demo.</p>';
        refreshSheet();
      }
    };
    document.getElementById('dest-search')?.addEventListener('click', runSearch);
    destInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { if (destInput.value.trim().length >= 4) runSearch(); }, 900);
    });
    document.querySelector('[data-dest-demo]')?.addEventListener('click', () => {
      drawRoute([origin[0] + 0.006, origin[1] + 0.004], 'Refugio Bellavista (demo)');
    });

    // Al iniciar: fase destino → acompañamiento, y desde ahí manda el GPS
    let destCoords = null;
    let watchId = null;
    let initialKm = 0;
    let arrived = false;

    const fmtKm = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);

    const finishTrip = (auto) => {
      if (arrived) return;
      arrived = true;
      try { if (watchId != null) navigator.geolocation.clearWatch(watchId); } catch {}
      paintProgress(0);
      const done = document.getElementById('lleque-done');
      done.hidden = false;
      if (auto) done.textContent = '¡Llegaste! Detectamos tu arribo por GPS.';
      try { sessionStorage.setItem('sh_trayecto', 'completado'); } catch {}
      setTimeout(() => { location.hash = '#/inicio'; }, 1800);
    };

    // Progreso 100% real: solo sube cuando el GPS detecta que avanzas
    function paintProgress(remainingKm) {
      const pctEl = document.getElementById('trayecto-pct');
      if (!pctEl || !document.body.contains(pctEl)) return;
      const pct = initialKm > 0 ? Math.min(100, Math.max(0, Math.round((1 - remainingKm / initialKm) * 100))) : 0;
      pctEl.textContent = pct;
      document.getElementById('trayecto-bar').style.width = `${pct}%`;
      document.getElementById('trayecto-dist').textContent = fmtKm(remainingKm);
      const eta = document.getElementById('trayecto-eta');
      if (remainingKm < 0.04) {
        eta.textContent = '¡Ya casi llegas!';
        finishTrip(true);
      } else {
        eta.textContent = `~${Math.max(1, Math.round((remainingKm / 4.5) * 60))} min a pie`;
      }
    }

    const onPosition = (pos) => {
      const cur = [pos.coords.latitude, pos.coords.longitude];
      try { tMap?._shSetUser(cur[0], cur[1]); } catch {}
      document.getElementById('gps-hint').textContent = 'GPS activo: tu avance se mide en vivo.';
      paintProgress(havKm(cur, destCoords));
    };

    document.getElementById('start-btn')?.addEventListener('click', () => {
      try {
        const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
        if (d) destCoords = [d.lat, d.lng];
      } catch {}
      if (!destCoords) return;
      // Reemplazo en el mismo lugar: se va lo de destino, llega "Llegué a Salvo"
      document.getElementById('bloque-destino').hidden = true;
      document.getElementById('bloque-llegada').hidden = false;
      document.getElementById('fase-curso').hidden = false;
      try {
        const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
        if (d) {
          document.getElementById('llegada-name').textContent = d.name;
          const m = document.getElementById('dest-meta')?.textContent;
          if (m) document.getElementById('llegada-meta').textContent = m;
        }
      } catch {}
      try { window._shSheet?.snap('expanded'); } catch {}
      const begin = (cur) => {
        initialKm = Math.max(0.05, havKm(cur, destCoords));
        paintProgress(initialKm);
        if ('geolocation' in navigator) {
          document.getElementById('gps-hint').textContent = 'GPS activo: tu avance se mide en vivo.';
          try {
            watchId = navigator.geolocation.watchPosition(onPosition, () => {
              const h = document.getElementById('gps-hint');
              if (h) h.textContent = 'Se perdió el GPS: el progreso se pausó.';
            }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
            window._shWatch = watchId;
          } catch {}
        } else {
          document.getElementById('gps-hint').textContent = 'Este dispositivo no tiene GPS: usa simular avance.';
        }
      };
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => begin([pos.coords.latitude, pos.coords.longitude]),
          () => begin(origin),
          { enableHighAccuracy: true, timeout: 8000 }
        );
      } else begin(origin);
    });

    // Demo: simula avance sin caminar (para probar)
    document.getElementById('demo-advance')?.addEventListener('click', () => {
      if (!destCoords || initialKm <= 0) return;
      const cur = Number(document.getElementById('trayecto-pct')?.textContent) || 0;
      const remaining = Math.max(0, initialKm * (1 - cur / 100) - Math.max(0.2, initialKm * 0.15));
      document.getElementById('gps-hint').textContent = 'Avance simulado (demo).';
      paintProgress(remaining);
    });
    document.getElementById('lleque-btn')?.addEventListener('click', () => {
      finishTrip(false);
    });
  }

  if (name === 'reportar') {
    // Prefill de ubicación con el destino del acompañamiento, si existe
    try {
      const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
      if (d?.name) document.getElementById('report-loc').textContent = `Cerca de ${d.name}`;
    } catch {}
    // Grilla de peligros (selección única, como el rol en intereses)
    document.querySelectorAll('#report-grid [data-report]').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('#report-grid [data-report]').forEach((x) => {
          const on = x === b;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        try { sessionStorage.setItem('sh_reporte', b.dataset.report); } catch {}
        try { if (navigator.vibrate) navigator.vibrate(50); } catch {}
        document.getElementById('report-error').hidden = true;
        document.getElementById('report-done').hidden = true;
        document.getElementById('report-back').hidden = true;
      });
    });
    // Las tarjetas Luminaria / Zona navegan al detalle; se guarda la selección al pulsar
    // Se fuerza la navegación por JS por si el click por defecto queda bloqueado
    document.querySelectorAll('[data-report-link]')?.forEach((a) => {
      a.addEventListener('click', (e) => {
        try { sessionStorage.setItem('sh_reporte', e.currentTarget.dataset.reportLink); } catch {}
        const href = a.getAttribute('href');
        if (href && href.startsWith('#/')) {
          e.preventDefault();
          if (location.hash === href) render();
          else location.hash = href;
        }
      });
    });
    // Adjuntos demo: foto / nota de voz (marcan estado visual)
    [['report-photo', 'Foto lista'], ['report-voice', 'Nota lista']].forEach(([id, doneLabel]) => {
      const btn = document.getElementById(id);
      btn?.addEventListener('click', () => {
        const label = btn.querySelector('[data-label]');
        const on = btn.getAttribute('data-attached') === 'true';
        btn.setAttribute('data-attached', String(!on));
        btn.style.borderColor = !on ? '#2e7d32' : '';
        if (label) label.textContent = !on ? `${doneLabel} ✓` : (id === 'report-photo' ? 'Tomar Foto' : 'Nota de Voz');
      });
    });
    document.getElementById('report-send')?.addEventListener('click', (e) => {
      burstSparklesFromButton(e.currentTarget);
      const sel = document.querySelector('#report-grid [data-report][aria-pressed="true"]');
      const err = document.getElementById('report-error');
      if (!sel) { err.hidden = false; return; }
      err.hidden = true;
      try {
        sessionStorage.setItem('sh_reporte', sel.dataset.report);
        sessionStorage.setItem('sh_reporte_loc', document.getElementById('report-loc')?.textContent || '');
      } catch {}
      const done = document.getElementById('report-done');
      done.textContent = `Reporte "${sel.dataset.report}" enviado (demo). +50 Safepoints. ¡Gracias, guardián!`;
      done.hidden = false;
      document.getElementById('report-back').hidden = false;
    });
  }

  if (name === 'reportar-luminaria') {
    try {
      const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
      if (d?.name) document.getElementById('lum-addr').textContent = `Cerca de ${d.name}`;
    } catch {}
    try { sessionStorage.setItem('sh_reporte', 'Luminaria fundida'); } catch {}
    // "Usar ubicación actual": misma lógica del mapa (punto ámbar más cercano, Chile)
    const lumHavKm = (a, b) => {
      const R = 6371, dLa = ((b[0] - a[0]) * Math.PI) / 180, dLo = ((b[1] - a[1]) * Math.PI) / 180;
      const s = Math.sin(dLa / 2) ** 2 + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLo / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(s));
    };
    const lumNearest = (lat, lng) => {
      let best = null;
      amberPoints(lat, lng).forEach(([a, o, n]) => {
        const km = lumHavKm([lat, lng], [a, o]);
        if (!best || km < best.km) best = { name: n, km };
      });
      return best;
    };
    const lumFmt = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);
    // "Usar ubicación actual" en vivo: rastrea el GPS y actualiza al moverse.
    // Se guarda en window._shWatch para que render() lo detenga al salir.
    let lumWatch = null;
    const lumBtn = document.getElementById('lum-loc');
    const setLumBtn = (t) => { if (lumBtn && lumBtn.lastChild) lumBtn.lastChild.textContent = ` ${t}`; };
    lumBtn?.addEventListener('click', () => {
      const addr = document.getElementById('lum-addr');
      if (!addr) return;
      if (lumWatch != null) {
        try { navigator.geolocation.clearWatch(lumWatch); } catch {}
        lumWatch = null;
        window._shWatch = null;
        setLumBtn('Usar ubicación actual');
        return;
      }
      if (!('geolocation' in navigator)) { addr.textContent = 'Ubicación no disponible'; return; }
      addr.textContent = 'Localizándote…';
      setLumBtn('Rastreando ubicación… (tocar para detener)');
      lumWatch = navigator.geolocation.watchPosition(
        (pos) => {
          const b = lumNearest(pos.coords.latitude, pos.coords.longitude);
          addr.textContent = b ? `${b.name} · ${lumFmt(b.km)} · en vivo` : 'Tu ubicación GPS';
        },
        () => {
          const b = lumNearest(-33.4489, -70.6693);
          addr.textContent = b ? `${b.name} · ${lumFmt(b.km)} (aprox.)` : 'Ubicación aproximada (Santiago)';
          setLumBtn('Usar ubicación actual');
          lumWatch = null;
          window._shWatch = null;
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
      );
      window._shWatch = lumWatch;
    });
    document.getElementById('lum-photo')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const label = btn.querySelector('[data-label]');
      const on = btn.getAttribute('data-attached') === 'true';
      btn.setAttribute('data-attached', String(!on));
      btn.style.borderColor = !on ? '#2e7d32' : '';
      if (label) label.textContent = !on ? 'Foto lista ✓' : 'Subir foto de la falla';
    });
    document.getElementById('lum-send')?.addEventListener('click', (e) => {
      burstSparklesFromButton(e.currentTarget);
      try {
        sessionStorage.setItem('sh_reporte', 'Luminaria fundida');
        sessionStorage.setItem('sh_reporte_loc', document.getElementById('lum-addr')?.textContent || '');
        sessionStorage.setItem('sh_reporte_detalle', document.getElementById('lum-detalle')?.value || '');
      } catch {}
      document.getElementById('lum-done').hidden = false;
      document.getElementById('lum-back').hidden = false;
    });
  }

  if (name === 'reportar-zona-sospechosa') {
    try {
      const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
      if (d?.name) document.getElementById('zona-addr').textContent = `Cerca de ${d.name}`;
    } catch {}
    try { sessionStorage.setItem('sh_reporte', 'Zona sospechosa'); } catch {}
    document.querySelectorAll('#zona-grid [data-zona]').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('#zona-grid [data-zona]').forEach((x) => {
          const on = x === b;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        try { sessionStorage.setItem('sh_reporte_detalle', b.dataset.zona); } catch {}
        try { if (navigator.vibrate) navigator.vibrate(30); } catch {}
        document.getElementById('zona-error').hidden = true;
        document.getElementById('zona-done').hidden = true;
        document.getElementById('zona-back').hidden = true;
      });
    });
    document.getElementById('zona-voice')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const label = btn.querySelector('[data-label]');
      const on = btn.getAttribute('data-attached') === 'true';
      btn.setAttribute('data-attached', String(!on));
      btn.style.borderColor = !on ? '#2e7d32' : '';
      if (label) label.textContent = !on ? 'Nota lista ✓' : 'Grabar Nota de Voz';
    });
    document.getElementById('zona-send')?.addEventListener('click', (e) => {
      burstSparklesFromButton(e.currentTarget);
      const sel = document.querySelector('#zona-grid [data-zona][aria-pressed="true"]');
      const err = document.getElementById('zona-error');
      if (!sel) { err.hidden = false; return; }
      err.hidden = true;
      try {
        sessionStorage.setItem('sh_reporte', 'Zona sospechosa');
        sessionStorage.setItem('sh_reporte_detalle', sel.dataset.zona);
        sessionStorage.setItem('sh_reporte_loc', document.getElementById('zona-addr')?.textContent || '');
      } catch {}
      document.getElementById('zona-done').hidden = false;
      document.getElementById('zona-back').hidden = false;
    });
  }

  if (name === 'reportar-peligro-vial') {
    try {
      const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
      if (d?.name) document.getElementById('vial-addr').textContent = `Cerca de ${d.name}`;
    } catch {}
    try { sessionStorage.setItem('sh_reporte', 'Peligro vial'); } catch {}
    document.getElementById('vial-edit')?.addEventListener('click', () => {
      location.hash = '#/mapa';
    });
    document.getElementById('vial-loc')?.addEventListener('click', () => {
      const addr = document.getElementById('vial-addr');
      if (!addr) return;
      if (!('geolocation' in navigator)) { addr.textContent = 'Ubicación no disponible'; return; }
      addr.textContent = 'Localizándote…';
      navigator.geolocation.getCurrentPosition(
        (pos) => { addr.textContent = `Ubicación precisa detectada ✓ (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`; },
        () => { addr.textContent = 'Av. Principal 1234 (aprox.)'; },
        { timeout: 8000 }
      );
    });
    document.getElementById('vial-photo')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const label = btn.querySelector('[data-label]');
      const on = btn.getAttribute('data-attached') === 'true';
      btn.setAttribute('data-attached', String(!on));
      btn.style.borderColor = !on ? '#2e7d32' : '';
      if (label) label.textContent = !on ? 'Foto lista ✓' : 'Subir foto del peligro';
    });
    document.querySelectorAll('#vial-grid [data-vial]').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('#vial-grid [data-vial]').forEach((x) => {
          const on = x === b;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        try { sessionStorage.setItem('sh_reporte_detalle', b.dataset.vial); } catch {}
        try { if (navigator.vibrate) navigator.vibrate(30); } catch {}
        document.getElementById('vial-error').hidden = true;
        document.getElementById('vial-done').hidden = true;
        document.getElementById('vial-back').hidden = true;
        // Al apretar "Otro Peligro" aparece escribir o seleccionar uno
        const otroBox = document.getElementById('vial-otro');
        if (otroBox) {
          const show = b.dataset.vial === 'Otro Peligro';
          otroBox.hidden = !show;
          otroBox.style.display = show ? '' : 'none';
          if (show) setTimeout(() => otroBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
        document.getElementById('vial-otro-error').hidden = true;
      });
    });
    document.querySelectorAll('#vial-otro-chips [data-vial-otro]')?.forEach((c) => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#vial-otro-chips [data-vial-otro]').forEach((x) => {
          const on = x === c;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        const input = document.getElementById('vial-otro-input');
        if (input) input.value = c.dataset.vialOtro;
        document.getElementById('vial-otro-error').hidden = true;
      });
    });
    document.getElementById('vial-otro-input')?.addEventListener('input', (e) => {
      // Si escribe algo distinto a los chips, desmarca los chips
      const v = e.target.value.trim();
      const match = [...document.querySelectorAll('#vial-otro-chips [data-vial-otro]')].some((x) => x.dataset.vialOtro === v);
      if (!match) {
        document.querySelectorAll('#vial-otro-chips [data-vial-otro]').forEach((x) => {
          x.setAttribute('aria-pressed', 'false');
          x.setAttribute('aria-checked', 'false');
        });
      }
      document.getElementById('vial-otro-error').hidden = true;
    });
    document.getElementById('vial-send')?.addEventListener('click', (e) => {
      burstSparklesFromButton(e.currentTarget);
      const sel = document.querySelector('#vial-grid [data-vial][aria-pressed="true"]');
      const err = document.getElementById('vial-error');
      if (!sel) { err.hidden = false; return; }
      err.hidden = true;
      let detalle = sel.dataset.vial;
      // Si es "Otro Peligro" exige escribir o seleccionar uno
      if (detalle === 'Otro Peligro') {
        const custom = document.getElementById('vial-otro-input')?.value.trim() || '';
        const chip = document.querySelector('#vial-otro-chips [data-vial-otro][aria-pressed="true"]');
        const otroErr = document.getElementById('vial-otro-error');
        if (!custom && !chip) { otroErr.hidden = false; return; }
        detalle = custom || chip.dataset.vialOtro;
      }
      try {
        sessionStorage.setItem('sh_reporte', 'Peligro vial');
        sessionStorage.setItem('sh_reporte_detalle', detalle);
        sessionStorage.setItem('sh_reporte_loc', document.getElementById('vial-addr')?.textContent || '');
        sessionStorage.setItem('sh_reporte_nota', document.getElementById('vial-detalle')?.value || '');
      } catch {}
      const done = document.getElementById('vial-done');
      done.textContent = `Peligro vial “${detalle}” notificado (demo). +50 Safepoints. ¡Gracias, guardián!`;
      done.hidden = false;
      document.getElementById('vial-back').hidden = false;
    });
  }

  if (name === 'reportar-incidente') {
    try { sessionStorage.setItem('sh_reporte', 'Incidente'); } catch {}
    try {
      const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
      if (d?.name) {
        document.getElementById('inc-addr').textContent = `Cerca de ${d.name}`;
        document.getElementById('inc-coords').textContent = d.name;
      }
    } catch {}
    // Ubicación en vivo
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const a = document.getElementById('inc-addr');
          if (a && a.textContent.includes('Detectando')) a.textContent = 'Ubicación precisa detectada ✓';
          document.getElementById('inc-coords').textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`;
        },
        () => {
          document.getElementById('inc-addr').textContent = 'Ubicación aproximada (Santiago)';
          document.getElementById('inc-coords').textContent = 'Lat: -33.4489, Lng: -70.6693 (Aprox)';
        },
        { timeout: 8000 }
      );
    } else {
      document.getElementById('inc-addr').textContent = 'Ubicación aproximada (Santiago)';
      document.getElementById('inc-coords').textContent = 'Lat: -33.4489, Lng: -70.6693 (Aprox)';
    }
    document.getElementById('inc-edit')?.addEventListener('click', () => { location.hash = '#/mapa'; });
    document.getElementById('inc-loc')?.addEventListener('click', () => {
      const addr = document.getElementById('inc-addr');
      if (!addr || !('geolocation' in navigator)) return;
      addr.textContent = 'Localizándote…';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          addr.textContent = 'Ubicación precisa detectada ✓';
          document.getElementById('inc-coords').textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`;
        },
        () => { addr.textContent = 'Ubicación aproximada (Santiago)'; },
        { timeout: 8000 }
      );
    });
    document.querySelectorAll('#inc-grid [data-inc]').forEach((b) => {
      b.addEventListener('click', () => {
        document.querySelectorAll('#inc-grid [data-inc]').forEach((x) => {
          const on = x === b;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        try { sessionStorage.setItem('sh_reporte_detalle', b.dataset.inc); } catch {}
        try { if (navigator.vibrate) navigator.vibrate(30); } catch {}
        document.getElementById('inc-error').hidden = true;
        document.getElementById('inc-done').hidden = true;
        document.getElementById('inc-back').hidden = true;
        // Al apretar "Otro Incidente" aparece escribir o seleccionar uno
        const otroBox = document.getElementById('inc-otro');
        if (otroBox) {
          const show = b.dataset.inc === 'Otro Incidente';
          otroBox.hidden = !show;
          otroBox.style.display = show ? '' : 'none';
          if (show) setTimeout(() => otroBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
        const oe = document.getElementById('inc-otro-error');
        if (oe) oe.hidden = true;
      });
    });
    document.querySelectorAll('#inc-otro-chips [data-inc-otro]')?.forEach((c) => {
      c.addEventListener('click', () => {
        document.querySelectorAll('#inc-otro-chips [data-inc-otro]').forEach((x) => {
          const on = x === c;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        const input = document.getElementById('inc-otro-input');
        if (input) input.value = c.dataset.incOtro;
        document.getElementById('inc-otro-error').hidden = true;
      });
    });
    document.getElementById('inc-otro-input')?.addEventListener('input', (e) => {
      const v = e.target.value.trim();
      const match = [...document.querySelectorAll('#inc-otro-chips [data-inc-otro]')].some((x) => x.dataset.incOtro === v);
      if (!match) {
        document.querySelectorAll('#inc-otro-chips [data-inc-otro]').forEach((x) => {
          x.setAttribute('aria-pressed', 'false');
          x.setAttribute('aria-checked', 'false');
        });
      }
      document.getElementById('inc-otro-error').hidden = true;
    });
    document.getElementById('inc-photo')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const label = btn.querySelector('[data-label]');
      const on = btn.getAttribute('data-attached') === 'true';
      btn.setAttribute('data-attached', String(!on));
      btn.style.borderColor = !on ? '#2e7d32' : '';
      if (label) label.textContent = !on ? 'Evidencia lista ✓' : 'Subir foto o evidencia';
    });
    // Enviar con un toque (misma familia que Peligro Vial / Luminaria / Zona)
    document.getElementById('inc-sos')?.addEventListener('click', (e) => {
      const sel = document.querySelector('#inc-grid [data-inc][aria-pressed="true"]');
      const err = document.getElementById('inc-error');
      if (!sel) { err.hidden = false; return; }
      err.hidden = true;
      let tipo = sel.dataset.inc;
      // Si es "Otro Incidente" exige escribir o seleccionar uno
      if (tipo === 'Otro Incidente') {
        const custom = document.getElementById('inc-otro-input')?.value.trim() || '';
        const chip = document.querySelector('#inc-otro-chips [data-inc-otro][aria-pressed="true"]');
        const otroErr = document.getElementById('inc-otro-error');
        if (!custom && !chip) { otroErr.hidden = false; return; }
        tipo = custom || chip.dataset.incOtro;
      }
      burstSparklesFromButton(e.currentTarget);
      try {
        sessionStorage.setItem('sh_reporte', 'Incidente');
        sessionStorage.setItem('sh_reporte_detalle', tipo);
        sessionStorage.setItem('sh_reporte_loc', `${document.getElementById('inc-addr')?.textContent || ''} · ${document.getElementById('inc-coords')?.textContent || ''}`);
        sessionStorage.setItem('sh_reporte_nota', document.getElementById('inc-detalle')?.value || '');
        sessionStorage.setItem('sh_alerta_central', '1');
      } catch {}
      try { if (navigator.vibrate) navigator.vibrate([80, 40, 80]); } catch {}
      const done = document.getElementById('inc-done');
      done.textContent = `Alerta “${tipo}” enviada a la central (demo). Tus contactos fueron notificados.`;
      done.hidden = false;
      document.getElementById('inc-back').hidden = false;
    });
  }

  if (name === 'flock') {
    const msg = document.getElementById('flock-msg');
    const say = (t) => { if (msg) { msg.textContent = t; msg.hidden = false; } };
    document.querySelectorAll('[data-flock-menu]')?.forEach((b) => {
      b.addEventListener('click', () => say(`“${b.dataset.flockMenu}” — opciones disponibles en demo.`));
    });
    document.getElementById('flock-share')?.addEventListener('click', () => {
      const text = encodeURIComponent('Estoy compartiendo mi ubicación en vivo con SafeHaven 🛡️');
      window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener');
      say('Abriendo WhatsApp para compartir tu ubicación en vivo…');
    });
    // SOS Flock: primer toque arma (rojo SOS), segundo desarma — igual que Stitch
    const sosBtn = document.getElementById('flock-sos');
    let armed = false;
    sosBtn?.addEventListener('click', () => {
      armed = !armed;
      if (armed) {
        sosBtn.style.background = '#ba1a1a';
        sosBtn.style.borderRadius = '16px';
        sosBtn.innerHTML = '<span class="font-display text-2xl" style="font-weight:400;letter-spacing:.05em">SOS</span>';
      } else {
        sosBtn.style.background = '#00D1FF';
        sosBtn.style.borderRadius = '9999px';
        sosBtn.innerHTML = '<span class="material-symbols-outlined text-4xl" style="font-variation-settings:\'FILL\' 1">emergency_home</span>';
      }
    });
  }

  if (name === 'flock-crear') {
    let avatar = 'Familia';
    document.querySelectorAll('#grupo-avatar [data-avatar]').forEach((b) => {
      b.addEventListener('click', () => {
        avatar = b.dataset.avatar;
        document.querySelectorAll('#grupo-avatar [data-avatar]').forEach((x) => {
          const on = x === b;
          x.setAttribute('aria-pressed', String(on));
          x.setAttribute('aria-checked', String(on));
        });
        if (avatar === 'custom') {
          const label = document.querySelector('#grupo-foto [data-label]');
          if (label) label.textContent = 'Imagen lista ✓';
        }
        document.getElementById('grupo-error').hidden = true;
      });
    });
    document.getElementById('grupo-continuar')?.addEventListener('click', () => {
      const nombre = document.getElementById('grupo-nombre').value.trim();
      const err = document.getElementById('grupo-error');
      const ok = document.getElementById('grupo-ok');
      if (nombre.length < 2) { err.hidden = false; return; }
      err.hidden = true;
      try {
        sessionStorage.setItem('sh_grupo_nombre', nombre);
        sessionStorage.setItem('sh_grupo_avatar', avatar);
      } catch {}
      ok.textContent = `Círculo “${nombre}” (${avatar}) listo (demo). Paso 2 próximamente.`;
      ok.hidden = false;
      setTimeout(() => { location.hash = '#/flock'; }, 1600);
    });
  }

  if (name === 'flock-unirse') {
    const inputs = [...document.querySelectorAll('#join-code input')];
    const btn = document.getElementById('join-btn');
    const err = document.getElementById('join-error');
    const ok = document.getElementById('join-ok');
    const check = () => {
      const full = inputs.every((x) => x.value.length === 1);
      btn.disabled = !full;
      btn.classList.toggle('opacity-50', !full);
    };
    inputs.forEach((input, i) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 1);
        if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
        err.hidden = true;
        check();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && i > 0) inputs[i - 1].focus();
      });
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const data = (e.clipboardData.getData('text') || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        data.split('').forEach((ch, k) => { if (inputs[k]) inputs[k].value = ch; });
        if (data.length) inputs[Math.min(data.length, 5)].focus();
        err.hidden = true;
        check();
      });
    });
    document.getElementById('join-paste')?.addEventListener('click', async () => {
      try {
        const t = await navigator.clipboard.readText();
        const data = (t || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        if (!data) return;
        data.split('').forEach((ch, k) => { if (inputs[k]) inputs[k].value = ch; });
        inputs[Math.min(data.length, 5)].focus();
        err.hidden = true;
        check();
      } catch {
        inputs[0]?.focus();
      }
    });
    btn?.addEventListener('click', () => {
      const code = inputs.map((x) => x.value).join('');
      if (code.length < 6) { err.hidden = false; return; }
      err.hidden = true;
      try { sessionStorage.setItem('sh_grupo_codigo', code); } catch {}
      ok.textContent = `Código “${code}” aceptado (demo). ¡Bienvenido a tu círculo!`;
      ok.hidden = false;
      setTimeout(() => { location.hash = '#/flock'; }, 1600);
    });
    check();
  }

  if (name === 'armario') {
    const fmtSP = (n) => `${n.toLocaleString('es-MX')} SP`;
    let sp = getSP();
    let equipo = getEquipo();
    const spEl = document.getElementById('armario-sp');
    const paintSP = () => { if (spEl) spEl.textContent = fmtSP(sp); };
    paintSP();
    const cards = [...document.querySelectorAll('#armario-grid [data-name]')];
    const toast = document.getElementById('armario-toast');
    let toastTimer = null;
    const showToast = () => {
      if (!toast) return;
      toast.classList.remove('translate-y-32', 'opacity-0');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.add('translate-y-32', 'opacity-0'), 2500);
    };
    const say = (t, ok = true) => {
      const msg = document.getElementById('armario-msg');
      if (!msg) return;
      msg.textContent = t;
      msg.style.color = ok ? '#4f378a' : '#ba1a1a';
      msg.hidden = false;
    };
    // Pinta las tarjetas según el equipo actual
    const paintEquipo = () => {
      cards.forEach((c) => {
        const on = equipo[c.dataset.cat] === c.dataset.name;
        c.classList.toggle('border-2', on);
        c.classList.toggle('border-[#4f378a]', on);
        const check = c.querySelector('[data-check]');
        if (check) {
          check.classList.toggle('hidden', !on);
          check.classList.toggle('flex', on);
        }
        const btn = c.querySelector('[data-equip]');
        if (btn) btn.classList.toggle('hidden', on);
        const st = c.querySelector('[data-status]');
        if (st) st.hidden = !on;
      });
    };
    paintEquipo();
    document.querySelectorAll('#armario-tabs [data-cat]').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#armario-tabs [data-cat]').forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.className = on
            ? 'shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full shadow-md bg-[#4f378a] text-white'
            : 'shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full bg-[#ece6ee] text-[#494551]';
        });
        const cat = tab.dataset.cat;
        let visible = 0;
        cards.forEach((c) => {
          const show = c.dataset.cat === cat;
          c.style.display = show ? '' : 'none';
          if (show) visible += 1;
        });
        document.getElementById('armario-empty').hidden = visible > 0;
      });
    });
    // Filtro inicial: CABEZA
    cards.forEach((c) => { c.style.display = c.dataset.cat === 'cabeza' ? '' : 'none'; });
    document.querySelectorAll('#armario-grid [data-equip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('[data-name]');
        const price = Number(card.dataset.price) || 0;
        if (sp < price) {
          say(`Te faltan ${(price - sp).toLocaleString('es-MX')} SP para “${card.dataset.name}”.`, false);
          return;
        }
        sp -= price;
        setSP(sp);
        equipo = setEquipoSlot(card.dataset.cat, card.dataset.name);
        paintSP();
        paintEquipo();
        say(`“${card.dataset.name}” equipado. Te quedan ${fmtSP(sp)}.`);
        showToast();
      });
    });
    // Rotar vista del guardián (demo visual)
    let angle = 0;
    const hero = document.getElementById('armario-hero');
    document.querySelectorAll('[data-rotate]')?.forEach((b) => {
      b.addEventListener('click', () => {
        angle = (angle + Number(b.dataset.rotate)) % 360;
        if (hero) hero.style.transform = `rotate(${angle}deg)`;
      });
    });
  }

  if (name === 'armario-item') {
    const m = (location.hash.split('?')[1] || '').match(/(?:^|&)i=([a-z]+)/);
    const id = ARMARIO_ITEMS[m?.[1]] ? m[1] : 'visor';
    const item = ARMARIO_ITEMS[id];
    const btn = document.getElementById('item-equip');
    const msg = document.getElementById('item-msg');
    const label = btn?.querySelector('[data-label]');
    const fmtSP = (n) => `${n.toLocaleString('es-MX')} SP`;
    let sp = getSP();
    const paint = () => {
      if (getEquipo()[item.cat] === item.gridName) {
        if (label) label.textContent = 'Equipado ✓';
        btn.disabled = true;
        btn.classList.add('opacity-60');
      } else if (label) {
        label.textContent = item.price > 0 ? `Equipar Ahora · ${fmtSP(item.price)}` : 'Equipar Ahora';
      }
    };
    paint();
    document.querySelector('[data-item-menu]')?.addEventListener('click', () => {
      if (!msg) return;
      msg.textContent = `“${item.name}” — más opciones en demo.`;
      msg.hidden = false;
    });
    btn?.addEventListener('click', () => {
      if (getEquipo()[item.cat] === item.gridName) return;
      if (sp < item.price) {
        if (msg) {
          msg.textContent = `Te faltan ${((item.price - sp)).toLocaleString('es-MX')} SP para “${item.name}”.`;
          msg.style.color = '#ba1a1a';
          msg.hidden = false;
        }
        return;
      }
      sp -= item.price;
      setSP(sp);
      setEquipoSlot(item.cat, item.gridName);
      paint();
      if (msg) {
        msg.textContent = `“${item.name}” equipado. Te quedan ${fmtSP(sp)}. Volviendo al armario…`;
        msg.style.color = '#2e7d32';
        msg.hidden = false;
      }
      setTimeout(() => { location.hash = '#/armario'; }, 1400);
    });
  }

  if (name === 'mapa') {
    window._shSheet = initBottomSheet('mapa-sheet', 'mapa-handle');
    const map = initSafeMap('mapa-leaflet', { zoom: 15 });
    const statusEl = document.getElementById('mapa-status');
    const nearEl = document.getElementById('mapa-near');
    // Destino que viene del detalle (punto-detalle -> Obtener Direcciones)
    const destMatch = (location.hash.split('?')[1] || '').match(/(?:^|&)dest=([^&]+)/);
    const destId = destMatch ? decodeURIComponent(destMatch[1]) : null;
    let destInfo = destId && PUNTOS_DETALLE[destId] ? { id: destId, ...PUNTOS_DETALLE[destId] } : null;
    try {
      if (!destInfo) {
        const d = JSON.parse(sessionStorage.getItem('sh_destino') || 'null');
        if (d?.id && PUNTOS_DETALLE[d.id]) destInfo = { id: d.id, ...PUNTOS_DETALLE[d.id] };
      }
    } catch {}
    const DEST_OFFSETS = {
      'santa-rosa': [0.0042, 0.0028],
      'police-north': [-0.0031, 0.0045],
      metro: [0.0015, -0.0052],
      hospital: [-0.0055, -0.0018],
    };
    const markDest = async (baseLat, baseLng) => {
      if (!map || !window.L || !destInfo) return;
      const off = DEST_OFFSETS[destInfo.id] || [0.0042, 0.0028];
      const origin = [baseLat, baseLng];
      const at = [baseLat + off[0], baseLng + off[1]];
      try {
        window.L.circleMarker(at, {
          radius: 11, color: '#fff', weight: 3, fillColor: '#10B981', fillOpacity: 1,
        }).addTo(map).bindPopup(`<b>${destInfo.nombre}</b><br>Tu destino señalado`).openPopup();
      } catch {}
      // Traza la ruta origen -> destino (igual que en trayecto, OSRM a pie)
      const havKm = (a, b) => {
        const R = 6371, dLa = ((b[0] - a[0]) * Math.PI) / 180, dLo = ((b[1] - a[1]) * Math.PI) / 180;
        const s = Math.sin(dLa / 2) ** 2 + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLo / 2) ** 2;
        return 2 * R * Math.asin(Math.sqrt(s));
      };
      const paintMeta = (km, min) => {
        if (nearEl) nearEl.textContent = `${destInfo.nombre} · ${km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`} · ~${min} min a pie · ruta marcada`;
      };
      if (!window.L) { paintMeta(havKm(origin, at), Math.max(2, Math.round((havKm(origin, at) / 4.5) * 60))); return; }
      try {
        const url = `https://router.project-osrm.org/route/v1/foot/${origin[1]},${origin[0]};${at[1]},${at[0]}?overview=full&geometries=geojson`;
        const r = await fetch(url);
        const j = await r.json();
        const route = j?.routes?.[0];
        if (!route) throw new Error('no-route');
        const coords = route.geometry.coordinates.map(([o, a]) => [a, o]);
        window.L.layerGroup([
          window.L.polyline(coords, { color: '#ffffff', weight: 9, opacity: 0.95 }),
          window.L.polyline(coords, { color: '#10B981', weight: 5, opacity: 0.95 }),
        ]).addTo(map);
        map.fitBounds(window.L.latLngBounds([origin, ...coords, at]), { padding: [50, 50] });
        paintMeta(route.distance / 1000, Math.max(2, Math.round(route.duration / 60)));
      } catch {
        const km = havKm(origin, at);
        try {
          window.L.layerGroup([
            window.L.polyline([origin, at], { color: '#ffffff', weight: 8, opacity: 0.95 }),
            window.L.polyline([origin, at], { color: '#10B981', weight: 4, dashArray: '10 8', opacity: 0.9 }),
          ]).addTo(map);
          map.fitBounds(window.L.latLngBounds([origin, at]), { padding: [50, 50] });
        } catch {}
        paintMeta(km, Math.max(2, Math.round((km / 4.5) * 60)));
      }
    };
    if (destInfo) {
      if (statusEl) statusEl.textContent = `RUTA A ${destInfo.nombre.toUpperCase().slice(0, 22)}`;
      if (nearEl) nearEl.textContent = `${destInfo.nombre} · ${destInfo.dist} · señalado`;
      const share = document.getElementById('share-sheet');
      if (share) share.hidden = false;
      const destLabel = document.getElementById('share-dest');
      if (destLabel) destLabel.textContent = `RUTA A ${destInfo.nombre.toUpperCase()}`;
      // Oculta el sheet pequeño para que no tape al menú de compartir
      try { window._shSheet?.snap('collapsed'); } catch {}
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => markDest(pos.coords.latitude, pos.coords.longitude),
          () => markDest(-33.4489, -70.6693),
          { timeout: 8000 }
        );
      } else {
        setTimeout(() => markDest(-33.4489, -70.6693), 400);
      }
    }
    // Menú Compartir y Emergencia (Stitch 25a710)
    document.getElementById('share-close')?.addEventListener('click', () => {
      const share = document.getElementById('share-sheet');
      if (share) share.hidden = true;
      try { window._shSheet?.snap('half'); } catch {}
    });
    const shareText = () => (destInfo ? `Estoy en camino a ${destInfo.nombre} 🛡️ Sígueme en vivo: ${location.href}` : `Estoy compartiendo mi ubicación en vivo con SafeHaven 🛡️ ${location.href}`);
    const shareDetail = document.getElementById('share-detail');
    const showShareDetail = (html) => {
      if (!shareDetail) return;
      shareDetail.innerHTML = html;
      shareDetail.hidden = false;
    };
    const sayShare = (t, ok = true) => {
      const msg = document.getElementById('share-msg');
      if (msg) { msg.textContent = t; msg.style.color = ok ? '#2e7d32' : '#ba1a1a'; msg.hidden = false; }
    };
    document.getElementById('share-copy')?.addEventListener('click', () => {
      showShareDetail(`
        <p class="text-xs font-bold tracking-widest text-[#4f378a]">MANDAR UBICACIÓN POR ENLACE</p>
        <input id="share-link-input" readonly value="${shareText().replace(/"/g, '&quot;')}" class="w-full text-xs bg-white border border-[#cbc4d2]/60 rounded-xl px-3 py-2.5" />
        <div class="grid grid-cols-2 gap-2">
          <button id="share-link-copy" type="button" class="sh-btn-secondary !py-2.5 text-xs"><span class="material-symbols-outlined text-base">content_copy</span> Copiar</button>
          <button id="share-link-native" type="button" class="sh-btn-secondary !py-2.5 text-xs"><span class="material-symbols-outlined text-base">share</span> Compartir…</button>
        </div>`);
      document.getElementById('share-link-copy')?.addEventListener('click', async () => {
        const v = document.getElementById('share-link-input')?.value || shareText();
        try { await navigator.clipboard?.writeText(v); sayShare('Enlace de ubicación copiado ✓'); }
        catch { sayShare('No se pudo copiar, selecciona el texto manualmente', false); }
      });
      document.getElementById('share-link-native')?.addEventListener('click', async () => {
        try {
          if (navigator.share) { await navigator.share({ title: 'Mi ubicación SafeHaven', text: shareText(), url: location.href }); sayShare('Ubicación enviada ✓'); }
          else { await navigator.clipboard?.writeText(shareText()); sayShare('Enlace copiado ✓ (tu navegador no tiene Compartir)'); }
        } catch {}
      });
    });
    document.getElementById('share-wa')?.addEventListener('click', () => {
      const sel = document.querySelector('#share-contacts [data-share-contact][aria-pressed="true"]');
      const who = sel?.dataset.shareContact;
      showShareDetail(`
        <p class="text-xs font-bold tracking-widest text-[#4f378a]">MANDAR UBICACIÓN POR WHATSAPP</p>
        <p class="text-xs text-[#494551]">Se abrirá WhatsApp con tu ubicación${who ? ` para <b>${who}</b>` : ''} lista para enviar.</p>
        <div class="flex flex-wrap gap-2">
          ${['Mamá', 'Papá', 'Ana', 'Carlos'].map((c) => `<button type="button" data-wa-to="${c}" class="px-4 py-2 rounded-full text-xs font-bold ${c === who ? 'bg-[#4f378a] text-white' : 'bg-white border border-[#cbc4d2]/60 text-[#494551]'} active:scale-95">${c}</button>`).join('')}
        </div>
        <button id="share-wa-open" type="button" class="w-full text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[.98]" style="background:#25D366"><span class="material-symbols-outlined">chat</span> Abrir WhatsApp y mandar ubicación</button>`);
      let waTo = who || '';
      shareDetail?.querySelectorAll('[data-wa-to]')?.forEach((b) => {
        b.addEventListener('click', () => {
          waTo = b.dataset.waTo;
          shareDetail.querySelectorAll('[data-wa-to]').forEach((x) => {
            const on = x === b;
            x.className = `px-4 py-2 rounded-full text-xs font-bold active:scale-95 ${on ? 'bg-[#4f378a] text-white' : 'bg-white border border-[#cbc4d2]/60 text-[#494551]'}`;
          });
        });
      });
      document.getElementById('share-wa-open')?.addEventListener('click', () => {
        const txt = encodeURIComponent(`${shareText()}${waTo ? ` (para ${waTo})` : ''}`);
        window.open(`https://wa.me/?text=${txt}`, '_blank', 'noopener');
        sayShare(`Ubicación lista para mandar por WhatsApp${waTo ? ` a ${waTo}` : ''} ✓`);
      });
    });
    document.getElementById('share-circles')?.addEventListener('click', () => {
      showShareDetail(`
        <p class="text-xs font-bold tracking-widest text-[#4f378a]">MANDAR UBICACIÓN A UN CÍRCULO</p>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3 bg-white rounded-2xl border border-[#cbc4d2]/40 p-3">
            <div class="w-10 h-10 rounded-xl bg-[#4f378a] text-white flex items-center justify-center font-bold shrink-0">F</div>
            <div class="flex-1 min-w-0"><p class="text-sm font-bold">Familia y Hogar</p><p class="text-[11px] text-[#494551]">4 miembros · en vivo</p></div>
            <button type="button" data-circle-send="Familia y Hogar" class="px-4 py-2 rounded-full bg-[#4f378a] text-white text-xs font-bold active:scale-95">Enviar</button>
          </div>
          <div class="flex items-center gap-3 bg-white rounded-2xl border border-[#cbc4d2]/40 p-3">
            <div class="w-10 h-10 rounded-xl bg-[#63597c] text-white flex items-center justify-center font-bold shrink-0">N</div>
            <div class="flex-1 min-w-0"><p class="text-sm font-bold">The Night Walkers</p><p class="text-[11px] text-[#494551]">Patrulla activa</p></div>
            <button type="button" data-circle-send="The Night Walkers" class="px-4 py-2 rounded-full bg-[#4f378a] text-white text-xs font-bold active:scale-95">Enviar</button>
          </div>
        </div>
        <a href="#/flock" class="text-center text-xs font-bold tracking-widest text-[#4f378a] hover:underline">VER MIS CÍRCULOS</a>`);
      shareDetail?.querySelectorAll('[data-circle-send]')?.forEach((b) => {
        b.addEventListener('click', () => {
          const circle = b.dataset.circleSend;
          sayShare(`Ubicación${destInfo ? ` a ${destInfo.nombre}` : ' en vivo'} mandada a “${circle}” ✓ (demo)`);
          try { if (navigator.vibrate) navigator.vibrate(40); } catch {}
          try {
            const log = JSON.parse(sessionStorage.getItem('sh_shared') || '[]');
            log.push({ to: circle, kind: 'circulo', at: Date.now(), dest: destInfo?.nombre || null });
            sessionStorage.setItem('sh_shared', JSON.stringify(log.slice(-20)));
          } catch {}
        });
      });
    });
    // Mandar ubicación a los contactos que aparecen (Mamá, Papá, Ana, Carlos)
    document.querySelectorAll('#share-contacts [data-share-contact]')?.forEach((btn) => {
      btn.addEventListener('click', () => {
        const who = btn.dataset.shareContact;
        document.querySelectorAll('#share-contacts [data-share-contact]').forEach((b) => {
          const on = b === btn;
          b.setAttribute('aria-pressed', String(on));
          b.querySelector('[data-ring]')?.classList.toggle('ring-[#4f378a]', on);
          b.querySelector('[data-ring]')?.classList.toggle('ring-transparent', !on);
        });
        const msg = document.getElementById('share-msg');
        const where = destInfo ? ` en camino a ${destInfo.nombre}` : ' en vivo';
        if (msg) { msg.textContent = `Ubicación${where} enviada a ${who} ✓ (demo)`; msg.hidden = false; }
        try { if (navigator.vibrate) navigator.vibrate(40); } catch {}
        try {
          const log = JSON.parse(sessionStorage.getItem('sh_shared') || '[]');
          log.push({ to: who, at: Date.now(), dest: destInfo?.nombre || null });
          sessionStorage.setItem('sh_shared', JSON.stringify(log.slice(-20)));
        } catch {}
      });
    });
    document.getElementById('share-emergency')?.addEventListener('click', () => {
      const msg = document.getElementById('share-msg');
      if (msg) { msg.textContent = 'Emergencia compartida (demo). Tu red ha sido notificada.'; msg.hidden = false; }
      try { if (navigator.vibrate) navigator.vibrate(80); } catch {}
    });
    if (!window.L) {
      if (statusEl && !destInfo) statusEl.textContent = 'SIN CONEXIÓN — MAPA BASE';
      if (nearEl && !destInfo) nearEl.textContent = 'Activa internet para ver puntos en vivo';
    } else if (!destInfo && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          if (statusEl) statusEl.textContent = 'ZONA MONITOREADA';
          if (nearEl) nearEl.textContent = '24/7 Market Santa Rosa · 350 m';
        },
        () => {
          if (statusEl) statusEl.textContent = 'UBICACIÓN APROXIMADA';
          if (nearEl) nearEl.textContent = '24/7 Market Santa Rosa · 1.2 km';
        },
        { timeout: 8000 }
      );
    } else if (!destInfo && statusEl) {
      statusEl.textContent = 'UBICACIÓN NO DISPONIBLE';
    }
    document.getElementById('recenter-btn')?.addEventListener('click', () => {
      if (!map) return;
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => map.setView([pos.coords.latitude, pos.coords.longitude], 16),
          () => map.setView([-33.4489, -70.6693], 15),
          { timeout: 8000 }
        );
      }
    });
  }

  if (name === 'puntos-ambar') {
    document.querySelectorAll('#pa-chips [data-pa-cat]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const cat = tab.dataset.paCat;
        document.querySelectorAll('#pa-chips [data-pa-cat]').forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.className = on
            ? 'shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-[#4f378a] text-white shadow-md'
            : 'shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-white border border-[#cbc4d2]/60 text-[#494551]';
        });
        let visible = 0;
        document.querySelectorAll('[data-pa-card]').forEach((c) => {
          const show = cat === 'all' || c.dataset.paCard === cat;
          c.style.display = show ? '' : 'none';
          if (show) visible += 1;
        });
        const empty = document.getElementById('pa-empty');
        if (empty) empty.hidden = visible > 0;
      });
    });
    document.querySelectorAll('[data-pa-go]')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        try { sessionStorage.setItem('sh_destino', JSON.stringify({ name: btn.dataset.paGo })); } catch {}
        location.hash = '#/trayecto';
      });
    });
  }

  if (name === 'punto-detalle') {
    const say = (t) => {
      const msg = document.getElementById('pd-msg');
      if (msg) { msg.textContent = t; msg.hidden = false; }
    };
    document.querySelector('[data-pd-menu]')?.addEventListener('click', () => {
      say('Más opciones del punto seguro (demo): compartir, reportar, guardar.');
    });
    document.querySelector('[data-pd-reviews]')?.addEventListener('click', () => {
      say('Todas las reseñas estarán disponibles próximamente (demo).');
    });
    document.querySelector('[data-pd-go]')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const id = btn.dataset.pdId || 'santa-rosa';
      const nombre = btn.dataset.pdGo || PUNTOS_DETALLE[id]?.nombre || id;
      try { sessionStorage.setItem('sh_destino', JSON.stringify({ name: nombre, id })); } catch {}
      location.hash = `#/mapa?dest=${encodeURIComponent(id)}`;
    });
  }
}

window.addEventListener('hashchange', render);
render();
initPWA();

