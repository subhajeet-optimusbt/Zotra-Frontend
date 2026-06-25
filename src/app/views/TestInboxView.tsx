/**
 * TestInboxView.tsx
 * Test Portal inbox — merged from frontend-final design into Zotra.
 * Backend: Azure Functions at zotrallm.azurewebsites.net (Python, not .NET).
 * All calls go through FUNC_BASE + path + ?code=FUNC_CODE
 */

import React, { useState, useCallback, useRef, useEffect } from "react";

// ── Azure Functions config ────────────────────────────────────────────────────


const FUNC_BASE = import.meta.env.VITE_FUNC_BASE as string;
const FUNC_CODE = import.meta.env.VITE_FUNC_CODE as string;
function funcUrl(path: string, queryParams?: Record<string, string>): string {
  const p = new URLSearchParams(queryParams);
  if (FUNC_CODE) p.set("code", FUNC_CODE); // only add when non-empty
  return `${FUNC_BASE}${path}?${p}`;
}
/**
 * All requests to the Azure Functions backend.
 * @param path      e.g. "/test/mailbox/messages"
 * @param orgId     sent as X-Org-Id header (not in URL or body)
 * @param query     any extra query params besides `code` (e.g. direction, thread_id)
 * @param init      extra fetch options (method, body, etc.)
 */
async function funcFetch<T>(
  path: string,
  orgId: string,
  query?: Record<string, string>,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(funcUrl(path, query), {
    headers: {
      "Content-Type": "application/json",
      "X-Org-Id": orgId,
      ...init?.headers,
    },
    ...init,
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.status.toString());
    throw new Error(`${res.status}: ${err}`);
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
  domain: string;
  initials: string;
  color: string;
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

// ── Backend response shapes ───────────────────────────────────────────────────

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

// ── Org list ──────────────────────────────────────────────────────────────────

const INITIAL_ORGS: Org[] = [
  {
    id: "org_001",
    name: "Acme Manufacturing",
    domain: "acmecorp.com",
    initials: "AM",
    color: "var(--p, #5552C9)",
  },
  {
    id: "org_002",
    name: "HealthTech Solutions",
    domain: "healthtech.io",
    initials: "HT",
    color: "var(--t, #1D9E75)",
  },
];

// ── Adapters ──────────────────────────────────────────────────────────────────

function adaptMessage(m: MailMessageOut): Thread {
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
    avatarColor:
      m.direction === "outbound" ? "var(--p, #534AB7)" : "var(--t, #0F6E56)",
    time: display,
    fullTime,
    subject: m.subject || "(no subject)",
    preview: (m.body || "").replace(/<[^>]+>/g, "").substring(0, 120),
    tags: [],
    unread: m.processing_status === "new",
    direction: m.direction === "outbound" ? "Sent" : "Inbound",
    to: m.to_emails || "",
    messages: [],
    composerSide: "org",
  };
}

function adaptToMessage(m: MailMessageOut): Message {
  return {
    id: m.message_id,
    side: m.direction === "outbound" ? "org" : "cust",
    initials: (m.from_name || m.from_email || "?")
      .substring(0, 2)
      .toUpperCase(),
    avatarColor:
      m.direction === "outbound" ? "var(--p, #534AB7)" : "var(--t, #0F6E56)",
    from: m.from_name || m.from_email,
    label: m.direction === "outbound" ? "Organisation sent" : "Customer reply",
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

// ── Design tokens mapped to Zotra vars ────────────────────────────────────────

const T = {
  // org/sent colour — uses Zotra primary
  org: "var(--p, #534AB7)",
  orgLight: "var(--pp, #F0EFFE)",
  orgDark: "var(--pd, #3C3489)",
  orgBorder: "var(--p, #534AB7)44",
  // customer colour — uses Zotra teal
  cust: "var(--t, #0F6E56)",
  custLight: "var(--tp, #E4F7F1)",
  custDark: "var(--td, #085041)",
  // Status
  amber: "var(--amber, #EF9F27)",
  amberBg: "var(--amberp, #FEF3DC)",
  red: "var(--ri, #E24B4A)",
  redBg: "var(--rib, #FEF0F0)",
  green: "var(--t, #1D9E75)",
};

const STATUS_COLOR: Record<string, string> = {
  pending: T.amber,
  confirmed: T.green,
  proposed: T.org,
  declined: T.red,
  cancelled: "var(--ink4, #8C8B90)",
};

// ── Small reusable components ─────────────────────────────────────────────────

const Avatar: React.FC<{
  initials: string;
  color: string;
  size?: number;
  unread?: boolean;
}> = ({ initials, color, size = 32, unread = false }) => (
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
      fontSize: size < 28 ? 9 : size < 36 ? 11 : 13,
      fontWeight: 700,
      flexShrink: 0,
      letterSpacing: ".03em",
      boxShadow: unread
        ? `0 0 0 2px var(--bg2,#fff), 0 0 0 4px ${color}`
        : "none",
    }}
  >
    {initials}
  </div>
);

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const MAP: Record<
    string,
    { bg: string; color: string; border: string; label: string }
  > = {
    pending: {
      bg: T.amberBg,
      color: "#92400E",
      border: "#FDE68A",
      label: "Pending",
    },
    confirmed: {
      bg: "var(--tp,#F0FDF4)",
      color: "var(--td,#166534)",
      border: "#BBF7D0",
      label: "Confirmed",
    },
    proposed: {
      bg: T.orgLight,
      color: T.orgDark,
      border: "var(--brd2,#D4D0F8)",
      label: "Proposed",
    },
    declined: {
      bg: "var(--rib,#FEF2F2)",
      color: "var(--rif,#991B1B)",
      border: "#FCA5A5",
      label: "Declined",
    },
    cancelled: {
      bg: "var(--bg3,#F3F4F6)",
      color: "var(--ink4,#6B7280)",
      border: "var(--brd,#e5e7eb)",
      label: "Cancelled",
    },
  };
  const s = MAP[status] ?? MAP.pending;
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        letterSpacing: ".02em",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        flexShrink: 0,
      }}
    >
      {s.label}
    </span>
  );
};

const DirPill: React.FC<{ direction: string }> = ({ direction }) => {
  const m: Record<string, { bg: string; color: string }> = {
    Inbound: { bg: T.custLight, color: T.custDark },
    Sent: { bg: T.orgLight, color: T.orgDark },
  };
  const s = m[direction] ?? m.Sent;
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        background: s.bg,
        color: s.color,
        flexShrink: 0,
      }}
    >
      {direction}
    </span>
  );
};

// ── Skeleton rows ─────────────────────────────────────────────────────────────

const Skel: React.FC<{
  w: number | string;
  h: number;
  r?: number | string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ w, h, r = 6, delay = 0, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: "var(--bg3,#f3f4f6)",
      flexShrink: 0,
      animationDelay: `${delay}s`,
      animation: "ti-pulse 1.5s ease-in-out infinite",
      ...style,
    }}
  />
);

const ThreadRowSkeleton: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "48px 1fr 280px 90px",
      alignItems: "center",
      padding: "0 22px",
      height: 58,
      borderBottom: "1px solid var(--brd,#e5e7eb)",
      gap: 14,
    }}
  >
    <Skel w={34} h={34} r="50%" delay={delay} />
    <Skel w="58%" h={11} delay={delay + 0.05} />
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <Skel w="80%" h={11} delay={delay + 0.08} />
      <Skel w="60%" h={10} delay={delay + 0.12} />
    </div>
    <Skel
      w={36}
      h={10}
      delay={delay + 0.08}
      style={{ marginLeft: "auto" } as React.CSSProperties}
    />
  </div>
);

const CalEventSkeleton: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <div
    style={{
      padding: "13px 16px",
      borderRadius: "var(--r-m,10px)",
      background: "var(--bg2,#fff)",
      border: "1px solid var(--brd,#e5e7eb)",
      borderLeft: "3px solid var(--brd2,#d1d5db)",
      marginBottom: 8,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Skel w="55%" h={13} delay={delay} />
      <Skel w={64} h={22} r={20} delay={delay + 0.06} />
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      <Skel w={80} h={10} delay={delay + 0.1} />
      <Skel w={110} h={10} delay={delay + 0.14} />
    </div>
  </div>
);

// ── Thread Detail Panel ───────────────────────────────────────────────────────

const ThreadDetail: React.FC<{
  thread: Thread;
  orgId: string;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ thread, orgId, onClose, onToast }) => {
  const [messages, setMessages] = useState<Message[]>(thread.messages);
  const [replyText, setReplyText] = useState("");
  const [loadingMsgs, setLoadingMsgs] = useState(true);

  useEffect(() => {
    setLoadingMsgs(true);
    funcFetch<{ messages: MailMessageOut[] }>("/test/mailbox/messages", orgId, {
      thread_id: thread.id,
    })
      .then((res) => setMessages((res.messages || []).map(adaptToMessage)))
      .catch(() => {})
      .finally(() => setLoadingMsgs(false));
  }, [thread.id, orgId]);

  const sendReply = async () => {
    const text = replyText.trim();
    if (!text) {
      onToast("Write a message first");
      return;
    }
    try {
      await funcFetch("/test/mailbox/send", orgId, undefined, {
        method: "POST",
        body: JSON.stringify({
          organisation_id: orgId,
          from_email: "rep@zotra.ai",
          from_name: "Zotra via rep@zotra.ai",
          to_emails: thread.email,
          subject: thread.subject,
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
          thread_id: thread.id,
          created_by: "tester",
        }),
      });
      setMessages((prev) => [
        ...prev,
        {
          id: "m" + Date.now(),
          side: "org",
          initials: "ZA",
          avatarColor: T.org,
          from: "Zotra via rep@zotra.ai",
          label: "Organisation sent",
          time: "Just now",
          body: `<p>${text.replace(/\n/g, "<br>")}</p>`,
        },
      ]);
      setReplyText("");
      onToast("Reply sent");
    } catch {
      onToast("Failed to send");
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
          padding: "14px 22px",
          borderBottom: "1px solid var(--brd,#e5e7eb)",
          background: "var(--bg2,#fff)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ink4,#6b7280)",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "5px 8px 5px 4px",
            borderRadius: "var(--r-s,6px)",
            fontFamily: "inherit",
            marginBottom: 14,
          }}
        >
          ← Close
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-.4px",
                marginBottom: 10,
              }}
            >
              {thread.subject}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar
                initials={thread.initials}
                color={thread.avatarColor}
                size={36}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {thread.from}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "var(--ink4,#6b7280)",
                      marginLeft: 6,
                      fontFamily: "monospace",
                    }}
                  >
                    &lt;{thread.email}&gt;
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink4,#6b7280)",
                    marginTop: 2,
                  }}
                >
                  To: {thread.to}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            <DirPill direction={thread.direction} />
            <span
              style={{
                fontSize: 11,
                color: "var(--ink4,#6b7280)",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              {thread.fullTime}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{ flex: 1, overflowY: "auto", background: "var(--bg,#f9fafb)" }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {loadingMsgs
            ? [0, 0.1, 0.2].map((d, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "var(--r-l,14px)",
                    border: "1px solid var(--brd,#e5e7eb)",
                    background: "var(--bg2,#fff)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--brd,#e5e7eb)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Skel w={28} h={28} r="50%" delay={d} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <Skel w={140} h={11} delay={d + 0.05} />
                      <Skel w={80} h={10} delay={d + 0.1} />
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "14px 18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <Skel w="90%" h={12} delay={d + 0.08} />
                    <Skel w="70%" h={12} delay={d + 0.12} />
                  </div>
                </div>
              ))
            : messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    borderRadius: "var(--r-l,14px)",
                    border: "1px solid var(--brd,#e5e7eb)",
                    background: "var(--bg2,#fff)",
                    boxShadow: "var(--sh-s,0 1px 3px rgba(0,0,0,.07))",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px 10px",
                      borderBottom: "1px solid var(--brd,#e5e7eb)",
                      background: msg.side === "org" ? T.orgLight : T.custLight,
                    }}
                  >
                    <Avatar
                      initials={msg.initials}
                      color={msg.avatarColor}
                      size={28}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {msg.from}
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 20,
                            background:
                              msg.side === "org" ? "#EDE9FC" : "#D0F5E8",
                            color: msg.side === "org" ? T.orgDark : T.custDark,
                          }}
                        >
                          {msg.label}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          color: "var(--ink4,#6b7280)",
                          marginTop: 1,
                          fontFamily: "monospace",
                        }}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                  <div
                    className="ti-msg-body"
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.8,
                      color: "var(--ink,#111)",
                      padding: "14px 18px",
                    }}
                    dangerouslySetInnerHTML={{ __html: msg.body }}
                  />
                </div>
              ))}
        </div>
      </div>

      {/* Composer */}
      <div
        style={{
          background: "var(--bg2,#fff)",
          borderTop: `2px solid ${T.orgBorder}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{ maxWidth: 860, margin: "0 auto", padding: "14px 22px 16px" }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--ink4,#6b7280)",
              marginBottom: 8,
            }}
          >
            Replying as{" "}
            <span style={{ fontWeight: 700, color: T.org }}>
              Organisation · rep@zotra.ai
            </span>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply…"
            rows={4}
            style={{
              width: "100%",
              border: "1px solid var(--brd2,#d1d5db)",
              borderRadius: "var(--r-m,10px)",
              padding: "11px 14px",
              fontSize: 13,
              resize: "vertical",
              lineHeight: 1.7,
              color: "var(--ink,#111)",
              background: "var(--bg,#f9fafb)",
              minHeight: 84,
              outline: "none",
              transition: "border-color .12s",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--p,#5552C9)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--brd2,#d1d5db)")}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              onClick={sendReply}
              style={{
                padding: "8px 18px",
                borderRadius: "var(--r-s,6px)",
                fontSize: 13,
                fontWeight: 700,
                border: "none",
                background: "var(--p,#5552C9)",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 2px 8px var(--p,#5552C9)44",
              }}
            >
              Send reply
            </button>
            <button
              onClick={() => setReplyText("")}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--r-s,6px)",
                fontSize: 13,
                fontWeight: 600,
                border: "1px solid var(--brd2,#d1d5db)",
                background: "transparent",
                cursor: "pointer",
                color: "var(--ink4,#6b7280)",
                fontFamily: "inherit",
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Compose Modal ─────────────────────────────────────────────────────────────

const ComposeModal: React.FC<{
  orgId: string;
  onClose: () => void;
  onToast: (m: string) => void;
}> = ({ orgId, onClose, onToast }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!to.trim() || !subject.trim()) {
      onToast("Fill in To and Subject");
      return;
    }
    setSending(true);
    try {
      await funcFetch("/test/mailbox/send", orgId, undefined, {
        method: "POST",
        body: JSON.stringify({
          organisation_id: orgId,
          from_email: "rep@zotra.ai",
          from_name: "Zotra Portal",
          to_emails: to,
          subject,
          body: `<p>${body.replace(/\n/g, "<br>")}</p>`,
          created_by: "tester",
        }),
      });
      onToast("Message sent to " + to);
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
        background: "rgba(0,0,0,.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          background: "var(--bg2,#fff)",
          borderRadius: "var(--r-l,14px)",
          boxShadow: "var(--sh-l,0 12px 40px rgba(0,0,0,.18))",
          width: 560,
          maxWidth: "92vw",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid var(--brd,#e5e7eb)",
            background: T.orgLight,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: T.orgDark }}>
            New message · Organisation mailbox
          </span>
          <button
            onClick={onClose}
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "var(--r-s,6px)",
              color: "var(--ink4,#6b7280)",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
        {[
          ["To", to, setTo, "email@address.com"],
          ["Subject", subject, setSubject, "Email subject…"],
        ].map(([lbl, val, setter, ph]) => (
          <div
            key={lbl as string}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderBottom: "1px solid var(--brd,#e5e7eb)",
            }}
          >
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--ink4,#6b7280)",
                minWidth: 56,
              }}
            >
              {lbl as string}
            </label>
            <input
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 13,
                fontFamily: "inherit",
                color: "var(--ink,#111)",
                background: "transparent",
              }}
              value={val as string}
              onChange={(e) =>
                (setter as React.Dispatch<React.SetStateAction<string>>)(
                  e.target.value,
                )
              }
              placeholder={ph as string}
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
            padding: "14px 20px",
            fontSize: 13,
            fontFamily: "inherit",
            resize: "none",
            minHeight: 160,
            color: "var(--ink,#111)",
            lineHeight: 1.7,
            background: "transparent",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 20px",
            borderTop: "1px solid var(--brd,#e5e7eb)",
          }}
        >
          <button
            onClick={handleSend}
            disabled={sending}
            style={{
              padding: "8px 18px",
              borderRadius: "var(--r-s,6px)",
              fontSize: 13,
              fontWeight: 700,
              border: "none",
              background: "var(--p,#5552C9)",
              color: "#fff",
              cursor: "pointer",
              opacity: sending ? 0.6 : 1,
            }}
          >
            {sending ? "Sending…" : "Send"}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--r-s,6px)",
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid var(--brd2,#d1d5db)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink4,#6b7280)",
              fontFamily: "inherit",
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Calendar View ─────────────────────────────────────────────────────────────

const CalendarView: React.FC<{ events: CalEvent[]; loading: boolean }> = ({
  events,
  loading,
}) => {
  const thisWeek = events.filter((e) => e.week === "this");
  const nextWeek = events.filter((e) => e.week === "next");
  const futureWeek = events.filter((e) => e.week === "future");

  const EventCard = ({ ev }: { ev: CalEvent }) => (
    <div
      style={{
        padding: "13px 16px",
        borderRadius: "var(--r-m,10px)",
        background: "var(--bg2,#fff)",
        border: "1px solid var(--brd,#e5e7eb)",
        boxShadow: "var(--sh-s,0 1px 3px rgba(0,0,0,.07))",
        borderLeft: `3px solid ${STATUS_COLOR[ev.status] ?? "var(--ink4)"}`,
        marginBottom: 8,
        opacity: ev.status === "cancelled" ? 0.55 : 1,
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
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--ink,#111)",
            letterSpacing: "-.1px",
            flex: 1,
          }}
        >
          {ev.title}
        </div>
        <StatusPill status={ev.status} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {ev.time && (
          <span
            style={{
              fontSize: 11.5,
              color: "var(--ink4,#6b7280)",
              fontFamily: "monospace",
            }}
          >
            ⏰ {ev.time}
          </span>
        )}
        {ev.date && (
          <span
            style={{
              fontSize: 11.5,
              color: "var(--ink4,#6b7280)",
              fontFamily: "monospace",
            }}
          >
            {ev.date}
          </span>
        )}
        {ev.attendees && (
          <span style={{ fontSize: 11.5, color: "var(--ink4,#6b7280)" }}>
            {ev.attendees}
          </span>
        )}
      </div>
    </div>
  );

  const Week = ({ label, evs }: { label: string; evs: CalEvent[] }) => (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".07em",
            color: "var(--ink4,#6b7280)",
          }}
        >
          {label}
        </div>
        {!loading && evs.length > 0 && (
          <div
            style={{ fontSize: 11, color: "var(--ink4,#6b7280)", opacity: 0.5 }}
          >
            {evs.length} event{evs.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
      {loading ? (
        [0, 1].map((i) => <CalEventSkeleton key={i} delay={i * 0.1} />)
      ) : evs.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "var(--ink4,#6b7280)",
            padding: "12px 0",
          }}
        >
          No events scheduled.
        </div>
      ) : (
        evs.map((ev) => <EventCard key={ev.id} ev={ev} />)
      )}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px" }}>
      <div style={{ maxWidth: 720 }}>
        <Week label="This week" evs={thisWeek} />
        <div
          style={{
            margin: "4px 0 24px",
            height: 1,
            background: "var(--brd,#e5e7eb)",
          }}
        />
        <Week label="Next week" evs={nextWeek} />
        {futureWeek.length > 0 && (
          <>
            <div
              style={{
                margin: "4px 0 24px",
                height: 1,
                background: "var(--brd,#e5e7eb)",
              }}
            />
            <Week label="Future" evs={futureWeek} />
          </>
        )}
      </div>
    </div>
  );
};

// ── InboxList ─────────────────────────────────────────────────────────────────

const InboxList: React.FC<{
  threads: Thread[];
  view: PortalView;
  folder: NavFolder;
  orgName: string;
  loading: boolean;
  onSelect: (t: Thread) => void;
  onCompose: () => void;
}> = ({ threads, view, folder, orgName, loading, onSelect, onCompose }) => {
  const isOrg = view === "org";
  const accent = isOrg ? T.org : T.cust;
  const accentLight = isOrg ? T.orgLight : T.custLight;
  const unread = threads.filter((t) => t.unread).length;
  const folderLabel = folder === "inbox" ? "Inbox" : "Sent";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 22px 11px",
          borderBottom: "1px solid var(--brd,#e5e7eb)",
          background: "var(--bg2,#fff)",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.3px" }}
          >
            {folderLabel}
          </div>
          <div
            style={{ fontSize: 11, color: "var(--ink4,#6b7280)", marginTop: 2 }}
          >
            {orgName} ·{" "}
            {loading ? (
              <span style={{ opacity: 0.4 }}>loading…</span>
            ) : (
              <>
                <span style={{ fontFamily: "monospace", fontSize: 10 }}>
                  {threads.length}
                </span>{" "}
                thread{threads.length !== 1 ? "s" : ""}
                {unread > 0 && (
                  <>
                    ,{" "}
                    <span style={{ color: accent, fontWeight: 600 }}>
                      {unread} unread
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <button
          onClick={onCompose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            padding: "7px 14px",
            borderRadius: "var(--r-s,6px)",
            border: "none",
            background: "var(--p,#5552C9)",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 2px 8px var(--p,#5552C9)40",
          }}
        >
          + Compose
        </button>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr 280px 90px",
          alignItems: "center",
          padding: "0 22px",
          height: 32,
          borderBottom: "1px solid var(--brd,#e5e7eb)",
          gap: 14,
          background: "var(--bg,#f9fafb)",
          flexShrink: 0,
        }}
      >
        {["", "From", "Subject & Preview", "Time"].map((h, i) => (
          <div
            key={i}
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              color: "var(--ink4,#6b7280)",
              textAlign: i === 3 ? "right" : "left",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading &&
          Array.from({ length: 7 }).map((_, i) => (
            <ThreadRowSkeleton key={i} delay={i * 0.04} />
          ))}

        {!loading && threads.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "var(--ink4,#6b7280)",
              padding: 60,
            }}
          >
            <div style={{ fontSize: 28, opacity: 0.3 }}>📭</div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--ink3,#374151)",
              }}
            >
              No messages
            </div>
            <div style={{ fontSize: 13 }}>
              This {folderLabel.toLowerCase()} is empty.
            </div>
          </div>
        )}

        {!loading &&
          threads.map((t) => (
            <div
              key={t.id}
              className="ti-thread-row"
              onClick={() => onSelect(t)}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 280px 90px",
                alignItems: "center",
                padding: "0 22px",
                height: 58,
                borderBottom: "1px solid var(--brd,#e5e7eb)",
                cursor: "pointer",
                gap: 14,
                background: t.unread ? accentLight + "44" : "transparent",
                position: "relative",
              }}
            >
              {t.unread && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "25%",
                    bottom: "25%",
                    width: 3,
                    borderRadius: "0 3px 3px 0",
                    background: accent,
                  }}
                />
              )}
              <Avatar
                initials={t.initials}
                color={t.avatarColor}
                size={34}
                unread={t.unread}
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: t.unread ? 700 : 500,
                  color: t.unread ? "var(--ink,#111)" : "var(--ink3,#374151)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 0,
                  overflow: "hidden",
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
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.from}
                </span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: t.unread ? 600 : 400,
                    color: "var(--ink,#111)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.subject}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--ink4,#6b7280)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginTop: 1,
                  }}
                >
                  {t.preview}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink4,#6b7280)",
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  fontFamily: "monospace",
                }}
              >
                {t.time}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// ── Left Sidebar ──────────────────────────────────────────────────────────────

const PortalSidebar: React.FC<{
  orgs: Org[];
  activeOrgIdx: number;
  activeView: PortalView;
  navFolder: NavFolder;
  unreadCount: number;
  calCount: number;
  onOrgChange: (i: number) => void;
  onViewChange: (v: PortalView) => void;
  onFolderChange: (f: NavFolder) => void;
}> = ({
  orgs,
  activeOrgIdx,
  activeView,
  navFolder,
  unreadCount,
  calCount,
  onOrgChange,
  onViewChange,
  onFolderChange,
}) => {
  const NavBtn = ({
    id,
    label,
    badge = 0,
    active,
  }: {
    id: string;
    label: string;
    badge?: number;
    active: boolean;
  }) => (
    <button
      className={"ti-nav-btn" + (active ? " active" : "")}
      onClick={() => onFolderChange(id as NavFolder)}
    >
      <span style={{ flex: 1 }}>{label}</span>
      {badge > 0 && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "1px 6px",
            borderRadius: 20,
            background: active ? "var(--p,#5552C9)" : "var(--bg3,#f3f4f6)",
            color: active ? "#fff" : "var(--ink4,#6b7280)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );

  const SectionLabel = ({ text }: { text: string }) => (
    <div
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        color: "var(--ink4,#6b7280)",
        padding: "10px 10px 4px",
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      style={{
        width: 210,
        flexShrink: 0,
        borderRight: "1px solid var(--brd,#e5e7eb)",
        background: "var(--bg2,#fafaf8)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 8px",
      }}
    >
      <div style={{ paddingLeft: 10, marginBottom: 18 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "var(--p,#5552C9)",
            letterSpacing: "-.2px",
          }}
        >
          Test Inbox
        </div>
        <div
          style={{ fontSize: 10, color: "var(--ink4,#6b7280)", marginTop: 2 }}
        >
          Test Portal
        </div>
      </div>

      <SectionLabel text="Organisation" />
      {orgs.map((o, i) => (
        <button
          key={o.id}
          className={"ti-nav-btn" + (i === activeOrgIdx ? " active" : "")}
          onClick={() => onOrgChange(i)}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: o.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {o.initials}
          </div>
          <span
            style={{
              fontSize: 12,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {o.name}
          </span>
        </button>
      ))}

      <SectionLabel text="View" />
      {(["org", "cust"] as PortalView[]).map((v) => (
        <button
          key={v}
          className={"ti-nav-btn" + (activeView === v ? " active" : "")}
          onClick={() => onViewChange(v)}
        >
          {v === "org" ? "🏢 Organisation" : "👤 Customer"}
        </button>
      ))}

      <SectionLabel text="Mailbox" />
      <NavBtn
        id="inbox"
        label="Inbox"
        badge={unreadCount}
        active={navFolder === "inbox"}
      />
      <NavBtn id="sent" label="Sent" active={navFolder === "sent"} />
      <NavBtn
        id="calendar"
        label="Calendar"
        badge={calCount}
        active={navFolder === "calendar"}
      />
    </div>
  );
};

// ── Main View ─────────────────────────────────────────────────────────────────

export default function TestInboxView() {
  const [orgs, setOrgs] = useState<Org[]>(INITIAL_ORGS);
  const [activeOrgIdx, setActiveOrgIdx] = useState(0);
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

  const org = orgs[activeOrgIdx];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2800);
  }, []);

  // Load threads
  useEffect(() => {
    if (navFolder === "calendar" || !org) return;
    setThreads([]);
    setThreadsLoading(true);
    let cancelled = false;
    const direction = navFolder === "sent" ? "outbound" : "inbound";
    funcFetch<{ messages: MailMessageOut[] }>(
      "/test/mailbox/messages",
      org.id,
      { direction },
    )
      .then((res) => {
        if (!cancelled) setThreads((res.messages || []).map(adaptMessage));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setThreadsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [org?.id, navFolder, activeView]);

  // Load calendar
  useEffect(() => {
    if (navFolder !== "calendar" || !org) return;
    setCalEvents([]);
    setCalLoading(true);
    funcFetch<{ events: CalEventOut[] }>("/test/calendar/events", org.id)
      .then((res) => setCalEvents((res.events || []).map(adaptCalEvent)))
      .catch(() => {})
      .finally(() => setCalLoading(false));
  }, [navFolder, org?.id]);

  const openThread = async (t: Thread) => {
    setSelectedThread(t);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPanelVisible(true)),
    );
    if (t.unread) {
      setThreads((prev) =>
        prev.map((x) => (x.id === t.id ? { ...x, unread: false } : x)),
      );
    }
  };

  const closePanel = () => {
    setPanelVisible(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSelectedThread(null), 280);
  };

  const switchView = (v: PortalView) => {
    if (selectedThread) closePanel();
    setTimeout(
      () => {
        setActiveView(v);
        setNavFolder("inbox");
      },
      selectedThread ? 280 : 0,
    );
  };

  const handleFolderChange = (f: NavFolder) => {
    if (selectedThread) closePanel();
    setTimeout(() => setNavFolder(f), selectedThread ? 280 : 0);
  };

  const handleRefresh = async () => {
    if (!org) return;
    showToast("Refreshing…");
    try {
      if (navFolder === "calendar") {
        setCalLoading(true);
        const res = await funcFetch<{ events: CalEventOut[] }>(
          "/test/calendar/events",
          org.id,
        );
        setCalEvents((res.events || []).map(adaptCalEvent));
        setCalLoading(false);
      } else {
        setThreadsLoading(true);
        const direction = navFolder === "sent" ? "outbound" : "inbound";
        const res = await funcFetch<{ messages: MailMessageOut[] }>(
          "/test/mailbox/messages",
          org.id,
          { direction },
        );
        setThreads((res.messages || []).map(adaptMessage));
        setThreadsLoading(false);
      }
      showToast("Refreshed");
    } catch {
      showToast("Refresh failed");
      setThreadsLoading(false);
      setCalLoading(false);
    }
  };

  const unreadCount = threads.filter((t) => t.unread).length;

  const tabStyle = (active: boolean, color: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "0 18px",
    height: "100%",
    border: "none",
    borderBottom: `2.5px solid ${active ? color : "transparent"}`,
    background: "transparent",
    color: active ? color : "var(--ink4,#6b7280)",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "color .12s, border-color .12s",
    letterSpacing: active ? "-.1px" : "0",
    fontFamily: "inherit",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        fontFamily: "var(--font-sans, inherit)",
      }}
    >
      <style>{`
        @keyframes ti-pulse { 0%,100%{opacity:1} 50%{opacity:.38} }
        .ti-nav-btn { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:var(--r-s,6px); border:none; width:100%; font-size:12.5px; font-weight:500; cursor:pointer; text-align:left; background:transparent; transition:background .1s; color:var(--ink3,#374151); font-family:inherit; }
        .ti-nav-btn:hover { background:var(--bg3,#f3f4f6) !important; }
        .ti-nav-btn.active { background:var(--pp,#EEEEFF); color:var(--p,#5552C9); font-weight:600; }
        .ti-thread-row { transition:background .08s; }
        .ti-thread-row:hover { background:var(--bg3,#f3f4f6) !important; }
        .ti-panel { position:absolute; top:0; right:0; bottom:0; width:63%; min-width:540px; background:var(--bg2,#fff); border-left:1px solid var(--brd2,#d1d5db); box-shadow:-8px 0 40px rgba(0,0,0,.13); transform:translateX(100%); transition:transform .28s cubic-bezier(.32,0,.16,1); z-index:50; overflow:hidden; display:flex; flex-direction:column; }
        .ti-panel.open { transform:translateX(0); }
        .ti-backdrop { position:absolute; inset:0; background:rgba(15,14,20,.18); backdrop-filter:blur(3px) saturate(.85); opacity:0; transition:opacity .26s; z-index:40; cursor:pointer; }
        .ti-backdrop.visible { opacity:1; }
        .ti-topbar-tab:hover { color:var(--ink,#111) !important; }
        .ti-msg-body p { margin-bottom:.7em; }
        .ti-msg-body p:last-child { margin-bottom:0; }
      `}</style>

      {/* ── Topbar ── */}
      <header
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0 0 4px",
          background: "var(--bg2,#fff)",
          borderBottom: "1px solid var(--brd,#e5e7eb)",
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 16px 0 12px",
              borderRight: "1px solid var(--brd,#e5e7eb)",
              height: "100%",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "var(--pg,linear-gradient(135deg,#5552C9,#7370E0))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "-.4px",
                color: "var(--ink,#111)",
              }}
            >
              Zotra{" "}
              <span style={{ color: "var(--p,#5552C9)", fontWeight: 700 }}>
                Portal
              </span>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "stretch",
              height: "100%",
              marginLeft: 4,
            }}
          >
            <button
              className="ti-topbar-tab"
              style={tabStyle(activeView === "org", "var(--p,#5552C9)")}
              onClick={() => switchView("org")}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--p,#5552C9)",
                }}
              />
              Organisation mailbox
            </button>
            <button
              className="ti-topbar-tab"
              style={tabStyle(activeView === "cust", "var(--t,#0F6E56)")}
              onClick={() => switchView("cust")}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--t,#0F6E56)",
                }}
              />
              Customer mailbox
            </button>
          </nav>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingRight: 16,
          }}
        >
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: ".08em",
              padding: "3px 9px",
              borderRadius: 20,
              background: "var(--amberp,#FEF3DC)",
              color: "var(--amber,#633806)",
              border: "1px solid #FDE68A",
            }}
          >
            TEST MODE
          </span>
          <div
            style={{
              fontSize: 12,
              color: "var(--ink4,#6b7280)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ color: "var(--ink3,#374151)", fontWeight: 700 }}>
              {org?.name ?? "…"}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{activeView === "org" ? "Org view" : "Customer view"}</span>
          </div>
          <button
            onClick={handleRefresh}
            title="Refresh"
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--brd,#e5e7eb)",
              background: "transparent",
              color: "var(--ink4,#6b7280)",
              borderRadius: "var(--r-s,6px)",
              cursor: "pointer",
            }}
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
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <PortalSidebar
          orgs={orgs}
          activeOrgIdx={activeOrgIdx}
          activeView={activeView}
          navFolder={navFolder}
          unreadCount={unreadCount}
          calCount={calEvents.length}
          onOrgChange={(i) => {
            setActiveOrgIdx(i);
            if (selectedThread) closePanel();
            setThreads([]);
          }}
          onViewChange={switchView}
          onFolderChange={handleFolderChange}
        />

        <main
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            minWidth: 0,
            position: "relative",
          }}
        >
          {navFolder === "calendar" ? (
            <CalendarView events={calEvents} loading={calLoading} />
          ) : (
            <InboxList
              threads={threads}
              view={activeView}
              folder={navFolder}
              orgName={org?.name ?? ""}
              loading={threadsLoading}
              onSelect={openThread}
              onCompose={() => setComposeOpen(true)}
            />
          )}

          {selectedThread && (
            <div
              className={"ti-backdrop" + (panelVisible ? " visible" : "")}
              onClick={closePanel}
            />
          )}
          {selectedThread && (
            <div className={"ti-panel" + (panelVisible ? " open" : "")}>
              <ThreadDetail
                thread={selectedThread}
                orgId={org?.id ?? ""}
                onClose={closePanel}
                onToast={showToast}
              />
            </div>
          )}
        </main>
      </div>

      {composeOpen && org && (
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
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(24,23,26,.92)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 30,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999,
            whiteSpace: "nowrap",
            boxShadow: "0 6px 24px rgba(0,0,0,.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
