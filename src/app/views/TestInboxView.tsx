/**
 * TestInboxView.tsx — v3 redesign
 * Backend: .NET via apiFetch + baseUrl() + Bearer token
 */

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
      d = b?.detail ?? b?.title ?? d;
    } catch {
      /* */
    }
    throw new Error(`${res.status}: ${d}`);
  }
  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type MessageSide = "org" | "cust";
type NavFolder = "inbox" | "sent" | "calendar";
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
  attendees: string;
  account: string;
  status: "pending" | "confirmed" | "proposed" | "declined" | "cancelled";
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
  event_id: string;
  title: string;
  date: string;
  time: string;
  attendee_emails: string;
  account_id: string | null;
  status: "pending" | "confirmed" | "proposed" | "declined" | "cancelled";
  week: "this" | "next" | "future";
}

// ── Tokens ────────────────────────────────────────────────────────────────────

const C = {
  // Brand
  p: "var(--p,#5552C9)",
  pGrad: "linear-gradient(135deg,#5552C9 0%,#7B78E8 100%)",
  pSoft: "var(--pp,#EEEEFF)",
  pDark: "var(--pd,#3C3489)",
  pGlow: "rgba(85,82,201,.22)",
  // Teal
  t: "var(--t,#0F6E56)",
  tSoft: "var(--tp,#E4F7F1)",
  tDark: "var(--td,#085041)",
  // Status
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBdr: "#FDE68A",
  red: "#DC2626",
  redBg: "#FEF2F2",
  green: "#059669",
  greenBg: "#ECFDF5",
  // Neutrals
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
  const name = m.from_name || m.from_email || "?";
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
    direction: m.direction === "outbound" ? "Sent" : "Inbound",
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
    initials: (m.from_name || m.from_email || "?")
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
    id: e.event_id,
    title: e.title,
    date: e.date,
    time: e.time,
    attendees: e.attendee_emails || "",
    account: e.account_id ?? "",
    status: e.status,
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
}> = ({ initials, color, size = 34, ring = false }) => (
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
    }}
  >
    {initials}
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

// ── Thread detail panel ───────────────────────────────────────────────────────

const ThreadDetail: React.FC<{
  thread: Thread;
  orgId: string;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ thread, orgId, onClose, onToast }) => {
  const [msgs, setMsgs] = useState<Message[]>(thread.messages);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

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
    const text = reply.trim();
    if (!text) {
      onToast("Write a message first");
      return;
    }
    setSending(true);
    try {
      await inboxFetch("/test/mailbox/send", undefined, {
        method: "POST",
        body: JSON.stringify({
          organisation_id: orgId,
          from_email: "rep@zotra.ai",
          from_name: "Zotra Portal",
          to_emails: thread.email,
          subject: thread.subject,
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
          thread_id: thread.id,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          created_by: "tester",
        }),
      });
      setMsgs((p) => [
        ...p,
        {
          id: "m" + Date.now(),
          side: "org",
          initials: "ZA",
          avatarColor: C.p,
          from: "You",
          label: "You",
          time: "Just now",
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
        },
      ]);
      setReply("");
      scrollBottom();
      onToast("Reply sent ✓");
    } catch {
      onToast("Failed to send");
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
                <span style={{ color: C.p, fontWeight: 600 }}>
                  rep@zotra.ai
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
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!to.trim() || !subject.trim()) {
      onToast("Fill in To and Subject");
      return;
    }
    setSending(true);
    try {
      await inboxFetch("/test/mailbox/send", undefined, {
        method: "POST",
        body: JSON.stringify({
          organisation_id: orgId,
          from_email: "rep@zotra.ai",
          from_name: "Zotra Portal",
          to_emails: to,
          subject,
          body: `<p>${body.replace(/\n/g, "<br>")}</p>`,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          created_by: "tester",
        }),
      });
      onToast("Sent to " + to);
      onClose();
    } catch {
      onToast("Failed to send");
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
                New message
              </div>
              <div style={{ fontSize: 11, color: C.ink4 }}>
                from rep@zotra.ai
              </div>
            </div>
          </div>
          <button onClick={onClose} className="ti-close-btn">
            ✕
          </button>
        </div>

        {/* To / Subject */}
        {[
          {
            lbl: "To",
            val: to,
            set: setTo,
            ph: "recipient@company.com",
            type: "email",
          },
          {
            lbl: "Subject",
            val: subject,
            set: setSubject,
            ph: "Subject line…",
            type: "text",
          },
        ].map(({ lbl, val, set, ph, type }) => (
          <div
            key={lbl}
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
              {lbl}
            </label>
            <input
              type={type}
              value={val}
              onChange={(e) => set(e.target.value)}
              placeholder={ph}
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
        ))}

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
            minHeight: 180,
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
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Calendar ──────────────────────────────────────────────────────────────────

const CalendarView: React.FC<{ events: CalEvent[]; loading: boolean }> = ({
  events,
  loading,
}) => {
  const weeks: { label: string; key: CalEvent["week"] }[] = [
    { label: "This week", key: "this" },
    { label: "Next week", key: "next" },
    { label: "Further ahead", key: "future" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
      <div style={{ maxWidth: 700 }}>
        {weeks.map(({ label, key }) => {
          const evs = events.filter((e) => e.week === key);
          if (!loading && evs.length === 0 && key === "future") return null;
          return (
            <section key={key} style={{ marginBottom: 40 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
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
                      marginBottom: 8,
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
                  return (
                    <div
                      key={ev.id}
                      style={{
                        background: C.bg2,
                        border: `1px solid ${C.brd}`,
                        borderLeft: `3px solid ${st.dot}`,
                        borderRadius: "0 12px 12px 0",
                        padding: "14px 18px",
                        marginBottom: 8,
                        opacity: ev.status === "cancelled" ? 0.5 : 1,
                        transition: "box-shadow .12s",
                      }}
                    >
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
                        style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
                      >
                        {ev.time && (
                          <span
                            style={{
                              fontSize: 12,
                              color: C.ink3,
                              fontFamily: "monospace",
                            }}
                          >
                            ⏰ {ev.time}
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
                        {ev.attendees && (
                          <span style={{ fontSize: 12, color: C.ink3 }}>
                            👤 {ev.attendees}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          );
        })}
      </div>
    </div>
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
}> = ({ threads, view, folder, orgName, loading, onSelect, onCompose }) => {
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
          <div style={{ fontSize: 11.5, color: C.ink4, marginTop: 2 }}>
            {orgName}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Search */}
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
          <button
            onClick={onCompose}
            className="ti-btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            ✦ Compose
          </button>
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
              {/* Unread accent bar */}
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
                {/* Line 1 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      minWidth: 0,
                    }}
                  >
                    {t.unread && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: accent,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: t.unread ? 700 : 500,
                        color: C.ink,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 220,
                      }}
                    >
                      {t.from}
                    </span>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        padding: "1px 7px",
                        borderRadius: 20,
                        flexShrink: 0,
                        background:
                          t.direction === "Inbound" ? C.tSoft : C.pSoft,
                        color: t.direction === "Inbound" ? C.tDark : C.pDark,
                      }}
                    >
                      {t.direction}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: C.ink4,
                      fontFamily: "monospace",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {t.time}
                  </span>
                </div>
                {/* Line 2 */}
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
                {/* Line 3 */}
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
  unreadCount: number;
  calCount: number;
  onViewChange: (v: PortalView) => void;
  onFolderChange: (f: NavFolder) => void;
}> = ({
  org,
  activeView,
  navFolder,
  unreadCount,
  calCount,
  onViewChange,
  onFolderChange,
}) => {
  const navItems = [
    {
      id: "inbox",
      label: "Inbox",
      badge: unreadCount,
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
      badge: 0,
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
        padding: "16px 12px 14px",
      }}
    >
      {/* Org identity */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 10px 12px",
          marginBottom: 6,
          borderBottom: `1px solid ${C.brd}`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: C.pGrad,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            flexShrink: 0,
            letterSpacing: ".02em",
          }}
        >
          {org.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.ink,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {org.name}
          </div>
          <div style={{ fontSize: 10.5, color: C.ink4, marginTop: 1 }}>
            Test Inbox
          </div>
        </div>
      </div>

      {/* View switcher — segmented, single source of truth */}
      <div style={{ padding: "14px 2px 4px" }}>
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

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TestInboxView() {
  const tenantId = getTenantId();
  const { name, initials } = getSessionOrg();
  const org: Org = { id: tenantId || "unknown", name, initials };

  const [activeView, setActiveView] = useState<PortalView>("org");
  const [navFolder, setNavFolder] = useState<NavFolder>("inbox");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [calEvents, setCalEvents] = useState<CalEvent[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [calLoading, setCalLoading] = useState(false);
  const [toast, setToast] = useState("");

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  }, []);

  useEffect(() => {
    if (navFolder === "calendar") return;
    setThreads([]);
    setThreadsLoading(true);
    let cancelled = false;
    const direction = navFolder === "sent" ? "outbound" : "inbound";
    inboxFetch<{ messages: MailMessageOut[] }>("/test/mailbox/messages", {
      direction,
    })
      .then((r) => {
        if (!cancelled) setThreads((r.messages || []).map(adaptMessage));
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
    if (navFolder !== "calendar") return;
    setCalEvents([]);
    setCalLoading(true);
    inboxFetch<{ events: CalEventOut[] }>("/test/calendar/events")
      .then((r) => setCalEvents((r.events || []).map(adaptCalEvent)))
      .catch(() => {})
      .finally(() => setCalLoading(false));
  }, [navFolder, org.id]);

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
    showToast("Refreshing…");
    try {
      if (navFolder === "calendar") {
        setCalLoading(true);
        const r = await inboxFetch<{ events: CalEventOut[] }>(
          "/test/calendar/events",
        );
        setCalEvents((r.events || []).map(adaptCalEvent));
        setCalLoading(false);
      } else {
        setThreadsLoading(true);
        const d = navFolder === "sent" ? "outbound" : "inbound";
        const r = await inboxFetch<{ messages: MailMessageOut[] }>(
          "/test/mailbox/messages",
          { direction: d },
        );
        setThreads((r.messages || []).map(adaptMessage));
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
      {/* ── Global styles ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes ti-sh   { 0%,100%{opacity:1} 50%{opacity:.38} }
        @keyframes ti-pop  { from{opacity:0;transform:translateY(8px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes ti-rise { from{opacity:0;transform:translateY(14px) scale(.98)} to{opacity:1;transform:none} }
        @keyframes ti-toast{ from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%)} }

        /* Sidebar nav button */
        .ti-nav-btn {
          display:flex; align-items:center; gap:9px;
          width:100%; padding:8px 10px; margin-bottom:2px;
          border-radius:9px; border:none; cursor:pointer; text-align:left;
          font-size:13.5px; font-weight:500; font-family:inherit;
          background:transparent; color:var(--ink3,#4B5563);
          transition:background .1s, color .1s;
        }
        .ti-nav-btn:hover { background:var(--bg3,#F1F2F5); }
        .ti-nav-btn.active {
          background:var(--pp,#EEEEFF); color:var(--p,#5552C9); font-weight:700;
        }
        .ti-nav-btn.active .ti-nav-icon { color:var(--p,#5552C9); }
        .ti-nav-icon { color:var(--ink4,#9CA3AF); display:flex; align-items:center;
          flex-shrink:0; transition:color .1s; }

        /* Thread rows */
        .ti-row { transition:background .07s; }
        .ti-row:hover { background:var(--bg3,#F1F2F5) !important; }

        /* Back button */
        .ti-back-btn {
          display:inline-flex; align-items:center; gap:5px;
          font-size:12.5px; font-weight:600; color:var(--ink3,#4B5563);
          border:1px solid var(--brd,#E5E7EB); background:var(--bg,#F7F8FA);
          cursor:pointer; padding:5px 11px 5px 8px; border-radius:7px;
          font-family:inherit; transition:background .1s;
        }
        .ti-back-btn:hover { background:var(--bg3,#F1F2F5); }

        /* Close button */
        .ti-close-btn {
          width:30px; height:30px; display:flex; align-items:center; justify-content:center;
          border:1px solid var(--brd,#E5E7EB); background:var(--bg,#F7F8FA);
          cursor:pointer; border-radius:8px; color:var(--ink3,#4B5563);
          font-size:13px; transition:background .1s;
        }
        .ti-close-btn:hover { background:var(--bg3,#F1F2F5); }

        /* Primary button */
        .ti-btn-primary {
          display:inline-flex; align-items:center; gap:5px;
          padding:8px 18px; border-radius:9px; border:none;
          font-size:13px; font-weight:700; font-family:inherit; cursor:pointer;
          background:linear-gradient(135deg,#5552C9 0%,#7B78E8 100%);
          color:#fff; box-shadow:0 2px 10px rgba(85,82,201,.3);
          transition:opacity .12s, box-shadow .12s;
        }
        .ti-btn-primary:hover { box-shadow:0 4px 18px rgba(85,82,201,.4); }
        .ti-btn-primary.disabled { opacity:.55; cursor:not-allowed; box-shadow:none; }

        /* Ghost button */
        .ti-btn-ghost {
          padding:8px 14px; border-radius:9px; font-size:13px; font-weight:600;
          border:1px solid var(--brd2,#D1D5DB); background:transparent;
          cursor:pointer; color:var(--ink3,#4B5563); font-family:inherit;
          transition:background .1s;
        }
        .ti-btn-ghost:hover { background:var(--bg3,#F1F2F5); }

        /* Composer box */
        .ti-composer {
          border:1.5px solid var(--brd2,#D1D5DB); border-radius:12px;
          overflow:hidden; background:var(--bg,#F7F8FA);
          transition:border-color .15s, box-shadow .15s;
        }
        .ti-composer:focus-within {
          border-color:var(--p,#5552C9);
          box-shadow:0 0 0 3px rgba(85,82,201,.1);
        }

        /* Slide panel */
        .ti-panel {
          position:absolute; top:0; right:0; bottom:0;
          width:62%; min-width:520px;
          background:var(--bg2,#fff);
          border-left:1px solid var(--brd2,#D1D5DB);
          box-shadow:-16px 0 56px rgba(0,0,0,.12);
          transform:translateX(104%);
          transition:transform .32s cubic-bezier(.22,1,.36,1);
          z-index:50; overflow:hidden;
          display:flex; flex-direction:column;
        }
        .ti-panel.open { transform:translateX(0); }

        /* Backdrop */
        .ti-bd {
          position:absolute; inset:0;
          background:rgba(10,10,20,.12);
          backdrop-filter:blur(3px);
          opacity:0; transition:opacity .28s; z-index:40; cursor:pointer;
        }
        .ti-bd.on { opacity:1; }

        .ti-msg-body p { margin:0 0 .55em; }
        .ti-msg-body p:last-child { margin:0; }
        .ti-msg-body a { color:inherit; opacity:.8; text-decoration:underline; }
      `}</style>

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
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
        {/* Left: folder title as breadcrumb */}
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

        {/* Right: refresh */}
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

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          org={org}
          activeView={activeView}
          navFolder={navFolder}
          unreadCount={unreadCount}
          calCount={calEvents.length}
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
            <CalendarView events={calEvents} loading={calLoading} />
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
                onClose={closePanel}
                onToast={showToast}
              />
            </div>
          )}
        </main>
      </div>

      {/* Compose */}
      {composeOpen && (
        <ComposeModal
          orgId={org.id}
          onClose={() => setComposeOpen(false)}
          onToast={showToast}
        />
      )}

      {/* Toast */}
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
