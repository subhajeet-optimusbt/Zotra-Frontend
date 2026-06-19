import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

type CustomerRole =
  | "customer"
  | "prospect"
  | "partner"
  | "vendor"
  | "supplier"
  | "reseller"
  | "government"
  | "admin"
  | "default";

// ─── Role configuration ───────────────────────────────────────────────────────
const ROLE_CONFIG: Record<
  CustomerRole,
  { label: string; color: string; systemPrompt: string }
> = {
  customer: {
    label: "Customer Support",
    color: "#5552C9",
    systemPrompt: `You are Zara, a helpful customer success assistant for Zotra — a SaaS CRM platform.
You are talking with a paying customer. Your job is to:
- Help them understand their account, usage, and features
- Guide them through any issues with the platform
- Escalate complex issues by saying "I'll flag this for your dedicated Customer Success Manager"
- Be warm, patient, and solution-focused
Keep responses concise and actionable. Never make up feature names or pricing.`,
  },
  prospect: {
    label: "Sales Assistant",
    color: "#10B981",
    systemPrompt: `You are Zara, a friendly sales assistant for Zotra — a modern CRM and customer success platform.
You are talking with a potential customer exploring the product. Your job is to:
- Explain Zotra's value proposition clearly (accounts, pipelines, intake, pulse/health scoring, integrations)
- Answer questions about what the platform can do
- Suggest they book a demo for a hands-on walkthrough by saying "I can connect you with our team for a personalized demo"
- Be enthusiastic but honest — never oversell
Keep the conversation consultative, not pushy.`,
  },
  partner: {
    label: "Partner Support",
    color: "#8B5CF6",
    systemPrompt: `You are Zara, a partner success assistant for Zotra.
You are talking with a registered partner (e.g. reseller, SI, or tech partner). Your job is to:
- Help with co-sell motions, deal registration questions, and partner portal navigation
- Explain MDF (Market Development Funds) processes if asked
- Guide them through joint go-to-market resources
- Direct complex commercial questions to their Partner Manager
Be professional, collaborative, and treat them as a peer.`,
  },
  vendor: {
    label: "Vendor Support",
    color: "#F59E0B",
    systemPrompt: `You are Zara, a vendor relations assistant for Zotra.
You are talking with a vendor. Your job is to:
- Help with onboarding steps, contract clarifications, and submission processes
- Answer questions about payment terms, invoicing, and approvals workflow
- Guide them to the right contacts for legal or procurement queries
- Be clear and efficient — vendors value their time
Keep responses factual and practical.`,
  },
  supplier: {
    label: "Supplier Support",
    color: "#EF4444",
    systemPrompt: `You are Zara, a supplier support assistant for Zotra.
You are talking with a supplier. Your job is to:
- Help with supply chain onboarding, catalog submission, and compliance documentation
- Answer questions about order management and delivery tracking within Zotra
- Escalate disputes or SLA concerns to the procurement team
Be process-oriented, accurate, and helpful.`,
  },
  reseller: {
    label: "Reseller Support",
    color: "#06B6D4",
    systemPrompt: `You are Zara, a reseller success assistant for Zotra.
You are talking with a reseller. Your job is to:
- Help with commission structures, deal status, and account management within Zotra
- Explain product tiers, licensing, and margin information at a high level
- Guide them on submitting opportunities and tracking their pipeline
- Refer detailed commercial negotiations to their Channel Manager
Be direct, knowledgeable, and commercially aware.`,
  },
  government: {
    label: "Government Liaison",
    color: "#374151",
    systemPrompt: `You are Zara, a government procurement assistant for Zotra.
You are talking with a government or public sector representative. Your job is to:
- Answer questions about compliance certifications, data residency, and security posture
- Explain procurement-friendly licensing and SLA options
- Guide them through RFP/tender support processes
- Always recommend engaging the public sector team for formal commitments
Be formal, precise, and cautious. Never make commitments on behalf of Zotra's legal or compliance teams.`,
  },
  admin: {
    label: "Admin Assistant",
    color: "#5552C9",
    systemPrompt: `You are Zara, an internal assistant for Zotra admins.
You are talking with an internal team member or administrator. Help with platform configuration, user management, and internal processes.
Be efficient and technically detailed.`,
  },
  default: {
    label: "Zotra Assistant",
    color: "#5552C9",
    systemPrompt: `You are Zara, a helpful assistant for Zotra — a modern CRM and customer success platform.
Help the user with their questions. Be friendly, concise, and accurate.
If you don't know something specific to their account, say so honestly and offer to connect them with the right team.`,
  },
};

// ─── Detect role from localStorage (Zotra auth pattern) ──────────────────────
function detectRole(): CustomerRole {
  const role = (localStorage.getItem("zotra_role") ?? "").toLowerCase().trim();
  if (role in ROLE_CONFIG) return role as CustomerRole;
  return "default";
}

// ─── API call ─────────────────────────────────────────────────────────────────
async function sendMessage(
  messages: Message[],
  systemPrompt: string,
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
     headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true",   // ← required for browser calls
  },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? "Request failed");
  }

  const data = await response.json();
  return (
    data.content
      ?.filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("") ?? "No response."
  );
}

// ─── Markdown-lite renderer (bold, inline code) ───────────────────────────────
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "1px 4px",
            borderRadius: 3,
            fontSize: "0.85em",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    return <span key={i}>{part}</span>;
  });
}

// ─── Suggested starters per role ─────────────────────────────────────────────
const STARTERS: Record<CustomerRole, string[]> = {
  customer: [
    "How do I add a new account?",
    "Where can I see my health scores?",
    "How do I update my org settings?",
  ],
  prospect: [
    "What does Zotra do?",
    "How is pricing structured?",
    "Can I get a demo?",
  ],
  partner: [
    "How do I register a deal?",
    "What MDF is available to me?",
    "Who is my Partner Manager?",
  ],
  vendor: [
    "How do I submit an invoice?",
    "What are the payment terms?",
    "Where do I upload compliance docs?",
  ],
  supplier: [
    "How do I track my orders?",
    "Where do I submit my catalog?",
    "Who handles disputes?",
  ],
  reseller: [
    "How do I check my commission?",
    "How do I submit an opportunity?",
    "What are the margin tiers?",
  ],
  government: [
    "What compliance certifications does Zotra hold?",
    "What are your data residency options?",
    "How does procurement work?",
  ],
  admin: ["How do I manage user roles?", "How do I configure integrations?"],
  default: ["What can Zotra do?", "How do I get started?"],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ZotraChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role] = useState<CustomerRole>(detectRole);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = ROLE_CONFIG[role];

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const handleSend = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;
      setInput("");
      setError(null);

      const updated: Message[] = [...messages, { role: "user", content }];
      setMessages(updated);
      setLoading(true);

      try {
        const reply = await sendMessage(updated, config.systemPrompt);
        setMessages([...updated, { role: "assistant", content: reply }]);
      } catch (e) {
        setError((e as Error).message ?? "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [input, messages, loading, config.systemPrompt],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const accentColor = config.color;

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        title={open ? "Close assistant" : "Open assistant"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: accentColor,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          zIndex: 9999,
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) =>
          Object.assign((e.currentTarget as HTMLElement).style, {
            transform: "scale(1.08)",
            boxShadow: "0 6px 28px rgba(0,0,0,0.32)",
          })
        }
        onMouseLeave={(e) =>
          Object.assign((e.currentTarget as HTMLElement).style, {
            transform: "scale(1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          })
        }
      >
        {open ? (
          // X icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 88,
            right: 24,
            width: 360,
            maxWidth: "calc(100vw - 48px)",
            height: 520,
            maxHeight: "calc(100vh - 120px)",
            borderRadius: 16,
            background: "var(--surface, #ffffff)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            border: "1px solid rgba(0,0,0,0.08)",
            animation: "chatSlideIn 0.2s ease",
          }}
        >
          <style>{`
            @keyframes chatSlideIn {
              from { opacity: 0; transform: translateY(12px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            .zotra-chat-msg { animation: msgIn 0.15s ease; }
            @keyframes msgIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .zotra-starter-btn:hover { opacity: 0.8; }
            .zotra-send-btn:hover { opacity: 0.85; }
            .zotra-input:focus { outline: none; }
          `}</style>

          {/* Header */}
          <div
            style={{
              background: accentColor,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: "white",
                flexShrink: 0,
              }}
            >
              Z
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1.2,
                }}
              >
                Zara
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 11,
                  marginTop: 1,
                }}
              >
                {config.label} · Zotra AI
              </div>
            </div>
            {/* Online dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 0 2px rgba(74,222,128,0.3)",
                }}
              />
            </div>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: "var(--bg, #f8f9fb)",
            }}
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  className="zotra-chat-msg"
                  style={{
                    alignSelf: "flex-start",
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: "12px 12px 12px 3px",
                    padding: "10px 13px",
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "var(--text, #111827)",
                    maxWidth: "88%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  Hi! I'm Zara, your Zotra assistant. How can I help you today?
                </div>
                {/* Starter chips */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  {STARTERS[role].map((q) => (
                    <button
                      key={q}
                      className="zotra-starter-btn"
                      onClick={() => handleSend(q)}
                      style={{
                        alignSelf: "flex-start",
                        background: "white",
                        border: `1px solid ${accentColor}40`,
                        borderRadius: 20,
                        padding: "6px 12px",
                        fontSize: 12,
                        color: accentColor,
                        cursor: "pointer",
                        transition: "opacity 0.15s",
                        fontWeight: 500,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className="zotra-chat-msg"
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? accentColor : "white",
                  color: msg.role === "user" ? "white" : "var(--text, #111827)",
                  border:
                    msg.role === "user" ? "none" : "1px solid rgba(0,0,0,0.07)",
                  borderRadius:
                    msg.role === "user"
                      ? "12px 12px 3px 12px"
                      : "12px 12px 12px 3px",
                  padding: "10px 13px",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  maxWidth: "88%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {msg.role === "assistant"
                  ? renderText(msg.content)
                  : msg.content}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "12px 12px 12px 3px",
                  padding: "12px 16px",
                  display: "flex",
                  gap: 4,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: accentColor,
                      opacity: 0.5,
                      animation: `typingDot 1.2s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
                <style>{`
                  @keyframes typingDot {
                    0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
                    40% { transform: scale(1.3); opacity: 1; }
                  }
                `}</style>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  alignSelf: "center",
                  background: "#FEE2E2",
                  color: "#DC2626",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 12.5,
                  maxWidth: "90%",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(0,0,0,0.07)",
              background: "white",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              className="zotra-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              disabled={loading}
              style={{
                flex: 1,
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: 13.5,
                background: "var(--bg, #f8f9fb)",
                color: "var(--text, #111827)",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")
              }
            />
            <button
              className="zotra-send-btn"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: input.trim() ? accentColor : "rgba(0,0,0,0.08)",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s, opacity 0.15s",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              fontSize: 10.5,
              color: "rgba(0,0,0,0.3)",
              padding: "4px 0 6px",
              background: "white",
              letterSpacing: "0.02em",
            }}
          >
            Powered by Zotra AI · Zara
          </div>
        </div>
      )}
    </>
  );
}
