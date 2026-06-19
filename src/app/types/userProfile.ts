import { useState, useEffect } from "react";
import { getToken } from "../../services/api";
import { baseUrl } from "../utils/utils";

export interface UserProfile {
  userId: string;
  tenantId: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatarUrl?: string;
  tenantName?: string;
  workspaceName?: string;
  phone?: string;
  department?: string;
  company?: string;
}

interface UseUserProfileResult {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const SESSION_KEY = "zotra_saved_session";

function getIdsFromStorage(): {
  userId: string;
  tenantId: string;
  email: string;
  fullName: string;
  role: string;
  orgName: string;
  profileUrl: string;
  avatar: string;
} {
  // Read from localStorage (AuthContext now writes here, survives page reloads)
  const userId = localStorage.getItem("zotra_userId") ?? "";
  const tenantId = localStorage.getItem("zotra_tenantId") ?? "";
  const email = localStorage.getItem("zotra_email") ?? "";
  const fullName = localStorage.getItem("zotra_fullName") ?? "";
  const role = localStorage.getItem("zotra_role") ?? "";
  const orgName = localStorage.getItem("zotra_orgName") ?? "";
  const profileUrl = localStorage.getItem("zotra_profileUrl") ?? "";
  const avatar = localStorage.getItem("zotra_avatar") ?? "";

  if (userId)
    return {
      userId,
      tenantId,
      email,
      fullName,
      role,
      orgName,
      profileUrl,
      avatar,
    };

  // Fallback: "Continue as" saved session
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw)
      return {
        userId: "",
        tenantId: "",
        email: "",
        fullName: "",
        role: "",
        orgName: "",
        profileUrl: "",
        avatar: "",
      };
    const s = JSON.parse(raw);
    if (Date.now() - (s.savedAt ?? 0) > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY);
      return {
        userId: "",
        tenantId: "",
        email: "",
        fullName: "",
        role: "",
        orgName: "",
        profileUrl: "",
        avatar: "",
      };
    }
    return {
      userId: s.userId ?? "",
      tenantId: s.tenantId ?? "",
      email: s.email ?? "",
      fullName: s.fullName ?? "",
      role: s.role ?? "",
      orgName: s.orgName ?? "",
      profileUrl: "",
      avatar: "",
    };
  } catch {
    return {
      userId: "",
      tenantId: "",
      email: "",
      fullName: "",
      role: "",
      orgName: "",
      profileUrl: "",
      avatar: "",
    };
  }
}

export function useUserProfile(): UseUserProfileResult {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extracted so it can be called both on mount and on profile-updated event
  async function loadProfile(signal: AbortSignal) {
    const {
      userId,
      tenantId,
      email,
      fullName,
      role,
      orgName,
      profileUrl,
      avatar,
    } = getIdsFromStorage();

    if (!userId) {
      setLoading(false);
      return;
    }

    const initialAvatarUrl = profileUrl || avatar || undefined;
    setProfile(
      (prev) =>
        prev ?? {
          userId,
          tenantId,
          email,
          displayName: fullName || email.split("@")[0],
          role,
          tenantName: orgName,
          avatarUrl: initialAvatarUrl,
        },
    );

    const token = getToken();
    try {
      const res = await fetch(`${baseUrl()}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal,
      });

      const raw = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          [
            "zotra_userId",
            "zotra_tenantId",
            "zotra_email",
            "zotra_fullName",
            "zotra_role",
            "zotra_orgName",
            "zotra_profileUrl",
            "zotra_avatar",
            "zotra_token",
            "zotra_refresh_token",
            "zotra_saved_session",
          ].forEach((k) => localStorage.removeItem(k));
          window.location.href = "/login";
          return;
        }
        console.warn(
          "[Zotra] Profile API returned",
          res.status,
          "— using session data only.",
        );
        return;
      }

      const data = raw as Record<string, unknown>;
      const str = (v: unknown) => (typeof v === "string" ? v : "");

      // Priority: localStorage (written by PanelProfile after save) > API
      const latestProfileUrl = localStorage.getItem("zotra_profileUrl") ?? "";
      const latestAvatar = localStorage.getItem("zotra_avatar") ?? "";
      const apiProfileUrl = str(
        data.profileUrl ?? data.avatarUrl ?? data.avatar_url ?? data.picture,
      );
      const resolvedAvatarUrl =
        latestProfileUrl || latestAvatar || apiProfileUrl || undefined;

      setProfile({
        userId: str(data.userId ?? data.rowKey ?? userId),
        tenantId: str(data.tenantId ?? data.partitionKey ?? tenantId),
        email: str(data.email ?? email),
        displayName: str(data.fullName ?? fullName) || email.split("@")[0],
        firstName: str(data.firstName ?? data.first_name),
        lastName: str(data.lastName ?? data.last_name),
        role: str(data.jobRole ?? role),
        avatarUrl: resolvedAvatarUrl,
        tenantName: str(data.tenantName ?? data.orgName ?? orgName),
        workspaceName: str(data.workspaceName),
        phone: str(data.phone),
        department: str(data.department),
        company: str(data.company ?? data.companyName),
      });

      console.log("[Zotra] Profile enriched from API ✓");
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      console.warn("[Zotra] Profile API fetch failed:", (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadProfile(controller.signal);

    // Re-run whenever PanelProfile saves successfully
    const handleProfileUpdated = () => {
      const controller2 = new AbortController();
      loadProfile(controller2.signal);
    };
    window.addEventListener("zotra:profile-updated", handleProfileUpdated);

    return () => {
      controller.abort();
      window.removeEventListener("zotra:profile-updated", handleProfileUpdated);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { profile, loading, error };
}
export function getAvatarInitials(profile: UserProfile | null): string {
  if (!profile) return "Z";
  if (profile.firstName && profile.lastName) {
    return (profile.firstName[0] + profile.lastName[0]).toUpperCase();
  }
  if (profile.displayName?.trim()) {
    const parts = profile.displayName.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  if (profile.email) return profile.email.slice(0, 2).toUpperCase();
  return "Z";
}
