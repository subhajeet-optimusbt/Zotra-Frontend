// ─── Zotra API Service ───────────────────────────────────────────────────────

import { baseUrl } from "../app/utils/utils";

const TOKEN_KEY = "zotra_token";
const REFRESH_TOKEN_KEY = "zotra_refresh_token";

// ── Types ──────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  organizationId: string;
  userId: string;
  email: string;
  fullName: string;
  role: number;
  orgName: string;
  domain: string;
  edition: string;
  companySize: string;
  companyType: string;
  region: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data: RegisterResponseData;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message?: string;
  [key: string]: unknown;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  [x: string]: unknown;
  success: boolean;
  message?: string;
  token: string;
  refreshToken: string;
  tenantId: string;
  userId: string;
  email: string;
  fullName: string;
  role: string;
  expiresIn: number;
  organizationId?: string;
  tenant?: {
    orgName: string;
    plan: string;
    status: string;
  };
  organization?: {
    orgName: string;
    plan: string;
    status: string;
    organizationLogo: string;
    organizationColor: string;
  };
  tokenInspection?: {
    sub: string;
    tenantId: string;
    role: string;
    email: string;
    authMethod: string;
    issuedAt: string;
    expiresAt: string;
    isExpired: boolean;
    allClaims: Array<{ type: string; value: string }>;
  };
}

export interface UserProfile {
  userId: string;
  tenantId: string;
  fullName: string;
  email: string;
  companyName?: string;
  [key: string]: unknown;
}

export interface TeamMember {
  email: string;
  role: string;
}

export interface SetupPayload {
  userId: string;
  email: string;
  fullName: string;
  role: number;
  status: number;
  isEmailVerified: boolean;
  tenantId: string;
  orgName: string;
  domain: string;
  jobRole: string;
  companyName: string;
  companyDomain: string;
  region: string;
  companySize: string;
  companyType: string;
  edition: string;
  commercialAgentMode: string;
  deliveryAgentMode: string;
  financialAgentMode: string;
  renewalAgentMode: string;
  relationshipAgentMode: string;
  teamMembers: TeamMember[];
  googleWorkspaceConnected?: boolean;
  microsoft365Connected?: boolean;
  slackConnected?: boolean;
  xeroConnected?: boolean;
  quickbooksConnected?: boolean;
  hubspotConnected?: boolean;
}

// ── API Error ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// ── Token helpers ──────────────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// ✅ Called right after successful login — persists both tokens
export function setTokens(token: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// ✅ Called on logout — wipes both tokens
export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ── Token Refresh ──────────────────────────────────────────────────────────

interface RefreshResponse {
  success: boolean;
  message?: string;
  token: string;
  refreshToken: string;
}

// ── In-flight lock ─────────────────────────────────────────────────────────
// Prevents two concurrent calls to /auth/refresh racing each other.
// If the background timer and an on-demand apiFetch retry both fire at the
// same millisecond, only the first one hits the network. The second awaits
// the same promise and gets the result for free.
let refreshPromise: Promise<void> | null = null;

/**
 * Calls POST /auth/refresh with the current Bearer token + refreshToken body.
 * On success, persists the new token pair via setTokens().
 * On failure (network error, 401, etc.) it silently fails — the next real
 * API call will hit a 401 and redirect to /login via the normal flow.
 *
 * Thread-safe: concurrent callers share one in-flight promise so the server
 * only ever receives one refresh request at a time.
 */
export async function refreshTokens(): Promise<void> {
  // If a refresh is already in progress, return the same promise so all
  // concurrent callers wait for the same single network request.
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (!token || !refreshToken) return;

    try {
      const res = await fetch(`${baseUrl().replace(/\/+$/, "")}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return; // let the session expire naturally on the next real call

      const data: RefreshResponse = await res.json();

      if (data.success && data.token && data.refreshToken) {
        setTokens(data.token, data.refreshToken);
      }
    } catch {
      // network error — do nothing, session will expire on next real call
    }
  })();

  try {
    await refreshPromise;
  } finally {
    // Always clear the lock when done, success or failure
    refreshPromise = null;
  }
}

// ── Timer guard ────────────────────────────────────────────────────────────
// Prevents double-registration when AppShell mounts more than once
// (React StrictMode double-invoke, Suspense remounts, hot reload, etc.).
// Without this guard, two intervals fire simultaneously every 30 minutes —
// the first refresh succeeds (200), the second sends the already-rotated
// token and gets 401, which previously triggered a logout redirect.
let refreshTimerRunning = false;

/**
 * Starts a background interval that silently refreshes the token every
 * 30 minutes. Returns a cleanup function that clears the interval —
 * call it when the user logs out or the AppShell unmounts.
 *
 * Safe to call multiple times — only one interval is ever active at once.
 */
export function startTokenRefreshTimer(): () => void {
  if (refreshTimerRunning) {
    // Already running — return a no-op cleanup so the caller's useEffect
    // return value is still a valid function.
    return () => {};
  }

  refreshTimerRunning = true;
  const THIRTY_MINUTES = 30 * 60 * 1000;
  // const THIRTY_MINUTES = 30 * 1000;

  const intervalId = setInterval(() => {
    void refreshTokens();
  }, THIRTY_MINUTES);

  return () => {
    clearInterval(intervalId);
    refreshTimerRunning = false;
  };
}

// ── URL helper ─────────────────────────────────────────────────────────────

function buildUrl(path: string): string {
  const base = baseUrl().replace(/\/+$/, "");
  const segment = path.replace(/^\/+/, "");
  return `${base}/${segment}`;
}

// ── Request ────────────────────────────────────────────────────────────────
// Every call goes through here.
// - skipAuth: true  → no Authorization header (login, register, verify-otp)
// - skipAuth: false → Authorization: Bearer <token> attached automatically

async function request<T>(
  path: string,
  options?: RequestInit & { skipAuth?: boolean },
): Promise<T> {
  const { skipAuth, headers: extraHeaders, ...restOptions } = options ?? {};

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (!skipAuth) {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Merge caller-supplied headers but never allow Authorization
  // to be injected on skipAuth routes
  if (extraHeaders) {
    const extra = new Headers(extraHeaders as HeadersInit);
    extra.forEach((value, key) => {
      if (skipAuth && key.toLowerCase() === "authorization") return;
      headers.set(key, value);
    });
  }

  const res = await fetch(buildUrl(path), {
    ...restOptions,
    headers,
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 401 && !options?.skipAuth) {
      // ── Silent refresh-then-retry ────────────────────────────────────────
      // Before giving up, attempt one token refresh via the shared lock so
      // this never races with the background timer or another concurrent call.
      const storedRefreshToken = getRefreshToken();

      if (storedRefreshToken) {
        try {
          // refreshTokens() is lock-protected — if the timer just fired and
          // is already refreshing, this awaits that same promise instead of
          // sending a second request.
          await refreshTokens();

          const newToken = getToken();
          if (newToken) {
            // Retry the original request with the freshly issued token
            const retryHeaders = new Headers(headers);
            retryHeaders.set("Authorization", `Bearer ${newToken}`);
            const retryRes = await fetch(buildUrl(path), {
              ...restOptions,
              headers: retryHeaders,
            });

            if (retryRes.ok) {
              try {
                return (await retryRes.json()) as T;
              } catch {
                return null as unknown as T;
              }
            }

            // Non-401 error on retry — throw it as a normal ApiError
            if (retryRes.status !== 401) {
              const retryData = await retryRes.json().catch(() => null);
              const retryMsg =
                (retryData &&
                typeof retryData === "object" &&
                "message" in retryData
                  ? (retryData as { message: string }).message
                  : null) ?? `Request failed with status ${retryRes.status}`;
              throw new ApiError(retryMsg, retryRes.status, retryData);
            }
          }
        } catch (e) {
          if (e instanceof ApiError) throw e;
          // network error on refresh — fall through to full logout
        }
      }

      // Refresh failed or no tokens — full logout
      clearTokens();
      [
        "zotra_userId",
        "zotra_tenantId",
        "zotra_email",
        "zotra_fullName",
        "zotra_role",
        "zotra_orgName",
      ].forEach((k) => sessionStorage.removeItem(k));
      localStorage.removeItem("zotra_saved_session");
      window.location.href = "/login";
      throw new ApiError("Session expired. Please log in again.", 401, data);
    }

    const msg =
      (data && typeof data === "object" && "message" in data
        ? (data as { message: string }).message
        : null) ?? `Request failed with status ${res.status}`;
    throw new ApiError(msg, res.status, data);
  }

  return data as T;
}

// ── Endpoints ──────────────────────────────────────────────────────────────

/** POST /api/tenants/register  — no token needed */
export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  return request<RegisterResponse>("users/register", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

/** POST /api/tenants/verify-otp  — no token needed */
export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  return request<VerifyOtpResponse>("users/verify-email", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

/** POST /api/tenants/login  — no token needed, returns token on success */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  });
}

export function googleLogin(
  onSuccess: (data: LoginResponse) => void,
  onError: (msg: string) => void,
): void {
  // Tell the backend which frontend origin to redirect back to.
  // This makes it work on both localhost:5173 AND production.
  const POPUP_URL = buildUrl(
    `auth/google/login?frontendUrl=${encodeURIComponent(window.location.origin)}`,
  );

  const popup = window.open(
    POPUP_URL,
    "google-oauth",
    "width=500,height=620,left=400,top=80",
  );

  if (!popup) {
    onError("Popup blocked. Please allow popups for this site.");
    return;
  }

  let settled = false;

  const handleMessage = (event: MessageEvent) => {
    const allowedOrigins = [
      window.location.origin,
      "https://zotra-app.azurewebsites.net",
      "http://localhost:5173",
    ];
    if (!allowedOrigins.includes(event.origin)) return;
    if (!event.data) return;

    if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
      settled = true;
      clearInterval(timer);
      window.removeEventListener("message", handleMessage);

      const data = event.data.payload as LoginResponse;
      if (data?.token) {
        onSuccess(data);
      } else {
        onError("Google sign-in failed — no token received.");
      }
      return;
    }

    if (event.data.type === "GOOGLE_AUTH_ERROR") {
      settled = true;
      clearInterval(timer);
      window.removeEventListener("message", handleMessage);
      onError(event.data.payload || "Google sign-in failed.");
    }
  };

  window.addEventListener("message", handleMessage);

  const timer = setInterval(() => {
    if (popup.closed) {
      clearInterval(timer);
      window.removeEventListener("message", handleMessage);
      if (!settled) {
        onError("Sign-in cancelled.");
      }
    }
  }, 500);
}

/**
 * POST /auth/logout — invalidates the session server-side.
 * Always clears local tokens regardless of server response.
 */
export async function logout(): Promise<void> {
  const token = getToken();
  const refreshToken = getRefreshToken();

  try {
    if (token) {
      await fetch(`${buildUrl("auth/logout")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refreshToken }),
      });
    }
  } catch {
    // Network failure — still clear local state
  } finally {
    clearTokens();
    refreshTimerRunning = false; // reset the guard so a fresh login can restart the timer
    refreshPromise = null; // discard any in-flight refresh
  }
}

/** GET /api/tenants/user/:userId  — requires token */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  return request<UserProfile>(`tenants/user/${userId}`);
}

/** PUT /api/tenants/:tenantId/setup  — requires token */
export async function setupTenant(
  tenantId: string,
  userId: string,
  payload: SetupPayload,
): Promise<unknown> {
  return request(`users/setup`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
