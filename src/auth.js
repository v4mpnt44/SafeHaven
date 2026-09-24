import { authConfig } from './auth.config.js';

function toast(msg) {
  let el = document.getElementById('sh-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sh-toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}

// Las pantallas dedicadas (#/auth-google, #/auth-apple) registran aquí su
// callback para pintar loading / error / éxito dentro de la pantalla.
let statusHandler = null;
export function setSocialStatusHandler(fn) {
  statusHandler = fn;
}
function status(state, msg) {
  try { statusHandler?.(state, msg); } catch {}
  if (msg && (state === 'error' || state === 'info')) toast(msg);
}

export function saveSocialUser(provider, profile) {
  try {
    sessionStorage.setItem('sh_user', profile.email || profile.name || `${provider}-user`);
    sessionStorage.setItem('sh_provider', provider);
    sessionStorage.setItem('sh_profile', JSON.stringify({ provider, ...profile }));
  } catch {}
}

function demoLogin(provider) {
  saveSocialUser(provider, { name: `Usuario ${provider}`, demo: true });
  status('success', '¡Listo! Entrando en modo demo…');
  setTimeout(() => { location.hash = '#/inicio'; }, 900);
}

export function isConfigured(provider) {
  if (provider === 'google') return !!authConfig.GOOGLE_CLIENT_ID;
  if (provider === 'apple') return !!authConfig.APPLE_CLIENT_ID;
  return false;
}

// ---------- Google: OAuth2 token client (abre el selector real de cuentas) ----------
let googleTokenClient = null;

function signInWithGoogle() {
  if (!authConfig.GOOGLE_CLIENT_ID || !window.google?.accounts?.oauth2) {
    status('error', 'Falta GOOGLE_CLIENT_ID. Ábrelo en modo demo o configura tu Client ID.');
    return;
  }
  status('loading', 'Abriendo Google… elige tu cuenta en la ventana emergente.');
  try {
    googleTokenClient =
      googleTokenClient ||
      window.google.accounts.oauth2.initTokenClient({
        client_id: authConfig.GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (resp) => {
          if (resp?.error) {
            status('error', 'Google cancelado o bloqueado (permite ventanas emergentes).');
            return;
          }
          try {
            status('loading', 'Verificando tu cuenta de Google…');
            const r = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${resp.access_token}` },
            });
            if (!r.ok) throw new Error('userinfo');
            const info = await r.json();
            saveSocialUser('google', {
              name: info.name || info.email || 'Usuario Google',
              email: info.email || '',
              picture: info.picture || '',
            });
            status('success', `¡Hola, ${info.given_name || info.name || 'bienvenido'}!`);
            setTimeout(() => { location.hash = '#/inicio'; }, 800);
          } catch {
            status('error', 'No se pudo leer tu perfil de Google. Intenta de nuevo.');
          }
        },
      });
    googleTokenClient.requestAccessToken({ prompt: 'select_account' });
  } catch {
    status('error', 'No se pudo abrir Google. Revisa Client ID y orígenes autorizados.');
  }
}

// ---------- Apple: popup oficial (requiere Services ID + dominio verificado) ----------
function signInWithApple() {
  const { APPLE_CLIENT_ID, APPLE_REDIRECT_URI } = authConfig;
  if (!APPLE_CLIENT_ID || !window.AppleID?.auth) {
    status('error', 'Falta APPLE_CLIENT_ID. Ábrelo en modo demo o configura Sign in with Apple.');
    return;
  }
  status('loading', 'Abriendo Apple… completa el acceso en la ventana emergente.');
  try {
    window.AppleID.auth.init({
      clientId: APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: APPLE_REDIRECT_URI || `${location.origin}/auth/apple/callback`,
      usePopup: true,
    });
    window.AppleID.auth.signIn().then((res) => {
      const user = res?.authorization || {};
      saveSocialUser('apple', {
        name: 'Usuario Apple',
        email: user.email || '',
        id: user.id_token ? 'ok' : '',
      });
      status('success', '¡Sesión con Apple exitosa!');
      setTimeout(() => { location.hash = '#/inicio'; }, 800);
    }).catch((e) => {
      console.warn('Apple sign-in:', e);
      status('error', 'Apple cancelado o sin configurar (Services ID + dominio verificado).');
    });
  } catch (e) {
    console.warn(e);
    status('error', 'No se pudo abrir Apple. Intenta de nuevo.');
  }
}

export function initSocialAuth(root = document) {
  root.querySelectorAll('[data-social="google"]').forEach((btn) => {
    if (btn._sh) return;
    btn._sh = true;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.disabled = true;
      signInWithGoogle();
      setTimeout(() => { btn.disabled = false; }, 2000);
    });
  });
  root.querySelectorAll('[data-social="apple"]').forEach((btn) => {
    if (btn._sh) return;
    btn._sh = true;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      signInWithApple();
    });
  });
  root.querySelectorAll('[data-social-demo]').forEach((btn) => {
    if (btn._sh) return;
    btn._sh = true;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      demoLogin(btn.dataset.socialDemo);
    });
  });
}
