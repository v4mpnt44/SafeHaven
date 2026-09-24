// Plantillas unificadas SafeHaven — mismo sistema en las 4 pantallas auth.
// Tema: fondo sky #B2FFFF → #fdf7ff, card .sh-card, CTA .sh-btn-primary #4f378a,
// inputs .sh-input, tipografías Anton/Hanken/Inter. HTML Stitch original en /stitch-screens/.
const brandHeader = (title, subtitle) => `
  <header class="text-center flex flex-col items-center gap-2">
    <div class="w-16 h-16 bg-[#4f378a] flex items-center justify-center hex-frame brutalist-shadow">
      <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings:'FILL' 1">shield</span>
    </div>
    <h1 class="sh-title">${title}</h1>
    <p class="sh-subtitle">${subtitle}</p>
  </header>`;

const divider = (text) => `
  <div class="flex items-center gap-3 py-1">
    <div class="flex-1 h-px bg-[#cbc4d2]"></div>
    <span class="text-xs font-bold tracking-widest text-[#494551]">${text}</span>
    <div class="flex-1 h-px bg-[#cbc4d2]"></div>
  </div>`;

export const pages = {
  bienvenida: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell flex-1 flex flex-col items-center justify-center px-6 py-8 w-full">
      <div class="text-center mb-5">
        <div class="flex justify-center mb-3">
          <div class="w-20 h-20 bg-[#4f378a] flex items-center justify-center hex-frame brutalist-shadow">
            <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings:'FILL' 1">shield</span>
          </div>
        </div>
        <h1 class="font-display text-5xl text-[#4f378a] tracking-tight uppercase leading-none">SAFEHAVEN</h1>
        <p class="font-headline italic text-[#494551] mt-1">Tu comunidad te cuida</p>
      </div>
      <div class="w-full sh-card p-5 space-y-4">
        <a href="#/registro" class="sh-btn-primary">
          <span class="material-symbols-outlined">smartphone</span> Número de Teléfono
        </a>
        ${divider("O CONTINÚA CON")}
        <div class="grid grid-cols-1 gap-3">
          <a href="#/auth-google" class="sh-btn-secondary">
            <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continuar con Google
          </a>
          <a href="#/auth-apple" class="sh-btn-secondary" style="background:#1d1b20;color:#fff;border-color:#1d1b20">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.76c0-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.9-.85-3.13-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.9-.43 7.2 1.2 9.56.8 1.16 1.76 2.46 3.02 2.41 1.21-.05 1.67-.78 3.13-.78s1.87.78 3.15.76c1.3-.02 2.12-1.18 2.91-2.35.92-1.34 1.3-2.64 1.32-2.71-.03-.01-2.54-.98-2.6-3.82zM14.16 5.6c.66-.8 1.1-1.91 1.1-3.02-1.07.04-2.36.71-3.13 1.51-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.4-.61 3.16-1.78z"/></svg>
            Continuar con Apple
          </a>
        </div>
        <p class="text-center text-[#494551]">¿Ya tienes una cuenta? <a class="text-[#4f378a] font-bold hover:underline" href="#/login">Inicia Sesión</a></p>
        <div class="sh-edge"></div>
      </div>
      <div class="mt-5 grid grid-cols-3 gap-4 w-full px-4">
        ${["lock|Encriptado", "verified_user|Seguro", "diversity_3|Privado"].map(s => {
          const [icon, label] = s.split("|");
          return `<div class="flex flex-col items-center text-center"><div class="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-1"><span class="material-symbols-outlined text-[#4f378a] text-xl">${icon}</span></div><span class="text-[10px] font-bold tracking-widest text-[#494551]">${label.toUpperCase()}</span></div>`;
        }).join("")}
      </div>
    </main>
    <div class="w-full relative h-28 overflow-hidden">
      <img src="/images/casa.png" alt="Casa segura SafeHaven" class="absolute bottom-2 right-8 w-32 h-32 object-contain opacity-90" loading="lazy" />
    </div>
  </div>`,

  registro: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-center justify-center p-6">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-4">
          ${brandHeader("Crea tu cuenta", "Únete a la red de protección comunitaria")}
          <form id="registro-form" class="flex flex-col gap-4" autocomplete="on">
            <div>
              <label class="sh-label" for="fullName">NOMBRE COMPLETO</label>
              <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">person</span>
              <input class="sh-input" id="fullName" name="fullName" placeholder="Ej. Ana García" required type="text" /></div>
            </div>
            <div>
              <label class="sh-label" for="email">CORREO ELECTRÓNICO</label>
              <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">mail</span>
              <input class="sh-input" id="email" name="email" placeholder="tu@email.com" required type="email" /></div>
            </div>
            <div>
              <label class="sh-label" for="phone">TELÉFONO CELULAR</label>
              <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">smartphone</span>
              <input class="sh-input" id="phone" name="phone" placeholder="+52 000 000 0000" required type="tel" inputmode="tel" /></div>
            </div>
            <div>
              <label class="sh-label" for="password">CONTRASEÑA</label>
              <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">lock</span>
              <input class="sh-input pr-10" id="password" name="password" placeholder="••••••••" required type="password" minlength="8" />
              <button type="button" data-toggle-pass="password" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7582]" aria-label="Mostrar contraseña"><span class="material-symbols-outlined">visibility_off</span></button></div>
            </div>
            <div>
              <label class="sh-label" for="confirmPassword">CONFIRMAR CONTRASEÑA</label>
              <div class="relative"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">lock_clock</span>
              <input class="sh-input" id="confirmPassword" placeholder="••••••••" required type="password" /></div>
            </div>
            <p id="form-error" class="text-[#ba1a1a] text-sm font-semibold" hidden></p>
            <button class="sh-btn-primary" type="submit">Crear mi cuenta <span class="material-symbols-outlined">arrow_forward</span></button>
          </form>
          <p class="text-center text-[#494551]">¿Ya tienes una cuenta? <a class="text-[#4f378a] font-bold hover:underline" href="#/login">Inicia sesión</a></p>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`,

  login: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-center justify-center p-6">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-4">
          ${brandHeader("¡Hola de nuevo!", "Ingresa tus datos para continuar protegido")}
          <form id="login-form" class="flex flex-col gap-4" autocomplete="on">
            <div>
              <label class="sh-label" for="login-id">CORREO O TELÉFONO</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">person</span>
                <input id="login-id" class="sh-input" placeholder="tu@email.com" type="text" required autocomplete="username" />
              </div>
            </div>
            <div>
              <label class="sh-label" for="login-pass">CONTRASEÑA</label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">lock</span>
                <input id="login-pass" class="sh-input pr-10" placeholder="••••••••" type="password" required autocomplete="current-password" />
                <button type="button" data-toggle-pass="login-pass" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7582]" aria-label="Mostrar contraseña"><span class="material-symbols-outlined">visibility_off</span></button>
              </div>
            </div>
            <div class="flex justify-end">
              <a class="text-xs font-bold tracking-widest text-[#4f378a] hover:underline" href="#/verificar">¿OLVIDASTE TU CONTRASEÑA?</a>
            </div>
            <p id="login-error" class="text-[#ba1a1a] text-sm font-semibold" hidden></p>
            <p id="login-ok" class="text-sm font-semibold text-[#4f378a]" hidden>¡Bienvenido de nuevo! Redirigiendo…</p>
            <button class="sh-btn-primary" type="submit">Iniciar Sesión</button>
          </form>
          ${divider("O ENTRA CON")}
          <div class="flex gap-3">
            <a href="#/auth-google" class="sh-btn-secondary">
              <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </a>
            <a href="#/auth-apple" class="sh-btn-secondary">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.76c0-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.9-.85-3.13-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.9-.43 7.2 1.2 9.56.8 1.16 1.76 2.46 3.02 2.41 1.21-.05 1.67-.78 3.13-.78s1.87.78 3.15.76c1.3-.02 2.12-1.18 2.91-2.35.92-1.34 1.3-2.64 1.32-2.71-.03-.01-2.54-.98-2.6-3.82zM14.16 5.6c.66-.8 1.1-1.91 1.1-3.02-1.07.04-2.36.71-3.13 1.51-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.4-.61 3.16-1.78z"/></svg>
              Apple
            </a>
          </div>
          <p class="text-center text-[#494551]">¿No tienes cuenta? <a class="text-[#4f378a] font-bold hover:underline" href="#/registro">Regístrate aquí</a></p>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`,

  authGoogle: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-center justify-center p-6">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-4">
          <a href="#/login" class="flex items-center gap-1 text-[#4f378a] font-semibold text-sm" aria-label="Volver"><span class="material-symbols-outlined">arrow_back</span> Volver</a>
          <header class="text-center flex flex-col items-center gap-2">
            <div class="w-16 h-16 bg-white border border-[#cbc4d2]/60 rounded-2xl flex items-center justify-center">
              <svg class="w-9 h-9" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            </div>
            <h1 class="sh-title">Entrar con Google</h1>
            <p class="sh-subtitle">Usa tu cuenta de Google para entrar a SafeHaven en un toque.</p>
          </header>
          <ol class="text-sm text-[#494551] space-y-1 list-decimal list-inside">
            <li>Pulsa el botón y elige tu cuenta de Google.</li>
            <li>Autoriza nombre y correo para tu perfil.</li>
            <li>Volverás a SafeHaven con la sesión lista.</li>
          </ol>
          <div id="social-status" class="text-sm font-semibold text-[#4f378a]" aria-live="polite"></div>
          <button type="button" data-social="google" class="sh-btn-secondary" style="border-color:#4285F4">
            <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Elegir mi cuenta de Google
          </button>
          <button type="button" data-social-demo="google" class="text-xs font-bold tracking-widest text-[#494551] underline underline-offset-4">PROBAR EN MODO DEMO</button>
          <p class="text-center text-[#494551] text-sm">¿Prefieres otro método? <a class="text-[#4f378a] font-bold hover:underline" href="#/auth-apple">Usar Apple</a> · <a class="text-[#4f378a] font-bold hover:underline" href="#/login">Correo</a></p>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`,

  authApple: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-center justify-center p-6">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-4">
          <a href="#/login" class="flex items-center gap-1 text-[#4f378a] font-semibold text-sm" aria-label="Volver"><span class="material-symbols-outlined">arrow_back</span> Volver</a>
          <header class="text-center flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center" style="background:#1d1b20">
              <svg class="w-9 h-9" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M16.36 12.76c0-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.9-.85-3.13-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.9-.43 7.2 1.2 9.56.8 1.16 1.76 2.46 3.02 2.41 1.21-.05 1.67-.78 3.13-.78s1.87.78 3.15.76c1.3-.02 2.12-1.18 2.91-2.35.92-1.34 1.3-2.64 1.32-2.71-.03-.01-2.54-.98-2.6-3.82zM14.16 5.6c.66-.8 1.1-1.91 1.1-3.02-1.07.04-2.36.71-3.13 1.51-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.4-.61 3.16-1.78z"/></svg>
            </div>
            <h1 class="sh-title">Entrar con Apple</h1>
            <p class="sh-subtitle">Privado y seguro: inicia sesión con tu Apple ID.</p>
          </header>
          <ol class="text-sm text-[#494551] space-y-1 list-decimal list-inside">
            <li>Pulsa el botón y confirma con Face ID, Touch ID o contraseña.</li>
            <li>Puedes ocultar tu correo con “Ocultar mi correo”.</li>
            <li>Volverás a SafeHaven con la sesión lista.</li>
          </ol>
          <div id="social-status" class="text-sm font-semibold text-[#4f378a]" aria-live="polite"></div>
          <button type="button" data-social="apple" class="sh-btn-secondary" style="background:#1d1b20;color:#fff;border-color:#1d1b20">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.76c0-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.9-.85-3.13-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.9-.43 7.2 1.2 9.56.8 1.16 1.76 2.46 3.02 2.41 1.21-.05 1.67-.78 3.13-.78s1.87.78 3.15.76c1.3-.02 2.12-1.18 2.91-2.35.92-1.34 1.3-2.64 1.32-2.71-.03-.01-2.54-.98-2.6-3.82zM14.16 5.6c.66-.8 1.1-1.91 1.1-3.02-1.07.04-2.36.71-3.13 1.51-.69.8-1.29 2.07-1.13 3.29 1.19.09 2.4-.61 3.16-1.78z"/></svg>
            Continuar con Apple
          </button>
          <button type="button" data-social-demo="apple" class="text-xs font-bold tracking-widest text-[#494551] underline underline-offset-4">PROBAR EN MODO DEMO</button>
          <p class="text-center text-[#494551] text-sm">¿Prefieres otro método? <a class="text-[#4f378a] font-bold hover:underline" href="#/auth-google">Usar Google</a> · <a class="text-[#4f378a] font-bold hover:underline" href="#/login">Correo</a></p>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`,

  intereses: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-start justify-center p-6 pb-28">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-5">
          ${brandHeader("Personaliza tu Protección", "Elige tu rol y los temas para recibir alertas a tu medida.")}
          <section>
            <h2 class="sh-label">TU ROL EN LA COMUNIDAD</h2>
            <div class="grid grid-cols-3 gap-2" id="rol-container" role="radiogroup" aria-label="Rol">
              <button type="button" class="sh-pick" data-rol="vecino" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">home</span></span>
                <span class="font-bold text-sm leading-tight">Vecino</span>
                <span class="text-[11px] text-[#494551] leading-tight">Recibe alertas y reporta</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-rol="guardian" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">shield</span></span>
                <span class="font-bold text-sm leading-tight">Guardián</span>
                <span class="text-[11px] text-[#494551] leading-tight">Patrulla y acompaña</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-rol="coordinador" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">groups</span></span>
                <span class="font-bold text-sm leading-tight">Coordinador</span>
                <span class="text-[11px] text-[#494551] leading-tight">Gestiona tu zona</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
            </div>
          </section>
          <section>
            <h2 class="sh-label">TEMAS QUE TE INTERESAN</h2>
            <div class="grid grid-cols-2 gap-2" id="intereses-container">
              <button type="button" class="sh-pick" data-interes="vigilancia" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">groups</span></span>
                <span class="font-bold text-sm leading-tight">Vigilancia Barrial</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-interes="emergencia" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">emergency</span></span>
                <span class="font-bold text-sm leading-tight">Alertas de Emergencia</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-interes="viales" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">construction</span></span>
                <span class="font-bold text-sm leading-tight">Reportes Viales</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-interes="refugio" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">shield</span></span>
                <span class="font-bold text-sm leading-tight">Puntos de Refugio</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-interes="flock" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">directions_walk</span></span>
                <span class="font-bold text-sm leading-tight">Caminatas en Flock</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-interes="escolar" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">school</span></span>
                <span class="font-bold text-sm leading-tight">Seguridad Escolar</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
            </div>
          </section>
          <p id="intereses-error" class="text-[#ba1a1a] text-sm font-semibold" hidden>Elige tu rol y al menos un tema para continuar.</p>
          <button id="intereses-btn" class="sh-btn-primary" type="button">Continuar <span class="material-symbols-outlined">arrow_forward</span></button>
          <div class="text-center"><a class="text-xs font-bold tracking-widest text-[#494551] underline underline-offset-4" href="#/bienvenida">OMITIR POR AHORA</a></div>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`,

  inicio: () => `
  <div class="sh-page" style="background:#B2FFFF">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex justify-between items-center px-6 h-16">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[#4f378a]" style="font-variation-settings:'FILL' 1">shield_with_heart</span>
        <h1 class="font-headline font-bold text-lg text-[#4f378a]">SafeHaven</h1>
      </div>
      <button id="notif-btn" class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2ecf4] active:scale-95" aria-label="Notificaciones">
        <span class="material-symbols-outlined text-[#494551]">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
      </button>
    </header>
    <main class="sh-shell flex-1 w-full px-6 pt-4 pb-40 space-y-4">
      <section class="relative overflow-hidden rounded-3xl bg-white shadow-lg p-6 flex items-center gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-block w-2 h-2 bg-[#4f378a] rounded-full sh-chip-glow"></span>
            <span class="text-xs font-bold tracking-widest text-[#4f378a]">VIGILANCIA ACTIVA</span>
          </div>
          <h2 class="font-headline font-bold text-2xl" id="inicio-saludo">¡Hola, Guardián!</h2>
          <p class="text-[#494551]" id="inicio-sub">¿Listo para caminar seguro hoy?</p>
        </div>
        <div class="w-20 h-20 bg-[#4f378a] flex items-center justify-center hex-frame brutalist-shadow shrink-0">
          <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings:'FILL' 1">shield_person</span>
        </div>
      </section>
      <section>
        <button id="trayecto-btn" class="w-full text-white py-5 px-6 rounded-3xl flex items-center justify-between shadow-xl active:scale-[.98] transition-all" style="background:#2E7D32">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings:'FILL' 1">directions_walk</span>
            </div>
            <div class="text-left">
              <span class="block font-headline font-semibold text-lg leading-tight">Iniciar Trayecto</span>
              <span class="text-white/80 text-sm" id="trayecto-sub">Monitoreo en tiempo real</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-white">arrow_forward_ios</span>
        </button>
      </section>
      <section class="grid grid-cols-2 gap-4">
        <div class="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col gap-3 active:scale-95 transition-transform">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(201,167,77,.25);color:#765b00">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">location_on</span>
          </div>
          <div><h3 class="font-bold">Puntos Ámbar</h3><p class="text-xs text-[#494551]">Zonas seguras cercanas</p></div>
          <div class="mt-auto flex items-center gap-1">
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#ece6ee]"></div>
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#e1d4fd] -ml-3"></div>
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#4f378a] text-[8px] flex items-center justify-center text-white -ml-3">+12</div>
          </div>
        </div>
        <div class="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col gap-3 active:scale-95 transition-transform">
          <div class="w-10 h-10 bg-[#e1d4fd]/50 text-[#63597c] rounded-xl flex items-center justify-center">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">group</span>
          </div>
          <div><h3 class="font-bold">Caminata Grupal</h3><p class="text-xs text-[#494551]">Únete al Flock local</p></div>
          <div class="mt-auto"><span class="inline-flex items-center px-2 py-1 bg-[#e1d4fd] text-[#4b4263] text-[10px] font-bold rounded-md">8 ACTIVOS</span></div>
        </div>
      </section>
      <section class="space-y-3">
        <div class="flex justify-between items-center px-1">
          <h3 class="font-headline font-semibold text-lg">Actividad Cercana</h3>
          <a href="#/mapa" class="text-[#4f378a] text-sm font-bold hover:underline">Ver Mapa</a>
        </div>
        <div class="relative w-full h-48 rounded-3xl overflow-hidden shadow border border-[#cbc4d2]/40 bg-[#ece6ee]">
          <img src="/images/mapa.png" alt="Mapa de actividad cercana" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"></div>
          <div class="absolute top-3 left-3 bg-white/90 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
            <span class="material-symbols-outlined text-[#ba1a1a] text-sm" style="font-variation-settings:'FILL' 1">emergency</span>
            <span class="text-[10px] font-bold tracking-widest">ALERTA: ZONA EN OBRA</span>
          </div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="w-6 h-6 bg-[#4f378a] rounded-full border-2 border-white shadow-lg"></div>
            <div class="absolute top-7 -left-5 bg-[#4f378a] text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">Tú estás aquí</div>
          </div>
        </div>
      </section>
    </main>
    <div id="sos-confirm" hidden class="fixed inset-x-4 bottom-24 z-[70] bg-white rounded-3xl shadow-2xl border-2 border-[#ba1a1a] p-5 space-y-3">
      <h3 class="font-headline font-bold text-lg text-[#ba1a1a] text-center">¿Activar emergencia?</h3>
      <p class="text-sm text-[#494551] text-center">Se avisará a tus contactos y a la red cercana.</p>
      <div class="grid grid-cols-2 gap-3">
        <button id="sos-cancel" class="sh-btn-secondary" type="button">Cancelar</button>
        <button id="sos-send" class="sh-btn-primary" style="background:#ba1a1a;border-color:#ba1a1a" type="button">Enviar alerta</button>
      </div>
      <p id="sos-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Alerta enviada (demo). Tu red ha sido notificada.</p>
    </div>
    <button id="sos-btn" class="fixed bottom-24 right-6 z-[60] w-16 h-16 bg-[#ba1a1a] text-white rounded-2xl flex items-center justify-center shadow-2xl sos-pulse active:scale-90" aria-label="SOS, mantén presionado">
      <span class="material-symbols-outlined text-4xl" style="font-variation-settings:'FILL' 1">sos</span>
    </button>
  </div>`,

  trayecto: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex justify-between items-center px-6 h-16">
      <a href="#/inicio" class="flex items-center gap-1 text-[#4f378a] font-semibold text-sm" aria-label="Volver"><span class="material-symbols-outlined">arrow_back</span> Inicio</a>
      <h1 class="font-headline font-bold text-[#4f378a]">Acompañamiento IA</h1>
      <div class="w-10"></div>
    </header>
    <main class="sh-shell flex-1 w-full relative" style="min-height:calc(100dvh - 64px - 76px)">
      <img src="/images/mapa.png" alt="" aria-hidden="true" class="leaflet-map-bg w-full h-full object-cover" />
      <div id="trayecto-leaflet" class="leaflet-map-bg" role="application" aria-label="Mapa de tu trayecto"></div>
      <div class="absolute inset-0 map-gradient-overlay pointer-events-none" style="z-index:1"></div>
      <div id="ruta-badge" hidden class="absolute top-3 right-4 flex items-center gap-1 text-white text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg" style="z-index:10;background:#2E7D32">
        <span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">verified_user</span> RUTA SEGURA
      </div>
      <div id="trayecto-sheet" class="bottom-sheet" data-state="half">
        <div id="sheet-handle" class="sheet-handle" role="button" tabindex="0" aria-label="Arrastra o toca para subir o bajar el panel"><span></span></div>
        <div id="trayecto-panels" class="sheet-body px-6 pb-8 flex flex-col items-center gap-4">
        <div id="fase-destino" class="w-full bg-white/85 backdrop-blur-md rounded-2xl border border-[#cbc4d2]/40 p-5 shadow-sm flex flex-col gap-3">
          <div id="bloque-destino" class="flex flex-col gap-3">
          <h2 class="font-headline font-bold text-xl">¿A dónde vas?</h2>
          <p class="text-sm text-[#494551]">Escribe tu destino y el guardián te acompañará en la ruta más segura.</p>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7582]">search</span>
              <input id="dest-input" class="sh-input" placeholder="Ej. Parque Forestal, Santiago" type="text" autocomplete="off" />
            </div>
            <button id="dest-search" class="sh-btn-primary !w-auto px-5" type="button" aria-label="Buscar destino"><span class="material-symbols-outlined">arrow_forward</span></button>
          </div>
          <div id="dest-results" class="flex flex-col gap-2"></div>
          <div id="dest-confirm" hidden class="rounded-2xl bg-[#e9ddff] border border-[#4f378a]/30 p-4 space-y-1">
            <p class="font-bold text-[#4f378a]" id="dest-name"></p>
            <p class="text-sm text-[#494551]" id="dest-meta"></p>
            <button id="start-btn" class="sh-btn-primary mt-2" type="button"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">directions_walk</span> Iniciar acompañamiento</button>
          </div>
          <button type="button" data-dest-demo class="text-xs font-bold tracking-widest text-[#494551] underline underline-offset-4">USAR DESTINO DEMO</button>
          </div>
          <div id="bloque-llegada" hidden class="flex flex-col gap-3">
            <div class="rounded-2xl bg-[#e9ddff] border border-[#4f378a]/30 p-4">
              <p class="text-xs font-bold tracking-widest text-[#4f378a]">ACOMPAÑAMIENTO EN CURSO</p>
              <p class="font-bold" id="llegada-name"></p>
              <p class="text-sm text-[#494551]" id="llegada-meta">Midiendo tu ruta…</p>
            </div>
            <button id="lleque-btn" class="sh-btn-primary" type="button"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">task_alt</span> Llegué a Salvo</button>
            <button id="report-btn" class="sh-btn-secondary" type="button"><span class="material-symbols-outlined text-[#ba1a1a]">report_problem</span> Reportar Problema</button>
          </div>
        </div>
        <div id="fase-curso" hidden class="w-full flex flex-col gap-3">
          <div class="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#cbc4d2]/40 px-4 py-3 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#6750a4] flex items-center justify-center pulsing-glow shrink-0">
              <span class="material-symbols-outlined text-white text-xl" style="font-variation-settings:'FILL' 1">shield_person</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-[#4f378a]"><span id="trayecto-dist">—</span> para llegar</p>
              <p class="text-xs text-[#494551]"><span id="trayecto-eta">Calculando…</span> · Zona Segura</p>
            </div>
            <span class="inline-flex items-center gap-1 bg-[#4f378a]/10 text-[#4f378a] px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
              <span class="w-2 h-2 bg-[#4f378a] rounded-full animate-pulse"></span> En Vivo
            </span>
          </div>
          <div class="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#cbc4d2]/40 px-4 py-3 shadow-sm">
            <div class="flex items-baseline justify-between">
              <span class="text-xs font-bold tracking-widest text-[#494551]">PROGRESO REAL</span>
              <span class="font-bold text-[#4f378a]"><span id="trayecto-pct">0</span>%</span>
            </div>
            <div class="w-full bg-[#cbc4d2]/40 h-2.5 rounded-full mt-2 overflow-hidden"><div id="trayecto-bar" class="bg-[#2E7D32] h-full rounded-full transition-all duration-700" style="width:0%"></div></div>
            <p id="gps-hint" class="text-[11px] text-[#494551] mt-2">Midiendo tu avance con el GPS…</p>
            <button type="button" id="demo-advance" class="text-[11px] font-bold tracking-widest text-[#494551] underline underline-offset-4 mt-1">SIMULAR AVANCE (DEMO)</button>
          </div>
          <div id="report-box" hidden class="bg-white rounded-3xl border border-[#cbc4d2]/60 p-5 shadow-xl space-y-4">
            <div class="flex items-center gap-3">
              <img src="/images/reportar-avatar.jpg" alt="Guardián de la comunidad" class="w-14 h-14 rounded-full object-cover border-2 border-[#6750a4] shrink-0" loading="lazy" />
              <div>
                <p class="font-headline font-bold text-lg text-[#4f378a] leading-tight">Reportar un Peligro</p>
                <p class="text-xs text-[#494551]">Ayuda a mantener tu comunidad segura</p>
              </div>
            </div>
            <div id="report-grid" class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de peligro">
              <button type="button" class="sh-pick" data-report="Luminaria fundida" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">lightbulb</span></span>
                <span class="font-bold text-sm leading-tight">Luminaria Fundida</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-report="Zona sospechosa" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">visibility</span></span>
                <span class="font-bold text-sm leading-tight">Zona Sospechosa</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-report="Peligro vial" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">warning</span></span>
                <span class="font-bold text-sm leading-tight">Peligro Vial</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
              <button type="button" class="sh-pick" data-report="Incidente" role="radio" aria-checked="false" aria-pressed="false">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">report_problem</span></span>
                <span class="font-bold text-sm leading-tight">Incidente</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </button>
            </div>
            <div class="rounded-2xl overflow-hidden border border-[#cbc4d2]/50">
              <div class="p-3 flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="material-symbols-outlined text-[#4f378a] shrink-0" style="font-variation-settings:'FILL' 1">location_on</span>
                  <div class="min-w-0">
                    <p class="text-[10px] font-bold text-[#7a7582] uppercase tracking-widest">Ubicación actual</p>
                    <p id="report-loc" class="text-sm font-bold truncate">Tu ubicación GPS</p>
                  </div>
                </div>
                <button id="report-loc-change" type="button" class="px-4 py-2 bg-[#e1d4fd] text-[#4b4263] rounded-full text-xs font-bold shrink-0 active:scale-95">Cambiar</button>
              </div>
              <img src="/images/reportar-mapa.jpg" alt="Mapa de la ubicación del reporte" class="h-24 w-full object-cover" loading="lazy" />
            </div>
            <div class="flex gap-2">
              <button id="report-photo" type="button" class="sh-btn-secondary !py-3 text-sm"><span class="material-symbols-outlined text-[#4f378a]">camera_alt</span> <span data-label>Tomar Foto</span></button>
              <button id="report-voice" type="button" class="sh-btn-secondary !py-3 text-sm"><span class="material-symbols-outlined text-[#4f378a]">mic</span> <span data-label>Nota de Voz</span></button>
            </div>
            <p id="report-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Elige el tipo de peligro para enviar el reporte.</p>
            <button id="report-send" type="button" class="sh-btn-primary">Enviar Reporte <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">+50 Safepoints</span></button>
            <p id="report-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Reporte enviado (demo). Gracias, guardián.</p>
          </div>
          <p id="lleque-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>¡Buen camino! Trayecto cerrado con éxito.</p>
        </div>
        </div>
      </div>
    </main>
  </div>`,

  mapa: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/inicio" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Mapa Seguro</h1>
      <div class="ml-auto flex items-center gap-1 bg-[#e9ddff] text-[#4f378a] px-3 py-1 rounded-full text-xs font-bold">
        <span class="w-2 h-2 bg-[#4f378a] rounded-full animate-pulse"></span> EN VIVO
      </div>
    </header>
    <main class="sh-shell flex-1 w-full relative" style="min-height:calc(100dvh - 64px - 76px)">
      <img src="/images/mapa.png" alt="" aria-hidden="true" class="leaflet-map-bg w-full h-full object-cover" />
      <div id="mapa-leaflet" class="leaflet-map-bg" role="application" aria-label="Mapa de zonas seguras"></div>
      <div id="mapa-top" class="absolute top-3 left-4 right-4 flex gap-2" style="z-index:10">
        <div class="flex-1 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[#ba1a1a] text-sm" style="font-variation-settings:'FILL' 1">emergency</span>
          <span class="text-[10px] font-bold tracking-widest" id="mapa-status">LOCALIZÁNDOTE…</span>
        </div>
        <button id="recenter-btn" class="w-10 h-10 shrink-0 bg-white/90 rounded-full shadow flex items-center justify-center text-[#4f378a] active:scale-95" aria-label="Centrar en mi ubicación">
          <span class="material-symbols-outlined">my_location</span>
        </button>
      </div>
      <div id="mapa-sheet" class="bottom-sheet" data-state="half">
        <div id="mapa-handle" class="sheet-handle" role="button" tabindex="0" aria-label="Arrastra o toca para subir o bajar el panel"><span></span></div>
        <div class="sheet-body px-4 pb-4">
          <div id="mapa-card" class="bg-white/90 backdrop-blur rounded-2xl border border-[#cbc4d2]/50 p-4 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(201,167,77,.25);color:#765b00">
                <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">location_on</span>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-sm" id="mapa-near">Buscando puntos ámbar cercanos…</h3>
                <p class="text-xs text-[#494551]">Zonas seguras verificadas por tu comunidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>`,

  verificar: () => `
  <div class="sh-page sh-auth">
    <main class="sh-shell w-full flex items-center justify-center p-6">
      <div class="w-full sh-card overflow-hidden">
        <div class="p-6 md:p-8 flex flex-col gap-4">
          <a href="#/registro" class="flex items-center gap-1 text-[#4f378a] font-semibold text-sm" aria-label="Volver"><span class="material-symbols-outlined">arrow_back</span> Volver</a>
          ${brandHeader("Verifica tu número", `Hemos enviado un código de 6 dígitos a tu celular. <span id="phone-echo" class="font-semibold text-[#1d1b20]"></span>`)}
          <form id="otp-form" class="flex flex-col gap-4 mt-1">
            <div class="flex justify-between w-full gap-2" id="otp-container">
              ${[1,2,3,4,5,6].map(i => `<input aria-label="Dígito ${i}" ${i===1?"autofocus":""} class="brutalist-input" maxlength="1" inputmode="numeric" pattern="[0-9]*" type="text" />`).join("")}
            </div>
            <div class="flex items-center gap-2 text-sm font-bold text-[#494551]">
              <span class="material-symbols-outlined text-lg text-[#4f378a]">timer</span>
              <span id="timer-wrap">Reenviar código en <span id="timer">00:59</span></span>
            </div>
            <p id="otp-error" class="text-[#ba1a1a] text-sm font-semibold" hidden>Ingresa los 6 dígitos.</p>
          </form>
          <div id="otp-success" hidden class="p-4 rounded-2xl bg-[#e9ddff] border border-[#4f378a]/30 font-semibold text-[#4f378a]">¡Cuenta verificada! Bienvenido a SafeHaven.</div>
          <button id="verify-btn" class="sh-btn-primary brutalist-button" type="button">Verificar <span class="material-symbols-outlined">arrow_forward</span></button>
          <div class="text-center"><button class="text-xs font-bold tracking-widest text-[#494551] underline underline-offset-4" type="button">¿NECESITAS AYUDA?</button></div>
        </div>
        <div class="sh-edge"></div>
      </div>
    </main>
  </div>`
};

export const bottomNav = (active) => `
<nav class="sh-bottomnav sh-bottomnav-5" aria-label="Navegación principal">
  <a href="#/inicio" ${active==="inicio"?'aria-current="page"':""}><span class="material-symbols-outlined">home</span>Inicio</a>
  <a href="#/bienvenida" ${active==="bienvenida"?'aria-current="page"':""}><span class="material-symbols-outlined">waving_hand</span>Bienvenida</a>
  <a href="#/registro" ${active==="registro"?'aria-current="page"':""}><span class="material-symbols-outlined">person_add</span>Registro</a>
  <a href="#/login" ${active==="login"?'aria-current="page"':""}><span class="material-symbols-outlined">login</span>Entrar</a>
  <a href="#/verificar" ${active==="verificar"?'aria-current="page"':""}><span class="material-symbols-outlined">sms</span>Verificar</a>
</nav>`;

export const appNav = (active) => `
<nav class="sh-bottomnav sh-bottomnav-4" aria-label="Navegación principal">
  <a href="#/mapa" ${["inicio","mapa","trayecto"].includes(active)?'aria-current="page"':""}><span class="material-symbols-outlined">map</span>Mapa</a>
  <a href="#/inicio" ${active==="flock"?'aria-current="page"':""}><span class="material-symbols-outlined">group</span>Flock</a>
  <a href="#/intereses" ${active==="intereses"?'aria-current="page"':""}><span class="material-symbols-outlined">tune</span>Temas</a>
  <a href="#/login" ${active==="perfil"?'aria-current="page"':""}><span class="material-symbols-outlined">person</span>Perfil</a>
</nav>`;
