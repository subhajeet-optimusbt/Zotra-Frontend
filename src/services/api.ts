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
      // ✅ Token from localStorage attached to every authenticated request
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
  // Tell the backend which frontend origin to redirect back to
  // This makes it work on both localhost:5173 AND production
  const frontendCallback = `${window.location.origin}/auth/callback`;
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
    // Accept messages from both localhost and production
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
