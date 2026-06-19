// export function baseUrl() {
//     return "https://zotra-api.azurewebsites.net/api";
// }

export function baseUrl() {
    return "https://zotra-api.azurewebsites.net/api";
}

/**
 * Drop-in replacement for fetch() that auto-handles 401 → logout + redirect.
 * Use this instead of raw fetch() in all view/component files.
 */
export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401) {
    // Clear all auth data
    localStorage.removeItem("zotra_token");
    localStorage.removeItem("zotra_refresh_token");
    localStorage.removeItem("zotra_saved_session");
    sessionStorage.clear();
    window.location.href = "/login";
  }
  return res;
}

