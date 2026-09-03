/**
 * Resolves a path under /public against the app's deploy base path
 * (import.meta.env.BASE_URL, e.g. "/" locally or "/Analups/" on GitHub
 * Pages). Plain root-absolute strings ("/images/...") only work when the
 * app is served from the domain root — anything referenced from data or
 * JSX at runtime (not through an HTML <link>/<script> or a CSS url(), which
 * Vite rewrites automatically) needs this instead.
 */
export function publicUrl(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path)) {
    // Already absolute (http://, https://, //cdn...) — leave external URLs untouched.
    return path
  }
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
