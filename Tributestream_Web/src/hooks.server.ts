import { dev } from '$app/environment';

if (dev) {
  const { server } = await import('./mocks/node');

  server.listen();
}

// src/hooks.server.js
// The handle function runs for every request. We can check if a token cookie is present.
// If present, we mark the user as logged in by setting event.locals.user.
export async function handle({ event, resolve }) {
  // Read cookies from the request
  const cookie = event.request.headers.get('cookie') || '';
  const tokenMatch = cookie.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  
  // If token exists, consider user as logged in
  if (token) {
      // You could also validate the token by calling a WordPress endpoint,
      // but if you trust your JWT to still be valid, this might be enough.
      event.locals.user = { loggedIn: true, token };
  } else {
      event.locals.user = { loggedIn: false };
  }

  return resolve(event);
}
