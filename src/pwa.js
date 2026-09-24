let deferredPrompt = null;

export function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((e) => console.warn('SW:', e));
    });
  }
  const banner = document.getElementById('install-banner');
  const btn = document.getElementById('install-btn');
  const dismiss = document.getElementById('install-dismiss');
  if (!banner || !btn) return;

  const hideUntil = Number(localStorage.getItem('sh_install_hide') || 0);
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (Date.now() > hideUntil) banner.hidden = false;
  });
  // iOS: sin beforeinstallprompt, mostrar ayuda manual una vez
  if (!window.matchMedia('(display-mode: standalone)').matches && Date.now() > hideUntil) {
    setTimeout(() => { if (!deferredPrompt) banner.hidden = false; }, 4000);
  }
  btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      deferredPrompt = null;
      banner.hidden = true;
    } else {
      btn.textContent = 'Compartir → Añadir a inicio';
    }
  });
  dismiss?.addEventListener('click', () => {
    banner.hidden = true;
    localStorage.setItem('sh_install_hide', String(Date.now() + 7 * 864e5));
  });
}
