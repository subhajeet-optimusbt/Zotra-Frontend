import React, { useState, useCallback, useRef, useEffect } from "react";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";

// ── Session ───────────────────────────────────────────────────────────────────

const SESSION_KEY = "zotra_saved_session";

function getTenantId(): string {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return "";
    const s = JSON.parse(raw);
    if (Date.now() - (s.savedAt ?? 0) > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY);
      return "";
    }
    return s.tenantId ?? "";
  } catch {
    return "";
  }
}

function getSessionOrg() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "{}");
    const name: string =
      s.orgName ?? s.organisationName ?? s.tenantId ?? "My Organisation";
    return { name, initials: name.substring(0, 2).toUpperCase() };
  } catch {
    return { name: "My Organisation", initials: "MO" };
  }
}

// The saved login session already carries the current user's id/name
// (see SavedSession in pages/Login.tsx) — reused here so chat messages we
// sent can be told apart from everyone else's.
function getSessionUser(): { userId: string; email: string; fullName: string } {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "{}");
    return {
      userId: s.userId ?? "",
      email: s.email ?? "",
      fullName: s.fullName ?? "",
    };
  } catch {
    return { userId: "", email: "", fullName: "" };
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    accept: "*/*",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function inboxFetch<T>(
  path: string,
  query?: Record<string, string>,
  init?: RequestInit,
): Promise<T> {
  const clean = Object.fromEntries(
    Object.entries(query ?? {}).filter(([, v]) => v !== "" && v != null),
  );
  const qs = Object.keys(clean).length ? "?" + new URLSearchParams(clean) : "";
  const res = await apiFetch(`${baseUrl()}${path}${qs}`, {
    ...init,
    headers: {
      ...authHeaders(),
      ...(init?.headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) {
    let d = res.status.toString();
    try {
      const b = await res.json();
      d = b?.detail ?? b?.title ?? b?.error ?? d;
    } catch {
      /* */
    }
    throw new Error(`${res.status}: ${d}`);
  }
  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type MessageSide = "org" | "cust";
type NavFolder = "inbox" | "sent" | "calendar" | "chat";
type PortalView = "org" | "cust";

interface Tag {
  label: string;
  cls: string;
}
interface Org {
  id: string;
  name: string;
  initials: string;
}
interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  attendees: string;
  organizer: string;
  account: string;
  status: "pending" | "confirmed" | "proposed" | "declined" | "cancelled";
  createdBy: string;
  week: "this" | "next" | "future";
}
interface Message {
  id: string;
  side: MessageSide;
  initials: string;
  avatarColor: string;
  from: string;
  label: string;
  time: string;
  body: string;
}
interface Thread {
  id: string;
  folder: NavFolder;
  from: string;
  email: string;
  initials: string;
  avatarColor: string;
  time: string;
  fullTime: string;
  subject: string;
  preview: string;
  tags: Tag[];
  unread: boolean;
  direction: string;
  to: string;
  messages: Message[];
  composerSide: MessageSide;
}
interface MailMessageOut {
  message_id: string;
  organisation_id: string;
  direction: "inbound" | "outbound";
  from_email: string;
  from_name: string;
  to_emails: string;
  subject: string;
  body: string;
  thread_id: string;
  processing_status: "new" | "processing" | "processed" | "ignored";
  sent_at: string | null;
  created_at: string;
}
interface CalEventOut {
  id?: string;
  event_id?: string;
  eventId?: string;
  title: string;
  date: string;
  time: string;
  startTime?: string;
  start_time?: string;
  endTime?: string;
  end_time?: string;
  attendeeEmails?: string;
  attendee_emails?: string;
  organizerEmail?: string;
  organizer_email?: string;
  account_id?: string | null;
  accountId?: string | null;
  status: "pending" | "confirmed" | "proposed" | "declined" | "cancelled";
  createdBy?: string;
  created_by?: string;
  week: "this" | "next" | "future";
}

// ── Tokens ────────────────────────────────────────────────────────────────────

const C = {
  p: "var(--p,#5552C9)",
  pGrad: "linear-gradient(135deg,#5552C9 0%,#7B78E8 100%)",
  pSoft: "var(--pp,#EEEEFF)",
  pDark: "var(--pd,#3C3489)",
  pGlow: "rgba(85,82,201,.22)",
  t: "var(--t,#0F6E56)",
  tSoft: "var(--tp,#E4F7F1)",
  tDark: "var(--td,#085041)",
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBdr: "#FDE68A",
  red: "#DC2626",
  redBg: "#FEF2F2",
  green: "#059669",
  greenBg: "#ECFDF5",
  ink: "var(--ink,#0F0E17)",
  ink2: "var(--ink2,#1F2937)",
  ink3: "var(--ink3,#4B5563)",
  ink4: "var(--ink4,#9CA3AF)",
  bg: "var(--bg,#F7F8FA)",
  bg2: "var(--bg2,#FFFFFF)",
  bg3: "var(--bg3,#F1F2F5)",
  brd: "var(--brd,#E5E7EB)",
  brd2: "var(--brd2,#D1D5DB)",
};

const STATUS_MAP: Record<
  string,
  { bg: string; color: string; bdr: string; dot: string; label: string }
> = {
  pending: {
    bg: C.amberBg,
    color: C.amber,
    bdr: C.amberBdr,
    dot: C.amber,
    label: "Pending",
  },
  confirmed: {
    bg: C.greenBg,
    color: C.green,
    bdr: "#6EE7B7",
    dot: C.green,
    label: "Confirmed",
  },
  proposed: {
    bg: C.pSoft,
    color: C.pDark,
    bdr: "#C4B5FD",
    dot: C.p,
    label: "Proposed",
  },
  declined: {
    bg: C.redBg,
    color: C.red,
    bdr: "#FCA5A5",
    dot: C.red,
    label: "Declined",
  },
  cancelled: {
    bg: C.bg3,
    color: C.ink4,
    bdr: C.brd2,
    dot: C.ink4,
    label: "Cancelled",
  },
};

// ── Adapters ──────────────────────────────────────────────────────────────────

function adaptMessage(m: MailMessageOut): Thread {
  if (m.sent_at === "") m.sent_at = null;
  if ((m.created_at as string) === "") m.created_at = new Date().toISOString();
  const name = m.from_name || m.from_email || "Unknown";
  const ts = m.sent_at || m.created_at;
  const display = ts
    ? new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const fullTime = ts
    ? new Date(ts).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  return {
    id: m.message_id,
    folder: m.direction === "outbound" ? "sent" : "inbox",
    from: name,
    email: m.from_email,
    initials: name.substring(0, 2).toUpperCase(),
    avatarColor: m.direction === "outbound" ? C.p : C.t,
    time: display,
    fullTime,
    subject: m.subject || "(no subject)",
    preview: (m.body || "").replace(/<[^>]+>/g, "").substring(0, 110),
    tags: [],
    unread: m.processing_status === "new",
    direction: m.direction === "outbound" ? "Outbound" : "Inbound",
    to: m.to_emails || "",
    messages: [],
    composerSide: "org",
  };
}

function adaptToMessage(m: MailMessageOut): Message {
  if (m.sent_at === "") m.sent_at = null;
  if ((m.created_at as string) === "") m.created_at = new Date().toISOString();
  return {
    id: m.message_id,
    side: m.direction === "outbound" ? "org" : "cust",
    initials: (m.from_name || m.from_email || "UN")
      .substring(0, 2)
      .toUpperCase(),
    avatarColor: m.direction === "outbound" ? C.p : C.t,
    from: m.from_name || m.from_email,
    label: m.direction === "outbound" ? "You" : "Customer",
    time: m.sent_at
      ? new Date(m.sent_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    body: m.body || "",
  };
}

function adaptCalEvent(e: CalEventOut): CalEvent {
  return {
    id: e.id ?? e.event_id ?? e.eventId ?? `${e.title}-${e.date}-${e.time}`,
    title: e.title,
    date: e.date,
    time: e.time,
    startTime: e.startTime ?? e.start_time ?? "",
    endTime: e.endTime ?? e.end_time ?? "",
    attendees: e.attendeeEmails ?? e.attendee_emails ?? "",
    organizer: e.organizerEmail ?? e.organizer_email ?? "",
    account: e.account_id ?? e.accountId ?? "",
    status: e.status,
    createdBy: e.createdBy ?? e.created_by ?? "",
    week: e.week,
  };
}

// ── Primitives ────────────────────────────────────────────────────────────────

const Skel: React.FC<{
  w: number | string;
  h: number;
  r?: number | string;
  d?: number;
}> = ({ w, h, r = 6, d = 0 }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: C.bg3,
      flexShrink: 0,
      animation: "ti-sh 1.6s ease-in-out infinite",
      animationDelay: `${d}s`,
    }}
  />
);

const Av: React.FC<{
  initials: string;
  color: string;
  size?: number;
  ring?: boolean;
  src?: string;
}> = ({ initials, color, size = 34, ring = false, src }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size < 32 ? 10 : 12,
      fontWeight: 700,
      flexShrink: 0,
      letterSpacing: ".02em",
      boxShadow: ring ? `0 0 0 2.5px ${C.bg2}, 0 0 0 4px ${color}` : "none",
      transition: "box-shadow .15s",
      overflow: "hidden",
    }}
  >
    {src ? (
      <img
        src={src}
        alt={initials}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      initials
    )}
  </div>
);

const Pill: React.FC<{ status: string }> = ({ status }) => {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 20,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.bdr}`,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {s.label}
    </span>
  );
};

// ── Compose field row helper ──────────────────────────────────────────────────

const FieldRow: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}> = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 22px",
      borderBottom: `1px solid ${C.brd}`,
    }}
  >
    <label
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: C.ink4,
        minWidth: 56,
        textTransform: "uppercase" as const,
        letterSpacing: ".05em",
      }}
    >
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: 13.5,
        fontFamily: "inherit",
        color: C.ink,
        background: "transparent",
      }}
    />
  </div>
);

// ── Thread detail panel ───────────────────────────────────────────────────────

const ThreadDetail: React.FC<{
  thread: Thread;
  orgId: string;
  portalView: PortalView;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ thread, orgId, portalView, onClose, onToast }) => {
  const [msgs, setMsgs] = useState<Message[]>(thread.messages);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isCustomerView = portalView === "cust";

  const scrollBottom = () =>
    setTimeout(
      () =>
        bodyRef.current?.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior: "smooth",
        }),
      80,
    );

  useEffect(() => {
    setLoading(true);
    inboxFetch<{ messages: MailMessageOut[] }>("/test/mailbox/messages", {
      thread_id: thread.id,
    })
      .then((res) => {
        setMsgs((res.messages || []).map(adaptToMessage));
        scrollBottom();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [thread.id]);

  const send = async () => {
    if (!isCustomerView) {
      onToast("Switch to Customer view to reply");
      return;
    }
    const text = reply.trim();
    if (!text) {
      onToast("Write a message first");
      return;
    }
    const fromEmail = thread.email || thread.from || "customer@unknown.com";
    const fromName = thread.from || thread.email || "Customer";
    const direction = thread.direction === "Inbound" ? "outbound" : "inbound";
    setSending(true);
    try {
      await inboxFetch("/test/mailbox/messages", undefined, {
        method: "POST",
        body: JSON.stringify({
          direction,
          fromEmail,
          fromName,
          toEmails: "info@zotra.com",
          subject: thread.subject || "(no subject)",
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
          threadId: thread.id,
          createdBy: "tester",
        }),
      });
      setMsgs((p) => [
        ...p,
        {
          id: "m" + Date.now(),
          side: "cust",
          initials: thread.initials,
          avatarColor: C.t,
          from: thread.from,
          label: "Customer",
          time: "Just now",
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
        },
      ]);
      setReply("");
      scrollBottom();
      onToast("Reply sent ✓");
    } catch (err: any) {
      onToast(err?.message ?? "Failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 24px 16px",
          borderBottom: `1px solid ${C.brd}`,
          background: C.bg2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <button onClick={onClose} className="ti-back-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background: thread.direction === "Inbound" ? C.tSoft : C.pSoft,
                color: thread.direction === "Inbound" ? C.tDark : C.pDark,
                border: `1px solid ${thread.direction === "Inbound" ? "#A7F3D0" : "#C4B5FD"}`,
              }}
            >
              {thread.direction}
            </span>
            <span
              style={{ fontSize: 11, color: C.ink4, fontFamily: "monospace" }}
            >
              {thread.fullTime}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <Av initials={thread.initials} color={thread.avatarColor} size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-.4px",
                color: C.ink,
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              {thread.subject}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: C.ink2 }}>
                {thread.from}
              </span>
              <span
                style={{ fontSize: 12, color: C.ink4, fontFamily: "monospace" }}
              >
                &lt;{thread.email}&gt;
              </span>
              {thread.to && (
                <span style={{ fontSize: 11, color: C.ink4 }}>
                  → {thread.to}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={bodyRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 24px 16px",
          background: C.bg,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {loading
            ? [0, 0.12, 0.24].map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                  }}
                >
                  <Skel w={36} h={36} r="50%" d={d} />
                  <div
                    style={{
                      flex: 1,
                      maxWidth: "68%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 7,
                    }}
                  >
                    <Skel w="35%" h={10} d={d + 0.05} />
                    <Skel w="100%" h={64} r={12} d={d + 0.08} />
                  </div>
                </div>
              ))
            : msgs.map((msg, idx) => {
                const mine = msg.side === "org";
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-end",
                      flexDirection: mine ? "row-reverse" : "row",
                      animation:
                        idx === msgs.length - 1
                          ? "ti-pop .22s cubic-bezier(.16,1,.3,1)"
                          : undefined,
                    }}
                  >
                    <Av
                      initials={msg.initials}
                      color={msg.avatarColor}
                      size={30}
                    />
                    <div
                      style={{
                        maxWidth: "68%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        alignItems: mine ? "flex-end" : "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: C.ink4,
                          paddingLeft: mine ? 0 : 2,
                          paddingRight: mine ? 2 : 0,
                        }}
                      >
                        {msg.from} · {msg.time}
                      </span>
                      <div
                        className="ti-msg-body"
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.75,
                          padding: "11px 16px",
                          borderRadius: mine
                            ? "16px 4px 16px 16px"
                            : "4px 16px 16px 16px",
                          color: mine ? "#fff" : C.ink2,
                          background: mine ? C.pGrad : C.bg2,
                          boxShadow: mine
                            ? `0 4px 14px ${C.pGlow}`
                            : `0 1px 3px rgba(0,0,0,.06), inset 0 0 0 1px ${C.brd}`,
                        }}
                        dangerouslySetInnerHTML={{ __html: msg.body }}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Composer */}
      <div
        style={{
          flexShrink: 0,
          background: C.bg2,
          borderTop: `1px solid ${C.brd}`,
          padding: "14px 24px 18px",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {!isCustomerView ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 16px",
                borderRadius: 12,
                background: C.amberBg,
                border: `1px solid ${C.amberBdr}`,
              }}
            >
              <span style={{ fontSize: 14 }}>💡</span>
              <span style={{ fontSize: 13, color: C.amber, fontWeight: 600 }}>
                Switch to{" "}
                <strong style={{ fontWeight: 800 }}>Customer view</strong> to
                reply to this thread
              </span>
            </div>
          ) : (
            <div className="ti-composer">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
                }}
                placeholder="Write a reply… (⌘↵ to send)"
                rows={3}
                style={{
                  display: "block",
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "13px 16px 6px",
                  fontSize: 13.5,
                  resize: "none",
                  lineHeight: 1.7,
                  color: C.ink,
                  background: "transparent",
                  fontFamily: "inherit",
                  minHeight: 78,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px 10px",
                }}
              >
                <span style={{ fontSize: 11.5, color: C.ink4 }}>
                  From{" "}
                  <span style={{ color: C.t, fontWeight: 600 }}>
                    {thread.email}
                  </span>
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setReply("")} className="ti-btn-ghost">
                    Discard
                  </button>
                  <button
                    onClick={send}
                    disabled={sending}
                    className={
                      sending ? "ti-btn-primary disabled" : "ti-btn-primary"
                    }
                  >
                    {sending ? "Sending…" : "Send reply"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Compose modal ─────────────────────────────────────────────────────────────

const ComposeModal: React.FC<{
  orgId: string;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ orgId, onClose, onToast }) => {
  const [name, setName] = useState(""); // ← NEW
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const send = async () => {
    const fromTrimmed = from.trim();
    const subjectTrimmed = subject.trim();
    if (!fromTrimmed || !subjectTrimmed) {
      onToast("Fill in From and Subject");
      return;
    }
    setSending(true);
    try {
      await inboxFetch("/test/mailbox/messages", undefined, {
        method: "POST",
        body: JSON.stringify({
          direction: "outbound",
          fromEmail: fromTrimmed,
          fromName: name.trim() || fromTrimmed, // ← use name if provided, fall back to email
          toEmails: "info@zotra.com",
          subject: subjectTrimmed,
          body: `<p>${body.replace(/\n/g, "<br>")}</p>`,
          createdBy: "tester",
        }),
      });
      onToast("Sent from " + (name.trim() || fromTrimmed));
      onClose();
    } catch (err: any) {
      onToast(err?.message ?? "Failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,20,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: C.bg2,
          borderRadius: 18,
          boxShadow: "0 24px 64px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.05)",
          width: 580,
          maxWidth: "94vw",
          overflow: "hidden",
          animation: "ti-rise .2s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 22px",
            borderBottom: `1px solid ${C.brd}`,
            background: `linear-gradient(to bottom, ${C.tSoft}, ${C.bg2})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: `linear-gradient(135deg,#0F6E56 0%,#18A37E 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
                New message
              </div>
              <div style={{ fontSize: 11, color: C.tDark, fontWeight: 600 }}>
                Simulating inbound from customer
              </div>
            </div>
          </div>
          <button onClick={onClose} className="ti-close-btn">
            ✕
          </button>
        </div>

        {/* To (fixed) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "11px 22px",
            borderBottom: `1px solid ${C.brd}`,
            background: C.bg3,
          }}
        >
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.ink4,
              minWidth: 56,
              textTransform: "uppercase" as const,
              letterSpacing: ".05em",
            }}
          >
            To
          </label>
          <span style={{ fontSize: 13, color: C.ink4, fontWeight: 500 }}>
            info@zotra.com
          </span>
        </div>

        {/* Name / From / Subject fields */}
        <FieldRow
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Customer name…"
        />
        <FieldRow
          label="From"
          value={from}
          onChange={setFrom}
          placeholder="customer@company.com"
          type="email"
        />
        <FieldRow
          label="Subject"
          value={subject}
          onChange={setSubject}
          placeholder="Subject line…"
        />

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message…"
          style={{
            display: "block",
            width: "100%",
            border: "none",
            outline: "none",
            padding: "14px 22px",
            fontSize: 13.5,
            fontFamily: "inherit",
            resize: "none",
            minHeight: 160,
            color: C.ink,
            lineHeight: 1.75,
            background: "transparent",
            boxSizing: "border-box",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 22px 16px",
            borderTop: `1px solid ${C.brd}`,
            justifyContent: "flex-end",
            background: C.bg,
          }}
        >
          <button onClick={onClose} className="ti-btn-ghost">
            Discard
          </button>
          <button
            onClick={send}
            disabled={sending}
            className={sending ? "ti-btn-primary disabled" : "ti-btn-primary"}
            style={{
              background: "linear-gradient(135deg,#0F6E56 0%,#18A37E 100%)",
            }}
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Calendar ──────────────────────────────────────────────────────────────────

// Deterministic avatar colour so the same attendee always renders the same
// colour without needing a real people/profile API.
const AV_PALETTE = [
  "#4B48C8",
  "#00C2A8",
  "#DC2626",
  "#2563EB",
  "#B45309",
  "#7C3AED",
];
function seededColor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_PALETTE[h % AV_PALETTE.length];
}
// Organiser + attendees, deduped, so "who else can join" always has at
// least the organiser to show — previously an event created without
// filling the Attendees field rendered no participants at all.
function combineParticipants(
  organizer: string,
  attendeesRaw: string,
): { initials: string; color: string; email: string; label: string }[] {
  const raw = [organizer, attendeesRaw].filter(Boolean).join(",");
  const seen = new Set<string>();
  return raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s && !seen.has(s.toLowerCase()) && seen.add(s.toLowerCase()))
    .slice(0, 5)
    .map((entry) => {
      const nameGuess = entry.split("@")[0].replace(/[._]/g, " ");
      const parts = nameGuess.trim().split(/\s+/);
      const initials = (parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "");
      const label = nameGuess.replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        initials: initials.toUpperCase(),
        color: seededColor(entry),
        email: entry,
        label,
      };
    });
}

// Placeholder meeting link, deterministic per event so it stays stable
// across reloads. Swap for a real video-provider link once one's wired up.
function meetingLinkFor(id: string): string {
  const slug = id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10) || "demo";
  return `https://meet.zotra.app/${slug}`;
}

// Buckets a date into the same "this / next / future" week vocabulary the
// backend already uses, so a created event lands in the right section
// without asking the tester to classify it by hand.
function deriveWeek(dateStr: string): "this" | "next" | "future" {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "this";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diffDays < 7) return "this";
  if (diffDays < 14) return "next";
  return "future";
}

function formatFriendlyTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m ?? 0).padStart(2, "0")} ${period}`;
}

const ORG_TEST_EMAIL = "team@zotra.com";
const CUSTOMER_TEST_EMAIL = "info@zotra.com";

// ── Create-event modal ───────────────────────────────────────────────────────
// Mirrors ComposeModal's org/customer simulation pattern: which side you're
// viewing from decides who organises vs who's invited, same as how Compose
// only simulates an inbound customer message. Both directions are useful
// here (either side can schedule a meeting), so the button stays visible
// for both — only the defaults + copy adapt to the active portal.

const CreateEventModal: React.FC<{
  view: PortalView;
  onClose: () => void;
  onCreated: () => void;
  onToast: (m: string) => void;
}> = ({ view, onClose, onCreated, onToast }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(30);
  const [organizerEmail, setOrganizerEmail] = useState(
    view === "org" ? ORG_TEST_EMAIL : "",
  );
  const [attendeeEmails, setAttendeeEmails] = useState(
    view === "org" ? "" : CUSTOMER_TEST_EMAIL,
  );
  const [status, setStatus] = useState<CalEvent["status"]>("pending");
  const [saving, setSaving] = useState(false);

  const create = async () => {
    const titleTrimmed = title.trim();
    const organizerTrimmed = organizerEmail.trim();
    if (!titleTrimmed || !date || !time || !organizerTrimmed) {
      onToast("Fill in Title, Date, Time and Organiser");
      return;
    }
    setSaving(true);
    try {
      const startTime = new Date(`${date}T${time}:00`);
      const endTime = new Date(startTime.getTime() + duration * 60000);
      await inboxFetch("/test/calendar/events", undefined, {
        method: "POST",
        body: JSON.stringify({
          title: titleTrimmed,
          date,
          time: formatFriendlyTime(time),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          attendeeEmails: attendeeEmails.trim(),
          organizerEmail: organizerTrimmed,
          status,
          createdBy: "tester",
          week: deriveWeek(date),
        }),
      });
      onToast("Event created");
      onCreated();
      onClose();
    } catch (err: any) {
      onToast(err?.message ?? "Failed to create event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,20,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: C.bg2,
          borderRadius: 18,
          boxShadow: "0 24px 64px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.05)",
          width: 560,
          maxWidth: "94vw",
          overflow: "hidden",
          animation: "ti-rise .2s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 22px",
            borderBottom: `1px solid ${C.brd}`,
            background: `linear-gradient(to bottom, ${C.pSoft}, ${C.bg2})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: C.pGrad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
                New event
              </div>
              <div style={{ fontSize: 11, color: C.pDark, fontWeight: 600 }}>
                {view === "org"
                  ? "Scheduling as your organisation"
                  : "Simulating a customer meeting request"}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="ti-close-btn">
            ✕
          </button>
        </div>

        <FieldRow
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Meeting title…"
        />

        <div style={{ display: "flex", borderBottom: `1px solid ${C.brd}` }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.brd}` }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 22px",
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.ink4,
                  minWidth: 40,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  color: C.ink,
                  background: "transparent",
                }}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 22px",
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.ink4,
                  minWidth: 40,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}
              >
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  color: C.ink,
                  background: "transparent",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "11px 22px",
            borderBottom: `1px solid ${C.brd}`,
          }}
        >
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.ink4,
              minWidth: 56,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{
              border: "none",
              outline: "none",
              fontSize: 13.5,
              fontFamily: "inherit",
              color: C.ink,
              background: "transparent",
            }}
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>1 hr</option>
          </select>
        </div>

        <FieldRow
          label="Organiser"
          value={organizerEmail}
          onChange={setOrganizerEmail}
          placeholder={
            view === "org" ? "team@yourcompany.com" : "customer@company.com"
          }
          type="email"
        />
        <FieldRow
          label="Attendees"
          value={attendeeEmails}
          onChange={setAttendeeEmails}
          placeholder="comma-separated emails…"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "11px 22px",
          }}
        >
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.ink4,
              minWidth: 56,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CalEvent["status"])}
            style={{
              border: "none",
              outline: "none",
              fontSize: 13.5,
              fontFamily: "inherit",
              color: C.ink,
              background: "transparent",
            }}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="proposed">Proposed</option>
            <option value="declined">Declined</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 22px 16px",
            borderTop: `1px solid ${C.brd}`,
            justifyContent: "flex-end",
            background: C.bg,
          }}
        >
          <button onClick={onClose} className="ti-btn-ghost">
            Discard
          </button>
          <button
            onClick={create}
            disabled={saving}
            className={saving ? "ti-btn-primary disabled" : "ti-btn-primary"}
          >
            {saving ? "Creating…" : "Create event"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarView: React.FC<{
  events: CalEvent[];
  loading: boolean;
  view: PortalView;
  onRefresh: () => void;
  onToast: (m: string) => void;
}> = ({ events, loading, view, onRefresh, onToast }) => {
  const [createOpen, setCreateOpen] = useState(false);
  const weeks: { label: string; key: CalEvent["week"] }[] = [
    { label: "This week", key: "this" },
    { label: "Next week", key: "next" },
    { label: "Further ahead", key: "future" },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 28px",
          borderBottom: `1px solid ${C.brd}`,
          background: C.bg2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 12.5, color: C.ink4 }}>
          {loading
            ? "Loading meetings…"
            : `${events.length} meeting${events.length !== 1 ? "s" : ""} scheduled`}
        </div>
        <button onClick={() => setCreateOpen(true)} className="ti-btn-primary">
          + New event
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 36px" }}>
        <div style={{ maxWidth: 780 }}>
          {weeks.map(({ label, key }) => {
            const evs = events.filter((e) => e.week === key);
            if (!loading && evs.length === 0 && key === "future") return null;
            return (
              <section key={key} style={{ marginBottom: 36 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: ".09em",
                      color: C.ink4,
                    }}
                  >
                    {label}
                  </span>
                  {!loading && evs.length > 0 && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "1px 8px",
                        borderRadius: 20,
                        background: C.pSoft,
                        color: C.p,
                      }}
                    >
                      {evs.length}
                    </span>
                  )}
                  <div style={{ flex: 1, height: 1, background: C.brd }} />
                </div>

                {loading ? (
                  [0, 1].map((i) => (
                    <div
                      key={i}
                      style={{
                        background: C.bg2,
                        border: `1px solid ${C.brd}`,
                        borderRadius: 12,
                        padding: "16px 18px",
                        marginBottom: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Skel w="48%" h={13} d={i * 0.1} />
                        <Skel w={72} h={22} r={20} d={i * 0.1 + 0.06} />
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Skel w={80} h={10} d={i * 0.1 + 0.1} />
                        <Skel w={130} h={10} d={i * 0.1 + 0.14} />
                      </div>
                    </div>
                  ))
                ) : evs.length === 0 ? (
                  <p style={{ fontSize: 13, color: C.ink4, margin: "6px 0" }}>
                    Nothing scheduled.
                  </p>
                ) : (
                  evs.map((ev) => {
                    const st = STATUS_MAP[ev.status] ?? STATUS_MAP.pending;
                    const attendees = combineParticipants(
                      ev.organizer,
                      ev.attendees,
                    );
                    const canJoin = ev.status !== "cancelled";
                    const link = meetingLinkFor(ev.id);
                    const copyLink = async () => {
                      try {
                        await navigator.clipboard.writeText(link);
                        onToast("Meeting link copied");
                      } catch {
                        onToast(link);
                      }
                    };
                    return (
                      <div
                        key={ev.id}
                        className="ti-cal-card"
                        style={{
                          background: C.bg2,
                          border: `1px solid ${C.brd}`,
                          borderLeft: `3px solid ${st.dot}`,
                          borderRadius: "0 12px 12px 0",
                          padding: "14px 18px",
                          marginBottom: 10,
                          opacity: ev.status === "cancelled" ? 0.5 : 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 10,
                              marginBottom: 8,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: C.ink,
                                letterSpacing: "-.1px",
                              }}
                            >
                              {ev.title}
                            </span>
                            <Pill status={ev.status} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 14,
                              alignItems: "center",
                              marginBottom: attendees.length ? 6 : 0,
                            }}
                          >
                            {ev.time && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: C.ink3,
                                  fontFamily: "monospace",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {ev.time}
                              </span>
                            )}
                            {ev.date && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: C.ink3,
                                  fontFamily: "monospace",
                                }}
                              >
                                {ev.date}
                              </span>
                            )}
                          </div>
                          {attendees.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {attendees.map((a, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      marginLeft: i === 0 ? 0 : -6,
                                      position: "relative",
                                      zIndex: attendees.length - i,
                                    }}
                                    title={a.email}
                                  >
                                    <Av
                                      initials={a.initials}
                                      color={a.color}
                                      size={22}
                                      ring
                                    />
                                  </span>
                                ))}
                              </span>
                              <span
                                style={{
                                  fontSize: 11.5,
                                  color: C.ink4,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {attendees.map((a) => a.label).join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                        {canJoin && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              flexShrink: 0,
                            }}
                          >
                            <button
                              onClick={copyLink}
                              title="Copy meeting link"
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                border: `1px solid ${C.brd}`,
                                background: C.bg,
                                color: C.ink3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                              </svg>
                            </button>
                            <button
                              onClick={copyLink}
                              className="ti-btn-primary"
                              style={{ padding: "7px 14px", fontSize: 12 }}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M23 7l-7 5 7 5V7z" />
                                <rect
                                  x="1"
                                  y="5"
                                  width="15"
                                  height="14"
                                  rx="2"
                                />
                              </svg>
                              Join
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </section>
            );
          })}
          {!loading && events.length === 0 && (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: C.ink4, marginBottom: 10 }}>
                No meetings yet — create one to see it appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {createOpen && (
        <CreateEventModal
          view={view}
          onClose={() => setCreateOpen(false)}
          onCreated={onRefresh}
          onToast={onToast}
        />
      )}
    </div>
  );
};

// ── Chat (channels) ──────────────────────────────────────────────────────────
// Wired to GET /team-chat/bootstrap for real channels/DMs/org members, plus
// live message history, sending, read-receipts and channel creation against
// the /team-chat/channels/* endpoints below. There's still no create-DM
// endpoint, so starting a fresh DM stays a local-only placeholder until one
// exists — everything else here is now backed by the real API.

interface TeamChatMember {
  userId: string;
  fullName: string;
  email: string;
  avatar: string;
}
interface TeamChatChannel {
  channelId: string;
  name: string;
  type: "channel" | "dm";
  topic: string | null;
  group: string | null;
  visibility: string;
  lastMessageAt: string | null;
  lastMessagePreview: string;
  unreadCount: number;
}
interface TeamChatBootstrap {
  orgMembers: TeamChatMember[];
  channels: TeamChatChannel[];
  dms: TeamChatChannel[];
}
interface TeamChatMessageOut {
  messageId: string;
  channelId: string;
  senderId: string;
  senderName: string;
  body: string;
  contentType: string;
  status: string;
  createdAt: string;
}
interface ChatMsg {
  from: string;
  initials: string;
  color: string;
  time: string;
  text: string;
  mine: boolean;
}

// ── Chat API helpers ──────────────────────────────────────────────────────────

function fetchChannelMessages(
  channelId: string,
): Promise<TeamChatMessageOut[]> {
  return inboxFetch<TeamChatMessageOut[]>(
    `/team-chat/channels/${channelId}/messages`,
  );
}

function postChannelMessage(
  channelId: string,
  body: string,
): Promise<TeamChatMessageOut> {
  return inboxFetch<TeamChatMessageOut>(
    `/team-chat/channels/${channelId}/messages`,
    undefined,
    {
      method: "POST",
      body: JSON.stringify({ body, contentType: "Text" }),
    },
  );
}

function markChannelRead(
  channelId: string,
  messageId: string,
): Promise<unknown> {
  return inboxFetch<unknown>(
    `/team-chat/channels/${channelId}/read`,
    undefined,
    {
      method: "PATCH",
      body: JSON.stringify({ messageId }),
    },
  );
}

function createTeamChannel(
  name: string,
  topic: string,
  group: string,
  visibility: string,
): Promise<TeamChatChannel> {
  return inboxFetch<TeamChatChannel>(`/team-chat/channels`, undefined, {
    method: "POST",
    body: JSON.stringify({ name, topic, group, visibility }),
  });
}

function relTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diffMs = Date.now() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const word = parts[0] ?? "?";
  return (word.length >= 2 ? word.slice(0, 2) : word).toUpperCase();
}

function findMember(
  name: string,
  members: TeamChatMember[],
): TeamChatMember | undefined {
  return members.find((m) => m.fullName.toLowerCase() === name.toLowerCase());
}

function adaptChatMsg(
  m: TeamChatMessageOut,
  currentUser: { userId: string; fullName: string },
): ChatMsg {
  const name = m.senderName || "Unknown";
  // Prefer matching by id, but fall back to a name match — some setups
  // have the chat service issue its own user ids that don't line up
  // byte-for-byte with the auth session's userId, and a silent id
  // mismatch would otherwise put every message on the wrong side.
  const mine =
    (!!currentUser.userId && m.senderId === currentUser.userId) ||
    (!!currentUser.fullName &&
      name.trim().toLowerCase() === currentUser.fullName.trim().toLowerCase());
  return {
    from: name,
    initials: initialsFrom(name),
    color: seededColor(m.senderId || name),
    time: m.createdAt
      ? new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    text: m.body,
    mine,
  };
}

// Most-recent-activity-first, same convention as every real chat client.
// Items with no lastMessageAt (freshly created, never messaged) sink to
// the bottom instead of jumbling the order.
function sortByRecency<T extends { lastMessageAt: string | null }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : -1;
    const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : -1;
    return tb - ta;
  });
}

const ChatSectionHeader: React.FC<{
  label: string;
  count: number;
  icon: React.ReactNode;
}> = ({ label, count, icon }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 6px 8px",
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: ".07em",
        color: C.ink4,
      }}
    >
      {icon}
      {label}
    </span>
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        color: C.ink4,
        background: C.bg3,
        borderRadius: 20,
        minWidth: 18,
        textAlign: "center",
        padding: "1px 6px",
      }}
    >
      {count}
    </span>
  </div>
);

// ── Create-channel modal ─────────────────────────────────────────────────────
// Full-featured counterpart to the quick "type a name in search to create"
// shortcut — surfaces every field POST /team-chat/channels accepts.

const CreateChannelModal: React.FC<{
  onClose: () => void;
  onCreated: (created: TeamChatChannel) => void;
  onToast: (m: string) => void;
}> = ({ onClose, onCreated, onToast }) => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [group, setGroup] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [saving, setSaving] = useState(false);

  const create = async () => {
    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      onToast("Give the channel a name");
      return;
    }
    setSaving(true);
    try {
      const created = await createTeamChannel(
        nameTrimmed,
        topic.trim(),
        group.trim(),
        visibility,
      );
      onToast(`Created #${created.name}`);
      onCreated(created);
      onClose();
    } catch (err: any) {
      onToast(err?.message ?? "Failed to create channel");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,20,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: C.bg2,
          borderRadius: 18,
          boxShadow: "0 24px 64px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.05)",
          width: 480,
          maxWidth: "94vw",
          overflow: "hidden",
          animation: "ti-rise .2s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 22px",
            borderBottom: `1px solid ${C.brd}`,
            background: `linear-gradient(to bottom, ${C.pSoft}, ${C.bg2})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: C.pGrad,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
                New channel
              </div>
              <div style={{ fontSize: 11, color: C.pDark, fontWeight: 600 }}>
                Organise conversations by topic or team
              </div>
            </div>
          </div>
          <button onClick={onClose} className="ti-close-btn">
            ✕
          </button>
        </div>

        <FieldRow
          label="Name"
          value={name}
          onChange={setName}
          placeholder="e.g. product-launch"
        />
        <FieldRow
          label="Topic"
          value={topic}
          onChange={setTopic}
          placeholder="What's this channel about? (optional)"
        />
        <FieldRow
          label="Group"
          value={group}
          onChange={setGroup}
          placeholder="Group label, e.g. eng (optional)"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "11px 22px",
          }}
        >
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.ink4,
              minWidth: 56,
              textTransform: "uppercase",
              letterSpacing: ".05em",
            }}
          >
            Access
          </label>
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "public" | "private")
            }
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 13.5,
              fontFamily: "inherit",
              color: C.ink,
              background: "transparent",
            }}
          >
            <option value="public">Public — anyone in the org can join</option>
            <option value="private">Private — invite only</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 22px 16px",
            borderTop: `1px solid ${C.brd}`,
            justifyContent: "flex-end",
            background: C.bg,
          }}
        >
          <button onClick={onClose} className="ti-btn-ghost">
            Discard
          </button>
          <button
            onClick={create}
            disabled={saving}
            className={saving ? "ti-btn-primary disabled" : "ti-btn-primary"}
          >
            {saving ? "Creating…" : "Create channel"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatView: React.FC<{
  data: TeamChatBootstrap | null;
  loading: boolean;
  onRefresh: () => void;
  onToast: (m: string) => void;
}> = ({ data, loading, onRefresh, onToast }) => {
  // Used to render messages we sent on the right, everyone else's on the
  // left — WhatsApp/Telegram style, matching the mail ThreadDetail bubbles.
  const currentUser = getSessionUser();
  const [localChannels, setLocalChannels] = useState<TeamChatChannel[]>([]);
  const [localDms, setLocalDms] = useState<TeamChatChannel[]>([]);
  // Per-channel patches (unread reset after opening, latest preview after
  // sending, etc.) that need to reflect immediately without waiting for the
  // next /team-chat/bootstrap refresh.
  const [channelOverrides, setChannelOverrides] = useState<
    Record<string, Partial<TeamChatChannel>>
  >({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Record<string, ChatMsg[]>>({});
  const [msgLoading, setMsgLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [membersOpen, setMembersOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // Tracks the newest messageId we've already PATCHed /read for, per
  // channel, so live polling doesn't re-send a read receipt every tick
  // when nothing new has arrived.
  const lastReadIdRef = useRef<Record<string, string>>({});

  const applyOverride = (c: TeamChatChannel): TeamChatChannel => ({
    ...c,
    ...(channelOverrides[c.channelId] || {}),
  });

  // A locally-created channel (or, once a create-DM endpoint exists, a DM)
  // will eventually show up in a live bootstrap refresh under the same
  // channelId — drop the local placeholder once that happens so polling
  // doesn't produce duplicate rows.
  const bootstrapChannelIds = new Set(
    (data?.channels ?? []).map((c) => c.channelId),
  );
  const bootstrapDmIds = new Set((data?.dms ?? []).map((c) => c.channelId));

  const rawChannels = [
    ...(data?.channels ?? []),
    ...localChannels.filter((c) => !bootstrapChannelIds.has(c.channelId)),
  ].map(applyOverride);
  const rawDms = [
    ...(data?.dms ?? []),
    ...localDms.filter((c) => !bootstrapDmIds.has(c.channelId)),
  ].map(applyOverride);
  const channels = sortByRecency(rawChannels);
  const dms = sortByRecency(rawDms);
  const allChatItems = [...channels, ...dms];
  const members = data?.orgMembers ?? [];

  // Duplicate names happen in real data (two channels both called "Test"),
  // so anything that collides gets a short id suffix to stay tellable
  // apart instead of showing two identical, unclickable-looking rows.
  const nameCounts = new Map<string, number>();
  allChatItems.forEach((c) => {
    const k = c.name.trim().toLowerCase();
    nameCounts.set(k, (nameCounts.get(k) || 0) + 1);
  });
  const disambiguatorFor = (c: TeamChatChannel) =>
    (nameCounts.get(c.name.trim().toLowerCase()) || 0) > 1
      ? c.channelId.replace(/^(ch|dm)_/, "").slice(-6)
      : undefined;

  // Pick a sensible default channel once data arrives.
  useEffect(() => {
    if (activeChannel) return;
    const first = channels[0]?.channelId ?? dms[0]?.channelId ?? null;
    if (first) setActiveChannel(first);
  }, [data]);

  // Loads a channel's message history. `silent` skips the loading
  // skeleton and toast-on-error — used for background polling so the
  // thread updates live without any visible flicker.
  const loadMessages = useCallback(
    (channelId: string, silent: boolean) => {
      if (!silent) setMsgLoading(true);
      return fetchChannelMessages(channelId)
        .then((msgs) => {
          setThread((t) => {
            const existing = t[channelId] || [];
            const adapted = msgs.map((mm) => adaptChatMsg(mm, currentUser));
            const unchanged =
              adapted.length === existing.length &&
              adapted[adapted.length - 1]?.text ===
                existing[existing.length - 1]?.text;
            return unchanged ? t : { ...t, [channelId]: adapted };
          });
          const lastId = msgs[msgs.length - 1]?.messageId;
          // Guards against PATCHing /read on every poll tick: this only
          // fires the first time we see a given channel's newest message
          // id — a quiet 8s tick with no new messages leaves lastId
          // unchanged, so nothing gets sent.
          if (lastId && lastReadIdRef.current[channelId] !== lastId) {
            lastReadIdRef.current[channelId] = lastId;
            markChannelRead(channelId, lastId).catch(() => {});
            setChannelOverrides((o) => ({
              ...o,
              [channelId]: { ...o[channelId], unreadCount: 0 },
            }));
          }
        })
        .catch(() => {
          if (!silent) onToast("Couldn't load messages");
        })
        .finally(() => {
          if (!silent) setMsgLoading(false);
        });
    },
    [onToast, currentUser.userId, currentUser.fullName],
  );

  // Load history the moment a channel is opened.
  useEffect(() => {
    if (!activeChannel) return;
    // Local-only channels/DMs (not yet backed by the server) have no
    // message-history endpoint to call — leave their thread as-is.
    if (activeChannel.startsWith("local_")) return;
    loadMessages(activeChannel, false);
  }, [activeChannel, loadMessages]);

  // Then keep it live — poll for new messages every 8s while this channel
  // stays open, so a reply from the other side shows up without a manual
  // refresh. The cleanup below is what stops this from stacking up
  // overlapping timers as the person clicks between channels: React runs
  // it whenever `activeChannel` changes (switch conversation) and on
  // unmount (leaving the Chat tab), before the next interval — if any —
  // is created.
  useEffect(() => {
    if (!activeChannel || activeChannel.startsWith("local_")) return;
    const id = setInterval(() => loadMessages(activeChannel, true), 8000);
    return () => clearInterval(id);
  }, [activeChannel, loadMessages]);

  const channelMeta =
    allChatItems.find((c) => c.channelId === activeChannel) ?? null;
  const messages = activeChannel ? thread[activeChannel] || [] : [];
  const totalUnread = allChatItems.reduce(
    (s, c) => s + (c.unreadCount || 0),
    0,
  );
  const dmOtherMember =
    channelMeta?.type === "dm"
      ? findMember(channelMeta.name, members)
      : undefined;

  // Only surface `group` as visible UI chrome once there's more than one —
  // a single-letter code like "a" as a lone section header reads as a bug,
  // not a feature, when it's the only group that exists.
  const distinctGroups = Array.from(
    new Set(
      channels.map((c) => c.group?.trim()).filter((g): g is string => !!g),
    ),
  );
  const showGroupHeaders = distinctGroups.length > 1;

  const groups: { key: string; label: string; items: TeamChatChannel[] }[] =
    showGroupHeaders
      ? (() => {
          const map = new Map<string, TeamChatChannel[]>();
          channels.forEach((c) => {
            const key = c.group?.trim() || "_ungrouped";
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(c);
          });
          return Array.from(map.entries()).map(([key, items]) => ({
            key,
            label:
              key === "_ungrouped"
                ? "Other channels"
                : `Group ${key.toUpperCase()}`,
            items,
          }));
        })()
      : [{ key: "_all", label: "Channels", items: channels }];

  const q = search.trim().toLowerCase();
  const slug = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const querySlug = slug(search);

  const visibleGroups = q
    ? groups
        .map((g) => ({
          ...g,
          items: g.items.filter((c) => c.name.toLowerCase().includes(q)),
        }))
        .filter((g) => g.items.length > 0)
    : groups;
  const visibleDms = q
    ? dms.filter((d) => d.name.toLowerCase().includes(q))
    : dms;
  const matchedMembers = q
    ? members.filter(
        (m) =>
          m.fullName.toLowerCase().includes(q) &&
          !dms.some((d) => d.name.toLowerCase() === m.fullName.toLowerCase()),
      )
    : [];
  const hasAnyMatch =
    !q ||
    visibleGroups.some((g) => g.items.length > 0) ||
    visibleDms.length > 0 ||
    matchedMembers.length > 0;
  const channelNameTaken = q
    ? allChatItems.some((c) => slug(c.name) === querySlug)
    : true;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, activeChannel]);

  const send = async () => {
    const text = draft.trim();
    if (!text || !activeChannel) return;

    // Local-only channels/DMs have no backing endpoint yet — keep the old
    // optimistic, non-persisted behaviour for those.
    if (activeChannel.startsWith("local_")) {
      const msg: ChatMsg = {
        from: "You",
        initials: "S",
        color: "#322F91",
        time: "Now",
        text,
        mine: true,
      };
      setThread((t) => ({
        ...t,
        [activeChannel]: [...(t[activeChannel] || []), msg],
      }));
      setDraft("");
      return;
    }

    setSending(true);
    try {
      const created = await postChannelMessage(activeChannel, text);
      setThread((t) => ({
        ...t,
        [activeChannel]: [
          ...(t[activeChannel] || []),
          // Force mine:true — this is a message we just sent, regardless
          // of whether the server's senderId happens to match our local
          // session id byte-for-byte.
          { ...adaptChatMsg(created, currentUser), mine: true },
        ],
      }));
      if (created.messageId) {
        lastReadIdRef.current[activeChannel] = created.messageId;
      }
      setChannelOverrides((o) => ({
        ...o,
        [activeChannel]: {
          ...o[activeChannel],
          lastMessageAt: created.createdAt || new Date().toISOString(),
          lastMessagePreview: text,
        },
      }));
      setDraft("");
    } catch (err: any) {
      onToast(err?.message ?? "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Shared by both the quick "type a name to create" search shortcut and
  // the full New Channel modal — adds the freshly persisted channel to
  // local state, selects it, and kicks off a background bootstrap refresh
  // so it settles into the canonical list on the next poll.
  const addCreatedChannel = useCallback(
    (created: TeamChatChannel) => {
      setLocalChannels((prev) => [...prev, created]);
      setThread((t) => ({ ...t, [created.channelId]: [] }));
      setActiveChannel(created.channelId);
      onRefresh();
    },
    [onRefresh],
  );

  // Channels are now persisted via POST /team-chat/channels. DMs still have
  // no create-DM endpoint, so starting one stays a local-only placeholder
  // (see startDm below) until the backend supports it.
  const createChannel = async () => {
    if (!querySlug || channelNameTaken || creatingChannel) return;
    setCreatingChannel(true);
    try {
      const created = await createTeamChannel(querySlug, "", "", "public");
      addCreatedChannel(created);
      setSearch("");
      onToast(`Created #${created.name}`);
    } catch (err: any) {
      onToast(err?.message ?? "Failed to create channel");
    } finally {
      setCreatingChannel(false);
    }
  };

  const startDm = (member: TeamChatMember) => {
    const id = `local_dm_${member.userId}`;
    const existing = [...dms].find((d) => d.channelId === id);
    if (existing) {
      setActiveChannel(existing.channelId);
      setSearch("");
      return;
    }
    const newDm: TeamChatChannel = {
      channelId: id,
      name: member.fullName,
      type: "dm",
      topic: null,
      group: null,
      visibility: "private",
      lastMessageAt: null,
      lastMessagePreview: "",
      unreadCount: 0,
    };
    setLocalDms((prev) => [...prev, newDm]);
    setThread((t) => ({ ...t, [id]: [] }));
    setActiveChannel(id);
    setSearch("");
  };

  const channelColor = (c: TeamChatChannel) => {
    const m = c.type === "dm" ? findMember(c.name, members) : undefined;
    return seededColor(m?.userId ?? c.channelId);
  };

  return (
    <>
      <div
        style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}
      >
        {/* Channel list */}
        <div
          style={{
            width: 276,
            flexShrink: 0,
            borderRight: `1px solid ${C.brd}`,
            background: C.bg2,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              padding: "14px 14px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${C.brd}`,
            }}
          >
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>
                Chat
              </div>
              <div style={{ fontSize: 11, color: C.ink4, marginTop: 1 }}>
                {loading
                  ? "Loading…"
                  : totalUnread > 0
                    ? `${totalUnread} unread`
                    : "All caught up"}
              </div>
            </div>
            <div className="ti-tooltip-wrap" style={{ position: "relative" }}>
              <button
                onClick={() => setChannelModalOpen(true)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  border: `1px solid ${C.brd}`,
                  background: C.bg,
                  color: C.ink3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className="ti-tooltip">Create a new channel</span>
            </div>
          </div>

          {/* Search / create bar */}
          <div style={{ padding: "10px 10px 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: C.bg,
                border: `1.5px solid ${C.brd2}`,
                borderRadius: 9,
                padding: "6px 10px",
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = C.p)}
              onBlurCapture={(e) =>
                (e.currentTarget.style.borderColor = C.brd2)
              }
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.ink4}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    q &&
                    !channelNameTaken &&
                    matchedMembers.length === 0
                  )
                    createChannel();
                }}
                placeholder="Search people or channels…"
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  fontSize: 12.5,
                  color: C.ink,
                  background: "transparent",
                  fontFamily: "inherit",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: C.ink4,
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {q && matchedMembers.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {matchedMembers.slice(0, 5).map((m) => (
                  <button
                    key={m.userId}
                    onClick={() => startDm(m)}
                    className="ti-row"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 9px",
                      border: "none",
                      borderRadius: 8,
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <Av
                      initials={initialsFrom(m.fullName)}
                      color={seededColor(m.userId)}
                      size={24}
                      src={m.avatar || undefined}
                    />
                    <span style={{ minWidth: 0, textAlign: "left" }}>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: C.ink,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.fullName}
                      </div>
                      <div style={{ fontSize: 10.5, color: C.ink4 }}>
                        Message
                      </div>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {q && !channelNameTaken && matchedMembers.length === 0 && (
              <button
                onClick={createChannel}
                disabled={creatingChannel}
                className="ti-row"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 8,
                  padding: "8px 9px",
                  border: `1.5px dashed ${C.brd2}`,
                  borderRadius: 8,
                  background: "transparent",
                  cursor: creatingChannel ? "default" : "pointer",
                  fontFamily: "inherit",
                  opacity: creatingChannel ? 0.6 : 1,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: C.pSoft,
                    color: C.p,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: C.p,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {creatingChannel
                    ? `Creating "#${querySlug}"…`
                    : `Create channel "#${querySlug}"`}
                </span>
              </button>
            )}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 10px 16px",
              minHeight: 0,
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "4px 6px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Skel key={i} w="80%" h={12} d={i * 0.08} />
                ))}
              </div>
            ) : (
              <>
                {q && !hasAnyMatch && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "28px 10px",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: 22, opacity: 0.35 }}>🔍</span>
                    <span style={{ fontSize: 12, color: C.ink4 }}>
                      Nothing matches "{search}"
                    </span>
                  </div>
                )}

                {visibleGroups.some((g) => g.items.length > 0) && (
                  <div style={{ marginBottom: 14 }}>
                    <ChatSectionHeader
                      label="Channels"
                      count={channels.length}
                      icon={
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={C.ink4}
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="9" x2="20" y2="9" />
                          <line x1="4" y1="15" x2="20" y2="15" />
                          <line x1="10" y1="3" x2="8" y2="21" />
                          <line x1="16" y1="3" x2="14" y2="21" />
                        </svg>
                      }
                    />
                    {visibleGroups.map((g) => (
                      <div key={g.key} style={{ marginBottom: 2 }}>
                        {showGroupHeaders && (
                          <button
                            onClick={() =>
                              setExpanded((e) => ({ ...e, [g.key]: !e[g.key] }))
                            }
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "6px 6px 6px 14px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={C.ink4}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                flexShrink: 0,
                                transform:
                                  expanded[g.key] !== false || !!q
                                    ? "rotate(0deg)"
                                    : "rotate(-90deg)",
                                transition: "transform .12s",
                              }}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                            <span
                              style={{
                                fontSize: 10.5,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: ".06em",
                                color: C.ink4,
                                minWidth: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {g.label}
                            </span>
                          </button>
                        )}
                        {(!showGroupHeaders ||
                          expanded[g.key] !== false ||
                          !!q) && (
                          <div
                            style={{
                              marginLeft: showGroupHeaders ? 10 : 2,
                              marginBottom: 4,
                            }}
                          >
                            {g.items.map((ch) => (
                              <ChannelRow
                                key={ch.channelId}
                                ch={ch}
                                active={activeChannel === ch.channelId}
                                color={channelColor(ch)}
                                disambiguator={disambiguatorFor(ch)}
                                member={findMember(ch.name, members)}
                                onClick={() => {
                                  setActiveChannel(ch.channelId);
                                  setSearch("");
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {visibleDms.length > 0 && (
                  <div>
                    <ChatSectionHeader
                      label="Direct messages"
                      count={dms.length}
                      icon={
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={C.ink4}
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      }
                    />
                    <div style={{ marginLeft: 2 }}>
                      {visibleDms.map((dm) => (
                        <ChannelRow
                          key={dm.channelId}
                          ch={dm}
                          active={activeChannel === dm.channelId}
                          color={channelColor(dm)}
                          disambiguator={disambiguatorFor(dm)}
                          member={findMember(dm.name, members)}
                          isDm
                          onClick={() => {
                            setActiveChannel(dm.channelId);
                            setSearch("");
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {!q && channels.length === 0 && dms.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      padding: "40px 16px",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: 26, opacity: 0.3 }}>💬</span>
                    <span
                      style={{ fontSize: 12.5, fontWeight: 600, color: C.ink3 }}
                    >
                      No channels yet
                    </span>
                    <span style={{ fontSize: 11.5, color: C.ink4 }}>
                      Search above to create one
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Message pane */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            minHeight: 0,
            background: C.bg,
            position: "relative",
          }}
        >
          <div
            style={{
              minHeight: 56,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 22px",
              background: `linear-gradient(to bottom, ${C.bg2}, ${C.bg3}30)`,
              borderBottom: `1px solid ${C.brd}`,
            }}
          >
            <div
              style={{
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {channelMeta?.type === "dm" ? (
                <Av
                  initials={initialsFrom(channelMeta.name)}
                  color={channelColor(channelMeta)}
                  size={32}
                  src={dmOtherMember?.avatar || undefined}
                />
              ) : channelMeta ? (
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: `linear-gradient(135deg, ${channelColor(channelMeta)} 0%, ${channelColor(channelMeta)}CC 100%)`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 15,
                    fontWeight: 700,
                    boxShadow: `0 2px 8px ${channelColor(channelMeta)}40`,
                  }}
                >
                  #
                </span>
              ) : null}
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}
                  >
                    {channelMeta?.name ??
                      (loading ? "Loading…" : "No channel selected")}
                  </span>
                  {channelMeta?.visibility === "private" && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={C.ink4}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                </div>
                {channelMeta?.type === "dm"
                  ? dmOtherMember?.email && (
                      <div
                        style={{ fontSize: 11.5, color: C.ink4, marginTop: 1 }}
                      >
                        {dmOtherMember.email}
                      </div>
                    )
                  : channelMeta?.topic &&
                    channelMeta.topic.trim().toLowerCase() !==
                      channelMeta.name.trim().toLowerCase() && (
                      <div
                        style={{
                          fontSize: 11.5,
                          color: C.ink4,
                          marginTop: 1,
                          maxWidth: 420,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {channelMeta.topic}
                      </div>
                    )}
              </div>
            </div>
            <button
              onClick={() => setMembersOpen((v) => !v)}
              title="View workspace members"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
                border: "none",
                background: membersOpen ? C.pSoft : "transparent",
                borderRadius: 20,
                padding: "5px 10px 5px 6px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {members.slice(0, 4).map((m, i) => (
                  <span
                    key={m.userId}
                    title={m.fullName}
                    style={{ marginLeft: i === 0 ? 0 : -7, zIndex: 4 - i }}
                  >
                    <Av
                      initials={initialsFrom(m.fullName)}
                      color={seededColor(m.userId)}
                      size={26}
                      ring
                      src={m.avatar || undefined}
                    />
                  </span>
                ))}
              </div>
              {members.length > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: membersOpen ? C.p : C.ink3,
                  }}
                >
                  {members.length} in workspace
                </span>
              )}
            </button>
          </div>

          {membersOpen && (
            <div
              style={{
                position: "absolute",
                top: 62,
                right: 20,
                width: 280,
                zIndex: 20,
                background: C.bg2,
                border: `1px solid ${C.brd}`,
                borderRadius: 12,
                boxShadow: "0 12px 32px rgba(0,0,0,.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${C.brd}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
                  Workspace members
                </span>
                <button
                  onClick={() => setMembersOpen(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: C.ink4,
                    display: "flex",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  maxHeight: 320,
                  overflowY: "auto",
                  padding: "6px 8px",
                }}
              >
                {members.map((m) => (
                  <div
                    key={m.userId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 8px",
                      borderRadius: 8,
                    }}
                  >
                    <Av
                      initials={initialsFrom(m.fullName)}
                      color={seededColor(m.userId)}
                      size={34}
                      src={m.avatar || undefined}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: C.ink,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.fullName}
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: C.ink4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minHeight: 0,
            }}
          >
            {!channelMeta ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: 30, opacity: 0.25 }}>💬</span>
                <span style={{ fontSize: 13, color: C.ink4 }}>
                  {loading
                    ? "Loading channels…"
                    : "Pick a channel or start a DM from the left"}
                </span>
              </div>
            ) : msgLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: "4px 8px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <Skel w={32} h={32} r="50%" d={i * 0.08} />
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        paddingTop: 2,
                      }}
                    >
                      <Skel w="26%" h={10} d={i * 0.08 + 0.04} />
                      <Skel w="62%" h={14} d={i * 0.08 + 0.08} />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: 28, opacity: 0.25 }}>👋</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.ink3 }}>
                  No messages yet
                </span>
                <span style={{ fontSize: 12, color: C.ink4 }}>
                  Say hello in{" "}
                  {channelMeta.type === "dm"
                    ? channelMeta.name
                    : "#" + channelMeta.name}
                </span>
              </div>
            ) : (
              messages.map((m, i) => {
                const prev = messages[i - 1];
                const grouped = !!prev && prev.from === m.from;
                const mine = m.mine;
                return (
                  <div
                    key={i}
                    className="ti-msg-row"
                    style={{
                      display: "flex",
                      gap: 10,
                      flexDirection: mine ? "row-reverse" : "row",
                      marginTop: grouped ? 2 : 14,
                      padding: "4px 10px",
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ width: 32, flexShrink: 0 }}>
                      {!grouped && (
                        <Av initials={m.initials} color={m.color} size={32} />
                      )}
                    </div>
                    <div
                      style={{
                        minWidth: 0,
                        maxWidth: "68%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: mine ? "flex-end" : "flex-start",
                      }}
                    >
                      {!grouped && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 8,
                            marginBottom: 3,
                            flexDirection: mine ? "row-reverse" : "row",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: C.ink,
                            }}
                          >
                            {mine ? "You" : m.from}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: C.ink4,
                              fontFamily: "monospace",
                            }}
                          >
                            {m.time}
                          </span>
                        </div>
                      )}
                      <div
                        className="ti-msg-body"
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.6,
                          padding: "9px 14px",
                          borderRadius: mine
                            ? "14px 4px 14px 14px"
                            : "4px 14px 14px 14px",
                          color: mine ? "#fff" : C.ink2,
                          background: mine ? C.pGrad : C.bg2,
                          boxShadow: mine
                            ? `0 3px 10px ${C.pGlow}`
                            : `0 1px 2px rgba(0,0,0,.05), inset 0 0 0 1px ${C.brd}`,
                        }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div style={{ padding: "10px 20px 18px", flexShrink: 0 }}>
            <div
              className="ti-composer"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "4px 4px 4px 16px",
                borderRadius: 24,
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={
                  channelMeta
                    ? `Message ${channelMeta.type === "dm" ? channelMeta.name : "#" + channelMeta.name}`
                    : "Select a channel to message…"
                }
                disabled={!channelMeta || sending}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  color: C.ink,
                  padding: "9px 0",
                }}
              />
              <button
                disabled={!draft.trim() || !channelMeta || sending}
                onClick={send}
                title="Send"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "none",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    !draft.trim() || !channelMeta || sending ? C.bg3 : C.pGrad,
                  color:
                    !draft.trim() || !channelMeta || sending ? C.ink4 : "#fff",
                  cursor:
                    !draft.trim() || !channelMeta || sending
                      ? "not-allowed"
                      : "pointer",
                  boxShadow:
                    !draft.trim() || !channelMeta || sending
                      ? "none"
                      : `0 2px 8px ${C.pGlow}`,
                  transition: "background .12s,box-shadow .12s",
                }}
              >
                {sending ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    style={{ animation: "ti-spin .8s linear infinite" }}
                  >
                    <path d="M21 12a9 9 0 1 1-9-9" />
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginLeft: 1 }}
                  >
                    <path d="M2.5 12l18-8-6 8 6 8-18-8z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {channelModalOpen && (
        <CreateChannelModal
          onClose={() => setChannelModalOpen(false)}
          onCreated={addCreatedChannel}
          onToast={onToast}
        />
      )}
    </>
  );
};

const ChannelRow: React.FC<{
  ch: TeamChatChannel;
  active: boolean;
  color: string;
  isDm?: boolean;
  disambiguator?: string;
  member?: TeamChatMember;
  onClick: () => void;
}> = ({ ch, active, color, isDm, disambiguator, member, onClick }) => {
  const showTopic =
    !isDm &&
    ch.topic &&
    ch.topic.trim().toLowerCase() !== ch.name.trim().toLowerCase();
  const hasPreview = !!ch.lastMessagePreview;
  return (
    <button
      onClick={onClick}
      className="ti-row"
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 10px 9px 12px",
        marginBottom: 2,
        border: "none",
        borderRadius: 9,
        cursor: "pointer",
        fontFamily: "inherit",
        background: active ? C.pSoft : "transparent",
        transition: "background .12s",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: 3,
            borderRadius: "0 3px 3px 0",
            background: C.p,
          }}
        />
      )}
      {isDm ? (
        <Av
          initials={initialsFrom(ch.name)}
          color={color}
          size={24}
          ring={active}
          src={member?.avatar || undefined}
        />
      ) : (
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 12.5,
            fontWeight: 700,
            boxShadow: active ? `0 2px 6px ${color}55` : "none",
          }}
        >
          #
        </span>
      )}
      <span style={{ minWidth: 0, flex: 1, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: active ? 700 : 500,
              color: active ? C.p : C.ink3,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ch.name}
          </span>
          {ch.visibility === "private" && !isDm && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.ink4}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          {disambiguator && (
            <span
              style={{
                fontSize: 9.5,
                fontFamily: "monospace",
                color: C.ink4,
                background: C.bg3,
                padding: "1px 5px",
                borderRadius: 5,
                flexShrink: 0,
              }}
            >
              {disambiguator}
            </span>
          )}
          <span style={{ flex: 1 }} />
          {ch.unreadCount > 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                minWidth: 17,
                height: 17,
                padding: "0 5px",
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: active ? C.p : C.bg3,
                color: active ? "#fff" : C.ink3,
                flexShrink: 0,
              }}
            >
              {ch.unreadCount}
            </span>
          )}
        </div>
        {hasPreview ? (
          <div
            style={{
              fontSize: 11,
              color: C.ink4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ch.lastMessagePreview} · {relTime(ch.lastMessageAt)}
          </div>
        ) : showTopic ? (
          <div
            style={{
              fontSize: 11,
              color: C.ink4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ch.topic}
          </div>
        ) : (
          <div style={{ fontSize: 11, color: C.ink4, fontStyle: "italic" }}>
            No messages yet
          </div>
        )}
      </span>
    </button>
  );
};

// ── Thread list ───────────────────────────────────────────────────────────────

const ThreadList: React.FC<{
  threads: Thread[];
  view: PortalView;
  folder: NavFolder;
  orgName: string;
  loading: boolean;
  onSelect: (t: Thread) => void;
  onCompose: () => void;
}> = ({ threads, view, folder, loading, onSelect, onCompose }) => {
  const [q, setQ] = useState("");
  const accent = view === "org" ? C.p : C.t;
  const accentSoft = view === "org" ? C.pSoft : C.tSoft;
  const unread = threads.filter((t) => t.unread).length;
  const label = folder === "inbox" ? "Inbox" : "Sent";

  const filtered = q.trim()
    ? threads.filter((t) =>
        [t.from, t.subject, t.preview].some((s) =>
          s.toLowerCase().includes(q.toLowerCase()),
        ),
      )
    : threads;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "16px 28px 14px",
          borderBottom: `1px solid ${C.brd}`,
          background: C.bg2,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: "-.6px",
                color: C.ink,
              }}
            >
              {label}
            </h1>
            {!loading && (
              <span style={{ fontSize: 12.5, color: C.ink4 }}>
                {filtered.length} thread{filtered.length !== 1 ? "s" : ""}
                {unread > 0 && (
                  <span style={{ color: accent, fontWeight: 700 }}>
                    {" "}
                    · {unread} unread
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: C.bg,
              border: `1.5px solid ${C.brd2}`,
              borderRadius: 10,
              padding: "7px 12px",
              minWidth: 220,
              transition: "border-color .15s",
            }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = C.p)}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = C.brd2)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.ink4}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              style={{
                border: "none",
                outline: "none",
                fontSize: 13,
                color: C.ink,
                background: "transparent",
                fontFamily: "inherit",
                width: "100%",
              }}
            />
          </div>
          {view === "cust" && (
            <button
              onClick={onCompose}
              className="ti-btn-primary"
              style={{
                whiteSpace: "nowrap",
                background: "linear-gradient(135deg,#0F6E56 0%,#18A37E 100%)",
              }}
            >
              ✦ Compose
            </button>
          )}
        </div>
      </div>

      {/* List body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading &&
          Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "15px 28px",
                borderBottom: `1px solid ${C.brd}`,
              }}
            >
              <Skel w={40} h={40} r="50%" d={i * 0.04} />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Skel w="28%" h={11} d={i * 0.04 + 0.04} />
                  <Skel w={40} h={10} d={i * 0.04 + 0.04} />
                </div>
                <Skel w="60%" h={11} d={i * 0.04 + 0.08} />
                <Skel w="45%" h={10} d={i * 0.04 + 0.12} />
              </div>
            </div>
          ))}

        {!loading && filtered.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "80px 20px",
            }}
          >
            <div style={{ fontSize: 36, opacity: 0.2 }}>📭</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.ink2 }}>
              {q ? "No matches" : "All clear"}
            </div>
            <div style={{ fontSize: 13, color: C.ink4 }}>
              {q
                ? `Nothing matches "${q}"`
                : `This ${label.toLowerCase()} is empty.`}
            </div>
          </div>
        )}

        {!loading &&
          filtered.map((t) => (
            <div
              key={t.id}
              className="ti-row"
              onClick={() => onSelect(t)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 28px",
                borderBottom: `1px solid ${C.brd}`,
                cursor: "pointer",
                position: "relative",
                background: t.unread ? accentSoft + "60" : C.bg2,
              }}
            >
              {t.unread && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "18%",
                    bottom: "18%",
                    width: 3,
                    borderRadius: "0 3px 3px 0",
                    background: accent,
                  }}
                />
              )}
              <Av
                initials={t.initials}
                color={t.avatarColor}
                size={40}
                ring={t.unread}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: t.unread ? 600 : 400,
                    color: t.unread ? C.ink : C.ink2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: 2,
                  }}
                >
                  {t.subject}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.ink4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.preview}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────

const Sidebar: React.FC<{
  org: Org;
  activeView: PortalView;
  navFolder: NavFolder;
  inboxCount: number;
  sentCount: number;
  calCount: number;
  chatCount: number;
  onViewChange: (v: PortalView) => void;
  onFolderChange: (f: NavFolder) => void;
}> = ({
  org,
  activeView,
  navFolder,
  inboxCount,
  sentCount,
  calCount,
  chatCount,
  onViewChange,
  onFolderChange,
}) => {
  const navItems = [
    {
      id: "inbox",
      label: "Inbox",
      badge: inboxCount,
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      ),
    },
    {
      id: "sent",
      label: "Sent",
      badge: sentCount,
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendar",
      badge: calCount,
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      badge: chatCount,
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      style={{
        width: 230,
        flexShrink: 0,
        borderRight: `1px solid ${C.brd}`,
        background: C.bg2,
        display: "flex",
        flexDirection: "column",
        padding: "20px 12px 14px",
      }}
    >
      {/* View switcher */}
      <div style={{ padding: "0 2px 4px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: C.ink4,
            marginBottom: 8,
            paddingLeft: 6,
          }}
        >
          Perspective
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            padding: 3,
            background: C.bg3,
            borderRadius: 10,
            border: `1px solid ${C.brd}`,
          }}
        >
          {(["org", "cust"] as PortalView[]).map((v) => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              style={{
                padding: "7px 6px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                textAlign: "center",
                background: activeView === v ? C.bg2 : "transparent",
                color: activeView === v ? C.p : C.ink3,
                boxShadow:
                  activeView === v ? "0 1px 4px rgba(0,0,0,.1)" : "none",
                transition: "all .14s",
              }}
            >
              {v === "org" ? "Organisation" : "Customer"}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ marginTop: 18, flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: ".08em",
            color: C.ink4,
            marginBottom: 6,
            paddingLeft: 6,
          }}
        >
          Mailbox
        </div>
        {navItems.map((item) => {
          const active = navFolder === item.id;
          return (
            <button
              key={item.id}
              className={"ti-nav-btn" + (active ? " active" : "")}
              onClick={() => onFolderChange(item.id as NavFolder)}
            >
              <span className="ti-nav-icon">{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    padding: "0 5px",
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: active ? C.p : C.bg3,
                    color: active ? "#fff" : C.ink3,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Test mode banner */}
      <div
        style={{
          margin: "0 2px",
          padding: "8px 12px",
          borderRadius: 8,
          background: C.amberBg,
          border: `1px solid ${C.amberBdr}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 12 }}>⚡</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.amber,
            letterSpacing: ".03em",
          }}
        >
          Test mode active
        </span>
      </div>
    </aside>
  );
};

// A message's "direction" is always relative to the organisation:
// inbound  = the org's own inbound mailbox = shown as Customer's Inbox
// outbound = the org's own outbound mailbox = shown as Customer's Sent,
//            and that same outbound message is what shows in Organisation's Inbox.
//
// So: direction=inbound  -> Customer Inbox  / Organisation Sent
//     direction=outbound -> Customer Sent   / Organisation Inbox
function folderDirection(
  folder: "inbox" | "sent",
  view: PortalView,
): "inbound" | "outbound" {
  if (view === "cust") {
    return folder === "inbox" ? "inbound" : "outbound";
  }
  return folder === "inbox" ? "outbound" : "inbound";
}

export default function TestInboxView() {
  const tenantId = getTenantId();
  const { name, initials } = getSessionOrg();
  const org: Org = { id: tenantId || "unknown", name, initials };

  const [activeView, setActiveView] = useState<PortalView>("cust");
  const [navFolder, setNavFolder] = useState<NavFolder>("inbox");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [calEvents, setCalEvents] = useState<CalEvent[]>([]);
  const [teamChat, setTeamChat] = useState<TeamChatBootstrap | null>(null);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [calLoading, setCalLoading] = useState(false);
  const [teamChatLoading, setTeamChatLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [folderCounts, setFolderCounts] = useState({ inbox: 0, sent: 0 });
  const [calCount, setCalCount] = useState(0);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  }, []);

  useEffect(() => {
    if (navFolder === "calendar" || navFolder === "chat") return;
    setThreads([]);
    setThreadsLoading(true);
    let cancelled = false;
    const direction = folderDirection(navFolder, activeView);
    inboxFetch<{ messages: MailMessageOut[] }>("/test/mailbox/messages", {
      direction,
    })
      .then((r) => {
        if (!cancelled) {
          const adapted = (r.messages || []).map(adaptMessage);
          setThreads(adapted);
          setFolderCounts((prev) => ({ ...prev, [navFolder]: adapted.length }));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setThreadsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [org.id, navFolder, activeView]);

  useEffect(() => {
    let cancelled = false;
    inboxFetch<{ messages: MailMessageOut[] }>("/test/mailbox/messages", {
      direction: folderDirection("sent", activeView),
    })
      .then((r) => {
        if (!cancelled)
          setFolderCounts((prev) => ({
            ...prev,
            sent: (r.messages || []).length,
          }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [org.id, activeView]);

  // Eager fetch, independent of which tab is open — mirrors the Sent-count
  // effect above. Without this, the Calendar badge stayed at 0 until the
  // person actually opened the Calendar tab, while Inbox/Sent populated
  // immediately on load.
  useEffect(() => {
    let cancelled = false;
    inboxFetch<{ events: CalEventOut[] }>("/test/calendar/events")
      .then((r) => {
        if (!cancelled) setCalCount((r.events || []).length);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [org.id]);

  useEffect(() => {
    if (navFolder !== "calendar") return;
    setCalEvents([]);
    setCalLoading(true);
    inboxFetch<{ events: CalEventOut[] }>("/test/calendar/events")
      .then((r) => {
        const adapted = (r.events || []).map(adaptCalEvent);
        setCalEvents(adapted);
        setCalCount(adapted.length);
      })
      .catch(() => {})
      .finally(() => setCalLoading(false));
  }, [navFolder, org.id]);

  const loadTeamChat = useCallback(() => {
    setTeamChatLoading(true);
    return inboxFetch<TeamChatBootstrap>("/team-chat/bootstrap")
      .then((r) => setTeamChat(r))
      .catch(() => showToast("Couldn't load chat"))
      .finally(() => setTeamChatLoading(false));
  }, [showToast]);

  // Background refresh — same call as loadTeamChat but without toggling the
  // loading state, so the sidebar's unread badges / previews update live
  // without flashing "Loading…" every poll.
  const refreshTeamChatSilently = useCallback(() => {
    return inboxFetch<TeamChatBootstrap>("/team-chat/bootstrap")
      .then((r) => setTeamChat(r))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (navFolder !== "chat") return;
    loadTeamChat();
  }, [navFolder, org.id, loadTeamChat]);

  // Keep the channel/DM list live — new messages elsewhere update unread
  // counts and previews every 10s while the Chat tab is open.
  useEffect(() => {
    if (navFolder !== "chat") return;
    const id = setInterval(refreshTeamChatSilently, 10000);
    return () => clearInterval(id);
  }, [navFolder, org.id, refreshTeamChatSilently]);

  const openThread = (t: Thread) => {
    setSelectedThread(t);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPanelVisible(true)),
    );
    if (t.unread)
      setThreads((p) =>
        p.map((x) => (x.id === t.id ? { ...x, unread: false } : x)),
      );
  };

  const closePanel = () => {
    setPanelVisible(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSelectedThread(null), 300);
  };

  const switchView = (v: PortalView) => {
    if (selectedThread) closePanel();
    setTimeout(
      () => {
        setActiveView(v);
        setNavFolder("inbox");
      },
      selectedThread ? 300 : 0,
    );
  };

  const handleFolderChange = (f: NavFolder) => {
    if (selectedThread) closePanel();
    setTimeout(() => setNavFolder(f), selectedThread ? 300 : 0);
  };

  const handleRefresh = async () => {
    if (navFolder === "chat") {
      showToast("Refreshing…");
      await loadTeamChat();
      showToast("Up to date ✓");
      return;
    }
    showToast("Refreshing…");
    try {
      if (navFolder === "calendar") {
        setCalLoading(true);
        const r = await inboxFetch<{ events: CalEventOut[] }>(
          "/test/calendar/events",
        );
        const adapted = (r.events || []).map(adaptCalEvent);
        setCalEvents(adapted);
        setCalCount(adapted.length);
        setCalLoading(false);
      } else {
        setThreadsLoading(true);
        const d = folderDirection(navFolder as "inbox" | "sent", activeView);
        const r = await inboxFetch<{ messages: MailMessageOut[] }>(
          "/test/mailbox/messages",
          { direction: d },
        );
        const adapted = (r.messages || []).map(adaptMessage);
        setThreads(adapted);
        setFolderCounts((prev) => ({ ...prev, [navFolder]: adapted.length }));
        setThreadsLoading(false);
      }
      showToast("Up to date ✓");
    } catch {
      showToast("Refresh failed");
      setThreadsLoading(false);
      setCalLoading(false);
    }
  };

  const unreadCount = threads.filter((t) => t.unread).length;
  const inboxBadge =
    navFolder === "inbox"
      ? unreadCount || folderCounts.inbox
      : folderCounts.inbox;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        fontFamily: "var(--font-sans,inherit)",
      }}
    >
      <style>{`
        @keyframes ti-sh   { 0%,100%{opacity:1} 50%{opacity:.38} }
        @keyframes ti-pop  { from{opacity:0;transform:translateY(8px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes ti-rise { from{opacity:0;transform:translateY(14px) scale(.98)} to{opacity:1;transform:none} }
        @keyframes ti-toast{ from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%)} }
        @keyframes ti-spin { to { transform: rotate(360deg); } }

        .ti-nav-btn { display:flex;align-items:center;gap:9px;width:100%;padding:8px 10px;margin-bottom:2px;border-radius:9px;border:none;cursor:pointer;text-align:left;font-size:13.5px;font-weight:500;font-family:inherit;background:transparent;color:var(--ink3,#4B5563);transition:background .1s,color .1s; }
        .ti-nav-btn:hover { background:var(--bg3,#F1F2F5); }
        .ti-nav-btn.active { background:var(--pp,#EEEEFF);color:var(--p,#5552C9);font-weight:700; }
        .ti-nav-btn.active .ti-nav-icon { color:var(--p,#5552C9); }
        .ti-nav-icon { color:var(--ink4,#9CA3AF);display:flex;align-items:center;flex-shrink:0;transition:color .1s; }
        .ti-row { transition:background .07s; }
        .ti-row:hover { background:var(--bg3,#F1F2F5) !important; }
        .ti-back-btn { display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--ink3,#4B5563);border:1px solid var(--brd,#E5E7EB);background:var(--bg,#F7F8FA);cursor:pointer;padding:5px 11px 5px 8px;border-radius:7px;font-family:inherit;transition:background .1s; }
        .ti-back-btn:hover { background:var(--bg3,#F1F2F5); }
        .ti-close-btn { width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid var(--brd,#E5E7EB);background:var(--bg,#F7F8FA);cursor:pointer;border-radius:8px;color:var(--ink3,#4B5563);font-size:13px;transition:background .1s; }
        .ti-close-btn:hover { background:var(--bg3,#F1F2F5); }
        .ti-btn-primary { display:inline-flex;align-items:center;gap:5px;padding:8px 18px;border-radius:9px;border:none;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;background:linear-gradient(135deg,#5552C9 0%,#7B78E8 100%);color:#fff;box-shadow:0 2px 10px rgba(85,82,201,.3);transition:opacity .12s,box-shadow .12s; }
        .ti-btn-primary:hover { box-shadow:0 4px 18px rgba(85,82,201,.4); }
        .ti-btn-primary.disabled { opacity:.55;cursor:not-allowed;box-shadow:none; }
        .ti-btn-ghost { padding:8px 14px;border-radius:9px;font-size:13px;font-weight:600;border:1px solid var(--brd2,#D1D5DB);background:transparent;cursor:pointer;color:var(--ink3,#4B5563);font-family:inherit;transition:background .1s; }
        .ti-btn-ghost:hover { background:var(--bg3,#F1F2F5); }
        .ti-composer { border:1.5px solid var(--brd2,#D1D5DB);border-radius:12px;overflow:hidden;background:var(--bg,#F7F8FA);transition:border-color .15s,box-shadow .15s; }
        .ti-composer:focus-within { border-color:var(--t,#0F6E56);box-shadow:0 0 0 3px rgba(15,110,86,.1); }
        .ti-panel { position:absolute;top:0;right:0;bottom:0;width:62%;min-width:520px;background:var(--bg2,#fff);border-left:1px solid var(--brd2,#D1D5DB);box-shadow:-16px 0 56px rgba(0,0,0,.12);transform:translateX(104%);transition:transform .32s cubic-bezier(.22,1,.36,1);z-index:50;overflow:hidden;display:flex;flex-direction:column; }
        .ti-panel.open { transform:translateX(0); }
        .ti-bd { position:absolute;inset:0;background:rgba(10,10,20,.12);backdrop-filter:blur(3px);opacity:0;transition:opacity .28s;z-index:40;cursor:pointer; }
        .ti-bd.on { opacity:1; }
        .ti-msg-body p { margin:0 0 .55em; }
        .ti-msg-body p:last-child { margin:0; }
        .ti-msg-body a { color:inherit;opacity:.8;text-decoration:underline; }
        .ti-cal-card:hover { box-shadow:0 2px 12px rgba(0,0,0,.06); }
        .ti-msg-row:hover { background:var(--bg3,#F1F2F5); }
        .ti-tooltip { position:absolute; top:calc(100% + 7px); right:0; background:rgba(15,14,23,.92); color:#fff; font-size:11px; font-weight:600; padding:5px 10px; border-radius:7px; white-space:nowrap; opacity:0; pointer-events:none; transform:translateY(-4px); transition:opacity .12s,transform .12s; z-index:30; box-shadow:0 6px 18px rgba(0,0,0,.18); }
        .ti-tooltip::after { content:""; position:absolute; bottom:100%; right:9px; border:5px solid transparent; border-bottom-color:rgba(15,14,23,.92); }
        .ti-tooltip-wrap:hover .ti-tooltip { opacity:1; transform:translateY(0); }
      `}</style>

      {/* Top bar */}
      <header
        style={{
          height: 52,
          flexShrink: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: C.bg2,
          borderBottom: `1px solid ${C.brd}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: C.ink4 }}>Test Inbox</span>
          <span style={{ fontSize: 13, color: C.brd2 }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
            {navFolder.charAt(0).toUpperCase() + navFolder.slice(1)}
          </span>
          {activeView === "cust" && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 20,
                background: C.tSoft,
                color: C.tDark,
                border: `1px solid #A7F3D0`,
                marginLeft: 4,
              }}
            >
              Customer view
            </span>
          )}
        </div>
        <button
          onClick={handleRefresh}
          className="ti-btn-ghost"
          style={{ padding: "6px 10px" }}
          title="Refresh"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </header>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          org={org}
          activeView={activeView}
          navFolder={navFolder}
          inboxCount={inboxBadge}
          sentCount={folderCounts.sent}
          calCount={calCount}
          chatCount={
            (teamChat?.channels ?? []).reduce(
              (s, c) => s + (c.unreadCount || 0),
              0,
            ) +
            (teamChat?.dms ?? []).reduce((s, c) => s + (c.unreadCount || 0), 0)
          }
          onViewChange={switchView}
          onFolderChange={handleFolderChange}
        />
        <main
          style={{
            flex: 1,
            overflow: "hidden",
            minWidth: 0,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: C.bg,
          }}
        >
          {navFolder === "calendar" ? (
            <CalendarView
              events={calEvents}
              loading={calLoading}
              view={activeView}
              onRefresh={handleRefresh}
              onToast={showToast}
            />
          ) : navFolder === "chat" ? (
            <ChatView
              data={teamChat}
              loading={teamChatLoading}
              onRefresh={loadTeamChat}
              onToast={showToast}
            />
          ) : (
            <ThreadList
              threads={threads}
              view={activeView}
              folder={navFolder}
              orgName={org.name}
              loading={threadsLoading}
              onSelect={openThread}
              onCompose={() => setComposeOpen(true)}
            />
          )}
          {selectedThread && (
            <div
              className={"ti-bd" + (panelVisible ? " on" : "")}
              onClick={closePanel}
            />
          )}
          {selectedThread && (
            <div className={"ti-panel" + (panelVisible ? " open" : "")}>
              <ThreadDetail
                thread={selectedThread}
                orgId={org.id}
                portalView={activeView}
                onClose={closePanel}
                onToast={showToast}
              />
            </div>
          )}
        </main>
      </div>

      {composeOpen && (
        <ComposeModal
          orgId={org.id}
          onClose={() => setComposeOpen(false)}
          onToast={showToast}
        />
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15,14,23,.92)",
            color: "#fff",
            padding: "10px 22px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 32px rgba(0,0,0,.2)",
            backdropFilter: "blur(16px)",
            animation: "ti-toast .2s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
