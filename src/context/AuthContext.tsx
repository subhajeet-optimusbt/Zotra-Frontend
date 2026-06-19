/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

const LS_USER_ID = "zotra_userId";
const LS_TENANT_ID = "zotra_tenantId";
const LS_EMAIL = "zotra_email";
const LS_FULL_NAME = "zotra_fullName";
const LS_ROLE = "zotra_role";
const LS_ORG_NAME = "zotra_orgName";
const LS_ORG_LOGO_URL = "zotra_orgLogoUrl";
const LS_ORG_PLAN = "zotra_orgPlan";
const LS_ORG_COLOR = "zotra_orgColor";
const LS_PROFILE_URL = "zotra_profileUrl";
const LS_AVATAR = "zotra_avatar";

export interface AuthState {
  userId: string | null;
  tenantId: string | null;
  email: string | null;
  fullName: string | null;
  role: string | null;
  orgName: string | null;
  orgLogoUrl: string | null;
  orgPlan: string | null;
  orgColor: string | null;
  profileUrl: string | null;
  avatar: string | null;
}

export interface OrgBrandingData {
  orgName: string;
  orgLogoUrl: string;
  orgPlan: string;
  orgColor: string;
}

interface AuthContextValue extends AuthState {
  setAuth: (
    userId: string,
    tenantId: string,
    email: string,
    fullName: string,
    role?: string,
    orgName?: string,
    orgLogoUrl?: string,
    orgPlan?: string,
    orgColor?: string,
    profileUrl?: string,
    avatar?: string,
  ) => void;
  setOrgBranding: (branding: Partial<OrgBrandingData>) => void;
  setProfileImage: (profileUrl: string, avatar?: string) => void;
  clearAuth: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): AuthState {
  return {
    userId: localStorage.getItem(LS_USER_ID),
    tenantId: localStorage.getItem(LS_TENANT_ID),
    email: localStorage.getItem(LS_EMAIL),
    fullName: localStorage.getItem(LS_FULL_NAME),
    role: localStorage.getItem(LS_ROLE),
    orgName: localStorage.getItem(LS_ORG_NAME),
    orgLogoUrl: localStorage.getItem(LS_ORG_LOGO_URL),
    orgPlan: localStorage.getItem(LS_ORG_PLAN),
    orgColor: localStorage.getItem(LS_ORG_COLOR),
    profileUrl: localStorage.getItem(LS_PROFILE_URL),
    avatar: localStorage.getItem(LS_AVATAR),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(readSession);

  const setAuth = (
    userId: string,
    tenantId: string,
    email: string,
    fullName: string,
    role = "",
    orgName = "",
    orgLogoUrl = "",
    orgPlan = "",
    orgColor = "",
    profileUrl="",
    avatar="",
  ) => {
    localStorage.setItem(LS_USER_ID, userId);
    localStorage.setItem(LS_TENANT_ID, tenantId);
    localStorage.setItem(LS_EMAIL, email);
    localStorage.setItem(LS_FULL_NAME, fullName);
    localStorage.setItem(LS_ROLE, role);
    localStorage.setItem(LS_ORG_NAME, orgName);
    localStorage.setItem(LS_ORG_LOGO_URL, orgLogoUrl);
    localStorage.setItem(LS_ORG_PLAN, orgPlan);
    localStorage.setItem(LS_ORG_COLOR, orgColor);
        localStorage.setItem(LS_PROFILE_URL, profileUrl);
    localStorage.setItem(LS_AVATAR, avatar);
    setAuthState({
      userId,
      tenantId,
      email,
      fullName,
      role,
      orgName,
      orgLogoUrl,
      orgPlan,
      orgColor,
      profileUrl,
      avatar,
    });
  };

  const setOrgBranding = (branding: Partial<OrgBrandingData>) => {
    if (branding.orgName !== undefined)
      localStorage.setItem(LS_ORG_NAME, branding.orgName);
    if (branding.orgLogoUrl !== undefined)
      localStorage.setItem(LS_ORG_LOGO_URL, branding.orgLogoUrl);
    if (branding.orgPlan !== undefined)
      localStorage.setItem(LS_ORG_PLAN, branding.orgPlan);
    if (branding.orgColor !== undefined)
      localStorage.setItem(LS_ORG_COLOR, branding.orgColor);
    setAuthState((prev) => ({ ...prev, ...branding }));
  };

    const setProfileImage = (profileUrl: string, avatar = "") => {
    localStorage.setItem(LS_PROFILE_URL, profileUrl);
    localStorage.setItem(LS_AVATAR, avatar);
    setAuthState((prev) => ({ ...prev, profileUrl, avatar }));
  };
  const clearAuth = () => {
    [
      LS_USER_ID,
      LS_TENANT_ID,
      LS_EMAIL,
      LS_FULL_NAME,
      LS_ROLE,
      LS_ORG_NAME,
      LS_ORG_LOGO_URL,
      LS_ORG_PLAN,
      LS_ORG_COLOR,
      LS_PROFILE_URL,
      LS_AVATAR,
    ].forEach((k) => localStorage.removeItem(k));
    localStorage.removeItem("zotra_token");
    localStorage.removeItem("zotra_refresh_token");
    localStorage.removeItem("zotra_saved_session");
    setAuthState({
      userId: null,
      tenantId: null,
      email: null,
      fullName: null,
      role: null,
      orgName: null,
      orgLogoUrl: null,
      orgPlan: null,
      orgColor: null,
      profileUrl: null,
      avatar: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth,
        setOrgBranding,
        setProfileImage,
        clearAuth,
        isAuthenticated: !!auth.userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
