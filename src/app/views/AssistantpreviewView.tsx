import React, { useState } from "react";

const STYLES = `
.apv-wrap{flex:1;overflow:hidden;display:flex;flex-direction:column}
.apv-hd{padding:14px 22px;background:var(--bg2);border-bottom:0.5px solid var(--brd);flex-shrink:0;display:flex;align-items:center;gap:12px}
.apv-title{font-family:"Sora",sans-serif;font-size:19px;font-weight:600;color:var(--ink);letter-spacing:-.02em}
.apv-sub{font-size:12px;color:var(--ink4);margin-top:2px}
.apv-body{flex:1;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);padding:24px}
.apv-chat-wrap{width:100%;max-width:520px;height:100%;max-height:680px;background:var(--bg2);border:0.5px solid var(--brd);border-radius:18px;box-shadow:0 4px 32px rgba(40,40,80,.1);display:flex;flex-direction:column;overflow:hidden}
.apv-chat-hd{padding:14px 16px;border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:10px;background:var(--bg2)}
.apv-bot-avatar{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--pl));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 2px 8px rgba(75,72,200,.25)}
.apv-bot-name{font-family:"Sora",sans-serif;font-size:13px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.apv-bot-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.apv-status-dot{width:8px;height:8px;border-radius:50%;background:var(--ok);margin-left:auto}
.apv-preview-badge{font-size:10px;color:var(--p);font-weight:500;background:var(--pp);padding:2px 8px;border-radius:20px}
.apv-thread{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.apv-msg{display:flex;flex-direction:column;gap:3px}
.apv-msg.cust{align-items:flex-end}
.apv-msg.asst{align-items:flex-start}
.apv-bubble{padding:10px 13px;font-size:13px;line-height:1.55;max-width:86%}
.apv-bubble.asst{background:var(--bg3);color:var(--ink);border:0.5px solid var(--brd);border-radius:4px 12px 12px 12px}
.apv-bubble.cust{background:var(--p);color:#fff;border-radius:12px 4px 12px 12px}
.apv-qr-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.apv-qr{padding:6px 12px;border-radius:20px;font-size:12px;border:0.5px solid var(--brd2);background:var(--bg2);color:var(--p);cursor:pointer;transition:all .12s;font-weight:500}
.apv-qr:hover{background:var(--pp);border-color:var(--p)}
.apv-typing{display:flex;align-items:center;gap:5px;padding:10px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:4px 12px 12px 12px;width:fit-content}
.apv-typing span{width:6px;height:6px;border-radius:50%;background:var(--ink5);animation:apv-bounce 1.2s ease-in-out infinite}
.apv-typing span:nth-child(2){animation-delay:.2s}
.apv-typing span:nth-child(3){animation-delay:.4s}
@keyframes apv-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
.apv-input-row{padding:12px 14px;border-top:0.5px solid var(--brd);display:flex;gap:8px;align-items:center;background:var(--bg2)}
.apv-input{flex:1;height:36px;border-radius:10px;border:0.5px solid var(--brd2);background:var(--bg3);padding:0 12px;font-size:13px;color:var(--ink);outline:none;font-family:inherit}
.apv-input:focus{border-color:var(--p);background:var(--bg2)}
.apv-send{width:36px;height:36px;border-radius:10px;background:var(--p);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:background .12s}
.apv-send:hover{background:var(--pl)}
.apv-footer{font-size:10.5px;color:var(--ink5);text-align:center;padding:8px;border-top:0.5px solid var(--brd);background:var(--bg2)}
`;

interface ChatMessage {
  role: "assistant" | "customer";
  text: string;
  qr?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hi! I'm Vak, your Hartwell Residences assistant 👋 Tell me what kind of apartment you're looking for, and I'll show available units that fit your needs.",
    qr: ["2BHK apartment", "What's available?", "Book a viewing"],
  },
];

const AUTO_REPLIES: Record<string, { text: string; qr?: string[] }> = {
  default: {
    text: "Great question! I'd be happy to help you with that. Could you share a bit more about what you're looking for — like budget range, preferred floor, or must-have amenities?",
    qr: ["Under ₹20,000/mo", "High floor preferred", "Need parking"],
  },
  "2bhk apartment": {
    text: "We have two 2BHK apartments available right now:\n\n• **Unit 4B** — ₹18,500/mo · Floor 4 · Featured · Gym + Rooftop terrace\n• **Unit 7C** — ₹22,000/mo · Floor 7 · Pool + Covered parking\n\nWould you like to book a viewing for either of these?",
    qr: ["Book viewing for 4B", "Book viewing for 7C", "Tell me more about 4B"],
  },
  "what's available?": {
    text: "Currently available units:\n\n📦 **Unit 4B** — 2BHK, ₹18,500/mo, available Aug 1\n📦 **Unit 7C** — 2BHK, ₹22,000/mo, available Aug 1\n\nUnit 4A is reserved. Would you like to schedule a viewing?",
    qr: ["Yes, book a viewing", "What floor is 4B?", "Is parking included?"],
  },
};

export default function AssistantPreviewView() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "customer", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase();
      const reply = AUTO_REPLIES[key] ?? AUTO_REPLIES.default;
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply.text, qr: reply.qr },
      ]);
    }, 1200);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setTyping(false);
    setResetKey((k) => k + 1);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="apv-wrap">
        <div className="apv-hd">
          <div>
            <div className="apv-title">Vak</div>
            <div className="apv-sub">
              Customer-facing AI · Inventory-aware · Relationship-directed
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              className="btn sm"
              style={{ fontFamily: "inherit" }}
              onClick={handleReset}
            >
              ↺ Reset preview
            </button>
          </div>
        </div>

        <div className="apv-body">
          <div className="apv-chat-wrap" key={resetKey}>
            {/* Chat header */}
            <div className="apv-chat-hd">
              <div className="apv-bot-avatar">🤖</div>
              <div>
                <div className="apv-bot-name">Vak</div>
                <div className="apv-bot-sub">
                  Hartwell Residences · Active on website
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span className="apv-preview-badge">Preview mode</span>
                <div className="apv-status-dot" />
              </div>
            </div>

            {/* Thread */}
            <div className="apv-thread">
              {messages.map((msg, i) => (
                <div key={i} className={`apv-msg ${msg.role}`}>
                  <div
                    className={`apv-bubble ${msg.role}`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "assistant" && msg.qr && msg.qr.length > 0 && (
                    <div className="apv-qr-row">
                      {msg.qr.map((q, qi) => (
                        <button
                          key={qi}
                          className="apv-qr"
                          onClick={() => sendMessage(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="apv-msg asst">
                  <div className="apv-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="apv-input-row">
              <input
                className="apv-input"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <button className="apv-send" onClick={() => sendMessage(input)}>
                →
              </button>
            </div>

            <div className="apv-footer">
              Powered by Zotra Conversation Assistant · Inventory-aware ·
              Relationship-directed
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
