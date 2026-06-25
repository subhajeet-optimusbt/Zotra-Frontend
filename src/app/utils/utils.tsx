export function baseUrl() {
  return "https://zotra-api.azurewebsites.net/api";
}

/**
 * Drop-in replacement for fetch() that:
 *  1. Automatically injects the Authorization: Bearer token header
 *  2. On 401 — silently attempts a token refresh, then retries once
 *  3. Only redirects to /login if the refresh also fails
 *
 * Use this instead of raw fetch() in all view/component files.
 */
export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  // ── Inject current token ──────────────────────────────────────────────────
  function withAuth(existing?: RequestInit): RequestInit {
    const token = localStorage.getItem("zotra_token");
    if (!token) return existing ?? {};
    const headers = new Headers((existing?.headers as HeadersInit) ?? {});
    headers.set("Authorization", `Bearer ${token}`);
    return { ...(existing ?? {}), headers };
  }

  let res = await fetch(input, withAuth(init));

  if (res.status !== 401) return res;

  // ── 401: attempt silent token refresh then retry once ────────────────────
  const refreshToken = localStorage.getItem("zotra_refresh_token");
  const oldToken = localStorage.getItem("zotra_token");

  if (refreshToken && oldToken) {
    try {
      const refreshRes = await fetch(
        `${baseUrl().replace(/\/+$/, "")}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${oldToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (refreshRes.ok) {
        const data = (await refreshRes.json()) as {
          success: boolean;
          token: string;
          refreshToken: string;
        };

        if (data.success && data.token && data.refreshToken) {
          localStorage.setItem("zotra_token", data.token);
          localStorage.setItem("zotra_refresh_token", data.refreshToken);

          // Retry original request with the new token
          res = await fetch(input, withAuth(init));
          if (res.status !== 401) return res; // ✅ Recovered
        }
      }
    } catch {
      // network error on refresh — fall through to full logout
    }
  }

  // ── Refresh failed — full logout ─────────────────────────────────────────
  localStorage.removeItem("zotra_token");
  localStorage.removeItem("zotra_refresh_token");
  localStorage.removeItem("zotra_saved_session");
  sessionStorage.clear();
  window.location.href = "/login";
  return res;
}
