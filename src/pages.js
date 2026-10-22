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
            <div class="flex items-center gap-2">
              <label class="sh-label" for="phone">TELÉFONO CELULAR</label>
              <div class="relative w-full"><span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]">smartphone</span>
              <input class="sh-input flex-1" id="phone" name="phone" placeholder="+56 9 XXXXXXXX" required type="tel" inputmode="tel" /></div>
              <select class="sh-input sh-select w-24" id="country-code" name="countryCode">
                <option value="CL" selected>CL</option>
                <option value="US">US</option>
                <option value="MX">MX</option>
                <option value="AR">AR</option>
                <option value="CO">CO</option>
                <option value="PE">PE</option>
                <option value="GLOBAL">Global</option>
              </select>
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
        <a id="puntos-ambar-card" href="#/puntos-ambar" data-goto-puntos-ambar class="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col gap-3 active:scale-95 transition-transform no-underline text-[#1d1b20] cursor-pointer" aria-label="Ver Puntos Ámbar cercanos">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(201,167,77,.25);color:#765b00">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">location_on</span>
          </div>
          <div><h3 class="font-bold">Puntos Ámbar</h3><p class="text-xs text-[#494551]">Zonas seguras cercanas</p></div>
          <div class="mt-auto flex items-center gap-1">
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#ece6ee]"></div>
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#e1d4fd] -ml-3"></div>
            <div class="w-6 h-6 rounded-full border-2 border-white bg-[#4f378a] text-[8px] flex items-center justify-center text-white -ml-3">+12</div>
          </div>
        </a>
        <a href="#/flock" class="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm flex flex-col gap-3 active:scale-95 transition-transform no-underline text-[#1d1b20]">
          <div class="w-10 h-10 bg-[#e1d4fd]/50 text-[#63597c] rounded-xl flex items-center justify-center">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">group</span>
          </div>
          <div><h3 class="font-bold">Caminata Grupal</h3><p class="text-xs text-[#494551]">Únete al Flock local</p></div>
          <div class="mt-auto"><span class="inline-flex items-center px-2 py-1 bg-[#e1d4fd] text-[#4b4263] text-[10px] font-bold rounded-md">8 ACTIVOS</span></div>
        </a>
      </section>
      <section class="space-y-3">
        <div class="flex justify-between items-center px-1">
          <h3 class="font-headline font-semibold text-lg">Actividad Cercana</h3>
          <a href="#/mapa" class="text-[#4f378a] text-sm font-bold hover:underline">Ver Mapa</a>
        </div>
        <div class="relative w-full h-48 rounded-3xl overflow-hidden shadow border border-[#cbc4d2]/40 bg-[#ece6ee]">
          <div id="inicio-mini" class="absolute inset-0" role="application" aria-label="Mapa de actividad cercana en Santiago, Chile"></div>
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
            <a href="#/reportar" class="sh-btn-secondary"><span class="material-symbols-outlined text-[#ba1a1a]">report_problem</span> Reportar Problema</a>
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
          <p id="lleque-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>¡Buen camino! Trayecto cerrado con éxito.</p>
        </div>
        </div>
      </div>
    </main>
  </div>`,

  reportar: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/trayecto" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver al camino"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Reportar Incidencia</h1>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="bg-white rounded-3xl p-5 shadow-sm flex items-center gap-4 border border-[#cbc4d2]/40">
        <img src="/images/reportar-avatar.jpg" alt="Guardián de la comunidad" class="w-16 h-16 rounded-full object-cover border-2 border-[#6750a4] shrink-0" loading="lazy" />
        <div>
          <h2 class="font-headline font-bold text-xl text-[#4f378a] leading-tight">Reportar un Peligro</h2>
          <p class="text-sm text-[#494551]">Ayuda a mantener tu comunidad segura</p>
        </div>
      </div>
      <div id="report-grid" class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de peligro">
              <a href="#/reportar-luminaria" class="sh-pick no-underline text-[#1d1b20]" data-report-link="Luminaria fundida" aria-label="Reportar luminaria fundida">
                <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">lightbulb</span></span>
                <span class="font-bold text-sm leading-tight">Luminaria Fundida</span>
                <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
              </a>
        <a href="#/reportar-zona-sospechosa" class="sh-pick no-underline text-[#1d1b20]" data-report-link="Zona sospechosa" aria-label="Reportar zona sospechosa">
          <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">visibility</span></span>
          <span class="font-bold text-sm leading-tight">Zona Sospechosa</span>
          <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
        </a>
        <a href="#/reportar-peligro-vial" class="sh-pick no-underline text-[#1d1b20]" data-report-link="Peligro vial" aria-label="Reportar peligro vial">
          <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">warning</span></span>
          <span class="font-bold text-sm leading-tight">Peligro Vial</span>
          <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
        </a>
        <a href="#/reportar-incidente" class="sh-pick no-underline text-[#1d1b20]" data-report-link="Incidente" aria-label="Reportar incidente activo">
          <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">report_problem</span></span>
          <span class="font-bold text-sm leading-tight">Incidente</span>
          <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
        </a>
      </div>
      <div class="bg-white rounded-3xl overflow-hidden border border-[#cbc4d2]/40 shadow-sm">
        <div class="p-4 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-[#4f378a] shrink-0" style="font-variation-settings:'FILL' 1">location_on</span>
            <div class="min-w-0">
              <p class="text-[10px] font-bold text-[#7a7582] uppercase tracking-widest">Ubicación actual</p>
              <p id="report-loc" class="text-sm font-bold truncate">Tu ubicación GPS</p>
            </div>
          </div>
                <a href="#/mapa" class="px-4 py-2 bg-[#e1d4fd] text-[#4b4263] rounded-full text-xs font-bold shrink-0 active:scale-95 no-underline">Cambiar</a>
        </div>
        <div class="relative h-32 rounded-2xl overflow-hidden border border-[#cbc4d2]/40 bg-[#ece6ee]">
          <div id="report-mini" class="absolute inset-0" role="application" aria-label="Mini mapa de Santiago, Chile"></div>
        </div>
      </div>
      <div class="flex gap-2">
        <button id="report-photo" type="button" class="sh-btn-secondary !py-3 text-sm"><span class="material-symbols-outlined text-[#4f378a]">camera_alt</span> <span data-label>Tomar Foto</span></button>
        <button id="report-voice" type="button" class="sh-btn-secondary !py-3 text-sm"><span class="material-symbols-outlined text-[#4f378a]">mic</span> <span data-label>Nota de Voz</span></button>
      </div>
      <p id="report-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Elige el tipo de peligro para enviar el reporte.</p>
      <button id="report-send" type="button" class="sh-btn-primary">Enviar Reporte <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">+50 Safepoints</span></button>
      <p id="report-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Reporte enviado (demo). Gracias, guardián.</p>
      <a id="report-back" href="#/trayecto" class="sh-btn-secondary" hidden>Volver al camino</a>
    </main>
  </div>`,

  reportarLuminaria: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/reportar" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a reportar"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Luminaria Fundida</h1>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="flex flex-col items-center text-center gap-2">
        <div class="w-20 h-20 bg-[#6750a4] rounded-full flex items-center justify-center shadow-lg">
          <span class="material-symbols-outlined text-4xl text-[#e0d2ff]" style="font-variation-settings:'FILL' 1">lightbulb</span>
        </div>
        <h2 class="font-headline font-bold text-2xl text-[#4f378a]">Reportar Luminaria Fundida</h2>
        <p class="text-sm text-[#494551]">Ayuda a mantener nuestra comunidad iluminada y segura.</p>
      </div>
      <div class="bg-white/85 rounded-3xl p-5 shadow-sm border border-[#cbc4d2]/40 space-y-4 relative overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#765b00]"></div>
        <div>
          <p class="sh-label">Ubicación del problema</p>
          <button id="lum-loc" type="button" class="sh-btn-secondary !py-3 text-sm"><span class="material-symbols-outlined text-[#4f378a]" style="font-variation-settings:'FILL' 1">my_location</span> Usar ubicación actual</button>
          <div class="mt-2 relative h-32 rounded-2xl overflow-hidden border border-[#cbc4d2]/40">
            <img src="/images/luminaria-mapa.jpg" alt="Mapa de la ubicación de la luminaria" class="w-full h-full object-cover" loading="lazy" />
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-3 pt-6">
              <span id="lum-addr" class="text-sm font-bold">Tu ubicación GPS</span>
            </div>
          </div>
        </div>
        <div>
          <p class="sh-label">Evidencia fotográfica</p>
          <button id="lum-photo" type="button" class="w-full border-2 border-dashed border-[#cbc4d2] rounded-2xl p-5 flex flex-col items-center gap-2 bg-white active:scale-[0.99]">
            <span class="w-14 h-14 rounded-full bg-[#f2ecf4] flex items-center justify-center">
              <span class="material-symbols-outlined text-3xl text-[#494551]">photo_camera</span>
            </span>
            <span data-label class="font-bold text-[#4f378a]">Subir foto de la falla</span>
            <span class="text-xs text-[#494551] text-center">Toma una foto clara del poste o luminaria afectada</span>
          </button>
        </div>
        <div>
          <label class="sh-label" for="lum-detalle">Detalles adicionales (opcional)</label>
          <textarea id="lum-detalle" rows="3" class="sh-input" placeholder="Ej: Poste número 45, frente al parque..."></textarea>
        </div>
      </div>
      <button id="lum-send" type="button" class="sh-btn-primary sh-btn-sparkles" style="background:#765b00;border-color:#765b00"><span class="sparkle-shine" aria-hidden="true"></span><span class="sparkle s1" aria-hidden="true">✦</span><span class="sparkle s2" aria-hidden="true">✦</span><span class="sparkle s3" aria-hidden="true">✦</span><span class="sparkle s4" aria-hidden="true">✦</span><span class="sparkle s5" aria-hidden="true">✦</span><span class="sparkle s6" aria-hidden="true">✦</span><span>Enviar Reporte y Ganar Safepoints</span> <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">stars</span></button>
      <p id="lum-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Reporte de luminaria enviado (demo). +50 Safepoints. ¡Gracias, guardián!</p>
      <a id="lum-back" href="#/reportar" class="sh-btn-secondary" hidden>Volver</a>
    </main>
  </div>`,

  reportarZonaSospechosa: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/reportar" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a reportar"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Zona Sospechosa</h1>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#6750a4] text-[#e0d2ff] flex items-center justify-center shadow-sm shrink-0">
          <span class="material-symbols-outlined text-[28px]" style="font-variation-settings:'FILL' 1">radar</span>
        </div>
        <h2 class="font-headline font-bold text-2xl text-[#1d1b20] leading-tight">Reportar Zona Sospechosa</h2>
      </div>
      <div class="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm border border-[#cbc4d2]/40">
        <img src="/images/reportar-mapa.jpg" alt="Mapa de la zona sospechosa" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute bottom-3 left-3 right-3 bg-white/85 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 shadow-lg border border-white/60">
          <span class="material-symbols-outlined text-[#4f378a]" style="font-variation-settings:'FILL' 1">location_on</span>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-bold text-[#494551] uppercase tracking-widest">Ubicación actual</p>
            <p id="zona-addr" class="text-sm font-bold truncate">Av. Central y Calle 4, Sector Norte</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="font-headline font-bold text-lg text-[#1d1b20]">¿Qué observas?</h3>
        <div id="zona-grid" class="flex flex-wrap gap-2" role="radiogroup" aria-label="Qué observas">
          <button type="button" class="sh-pick !flex-row !py-3 px-5 !rounded-full" data-zona="Vehículo sospechoso" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-xl">directions_car</span>
            <span class="font-bold text-sm">Vehículo sospechoso</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick !flex-row !py-3 px-5 !rounded-full" data-zona="Grupo intimidante" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-xl">groups</span>
            <span class="font-bold text-sm">Grupo intimidante</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick !flex-row !py-3 px-5 !rounded-full" data-zona="Otro riesgo" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-xl">warning</span>
            <span class="font-bold text-sm">Otro riesgo</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
        </div>
        <div id="zona-otro" class="mt-2 hidden">
          <input type="text" id="zona-otro-input" class="sh-input w-full rounded-xl px-3 py-2 bg-surface text-on-surface border border-outline-variant/30 focus:border-primary transition-colors" placeholder="Escribe el riesgo específico">
          <p id="zona-otro-error" class="text-xs font-bold text-[#ba1a1a] mt-1 hidden">Escribe un riesgo específico</p>
        </div>
        <p id="zona-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Elige qué observas para enviar la alerta.</p>
      </div>
      <button id="zona-voice" type="button" class="w-full flex flex-col items-center justify-center gap-2 bg-[#e1d4fd]/60 rounded-2xl p-6 border-2 border-dashed border-[#cbc4d2] active:scale-[0.99]">
        <span class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
          <span class="material-symbols-outlined text-[32px] text-[#4f378a]" style="font-variation-settings:'FILL' 1">mic</span>
        </span>
        <span data-label class="font-headline font-bold text-lg text-[#1d1b20]">Grabar Nota de Voz</span>
        <span class="text-sm text-[#494551]">Describe detalles adicionales rápidamente</span>
      </button>
      <button id="zona-send" type="button" class="sh-btn-primary sh-btn-sparkles" style="background:#ba1a1a;border-color:#ba1a1a"><span class="sparkle-shine" aria-hidden="true"></span><span class="sparkle s1" aria-hidden="true">✦</span><span class="sparkle s2" aria-hidden="true">✦</span><span class="sparkle s3" aria-hidden="true">✦</span><span class="sparkle s4" aria-hidden="true">✦</span><span class="sparkle s5" aria-hidden="true">✦</span><span class="sparkle s6" aria-hidden="true">✦</span><span>Enviar Alerta Preventiva 🛡️</span></button>
      <p id="zona-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Alerta preventiva enviada (demo). +50 Safepoints. ¡Gracias, guardián!</p>
      <a id="zona-back" href="#/reportar" class="sh-btn-secondary" hidden>Volver</a>
    </main>
  </div>`,

  reportarPeligroVial: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/reportar" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a reportar"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Peligro Vial</h1>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm shrink-0" style="background:#c9a74d;color:#241a00">
          <span class="material-symbols-outlined text-[32px]" style="font-variation-settings:'FILL' 1">construction</span>
        </div>
        <div>
          <h2 class="font-headline font-bold text-2xl leading-tight">Reportar Peligro Vial</h2>
          <p class="text-sm text-[#494551]">Ayuda a mantener las calles seguras.</p>
        </div>
      </div>
      <div>
        <div class="flex justify-between items-end mb-2">
          <h3 class="font-headline font-bold text-lg">Ubicación Actual</h3>
          <button id="vial-edit" type="button" class="text-[#4f378a] text-xs font-bold tracking-widest hover:underline">EDITAR</button>
        </div>
        <button type="button" id="vial-loc" class="sh-btn-secondary !py-3 text-sm mb-2"><span class="material-symbols-outlined text-[#4f378a]" style="font-variation-settings:'FILL' 1">my_location</span> Usar ubicación actual</button>
        <div class="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm border border-[#cbc4d2]/40 bg-[#f2ecf4]">
          <img src="/images/reportar-mapa.jpg" alt="Mapa de la ubicación del peligro vial" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="material-symbols-outlined text-[#ba1a1a] text-[40px]" style="font-variation-settings:'FILL' 1;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))">location_on</span>
          </div>
          <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white/90 to-transparent">
            <span id="vial-addr" class="text-sm font-bold bg-white/85 px-3 py-1 rounded-lg border border-[#cbc4d2]/40">Av. Principal 1234</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-headline font-bold text-lg">Tipo de Incidente</h3>
        <p class="text-sm text-[#494551] mb-2">Selecciona la descripción que mejor se adapte.</p>
        <div id="vial-grid" class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de incidente vial">
          <button type="button" class="sh-pick" data-vial="Bache Profundo" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">gite</span>
            <span class="font-bold text-sm leading-tight">Bache Profundo</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-vial="Acera Rota" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">broken_image</span>
            <span class="font-bold text-sm leading-tight">Acera Rota</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-vial="Semáforo Apagado" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">traffic</span>
            <span class="font-bold text-sm leading-tight">Semáforo Apagado</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-vial="Otro Peligro" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">more_horiz</span>
            <span class="font-bold text-sm leading-tight">Otro Peligro</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
        </div>
        <p id="vial-error" class="text-xs font-bold text-[#ba1a1a] mt-1" hidden>Elige el tipo de incidente para notificar.</p>
        <div id="vial-otro" hidden style="display:none" class="mt-2 bg-white rounded-2xl border border-[#4f378a]/30 p-4 flex flex-col gap-3">
          <p class="text-xs font-bold tracking-widest text-[#4f378a]">DESCRIBE EL OTRO PELIGRO</p>
          <label class="sh-label" for="vial-otro-input">ESCRIBE EL PROBLEMA</label>
          <input id="vial-otro-input" class="sh-input !pl-4" placeholder="Ej: Alcantarilla sin tapa..." type="text" maxlength="80" autocomplete="off" />
          <p class="text-xs font-bold tracking-widest text-[#494551]">O SELECCIONA UNO</p>
          <div id="vial-otro-chips" class="flex flex-wrap gap-2">
            <button type="button" data-vial-otro="Alcantarilla abierta" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Alcantarilla abierta</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-vial-otro="Señal caída" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Señal caída</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-vial-otro="Obra sin señalizar" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Obra sin señalizar</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-vial-otro="Aceite en la vía" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Aceite en la vía</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-vial-otro="Cable caído" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Cable caído</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
          </div>
          <p id="vial-otro-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Escribe el problema o selecciona uno de la lista.</p>
        </div>
      </div>
      <div>
        <p class="sh-label">EVIDENCIA FOTOGRÁFICA</p>
        <button id="vial-photo" type="button" class="w-full border-2 border-dashed border-[#cbc4d2] rounded-2xl p-5 flex flex-col items-center gap-2 bg-white active:scale-[0.99]">
          <span class="w-14 h-14 rounded-full bg-[#f2ecf4] flex items-center justify-center">
            <span class="material-symbols-outlined text-3xl text-[#494551]">photo_camera</span>
          </span>
          <span data-label class="font-bold text-[#4f378a]">Subir foto del peligro</span>
          <span class="text-xs text-[#494551] text-center">Toma una foto clara del bache, acera o semáforo</span>
        </button>
      </div>
      <div>
        <h3 class="font-headline font-bold text-lg mb-2">Detalles Adicionales (Opcional)</h3>
        <textarea id="vial-detalle" rows="3" class="sh-input !pl-4" placeholder="Ej: Carril derecho bloqueado..."></textarea>
      </div>
      <button id="vial-send" type="button" class="sh-btn-primary sh-btn-sparkles"><span class="sparkle-shine" aria-hidden="true"></span><span class="sparkle s1" aria-hidden="true">✦</span><span class="sparkle s2" aria-hidden="true">✦</span><span class="sparkle s3" aria-hidden="true">✦</span><span class="sparkle s4" aria-hidden="true">✦</span><span class="sparkle s5" aria-hidden="true">✦</span><span class="sparkle s6" aria-hidden="true">✦</span><span>Notificar a la Comunidad 🚘</span></button>
      <p id="vial-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Peligro vial notificado (demo). +50 Safepoints. ¡Gracias, guardián!</p>
      <a id="vial-back" href="#/reportar" class="sh-btn-secondary" hidden>Volver</a>
      <p class="text-[11px] text-[#494551] text-center">Basado en Stitch “Reportar Peligro Vial” (ID 227ffc515f0e49a5a7b34eab94b65a7b). Original en <span class="font-mono">stitch-screens/20-reportar-peligro-vial.html</span>.</p>
    </main>
  </div>`,

  reportarIncidente: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/reportar" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a reportar"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a]">Incidente</h1>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm shrink-0" style="background:#ba1a1a;color:#fff">
          <span class="material-symbols-outlined text-[32px]" style="font-variation-settings:'FILL' 1">emergency</span>
        </div>
        <div>
          <h2 class="font-headline font-bold text-2xl leading-tight">Reportar Incidente</h2>
          <p class="text-sm text-[#494551]">Ayuda a mantener tu comunidad segura.</p>
        </div>
      </div>
      <div class="rounded-2xl p-4 flex gap-3 bg-[#ffdad6] border border-[#ba1a1a]/30">
        <span class="material-symbols-outlined text-[#ba1a1a]" style="font-variation-settings:'FILL' 1">warning</span>
        <p class="text-xs text-[#494551] font-semibold">Este botón enviará una alerta inmediata a la central y a tus contactos. Úsalo solo en riesgo real.</p>
      </div>
      <div>
        <div class="flex justify-between items-end mb-2">
          <h3 class="font-headline font-bold text-lg">Ubicación Actual</h3>
          <button id="inc-edit" type="button" class="text-[#4f378a] text-xs font-bold tracking-widest hover:underline">EDITAR</button>
        </div>
        <button type="button" id="inc-loc" class="sh-btn-secondary !py-3 text-sm mb-2"><span class="material-symbols-outlined text-[#ba1a1a]" style="font-variation-settings:'FILL' 1">my_location</span> Usar ubicación actual</button>
        <div class="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm border border-[#cbc4d2]/40 bg-[#f2ecf4]">
          <img src="/images/reportar-mapa.jpg" alt="Mapa de la ubicación del incidente" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="material-symbols-outlined text-[#ba1a1a] text-[40px]" style="font-variation-settings:'FILL' 1">location_on</span>
          </div>
          <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white/90 to-transparent flex flex-col gap-1">
            <span id="inc-addr" class="text-sm font-bold bg-white/85 px-3 py-1 rounded-lg border border-[#cbc4d2]/40">Detectando ubicación precisa...</span>
            <span id="inc-coords" class="text-xs text-[#494551] bg-white/85 px-3 py-1 rounded-lg border border-[#cbc4d2]/40">Ubicación aprox. (Santiago)</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-headline font-bold text-lg">Tipo de Emergencia</h3>
        <p class="text-sm text-[#494551] mb-2">Selecciona la descripción que mejor se adapte.</p>
        <div id="inc-grid" class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de emergencia">
          <button type="button" class="sh-pick" data-inc="Robo / Asalto" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">emergency_home</span>
            <span class="font-bold text-sm leading-tight">Robo / Asalto</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-inc="Agresión Física" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">personal_injury</span>
            <span class="font-bold text-sm leading-tight">Agresión Física</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-inc="Emergencia Médica" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">medical_services</span>
            <span class="font-bold text-sm leading-tight">Emergencia Médica</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
          <button type="button" class="sh-pick" data-inc="Otro Incidente" role="radio" aria-checked="false" aria-pressed="false">
            <span class="material-symbols-outlined text-2xl">more_horiz</span>
            <span class="font-bold text-sm leading-tight">Otro Incidente</span>
            <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
          </button>
        </div>
        <p id="inc-error" class="text-xs font-bold text-[#ba1a1a] mt-1" hidden>Elige el tipo de emergencia para alertar.</p>
        <div id="inc-otro" hidden style="display:none" class="mt-2 bg-white rounded-2xl border border-[#ba1a1a]/30 p-4 flex flex-col gap-3">
          <p class="text-xs font-bold tracking-widest text-[#ba1a1a]">DESCRIBE EL OTRO INCIDENTE</p>
          <label class="sh-label" for="inc-otro-input">ESCRIBE EL PROBLEMA</label>
          <input id="inc-otro-input" class="sh-input !pl-4" placeholder="Ej: Persona merodeando..." type="text" maxlength="80" autocomplete="off" />
          <p class="text-xs font-bold tracking-widest text-[#494551]">O SELECCIONA UNO</p>
          <div id="inc-otro-chips" class="flex flex-wrap gap-2">
            <button type="button" data-inc-otro="Acoso / Persecución" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Acoso / Persecución</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-inc-otro="Persona armada" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Persona armada</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-inc-otro="Vandalismo" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Vandalismo</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-inc-otro="Vehículo huyendo" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Vehículo huyendo</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
            <button type="button" data-inc-otro="Ruido extraño" class="sh-pick !flex-row !py-2.5 px-4 !rounded-full"><span class="font-bold text-xs">Ruido extraño</span><span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span></button>
          </div>
          <p id="inc-otro-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Escribe el problema o selecciona uno de la lista.</p>
        </div>
      </div>
      <div>
        <p class="sh-label">EVIDENCIA</p>
        <button id="inc-photo" type="button" class="w-full border-2 border-dashed border-[#cbc4d2] rounded-2xl p-5 flex flex-col items-center gap-2 bg-white active:scale-[0.99]">
          <span class="w-14 h-14 rounded-full bg-[#f2ecf4] flex items-center justify-center">
            <span class="material-symbols-outlined text-3xl text-[#494551]">photo_camera</span>
          </span>
          <span data-label class="font-bold text-[#4f378a]">Subir foto o evidencia</span>
          <span class="text-xs text-[#494551] text-center">Foto clara o video corto del incidente</span>
        </button>
      </div>
      <div>
        <h3 class="font-headline font-bold text-lg mb-2">Detalles Adicionales (Opcional)</h3>
        <textarea id="inc-detalle" rows="3" class="sh-input !pl-4" placeholder="Ej: Descripción de personas, dirección de escape..."></textarea>
      </div>
      <button id="inc-sos" type="button" class="sh-btn-primary" style="background:#ba1a1a;border-color:#ba1a1a">Alertar a Central 🚨</button>
      <p id="inc-done" class="text-sm font-bold text-[#2e7d32] text-center" hidden>Alerta enviada a la central (demo). Tus contactos fueron notificados.</p>
      <a id="inc-back" href="#/reportar" class="sh-btn-secondary" hidden>Volver</a>
      <p class="text-[11px] text-[#494551] text-center">Basado en Stitch “Reportar Incidente Activo” (ID 0055dcf239c64750bd55bab43b0e8730). Original en <span class="font-mono">stitch-screens/21-reportar-incidente-activo.html</span>.</p>
    </main>
  </div>`,

  flock: () => `
  <div class="sh-page" style="background:#B2FFFF">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex justify-between items-center px-6 h-16">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[#4f378a]" style="font-variation-settings:'FILL' 1">shield_with_heart</span>
        <h1 class="font-headline font-bold text-lg text-[#4f378a]">SafeHaven</h1>
      </div>
      <div class="flex items-center gap-3">
        <a href="#/inicio" class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2ecf4] active:scale-95" aria-label="Notificaciones">
          <span class="material-symbols-outlined text-[#494551]">notifications</span>
        </a>
        <img src="/images/flock-perfil.png" alt="Tu perfil" class="w-8 h-8 object-cover hex-frame border border-[#4f378a]/30" loading="lazy" />
      </div>
    </header>
    <main class="sh-shell flex-1 w-full px-6 pt-4 pb-40 space-y-4">
      <section class="bg-white rounded-3xl p-5 shadow-sm border border-[#cbc4d2]/40 flex items-center gap-4">
        <img src="/images/flock-mascota.png" alt="Mascota Escudo SafeHaven" class="w-24 h-24 object-contain shrink-0" loading="lazy" />
        <div class="flex-1">
          <h2 class="font-headline font-bold text-2xl text-[#4f378a] leading-tight">Círculos de Confianza</h2>
          <p class="text-sm text-[#494551]">Protege lo que más importa</p>
        </div>
      </section>
      <section class="space-y-3">
        <div class="flex justify-between items-end px-1">
          <h3 class="text-xs font-bold tracking-widest text-[#494551]">GRUPOS ACTIVOS (2)</h3>
          <a href="#/mapa" class="text-[#4f378a] text-sm font-bold hover:underline">Ver Mapa</a>
        </div>
        <div class="bg-white rounded-3xl p-5 shadow-sm border border-[#cbc4d2]/40 active:scale-[0.99] transition-transform">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-headline font-bold text-lg leading-tight">Familia y Hogar</h4>
              <p class="text-xs text-[#494551]">Última actividad: hace 2 min</p>
            </div>
            <button type="button" data-flock-menu="Familia y Hogar" class="p-1 text-[#494551]" aria-label="Opciones de Familia y Hogar"><span class="material-symbols-outlined">more_vert</span></button>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <img src="/images/flock-mama.png" alt="Mamá" class="w-10 h-10 object-cover hex-frame bg-[#ece6ee] shrink-0" loading="lazy" />
              <p class="text-sm font-semibold">Mamá: En casa <span aria-hidden="true">🟢</span></p>
            </li>
            <li class="flex items-center gap-3">
              <img src="/images/flock-hermano.png" alt="Hermano" class="w-10 h-10 object-cover hex-frame bg-[#ece6ee] shrink-0" loading="lazy" />
              <p class="text-sm font-semibold">Hermano: Caminando a casa <span aria-hidden="true">🚶‍♀️</span></p>
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-3xl p-5 shadow-sm border border-[#cbc4d2]/40 active:scale-[0.99] transition-transform">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-headline font-bold text-lg leading-tight">The Night Walkers</h4>
              <p class="text-xs text-[#494551]">Patrulla de barrio activa</p>
            </div>
            <button type="button" data-flock-menu="The Night Walkers" class="p-1 text-[#494551]" aria-label="Opciones de The Night Walkers"><span class="material-symbols-outlined">more_vert</span></button>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <img src="/images/flock-sarah.png" alt="Sarah" class="w-10 h-10 object-cover hex-frame bg-[#ece6ee] shrink-0" loading="lazy" />
              <p class="text-sm font-semibold">Sarah: En Zona Segura <span aria-hidden="true">🛡️</span></p>
            </li>
          </ul>
        </div>
        <p id="flock-msg" class="text-sm font-bold text-[#4f378a] text-center" hidden></p>
      </section>
      <section class="grid grid-cols-2 gap-3">
        <a href="#/flock-crear" class="bg-[#4f378a] text-white font-bold py-4 px-2 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform no-underline">
          <span class="material-symbols-outlined text-3xl">add_circle</span>
          <span class="text-xs tracking-wide">Crear Nuevo Grupo</span>
        </a>
        <a href="#/flock-unirse" class="bg-[#63597c] text-white font-bold py-4 px-2 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform no-underline">
          <span class="material-symbols-outlined text-3xl">key</span>
          <span class="text-xs tracking-wide">Unirse con Código</span>
        </a>
      </section>
      <section>
        <button id="flock-share" type="button" class="w-full text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md active:scale-[0.98] transition-all" style="background:#25D366">
          <svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.63 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span>Compartir Ubicación en Vivo por WhatsApp</span>
        </button>
      </section>
    </main>
    <button id="flock-sos" class="fixed bottom-24 right-6 z-[60] w-16 h-16 bg-[#00D1FF] text-white rounded-full flex items-center justify-center shadow-xl active:scale-90" aria-label="SOS">
      <span class="material-symbols-outlined text-4xl" style="font-variation-settings:'FILL' 1">emergency_home</span>
    </button>
  </div>`,

  flockCrear: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center justify-between px-4 h-16">
      <a href="#/flock" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2ecf4] text-[#494551] active:scale-95" aria-label="Cerrar y volver a Flock">
        <span class="material-symbols-outlined">close</span>
      </a>
      <span class="text-xs font-bold tracking-widest text-[#494551]">CREAR CÍRCULO - PASO 1/3</span>
      <div class="w-10"></div>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div>
        <h2 class="font-headline font-bold text-[28px] leading-[34px]">Nombra tu Círculo</h2>
        <p class="text-sm text-[#494551] mt-1">Un círculo es tu grupo seguro. Nómbralo para identificarlo fácilmente.</p>
      </div>
      <div class="bg-white/70 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/60 space-y-5">
        <div>
          <label class="sh-label" for="grupo-nombre">NOMBRE DEL GRUPO</label>
          <input id="grupo-nombre" class="sh-input !pl-4" placeholder="Ej. Familia, Vecinos de Calle 4..." type="text" maxlength="40" autocomplete="off" />
        </div>
        <div>
          <h3 class="sh-label">ELEGIR UN AVATAR PARA EL GRUPO</h3>
          <div class="grid grid-cols-3 gap-2" id="grupo-avatar" role="radiogroup" aria-label="Avatar del grupo">
            <button type="button" class="sh-pick" data-avatar="Familia" role="radio" aria-checked="true" aria-pressed="true">
              <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">family_home</span></span>
              <span class="font-bold text-sm leading-tight">Familia</span>
              <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
            </button>
            <button type="button" class="sh-pick" data-avatar="Amigos" role="radio" aria-checked="false" aria-pressed="false">
              <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">group</span></span>
              <span class="font-bold text-sm leading-tight">Amigos</span>
              <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
            </button>
            <button type="button" class="sh-pick" data-avatar="Vecinos" role="radio" aria-checked="false" aria-pressed="false">
              <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">home_work</span></span>
              <span class="font-bold text-sm leading-tight">Vecinos</span>
              <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
            </button>
            <button type="button" class="sh-pick" data-avatar="Trabajo" role="radio" aria-checked="false" aria-pressed="false">
              <span class="hexagon"><span class="material-symbols-outlined text-2xl" style="font-variation-settings:'FILL' 1">work</span></span>
              <span class="font-bold text-sm leading-tight">Trabajo</span>
              <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
            </button>
            <button type="button" class="sh-pick !flex-row col-span-2 !py-4" data-avatar="custom" id="grupo-foto" role="radio" aria-checked="false" aria-pressed="false">
              <span class="material-symbols-outlined text-2xl">add_photo_alternate</span>
              <span class="font-bold text-sm" data-label>Subir Imagen</span>
              <span class="sh-check"><span class="material-symbols-outlined text-sm font-bold">check</span></span>
            </button>
          </div>
        </div>
      </div>
      <p id="grupo-error" class="text-xs font-bold text-[#ba1a1a]" hidden>Ponle un nombre a tu círculo para continuar.</p>
      <p id="grupo-ok" class="text-sm font-bold text-[#2e7d32] text-center" hidden></p>
      <div class="mt-auto pt-2">
        <button id="grupo-continuar" type="button" class="sh-btn-primary">Continuar <span class="material-symbols-outlined">arrow_forward</span></button>
      </div>
    </main>
  </div>`,

flockUnirse: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center justify-between px-4 h-16">
      <a href="#/flock" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2ecf4] text-[#494551] active:scale-95" aria-label="Volver a Flock">
        <span class="material-symbols-outlined">arrow_back</span>
      </a>
      <span class="text-xs font-bold tracking-widest text-[#494551]">SafeHaven</span>
      <div class="w-10"></div>
    </header>
    <main class="sh-shell flex-1 w-full px-6 py-5 pb-10 flex flex-col gap-4">
      <div class="text-center">
        <h2 class="font-headline font-bold text-[28px] leading-[34px]">Unirse con Código</h2>
        <p class="text-sm text-[#494551] mt-1">Introduce el código de 6 dígitos de tu comunidad.</p>
      </div>
      <div class="w-full h-48 rounded-3xl overflow-hidden shadow-sm relative border border-[#cbc4d2]/40 bg-[#f2ecf4]">
        <img src="/images/flock-unirse.png" alt="Mano sosteniendo un teléfono con código de seguridad" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#f2ecf4] to-transparent pointer-events-none"></div>
      </div>
      <div class="flex justify-between gap-2" id="join-code">
        ${[1,2,3,4,5,6].map(i => `<input aria-label="Dígito ${i}" ${i===1?"autofocus":""} class="brutalist-input !w-12 !h-14 uppercase" maxlength="1" inputmode="text" autocomplete="off" type="text" />`).join("")}
      </div>
      <button id="join-paste" type="button" class="flex items-center justify-center gap-2 text-[#4f378a] text-xs font-bold tracking-widest py-2 hover:opacity-80 active:scale-95">
        <span class="material-symbols-outlined text-base">content_paste</span> PEGAR DESDE PORTAPAPELES
      </button>
      <p id="join-error" class="text-xs font-bold text-[#ba1a1a] text-center" hidden>Ingresa los 6 dígitos del código.</p>
      <p id="join-ok" class="text-sm font-bold text-[#2e7d32] text-center" hidden></p>
      <div class="mt-auto pt-2">
        <button id="join-btn" type="button" class="sh-btn-primary !rounded-full opacity-50" disabled>Unirse <span class="material-symbols-outlined">arrow_forward</span></button>
      </div>
    </main>
  </div>`,

  perfil: () => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>SafeHaven - User Profile</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  </head>
  <body class="bg-surface text-on-surface font-body-md min-h-screen pb-20 antialiased selection:bg-primary-container selection:text-on-primary-container">
    <!-- TopAppBar -->
    <header class="fixed top-0 w-full z-50 bg-primary shadow-sm text-on-primary border-b border-outline-variant/30 dark:border-outline/20">
      <div class="flex justify-between items-center px-container-margin h-16">
        <button aria-label="Security Shield" class="flex items-center justify-center p-2 rounded-full hover:bg-surface-variant/50 transition-colors active:scale-95 duration-200">
          <span class="material-symbols-outlined" data-icon="shield_with_heart" style="font-variation-settings: 'FILL' 1;">shield_with_heart</span>
        </button>
        <h1 class="font-headline-md text-headline-md font-bold tracking-tight">SafeHaven</h1>
        <button aria-label="Settings" class="flex items-center justify-center p-2 rounded-full hover:bg-surface-variant/50 transition-colors active:scale-95 duration-200">
          <span class="material-symbols-outlined" data-icon="settings">settings</span>
        </button>
      </div>
    </header>
    <main class="pt-20 px-gutter md:px-container-margin max-w-4xl mx-auto space-y-stack-lg">
      <!-- Profile Header Section -->
      <section class="flex flex-col items-center mt-stack-md text-center">
        <!-- Avatar Card -->
        <div class="relative w-48 h-48 mb-stack-md rounded-2xl bg-[#B2FFFF] shadow-lg overflow-hidden flex items-end justify-center border-4 border-surface">
          <img alt="Profile Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvs-2SHpj7Y4acSVtUCx2uycXQ9kCoMOP-G-ZEIqI_-n1HlUDC0ws8eikcKgjbITJjngmTbM4BN6VK3w6Pvvs1ZH6S8Q_oqAuvRfo9Z6ylgGHIBZbKo6cdGYTfdNj3GF7I00V-j-3f6UWzThuShL5xgWEHqa8vxPmc_kX7KreXiK5xcCSpReX_jdRkPQI84TYU_za5wn31qkmnj_MDTb3lX--vs_vTduUq-KON1wq5Jba6l9MUVxxqA9tw"/>
          <!-- Status Badge -->
          <div class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md border-2 border-surface">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">shield</span>
          </div>
        </div>
        <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Alejandro González</h2>
        <!-- Stats Badge -->
        <div class="mt-stack-sm inline-flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full shadow-sm">
          <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">military_tech</span>
          <span class="font-bold text-sm">Level 5 - Guardián Vecinal</span>
          <span class="mx-1 opacity-50">|</span>
          <span class="font-semibold text-sm">1,250 Safepoints 🌟</span>
        </div>
      </section>
      <!-- User Info Bento Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-unit">
        <!-- Info Card 1: Contact -->
        <div class="glass-card rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <div class="flex items-center gap-3 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary bg-primary-container p-2 rounded-lg">mail</span>
            <div>
              <p class="text-xs font-label-caps text-outline uppercase tracking-wider">Email</p>
              <p class="font-medium">alejandro@email.com</p>
            </div>
          </div>
          <div class="w-full h-px bg-outline-variant/30 my-1"></div>
          <div class="flex items-center gap-3 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary bg-primary-container p-2 rounded-lg">phone_iphone</span>
            <div>
              <p class="text-xs font-label-caps text-outline uppercase tracking-wider">Phone</p>
              <p class="font-medium">+56 9 1234 5678</p>
            </div>
          </div>
        </div>
        <!-- Info Card 2: Location & Status -->
        <div class="glass-card rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <div class="flex items-center gap-3 text-on-surface-variant">
            <span class="material-symbols-outlined text-primary bg-primary-container p-2 rounded-lg">location_on</span>
            <div>
              <p class="text-xs font-label-caps text-outline uppercase tracking-wider">Base Location</p>
              <p class="font-medium">La Pintana, Santiago</p>
            </div>
          </div>
          <div class="w-full h-px bg-outline-variant/30 my-1"></div>
          <div class="flex items-center gap-3 text-on-surface-variant">
            <span class="material-symbols-outlined text-green-600 bg-green-100 p-2 rounded-lg">verified_user</span>
            <div>
              <p class="text-xs font-label-caps text-outline uppercase tracking-wider">Security Status</p>
              <p class="font-medium text-green-700 flex items-center gap-1">Active / Protected <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span></p>
            </div>
          </div>
        </div>
      </section>
      <!-- Menu Options -->
      <section class="flex flex-col gap-unit">
        <h3 class="font-headline-md text-headline-md text-on-surface-variant px-2 mb-2">Account Settings</h3>
        <button class="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant/50 transition-colors active:scale-[0.98]">
          <div class="flex items-center gap-4">
            <div class="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
              <span class="material-symbols-outlined">edit_document</span>
            </div>
            <span class="font-medium text-on-surface">Editar Información Personal</span>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </button>
        <button class="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant/50 transition-colors active:scale-[0.98]">
          <div class="flex items-center gap-4">
            <div class="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
              <span class="material-symbols-outlined">checkroom</span>
            </div>
            <span class="font-medium text-on-surface">Personalizar Personaje y Tienda</span>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </button>
        <button class="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant/50 transition-colors active:scale-[0.98]">
          <div class="flex items-center gap-4">
            <div class="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
              <span class="material-symbols-outlined">group</span>
            </div>
            <span class="font-medium text-on-surface">Mis Círculos de Confianza</span>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </button>
        <button class="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:bg-surface-variant/50 transition-colors active:scale-[0.98]">
          <div class="flex items-center gap-4">
            <div class="bg-secondary-container text-on-secondary-container p-3 rounded-xl">
              <span class="material-symbols-outlined">history</span>
            </div>
            <span class="font-medium text-on-surface">Historial de Reportes y Puntos</span>
            <span class="material-symbols-outlined text-outline">chevron_right</span>
          </div>
        </button>
      </section>
    </main>
    <!-- BottomNavBar -->
    <nav class="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-surface-container-lowest shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden">
      <div class="flex justify-around items-center w-full px-2 py-3">
        <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-colors active:scale-90 duration-150 group">
          <span class="material-symbols-outlined group-hover:fill-current">map</span>
          <span class="font-label-caps text-label-caps mt-1">Map</span>
        </button>
        <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-colors active:scale-90 duration-150 group">
          <span class="material-symbols-outlined group-hover:fill-current">group</span>
          <span class="font-label-caps text-label-caps mt-1">Flock</span>
        </button>
        <button class="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-colors active:scale-90 duration-150 group">
          <span class="material-symbols-outlined group-hover:fill-current">checkroom</span>
          <span class="font-label-caps text-label-caps mt-1">Closet</span>
        </button>
        <!-- Active State -->
        <button class="flex flex-col items-center justify-center bg-[#B2FFFF]/30 text-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-150">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
          <span class="font-label-caps text-label-caps mt-1">Profile</span>
        </button>
      </div>
    </nav>
  </body></html>`,

  armario: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex justify-between items-center px-6 h-16">
      <div class="flex items-center gap-2">
        <span class="font-display text-lg tracking-wider text-[#4f378a]">SAFEHAVEN</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-[#6750a4] text-white rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px]" style="font-variation-settings:'FILL' 1">stars</span>
          <span class="text-xs font-bold tracking-widest" id="armario-sp">1,240 SP</span>
        </div>
        <img src="/images/armario-perfil.png" alt="Tu guardián" class="w-10 h-10 rounded-full border-2 border-[#4f378a] object-cover" loading="lazy" />
      </div>
    </header>
    <main class="sh-shell flex-1 w-full px-6 pt-4 pb-40 space-y-4">
      <section class="flex flex-col items-center text-center gap-2">
        <div class="relative w-44 h-96">
          <img id="armario-hero" src="/images/armario-guardian.png" alt="Tu guardián Guardian 01" class="w-full h-full object-contain relative drop-shadow-xl transition-transform duration-300" loading="lazy" />
          <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
            <button type="button" data-rotate="-15" class="w-11 h-11 rounded-full bg-white/85 backdrop-blur border border-[#cbc4d2]/50 shadow-lg flex items-center justify-center text-[#494551] active:scale-90" aria-label="Rotar a la izquierda"><span class="material-symbols-outlined">rotate_left</span></button>
            <button type="button" data-rotate="15" class="w-11 h-11 rounded-full bg-white/85 backdrop-blur border border-[#cbc4d2]/50 shadow-lg flex items-center justify-center text-[#494551] active:scale-90" aria-label="Rotar a la derecha"><span class="material-symbols-outlined">rotate_right</span></button>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="font-headline font-bold text-3xl text-[#4f378a] uppercase tracking-tight">Guardian 01</h2>
          <p class="text-xs tracking-widest text-[#494551] uppercase">Armario Secreto (Avatar)</p>
        </div>
      </section>
      <section>
        <div class="flex gap-2 overflow-x-auto pb-2" id="armario-tabs" role="tablist" aria-label="Categorías">
          <button type="button" data-cat="cabeza" role="tab" aria-selected="true" class="sh-tab-active shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full shadow-md bg-[#4f378a] text-white">CABEZA</button>
          <button type="button" data-cat="armadura" role="tab" aria-selected="false" class="shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full bg-[#ece6ee] text-[#494551]">ARMADURA</button>
          <button type="button" data-cat="mascotas" role="tab" aria-selected="false" class="shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full bg-[#ece6ee] text-[#494551]">MASCOTAS</button>
          <button type="button" data-cat="auras" role="tab" aria-selected="false" class="shrink-0 font-bold text-xs tracking-widest px-6 py-2.5 rounded-full bg-[#ece6ee] text-[#494551]">AURAS</button>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-2" id="armario-grid">
          <div class="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 relative border-2 border-[#4f378a]" data-cat="cabeza" data-price="0" data-name="Gorra Origen">
            <span class="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4f378a] text-white flex items-center justify-center" data-check><span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">check</span></span>
            <a href="#/armario-item?i=gorra" class="no-underline text-[#1d1b20] flex flex-col gap-2" aria-label="Inspeccionar Gorra Origen">
            <div class="h-24 bg-[#e6e0e9] rounded-xl flex items-center justify-center p-2"><img src="/images/armario-gorra.png" alt="Gorra Origen" class="h-full object-contain" loading="lazy" /></div>
            <p class="text-[11px] font-bold tracking-widest text-[#494551]">PREDETERMINADO</p>
            <h3 class="font-headline font-bold text-lg text-[#4f378a] leading-tight">Gorra Origen</h3>
            </a>
            <button type="button" data-equip class="mt-auto flex items-center justify-center gap-1 text-sm font-bold text-[#4f378a] py-2 rounded-xl bg-[#e9ddff] active:scale-95">EQUIPAR</button>
            <p class="text-[#4f378a] font-bold text-sm" data-status hidden>EQUIPADO</p>
          </div>
          <div class="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 relative border border-[#cbc4d2]/40" data-cat="cabeza" data-price="450" data-name="Visor Vigilante">
            <span class="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4f378a] text-white hidden items-center justify-center" data-check><span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">check</span></span>
            <a href="#/armario-item?i=visor" class="no-underline text-[#1d1b20] flex flex-col gap-2" aria-label="Inspeccionar Visor Vigilante">
            <div class="h-24 bg-[#e6e0e9] rounded-xl flex items-center justify-center p-2"><img src="/images/armario-visor.png" alt="Visor Vigilante" class="h-full object-contain" loading="lazy" /></div>
            <p class="text-[11px] font-bold tracking-widest text-[#494551]">RARO</p>
            <h3 class="font-headline font-bold text-lg leading-tight">Visor Vigilante</h3>
            </a>
            <button type="button" data-equip class="mt-auto flex items-center justify-center gap-1 text-sm font-bold text-[#4f378a] py-2 rounded-xl bg-[#e9ddff] active:scale-95"><span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 1">stars</span> 450 · EQUIPAR</button>
            <p class="text-[#4f378a] font-bold text-sm" data-status hidden>EQUIPADO</p>
          </div>
          <div class="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 relative border border-[#cbc4d2]/40" data-cat="mascotas" data-price="1200" data-name="Búho Centinela">
            <span class="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4f378a] text-white hidden items-center justify-center" data-check><span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">check</span></span>
            <a href="#/armario-item?i=buho" class="no-underline text-[#1d1b20] flex flex-col gap-2" aria-label="Inspeccionar Búho Centinela">
            <div class="h-24 bg-[#e6e0e9] rounded-xl flex items-center justify-center p-2"><img src="/images/armario-buho.png" alt="Búho Centinela" class="h-full object-contain" loading="lazy" /></div>
            <p class="text-[11px] font-bold tracking-widest text-[#494551]">ÉPICO</p>
            <h3 class="font-headline font-bold text-lg leading-tight">Búho Centinela</h3>
            </a>
            <button type="button" data-equip class="mt-auto flex items-center justify-center gap-1 text-sm font-bold text-[#4f378a] py-2 rounded-xl bg-[#e9ddff] active:scale-95"><span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 1">stars</span> 1,200 · EQUIPAR</button>
            <p class="text-[#4f378a] font-bold text-sm" data-status hidden>EQUIPADO</p>
          </div>
          <div class="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2 relative border border-[#cbc4d2]/40" data-cat="armadura" data-price="850" data-name="Arnés Reforzado">
            <span class="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4f378a] text-white hidden items-center justify-center" data-check><span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">check</span></span>
            <a href="#/armario-item?i=arnes" class="no-underline text-[#1d1b20] flex flex-col gap-2" aria-label="Inspeccionar Arnés Reforzado">
            <div class="h-24 bg-[#e6e0e9] rounded-xl flex items-center justify-center p-2"><img src="/images/armario-arnes.png" alt="Arnés Reforzado" class="h-full object-contain" loading="lazy" /></div>
            <p class="text-[11px] font-bold tracking-widest text-[#494551]">ELITE</p>
            <h3 class="font-headline font-bold text-lg leading-tight">Arnés Reforzado</h3>
            </a>
            <button type="button" data-equip class="mt-auto flex items-center justify-center gap-1 text-sm font-bold text-[#4f378a] py-2 rounded-xl bg-[#e9ddff] active:scale-95"><span class="material-symbols-outlined text-base" style="font-variation-settings:'FILL' 1">stars</span> 850 · EQUIPAR</button>
            <p class="text-[#4f378a] font-bold text-sm" data-status hidden>EQUIPADO</p>
          </div>
        </div>
        <p id="armario-empty" class="text-sm text-[#494551] text-center py-6" hidden>Pronto llegarán nuevas auras a tu armario.</p>
        <p id="armario-msg" class="text-sm font-bold text-center mt-3 text-[#4f378a]" hidden></p>
      </section>
    </main>
    <div id="armario-toast" class="fixed left-1/2 -translate-x-1/2 bottom-24 z-[70] bg-white rounded-full shadow-2xl border border-[#4f378a]/40 px-5 py-3 flex items-center gap-2 transition-all duration-300 translate-y-32 opacity-0" aria-live="polite">
      <span class="w-8 h-8 rounded-full bg-[#4f378a] text-white flex items-center justify-center"><span class="material-symbols-outlined text-lg" style="font-variation-settings:'FILL' 1">check_circle</span></span>
      <span class="font-headline font-bold text-sm text-[#4f378a]">¡ACCESORIO EQUIPADO!</span>
    </div>
  </div>`,

  armarioItem: () => {
    const id = armarioItemId();
    const item = ARMARIO_ITEMS[id];
    return `
  <div class="sh-page bg-[#f2ecf4]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md shadow-sm flex justify-between items-center w-full px-4 h-16">
      <a href="#/armario" class="p-2 -ml-2 rounded-full hover:bg-[#ece6ee] text-[#494551] active:scale-95" aria-label="Volver al armario"><span class="material-symbols-outlined">arrow_back</span></a>
      <h1 class="flex-1 text-center truncate font-headline font-bold text-[#4f378a]">Item Inspection</h1>
      <button type="button" data-item-menu class="p-2 -mr-2 rounded-full hover:bg-[#ece6ee] text-[#494551] active:scale-95" aria-label="Más opciones"><span class="material-symbols-outlined">more_vert</span></button>
    </header>
    <main class="sh-shell flex-1 w-full flex flex-col relative pb-32">
      <div class="relative w-full bg-white flex items-center justify-center p-8 overflow-hidden" style="height:38vh;border-radius:0 0 2rem 2rem">
        <img src="${item.img}" alt="${item.name}" class="max-w-full max-h-full object-contain relative drop-shadow-xl" loading="lazy" />
        <div class="absolute top-5 right-5 text-white text-xs font-bold tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-1" style="${item.rarityStyle}">
          <span class="material-symbols-outlined text-sm" style="font-variation-settings:'FILL' 1">auto_awesome</span> ${item.rarity}
        </div>
      </div>
      <div class="px-6 pt-5 flex flex-col gap-4">
        <div class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60">
          <h2 class="font-headline font-bold text-[28px] leading-[34px]">${item.name}</h2>
          <p class="text-[#494551] text-sm leading-relaxed mt-1">${item.lore}</p>
        </div>
        <div class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60 flex flex-col gap-4">
          <h3 class="font-headline font-bold text-sm text-[#4f378a] flex items-center gap-2"><span class="material-symbols-outlined text-lg">query_stats</span> Technical Stats</h3>
          ${item.stats.map(s => `
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 hex-frame flex items-center justify-center font-bold text-sm shrink-0" style="${s.bg}">${s.val}</div>
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-sm">${s.label}</span>
                <span class="text-xs font-bold text-[#4f378a]">${s.lvl}</span>
              </div>
              <div class="w-full bg-[#cbc4d2]/40 rounded-full h-2 overflow-hidden"><div class="h-2 rounded-full" style="width:${s.pct}%;${s.bar}"></div></div>
            </div>
          </div>`).join("")}
        </div>
        <p id="item-msg" class="text-sm font-bold text-center text-[#4f378a]" hidden></p>
      </div>
    </main>
    <div class="fixed bottom-0 left-0 w-full px-6 py-4 bg-white/90 backdrop-blur-md border-t border-[#cbc4d2]/40 z-30">
      <div class="sh-shell w-full">
        <button id="item-equip" type="button" class="sh-btn-primary !rounded-xl !text-lg !py-4"><span class="material-symbols-outlined">shopping_cart</span> <span data-label>Equipar Ahora</span></button>
      </div>
    </div>
  </div>`;
  },

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
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 class="text-3xl font-bold text-[#4f378a] mb-4">¡Hola, Coordinador!</h2>
        <button id="inicio-trayecto-btn" class="sh-btn-primary text-lg font-semibold px-8 py-3 rounded-full">Iniciar Trayecto</button>
      </div>
    </main>
  </div>`,

  puntosAmbar: () => `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/inicio" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a inicio"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <div class="flex-1 min-w-0">
        <h1 class="font-headline font-bold text-[#4f378a] leading-tight">Puntos Ámbar</h1>
        <p class="text-xs text-[#494551] -mt-0.5">Zonas seguras cercanas · Buscador de Puntos Seguros - Lista</p>
      </div>
      <a href="#/mapa" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2ecf4] text-[#4f378a] active:scale-95" aria-label="Ver mapa"><span class="material-symbols-outlined">search</span></a>
    </header>
    <main class="sh-shell flex-1 w-full px-4 py-4 pb-10 flex flex-col gap-4">
      <div class="flex gap-2 overflow-x-auto pb-1" id="pa-chips" role="tablist" aria-label="Filtrar por categoría" style="scrollbar-width:none">
        <button type="button" data-pa-cat="all" role="tab" aria-selected="true" class="shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-[#4f378a] text-white shadow-md">TODOS</button>
        <button type="button" data-pa-cat="tienda" role="tab" aria-selected="false" class="shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-white border border-[#cbc4d2]/60 text-[#494551]">TIENDAS</button>
        <button type="button" data-pa-cat="policia" role="tab" aria-selected="false" class="shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-white border border-[#cbc4d2]/60 text-[#494551]">POLICÍA</button>
        <button type="button" data-pa-cat="transporte" role="tab" aria-selected="false" class="shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-white border border-[#cbc4d2]/60 text-[#494551]">TRANSPORTE</button>
        <button type="button" data-pa-cat="salud" role="tab" aria-selected="false" class="shrink-0 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full bg-white border border-[#cbc4d2]/60 text-[#494551]">SALUD</button>
      </div>
      <div id="pa-list" class="flex flex-col gap-3">
        <article data-pa-card="tienda" data-pa-id="santa-rosa" class="bg-white rounded-2xl shadow-sm border border-[#cbc4d2]/40 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1.5" style="background:#10B981"></div>
          <a href="#/punto-detalle?id=santa-rosa" class="flex gap-3 items-center pl-2 no-underline text-[#1d1b20] active:opacity-80" aria-label="Ver detalle de 24/7 Market Santa Rosa">
            <div class="w-12 h-12 rounded-full bg-[#e1d4fd] text-[#4b4263] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[28px]" style="font-variation-settings:'FILL' 1">storefront</span></div>
            <div class="min-w-0 flex-1"><h2 class="font-headline font-bold text-[17px] leading-tight truncate">24/7 Market Santa Rosa</h2><p class="text-sm text-[#494551]">Tienda · 200 m · verificado</p></div>
            <span class="material-symbols-outlined text-[#7a7582]">chevron_right</span>
          </a>
          <div class="flex justify-between items-center pl-2">
            <div class="flex items-center gap-0.5 text-[#10B981]" aria-label="Seguridad 5 de 5"><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span></div>
            <button type="button" data-pa-go="24/7 Market Santa Rosa" class="bg-[#10B981] hover:brightness-95 text-white text-xs font-bold tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95"><span class="material-symbols-outlined text-[18px]">directions</span>CÓMO LLEGAR</button>
          </div>
        </article>
        <article data-pa-card="policia" data-pa-id="police-north" class="bg-white rounded-2xl shadow-sm border border-[#cbc4d2]/40 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4f378a]"></div>
          <a href="#/punto-detalle?id=police-north" class="flex gap-3 items-center pl-2 no-underline text-[#1d1b20] active:opacity-80" aria-label="Ver detalle de Police Station North">
            <div class="w-12 h-12 rounded-full bg-[#4f378a] text-[#e0d2ff] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[28px]" style="font-variation-settings:'FILL' 1">local_police</span></div>
            <div class="min-w-0 flex-1"><h2 class="font-headline font-bold text-[17px] leading-tight truncate">Police Station North</h2><p class="text-sm text-[#494551]">Policía · 850 m · verificado</p></div>
            <span class="material-symbols-outlined text-[#7a7582]">chevron_right</span>
          </a>
          <div class="flex justify-between items-center pl-2">
            <div class="flex items-center gap-0.5 text-[#10B981]" aria-label="Seguridad 5 de 5"><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span><span class="material-symbols-outlined text-[18px]">shield</span></div>
            <button type="button" data-pa-go="Police Station North" class="bg-[#10B981] hover:brightness-95 text-white text-xs font-bold tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95"><span class="material-symbols-outlined text-[18px]">directions</span>CÓMO LLEGAR</button>
          </div>
        </article>
        <article data-pa-card="transporte" data-pa-id="metro" class="bg-white rounded-2xl shadow-sm border border-[#cbc4d2]/40 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c9a74d]"></div>
          <a href="#/punto-detalle?id=metro" class="flex gap-3 items-center pl-2 no-underline text-[#1d1b20] active:opacity-80" aria-label="Ver detalle de Metro Terminal">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background:rgba(201,167,77,.25);color:#503d00"><span class="material-symbols-outlined text-[28px]" style="font-variation-settings:'FILL' 1">directions_transit</span></div>
            <div class="min-w-0 flex-1"><h2 class="font-headline font-bold text-[17px] leading-tight truncate">Metro Terminal</h2><p class="text-sm text-[#494551]">Transporte · 1.2 km · verificado</p></div>
            <span class="material-symbols-outlined text-[#7a7582]">chevron_right</span>
          </a>
          <div class="flex justify-between items-center pl-2">
            <div class="flex items-center gap-0.5" aria-label="Seguridad 3 de 5">
              <span class="material-symbols-outlined text-[18px] text-[#765b00]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#765b00]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#765b00]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#cbc4d2]">shield</span><span class="material-symbols-outlined text-[18px] text-[#cbc4d2]">shield</span>
            </div>
            <button type="button" data-pa-go="Metro Terminal" class="bg-[#10B981] hover:brightness-95 text-white text-xs font-bold tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95"><span class="material-symbols-outlined text-[18px]">directions</span>CÓMO LLEGAR</button>
          </div>
        </article>
        <article data-pa-card="salud" data-pa-id="hospital" class="bg-white rounded-2xl shadow-sm border border-[#cbc4d2]/40 p-4 flex flex-col gap-3 relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ba1a1a]"></div>
          <a href="#/punto-detalle?id=hospital" class="flex gap-3 items-center pl-2 no-underline text-[#1d1b20] active:opacity-80" aria-label="Ver detalle de City General Hospital">
            <div class="w-12 h-12 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[28px]" style="font-variation-settings:'FILL' 1">local_hospital</span></div>
            <div class="min-w-0 flex-1"><h2 class="font-headline font-bold text-[17px] leading-tight truncate">City General Hospital</h2><p class="text-sm text-[#494551]">Salud · 2.5 km · verificado</p></div>
            <span class="material-symbols-outlined text-[#7a7582]">chevron_right</span>
          </a>
          <div class="flex justify-between items-center pl-2">
            <div class="flex items-center gap-0.5" aria-label="Seguridad 4 de 5">
              <span class="material-symbols-outlined text-[18px] text-[#10B981]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#10B981]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#10B981]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#10B981]" style="font-variation-settings:'FILL' 1">shield</span><span class="material-symbols-outlined text-[18px] text-[#cbc4d2]">shield</span>
            </div>
            <button type="button" data-pa-go="City General Hospital" class="bg-[#10B981] hover:brightness-95 text-white text-xs font-bold tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95"><span class="material-symbols-outlined text-[18px]">directions</span>CÓMO LLEGAR</button>
          </div>
        </article>
        <p id="pa-empty" class="text-sm text-[#494551] text-center py-6" hidden>No hay puntos en esta categoría por aquí.</p>
      </div>
      <a href="#/mapa" class="sh-btn-secondary"><span class="material-symbols-outlined text-[#4f378a]">map</span> Ver en mapa</a>
      <p class="text-[11px] text-[#494551] text-center">Diseño basado en Stitch “Buscador de Puntos Seguros - Lista” (ID 46c31c08f7714dba9256579930e3d2ef). Original en <span class="font-mono">stitch-screens/17-buscador-puntos-seguros-lista.html</span>.</p>
    </main>
  </div>`,

  puntoDetalle: () => {
    const p = puntoDetalleData(puntoDetalleId());
    const stars = (score) => [1,2,3,4,5].map(i =>
      `<span class="material-symbols-outlined text-[18px] ${i <= Math.round(score) ? "text-[#10B981]" : "text-[#cbc4d2]"}" style="font-variation-settings:'FILL' 1">shield</span>`
    ).join("");
    return `
  <div class="sh-page bg-[#fdf7ff]">
    <header class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#cbc4d2]/40 flex items-center gap-2 px-4 h-16">
      <a href="#/puntos-ambar" class="p-2 text-[#4f378a] flex items-center" aria-label="Volver a Puntos Ámbar"><span class="material-symbols-outlined" style="font-variation-settings:'wght' 600">arrow_back</span></a>
      <h1 class="font-headline font-bold text-[#4f378a] flex-1 truncate">Detalles de la Zona Segura</h1>
      <button type="button" data-pd-menu class="p-2 text-[#494551] rounded-full hover:bg-[#f2ecf4]" aria-label="Más opciones"><span class="material-symbols-outlined">more_vert</span></button>
    </header>
    <main class="sh-shell flex-1 w-full pb-32">
      <section class="relative w-full h-64 overflow-hidden bg-[#ece6ee]">
        <img src="${p.hero}" alt="Mapa de ${p.nombre}" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#fdf7ff] via-transparent to-transparent pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div class="bg-[#10B981] text-white p-3 rounded-full shadow-lg border-2 border-white">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">security</span>
          </div>
        </div>
      </section>
      <div class="px-4 -mt-8 relative z-10 flex flex-col gap-4">
        <div class="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-white/60">
          <h2 class="font-headline font-bold text-[22px] leading-tight">${p.nombre}</h2>
          <p class="text-sm text-[#494551] flex items-center gap-1.5 mt-1">
            <span class="material-symbols-outlined text-[18px] text-[#4f378a]" style="font-variation-settings:'FILL' 1">verified</span>
            Zona Segura Oficial · ${p.distCorta}
          </p>
          <div class="flex items-center gap-0.5 mt-2" aria-label="Seguridad ${p.rating} de 5">${stars(p.rating)}</div>
          <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#cbc4d2]/40">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-full bg-[#f2ecf4] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[#10B981]">schedule</span></div>
              <div><p class="text-[10px] font-bold tracking-widest text-[#7a7582]">HORARIO</p><p class="text-sm font-bold flex items-center gap-1.5">${p.horario} <span class="w-2 h-2 rounded-full bg-[#10B981]"></span></p></div>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-full bg-[#f2ecf4] flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-[#c9a74d]" style="font-variation-settings:'FILL' 1">star</span></div>
              <div><p class="text-[10px] font-bold tracking-widest text-[#7a7582]">CONFIANZA</p><p class="text-sm font-bold">${p.score} <span class="font-normal text-[#494551]">· ${p.pct}</span></p></div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-headline font-bold text-lg mb-2">Servicios Disponibles</h3>
          <div class="grid grid-cols-2 gap-2">
            ${p.servicios.map(s => `<div class="bg-white rounded-xl p-3 flex flex-col items-center text-center gap-1.5 border border-[#cbc4d2]/40"><span class="material-symbols-outlined text-[#4f378a]">${s.icon}</span><span class="text-xs font-bold">${s.label}</span></div>`).join("")}
          </div>
        </div>
        <div>
          <div class="flex justify-between items-end mb-2">
            <h3 class="font-headline font-bold text-lg">Reseñas de la Comunidad</h3>
            <button type="button" data-pd-reviews class="text-[#4f378a] text-xs font-bold tracking-widest hover:underline">VER TODAS</button>
          </div>
          <div class="flex flex-col gap-2">
            ${p.resenas.map(r => `
            <div class="bg-white p-4 rounded-2xl border border-[#cbc4d2]/40 shadow-sm">
              <div class="flex justify-between items-start mb-1.5">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-[#e1d4fd] text-[#4b4263] flex items-center justify-center font-bold text-sm">${r.nombre[0]}</div>
                  <div><p class="text-sm font-bold">${r.nombre}</p><p class="text-[11px] text-[#494551] flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">verified_user</span> Verificada</p></div>
                </div>
                <span class="text-[11px] text-[#7a7582]">${r.cuando}</span>
              </div>
              <p class="text-sm text-[#494551]">“${r.texto}”</p>
            </div>`).join("")}
          </div>
        </div>
        <p class="text-[11px] text-[#494551] text-center">Basado en Stitch “Detalles del Punto Seguro” (ID 92e9cd286b82418ebfc8b00c442047fc). Original en <span class="font-mono">stitch-screens/18-detalle-punto-seguro.html</span>.</p>
        <p id="pd-msg" class="text-sm font-bold text-[#4f378a] text-center" hidden></p>
      </div>
    </main>
    <div class="fixed bottom-24 left-0 w-full px-4 py-3 z-30 pointer-events-none">
      <div class="sh-shell w-full pointer-events-auto">
        <button data-pd-go="${p.nombre}" data-pd-id="${puntoDetalleId()}" type="button" class="sh-btn-primary !rounded-xl w-full shadow-xl" style="background:#10B981;border-color:#10B981"><span class="material-symbols-outlined">directions</span> Obtener Direcciones</button>
      </div>
    </div>
  </div>`;
  },

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

export const ARMARIO_ITEMS = {
  gorra: {
    name: "Gorra Origen", gridName: "Gorra Origen", cat: "cabeza", rarity: "PREDETERMINADO", rarityStyle: "background:#494551",
    img: "/images/armario-cut-gorra.png", price: 0,
    lore: "La primera gorra del programa Guardianes. Ligera y cómoda, marca el inicio de tu camino en la red de protección comunitaria.",
    stats: [
      { val: "+10", label: "Comodidad", lvl: "Lvl. 2", pct: 50, bg: "background:#6750a4;color:#e0d2ff", bar: "background:#4f378a" },
      { val: "+5", label: "Estilo", lvl: "Lvl. 1", pct: 30, bg: "background:#e1d4fd;color:#63597c", bar: "background:#63597c" },
      { val: "+5", label: "Prestigio", lvl: "Lvl. 1", pct: 25, bg: "background:rgba(201,167,77,.4);color:#503d00", bar: "background:#765b00" },
    ],
  },
  visor: {
    name: "Visor Táctico Lumen", gridName: "Visor Vigilante", cat: "cabeza", rarity: "EPIC", rarityStyle: "background:linear-gradient(135deg,#a855f7 0%,#3b82f6 100%)",
    img: "/images/armario-cut-visor.png", price: 450,
    lore: "Desarrollado en los laboratorios del Sector Norte, este visor utiliza tecnología de escaneo térmico para detectar anomalías en zonas de baja visibilidad. Un aliado indispensable para patrullas nocturnas.",
    stats: [
      { val: "+15", label: "Detección", lvl: "Lvl. 3", pct: 75, bg: "background:#6750a4;color:#e0d2ff", bar: "background:#4f378a" },
      { val: "+20", label: "Claridad", lvl: "Lvl. 4", pct: 85, bg: "background:#e1d4fd;color:#63597c", bar: "background:#63597c" },
      { val: "+10", label: "Prestigio", lvl: "Lvl. 2", pct: 50, bg: "background:rgba(201,167,77,.4);color:#503d00", bar: "background:#765b00" },
    ],
  },
  buho: {
    name: "Búho Centinela", gridName: "Búho Centinela", cat: "mascotas", rarity: "ÉPICO", rarityStyle: "background:linear-gradient(135deg,#a855f7 0%,#3b82f6 100%)",
    img: "/images/armario-cut-buho.png", price: 1200,
    lore: "Compañero nocturno entrenado para vigilar tu perímetro. Su visión aguda alerta a tu círculo ante cualquier movimiento extraño.",
    stats: [
      { val: "+25", label: "Vigilancia", lvl: "Lvl. 5", pct: 95, bg: "background:#6750a4;color:#e0d2ff", bar: "background:#4f378a" },
      { val: "+15", label: "Lealtad", lvl: "Lvl. 3", pct: 70, bg: "background:#e1d4fd;color:#63597c", bar: "background:#63597c" },
      { val: "+20", label: "Prestigio", lvl: "Lvl. 4", pct: 80, bg: "background:rgba(201,167,77,.4);color:#503d00", bar: "background:#765b00" },
    ],
  },
  arnes: {
    name: "Arnés Reforzado", gridName: "Arnés Reforzado", cat: "armadura", rarity: "ELITE", rarityStyle: "background:linear-gradient(135deg,#c9a74d 0%,#765b00 100%)",
    img: "/images/armario-cut-arnes.png", price: 850,
    lore: "Arnés táctico con costuras reforzadas y bandas reflejantes. Diseñado para guardianes que patrullan a pie en zonas de alto movimiento.",
    stats: [
      { val: "+20", label: "Protección", lvl: "Lvl. 4", pct: 85, bg: "background:#6750a4;color:#e0d2ff", bar: "background:#4f378a" },
      { val: "+15", label: "Resistencia", lvl: "Lvl. 3", pct: 70, bg: "background:#e1d4fd;color:#63597c", bar: "background:#63597c" },
      { val: "+10", label: "Prestigio", lvl: "Lvl. 2", pct: 50, bg: "background:rgba(201,167,77,.4);color:#503d00", bar: "background:#765b00" },
    ],
  },
};

// Posición de cada objeto sobre el guardián (en % del héroe)
export const ARMARIO_FIT = {
  "Gorra Origen": { src: "/images/armario-cut-gorra.png", left: "50%", top: "10%", width: "44%" },
  "Visor Vigilante": { src: "/images/armario-cut-visor.png", left: "47%", top: "12%", width: "38%" },
  "Búho Centinela": { src: "/images/armario-cut-buho.png", left: "85%", top: "35%", width: "30%" },
  "Arnés Reforzado": { src: "/images/armario-cut-arnes.png", left: "48%", top: "42%", width: "44%" },
};

const armarioItemId = () => {  const m = (location.hash.split("?")[1] || "").match(/(?:^|&)i=([a-z]+)/);
  return ARMARIO_ITEMS[m?.[1]] ? m[1] : "visor";
};

export const PUNTOS_DETALLE = {
  "santa-rosa": {
    nombre: "24/7 Market Santa Rosa", cat: "Tienda", dist: "200 m", distCorta: "a 150m",
    horario: "Abierto 24/7", score: "4.9/5", pct: "98% Rating", rating: 5,
    hero: "/images/punto-detalle-hero.jpg",
    servicios: [
      { icon: "wifi", label: "Wi-Fi Gratis" },
      { icon: "battery_charging_full", label: "Carga de Teléfono" },
      { icon: "local_drink", label: "Agua" },
      { icon: "medical_services", label: "Primeros Auxilios" },
    ],
    resenas: [
      { nombre: "María G.", cuando: "Hace 2 horas", texto: "Sentirse muy seguro aquí. Personal amable." },
      { nombre: "Carlos R.", cuando: "Ayer", texto: "Bien iluminado y vigilado. Excelente punto de descanso." },
    ],
  },
  "police-north": {
    nombre: "Police Station North", cat: "Policía", dist: "850 m", distCorta: "a 850m",
    horario: "Abierto 24/7", score: "4.8/5", pct: "96% Rating", rating: 5,
    hero: "/images/punto-detalle-hero.jpg",
    servicios: [
      { icon: "local_police", label: "Ayuda Policial" },
      { icon: "wifi", label: "Wi-Fi Gratis" },
      { icon: "battery_charging_full", label: "Carga de Teléfono" },
      { icon: "medical_services", label: "Primeros Auxilios" },
    ],
    resenas: [
      { nombre: "Ana P.", cuando: "Hace 3 horas", texto: "Siempre hay oficiales atentos. Muy seguro." },
      { nombre: "Luis M.", cuando: "Hace 2 días", texto: "Punto de encuentro ideal para caminar de noche." },
    ],
  },
  metro: {
    nombre: "Metro Terminal", cat: "Transporte", dist: "1.2 km", distCorta: "a 1.2km",
    horario: "05:30 – 23:00", score: "4.2/5", pct: "84% Rating", rating: 3,
    hero: "/images/punto-detalle-hero.jpg",
    servicios: [
      { icon: "wifi", label: "Wi-Fi Gratis" },
      { icon: "accessible", label: "Acceso Total" },
      { icon: "local_drink", label: "Agua" },
      { icon: "videocam", label: "Videovigilancia" },
    ],
    resenas: [
      { nombre: "Sofía L.", cuando: "Hace 5 horas", texto: "Muy transitado, me siento acompañada." },
      { nombre: "Diego T.", cuando: "Ayer", texto: "Buena iluminación, pero se llena en hora punta." },
    ],
  },
  hospital: {
    nombre: "City General Hospital", cat: "Salud", dist: "2.5 km", distCorta: "a 2.5km",
    horario: "Abierto 24/7", score: "4.7/5", pct: "94% Rating", rating: 4,
    hero: "/images/punto-detalle-hero.jpg",
    servicios: [
      { icon: "medical_services", label: "Urgencias" },
      { icon: "local_drink", label: "Agua" },
      { icon: "battery_charging_full", label: "Carga de Teléfono" },
      { icon: "shield", label: "Zona Vigilada" },
    ],
    resenas: [
      { nombre: "Elena V.", cuando: "Hace 1 día", texto: "Personal que ayuda y entrada siempre iluminada." },
      { nombre: "Marco A.", cuando: "Hace 3 días", texto: "Refugio seguro si necesitas esperar transporte." },
    ],
  },
};

const puntoDetalleId = () => {
  const m = (location.hash.split("?")[1] || "").match(/(?:^|&)id=([a-z-]+)/);
  return PUNTOS_DETALLE[m?.[1]] ? m[1] : "santa-rosa";
};

const puntoDetalleData = (id) => PUNTOS_DETALLE[id] || PUNTOS_DETALLE["santa-rosa"];

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
  <a href="#/inicio" ${active==="inicio"?'aria-current="page"':""}><span class="material-symbols-outlined">map</span>Mapa</a>
  <a href="#/flock" ${active==="flock"?'aria-current="page"':""}><span class="material-symbols-outlined">group</span>Flock</a>
  <a href="#/armario" ${active==="armario"?'aria-current="page"':""}><span class="material-symbols-outlined">styler</span>Armario</a>
  <a href="#/login" ${active==="perfil"?'aria-current="page"':""}><span class="material-symbols-outlined">person</span>Perfil</a>
</nav>`;
