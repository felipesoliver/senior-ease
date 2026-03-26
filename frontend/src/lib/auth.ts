export const AUTH_STORAGE_KEY = "senior-ease-logged-in";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setLoggedIn(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function setLoggedOut(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
