// Basic, deliberately-simple admin gate. The password is stored in plain text
// here — there is no real server-side authentication. This is intended only as
// a soft barrier so the admin panel doesn't show by default to casual visitors.
//
// To change the password, edit ADMIN_PASSWORD below.

const ADMIN_PASSWORD = "mab-admin-2026";
const SESSION_KEY = "mab.portfolio.admin.session";

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    return true;
  }
  return false;
}

export function logout(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
