export const AUTH_STORAGE_KEY = "senior-ease-logged-in";
export const CURRENT_USER_KEY = "senior-ease-current-user";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function getCurrentUser(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(CURRENT_USER_KEY);
}

export function setLoggedIn(user: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  window.localStorage.setItem(CURRENT_USER_KEY, user);
  window.dispatchEvent(new Event("senior-ease-user-changed"));
}

export function setLoggedOut(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event("senior-ease-user-changed"));
}
