import './style.css';
import { pages, appNav } from './pages.js';
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
  trayecto: { render: pages.trayecto, title: 'Acompañamiento IA — SafeHaven' },
  mapa: { render: pages.mapa, title: 'Mapa Seguro — SafeHaven' },
};

const APP_NAV_ROUTES = new Set(['inicio', 'trayecto', 'mapa']);

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
  const fallback = [-33.4489, -70.6693]; // Santiago, Chile
  const map = window.L.map(elId, { zoomControl: false }).setView(fallback, zoom);
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
      (pos) => paint(pos.coords.latitude, pos.coords.longitude),
      () => paint(fallback[0], fallback[1], 'Ubicación aprox. (Santiago)'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  } else {
    paint(fallback[0], fallback[1], 'Ubicación aprox. (Santiago)');
  }
  // Corrige tamaño cuando el mapa estaba oculto al crear
  setTimeout(() => map.invalidateSize(), 300);
  return map;
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
  app.innerHTML = routes[name].render() + (APP_NAV_ROUTES.has(name) ? appNav(name === 'inicio' ? 'inicio' : name) : '');
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
      const phone = document.getElementById('phone').value.trim();
      if (pass !== confirm) {
        err.textContent = 'Las contraseñas no coinciden.';
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
    let origin = [-33.4489, -70.6693]; // Santiago, Chile
    let routeLayer = null;
    let destMarker = null;
    let totalMin = 12;

    const destInput = document.getElementById('dest-input');
    const destResults = document.getElementById('dest-results');
    const destConfirm = document.getElementById('dest-confirm');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { origin = [pos.coords.latitude, pos.coords.longitude]; },
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
        const box = `${origin[1] - 0.15},${origin[0] - 0.15},${origin[1] + 0.15},${origin[0] + 0.15}`;
        const r = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=cl&viewbox=${box}&bounded=0&q=${encodeURIComponent(q)}`
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
    document.getElementById('report-btn')?.addEventListener('click', () => {
      const box = document.getElementById('report-box');
      box.hidden = !box.hidden;
    });
    document.querySelectorAll('[data-report]').forEach((b) => {
      b.addEventListener('click', () => {
        try { sessionStorage.setItem('sh_reporte', b.dataset.report); } catch {}
        document.getElementById('report-done').hidden = false;
        setTimeout(() => { document.getElementById('report-box').hidden = true; }, 1600);
      });
    });
    document.getElementById('lleque-btn')?.addEventListener('click', () => {
      finishTrip(false);
    });
  }

  if (name === 'mapa') {
    window._shSheet = initBottomSheet('mapa-sheet', 'mapa-handle');
    const map = initSafeMap('mapa-leaflet', { zoom: 15 });
    const statusEl = document.getElementById('mapa-status');
    const nearEl = document.getElementById('mapa-near');
    if (!window.L) {
      if (statusEl) statusEl.textContent = 'SIN CONEXIÓN — MAPA BASE';
      if (nearEl) nearEl.textContent = 'Activa internet para ver puntos en vivo';
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          if (statusEl) statusEl.textContent = 'ZONA MONITOREADA';
          if (nearEl) nearEl.textContent = 'Refugio Bellavista · 350 m';
        },
        () => {
          if (statusEl) statusEl.textContent = 'UBICACIÓN APROXIMADA';
          if (nearEl) nearEl.textContent = 'Refugio Bellavista · 1.2 km';
        },
        { timeout: 8000 }
      );
    } else if (statusEl) {
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
}

window.addEventListener('hashchange', render);
render();
initPWA();

