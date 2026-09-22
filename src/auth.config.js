// Pega aquí tus credenciales. Sin ellas, los botones funcionan en modo demo.
// Google: https://console.cloud.google.com/apis/credentials → OAuth Client ID (tipo Web)
//   - Orígenes autorizados: http://localhost:5173 y tu dominio (https://tudominio.com)
// Apple: https://developer.apple.com → Services ID + Sign in with Apple
//   - Return URL: https://tudominio.com/auth/apple/callback (o tu ruta real)
export const authConfig = {
  GOOGLE_CLIENT_ID: "", // ej: "123456-abc.apps.googleusercontent.com"
  APPLE_CLIENT_ID: "", // ej: "com.safehaven.web" (Services ID)
  APPLE_REDIRECT_URI: "", // ej: "https://tudominio.com/auth/apple/callback"
};
