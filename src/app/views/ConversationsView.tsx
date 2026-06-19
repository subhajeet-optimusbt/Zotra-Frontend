import React, { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ConvMemory {
  type: string;
  val: string;
}
interface ConvAction {
  label: string;
  icon: string;
  kind: string;
  primary: boolean;
  desc: string;
}
interface ThreadMsg {
  role: "customer" | "assistant";
  text: string;
  time: string;
}
interface ConvUnderstanding {
  goal: string;
  archetype: string;
  urgency: string;
  concern: string;
  next: string;
  relStage: string;
}
interface Conversation {
  id: string;
  account: string;
  contact: string;
  channel: string;
  time: string;
  stage: string;
  unread: boolean;
  topic: string;
  archetype: string;
  urgency: string;
  thread: ThreadMsg[];
  understanding: ConvUnderstanding;
  memory: ConvMemory[];
  actions: ConvAction[];
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
.cv-wrap{flex:1;overflow:hidden;display:flex;flex-direction:column}
.cv-hd{padding:14px 22px 0;background:var(--bg2);border-bottom:0.5px solid var(--brd);flex-shrink:0}
.cv-hd-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.cv-title{font-family:"Sora",sans-serif;font-size:19px;font-weight:600;color:var(--ink);letter-spacing:-.02em}
.cv-sub{font-size:12px;color:var(--ink4);margin-top:2px}
.cv-tabs{display:flex;gap:2px}
.cv-tab{padding:6px 12px;font-size:12px;cursor:pointer;transition:all .12s;margin-bottom:-0.5px;display:flex;align-items:center;gap:5px;border-bottom:2px solid transparent;color:var(--ink4);font-weight:400;user-select:none}
.cv-tab.on{color:var(--p);font-weight:600;border-bottom-color:var(--p)}
.cv-tab-cnt{font-size:10px;padding:1px 5px;border-radius:8px;background:var(--bg3);color:var(--ink5)}
.cv-body{flex:1;overflow-y:auto;padding:14px 24px 80px}
.cv-banner{margin-bottom:14px;padding:11px 15px;background:linear-gradient(135deg,var(--pp),var(--bg2));border:0.5px solid rgba(75,72,200,.15);border-radius:10px;display:flex;gap:10px;align-items:center;font-size:12px;color:var(--ink3)}
.cv-table{background:var(--bg2);border:0.5px solid var(--brd);border-radius:12px;overflow:hidden}
.cv-table-hd{display:grid;grid-template-columns:28px 1fr 120px 100px 80px 90px;padding:7px 16px;background:var(--bg3);border-bottom:0.5px solid var(--brd)}
.cv-table-hd-cell{font-size:9.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5)}
.cv-row{display:grid;grid-template-columns:28px 1fr 120px 100px 80px 90px;padding:12px 16px;border-bottom:0.5px solid var(--brd);cursor:pointer;align-items:center;transition:background .1s}
.cv-row:last-child{border-bottom:none}
.cv-row:hover{background:var(--pu)}
.cv-empty{padding:40px;text-align:center;color:var(--ink5);font-size:12px}

/* ── Detail view ── */
.cv-detail{flex:1;overflow:hidden;display:flex;flex-direction:column}
.cv-detail-hd{padding:10px 20px;border-bottom:0.5px solid var(--brd);background:var(--bg2);display:flex;align-items:center;gap:10px;flex-shrink:0;min-height:48px}
.cv-detail-body{flex:1;overflow:hidden;display:grid;grid-template-columns:1fr 300px;gap:0}

/* ── Thread column ── */
.cv-thread-col{overflow:hidden;display:flex;flex-direction:column;border-right:0.5px solid var(--brd);background:#f7f7fb}
.cv-thread{flex:1;overflow-y:auto;padding:24px 24px 20px;display:flex;flex-direction:column;gap:0;scroll-behavior:smooth}

/* Channel label divider */
.cv-thread-label{font-size:10px;font-weight:600;color:#9898b8;letter-spacing:.07em;text-transform:uppercase;text-align:center;margin-bottom:20px;display:flex;align-items:center;gap:8px}
.cv-thread-label::before,.cv-thread-label::after{content:'';flex:1;height:1px;background:#e2e2ee}

/* ── Message group ── */
.cv-msg-group{display:flex;flex-direction:column;margin-bottom:20px}
.cv-msg-group.from-asst{align-items:flex-start}
.cv-msg-group.from-cust{align-items:flex-end}

/* Sender row */
.cv-sender-row{display:flex;align-items:center;gap:7px;margin-bottom:5px}
.cv-msg-group.from-cust .cv-sender-row{flex-direction:row-reverse}

.cv-avatar{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:700}
.cv-avatar-asst{background:#4b48c8;color:#fff;box-shadow:0 2px 6px rgba(75,72,200,.3)}
.cv-avatar-cust{background:#e8e8f4;color:#4b48c8;border:1px solid #d4d4ec}

.cv-sender-name{font-size:11px;font-weight:600;color:#555570}
.cv-sender-time{font-size:10px;color:#aaaacc;font-family:'DM Mono',monospace}

/* Bubble itself — using inline styles in JSX for guaranteed rendering */
.cv-bubble-asst{
  display:inline-block;
  max-width:72%;
  padding:11px 15px;
  font-size:13px;
  line-height:1.6;
  background:#ffffff;
  color:#1a1a2e;
  border:1px solid #e2e2ee;
  border-radius:4px 14px 14px 14px;
  box-shadow:0 1px 3px rgba(0,0,0,.06);
}
.cv-bubble-cust{
  display:inline-block;
  max-width:72%;
  padding:11px 15px;
  font-size:13px;
  line-height:1.6;
  background:#4b48c8;
  color:#ffffff;
  border:none;
  border-radius:14px 4px 14px 14px;
  box-shadow:0 2px 10px rgba(75,72,200,.28);
}

/* Awaiting pill */
.cv-await{text-align:center;padding:20px 0 4px}
.cv-await-pill{font-size:11px;color:#8888aa;background:#fff;padding:5px 14px;border-radius:20px;border:1px solid #e2e2ee;display:inline-flex;align-items:center;gap:6px;box-shadow:0 1px 3px rgba(0,0,0,.05)}

/* ── Memory strip ── */
.cv-mem-strip{border-top:1px solid #e2e2ee;background:#fff;padding:12px 20px;flex-shrink:0}
.cv-mem-lbl{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#9898b8;margin-bottom:9px;display:flex;align-items:center;gap:6px}
.cv-mem-chips{display:flex;gap:8px;flex-wrap:wrap}
.cv-mem-chip{padding:6px 10px;background:var(--tp);border:0.5px solid rgba(29,196,160,.2);border-radius:8px;display:flex;gap:6px;align-items:flex-start;max-width:220px}
.cv-mem-type{font-size:9.5px;font-weight:700;color:var(--td);text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;margin-top:1px}
.cv-mem-val{font-size:11.5px;color:var(--ink);line-height:1.4}

/* ── Right panel ── */
.cv-action-col{overflow-y:auto;background:var(--bg);display:flex;flex-direction:column}
.cv-understanding{padding:16px 15px 14px;border-bottom:0.5px solid var(--brd)}
.cv-u-lbl{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink5);margin-bottom:11px;display:flex;align-items:center;gap:6px}
.cv-u-rows{display:flex;flex-direction:column;gap:7px}
.cv-u-row{display:flex;flex-direction:column;gap:2px;padding:8px 10px;background:var(--bg2);border:0.5px solid var(--brd);border-radius:8px}
.cv-u-key{font-size:9.5px;font-weight:700;color:var(--ink5);text-transform:uppercase;letter-spacing:.06em}
.cv-u-val{font-size:12px;color:var(--ink2);line-height:1.45}

.cv-actions-pane{padding:14px 15px}
.cv-actions-lbl{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink5);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.cv-action-btn{width:100%;text-align:left;padding:10px 12px;border-radius:10px;border:0.5px solid var(--brd2);background:var(--bg2);cursor:pointer;margin-bottom:7px;transition:all .15s;display:flex;align-items:flex-start;gap:10px;font-family:inherit}
.cv-action-btn:hover{background:var(--pu);border-color:var(--p);transform:translateY(-1px);box-shadow:0 2px 8px rgba(75,72,200,.1)}
.cv-action-btn.pri{background:#4b48c8;border-color:#4b48c8;color:#fff;box-shadow:0 3px 12px rgba(75,72,200,.28)}
.cv-action-btn.pri:hover{background:#3d3ab0;border-color:#3d3ab0;transform:translateY(-1px);box-shadow:0 4px 16px rgba(75,72,200,.35)}
.cv-action-btn.routed{background:var(--okb);border-color:rgba(29,158,117,.25);cursor:default;transform:none;box-shadow:none}
.cv-act-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px}
.cv-act-name{font-size:12px;font-weight:600;line-height:1.3;margin-bottom:2px}
.cv-act-desc{font-size:11px;opacity:.7;line-height:1.3}
.cv-routed-banner{padding:11px 14px;background:var(--okb);border:0.5px solid rgba(29,158,117,.2);border-radius:10px;font-size:12px;color:var(--okf);display:flex;align-items:center;gap:7px;margin-bottom:8px}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const STAGE_CONF: Record<string, { label: string; color: string; bg: string }> =
  {
    understanding: {
      label: "Understanding",
      color: "#4B48C8",
      bg: "var(--pp)",
    },
    discovery: { label: "Discovery", color: "#1DC4A0", bg: "var(--tp)" },
    "service-discussion": {
      label: "Service discussion",
      color: "#D97757",
      bg: "var(--amberp)",
    },
    "re-engagement": {
      label: "Re-engagement",
      color: "#E5566C",
      bg: "var(--rosep)",
    },
    routed: { label: "Routed", color: "#1F8A5B", bg: "#E6FAF1" },
    escalated: { label: "Escalated", color: "#B04A2A", bg: "#FDF0EC" },
  };

const CONV_DATA: Conversation[] = [
  {
    id: "c1",
    account: "Hartwell Ortho",
    contact: "Rachel Marsh",
    channel: "website",
    time: "2h ago",
    stage: "understanding",
    unread: true,
    topic: "Wants to explore paid search expansion",
    archetype: "Returning",
    urgency: "Active",
    thread: [
      {
        role: "customer",
        text: "Hi! We've been working with your team for a while and wanted to explore expanding into paid search. Can you help?",
        time: "10:04 AM",
      },
      {
        role: "assistant",
        text: "Hi Rachel! Great to hear from you. Absolutely — paid search is a great next step given what you've built organically. To point you in the right direction, could you share what your main goal is? More leads, better quality, or both?",
        time: "10:04 AM",
      },
      {
        role: "customer",
        text: "Both really, but quality over quantity. We've had issues with unqualified leads in the past.",
        time: "10:06 AM",
      },
      {
        role: "assistant",
        text: "Got it — quality-first paid search. That changes the strategy quite a bit. We'd likely focus on intent-heavy keywords and tighter audience targeting rather than broad reach. Our team has done this for a few healthcare clients. Would it help to set up a discovery call to scope this properly?",
        time: "10:06 AM",
      },
      {
        role: "customer",
        text: "Yes, that would be great. What does the engagement typically look like?",
        time: "10:09 AM",
      },
    ],
    understanding: {
      goal: "Expand into paid search with quality-first approach",
      archetype: "Returning — active client, relationship memory loaded",
      urgency: "Active — clear intent, no time pressure",
      concern: "Previous bad experience with unqualified leads",
      next: "Open paid search service engagement, schedule discovery call",
      relStage: "Service",
    },
    memory: [
      { type: "Goal", val: "40% ROI growth from digital marketing this year" },
      { type: "Committed", val: "Current retainer at $5,500/mo through Q2" },
      { type: "Concern", val: "Unqualified leads from past campaigns" },
    ],
    actions: [
      {
        label: "Open service engagement",
        icon: "💼",
        kind: "deal",
        primary: true,
        desc: "Creates a Paid Search opportunity in the pipeline",
      },
      {
        label: "Schedule discovery call",
        icon: "📅",
        kind: "schedule",
        primary: false,
        desc: "Book a scoping call with the paid search team",
      },
      {
        label: "Draft proposal outline",
        icon: "📄",
        kind: "draft",
        primary: false,
        desc: "Zotra drafts a scope doc based on what we know",
      },
      {
        label: "Escalate to account lead",
        icon: "👤",
        kind: "escalate",
        primary: false,
        desc: "Notify Rachel's account lead directly",
      },
    ],
  },
  {
    id: "c2",
    account: "DataBridge",
    contact: "Tom Hargreaves",
    channel: "email",
    time: "4h ago",
    stage: "re-engagement",
    unread: true,
    topic: "First reply in 18 days — recovery call agreed",
    archetype: "Urgent",
    urgency: "Urgent",
    thread: [
      {
        role: "assistant",
        text: "Hi Tom, following up on the delivery delays we discussed. We'd like to schedule a recovery call this week to get things back on track. Are you available?",
        time: "8:14 AM",
      },
      {
        role: "customer",
        text: "Yes, sorry for the silence. Things have been hectic. I'm available Thursday afternoon — does 3pm work?",
        time: "9:52 AM",
      },
      {
        role: "assistant",
        text: "Thursday 3pm works perfectly. I'll send a calendar invite. We'll use the call to review the remediation plan and agree on a recovery timeline. Anything specific you'd like to cover?",
        time: "9:53 AM",
      },
      {
        role: "customer",
        text: "Mainly the milestone plan and what changed on your end. We need clarity before we can go back to our board.",
        time: "10:01 AM",
      },
    ],
    understanding: {
      goal: "Restore trust and delivery confidence after escalation",
      archetype: "Returning — at-risk account, relationship under strain",
      urgency: "Urgent — board visibility, reputation risk",
      concern: "18-day silence, delivery missed, board pressure on client side",
      next: "Confirm recovery call, update remediation workspace, brief account lead",
      relStage: "Service",
    },
    memory: [
      { type: "Concern", val: "Delivery delays escalated — trust damaged" },
      { type: "Committed", val: "Recovery call Thursday 3pm agreed" },
      { type: "Risk", val: "Board visibility on client side — high stakes" },
    ],
    actions: [
      {
        label: "Update remediation workspace",
        icon: "📋",
        kind: "project",
        primary: true,
        desc: "Add Thursday call milestone to the project workspace",
      },
      {
        label: "Brief account lead",
        icon: "👤",
        kind: "escalate",
        primary: false,
        desc: "Flag urgency to the assigned account lead",
      },
      {
        label: "Draft recovery agenda",
        icon: "📄",
        kind: "draft",
        primary: false,
        desc: "Prepare call agenda: milestone review + recovery plan",
      },
      {
        label: "Confirm calendar invite",
        icon: "📅",
        kind: "schedule",
        primary: false,
        desc: "Send confirmed invite to Tom for Thursday 3pm",
      },
    ],
  },
  {
    id: "c3",
    account: "NorthPoint Legal",
    contact: "Dr. Sarah Kim",
    channel: "website",
    time: "1d ago",
    stage: "discovery",
    unread: false,
    topic: "Inbound inquiry — compliance ROI interest",
    archetype: "First-time",
    urgency: "Exploratory",
    thread: [
      {
        role: "customer",
        text: "Hello, I came across your firm and I'm interested in understanding how you help legal practices with compliance-related marketing. We're a mid-size firm and compliance is becoming a big concern.",
        time: "Yesterday 2:14 PM",
      },
      {
        role: "assistant",
        text: "Hi Dr. Kim! Thanks for reaching out. We work with several legal and professional services firms on exactly this — helping them communicate their compliance strengths without crossing any ethical advertising lines. Could I ask what's driving the focus on compliance right now? Is it a new regulation, or more of a client trust angle?",
        time: "Yesterday 2:14 PM",
      },
      {
        role: "customer",
        text: "Both. New SRA guidelines and we want to position ourselves as the trusted firm for regulated industries. Our competitors don't seem to take this seriously.",
        time: "Yesterday 2:21 PM",
      },
      {
        role: "assistant",
        text: "That's a real opportunity — being the visible leader in compliance-conscious marketing in your sector. We've done this for a fintech firm and two regional law firms. The positioning work usually starts with a discovery session to map your current messaging against what regulated clients actually want to hear. Would that be useful?",
        time: "Yesterday 2:22 PM",
      },
    ],
    understanding: {
      goal: "Position NorthPoint as the compliance-first legal firm for regulated industries",
      archetype: "First-time — new contact, no prior relationship",
      urgency: "Exploratory — clear goal but no urgency signal yet",
      concern: "Decision timeline unclear, Dr. Kim is sole DM",
      next: "Open a discovery opportunity, draft outreach with SRA compliance framing",
      relStage: "Prospect",
    },
    memory: [
      {
        type: "Goal",
        val: "Position as compliance-leader for regulated industry clients",
      },
      { type: "Trigger", val: "New SRA guidelines + competitive positioning" },
      { type: "DM", val: "Dr. Sarah Kim — sole decision maker confirmed" },
    ],
    actions: [
      {
        label: "Open discovery opportunity",
        icon: "💼",
        kind: "deal",
        primary: true,
        desc: "Creates a Prospect opportunity for NorthPoint Legal",
      },
      {
        label: "Draft discovery outreach",
        icon: "✉️",
        kind: "draft",
        primary: false,
        desc: "Zotra drafts a personalised follow-up email",
      },
      {
        label: "Research NorthPoint Legal",
        icon: "🔍",
        kind: "research",
        primary: false,
        desc: "Run Forager — firmographics, SRA context, competitors",
      },
      {
        label: "Schedule intro call",
        icon: "📅",
        kind: "schedule",
        primary: false,
        desc: "Offer a discovery call to Dr. Kim",
      },
    ],
  },
];

const CH_ICON: Record<string, string> = {
  website: "🌐",
  email: "✉️",
  mobile: "📱",
  whatsapp: "💬",
};
const CH_LABEL: Record<string, string> = {
  website: "Website",
  email: "Email",
  mobile: "Mobile",
  whatsapp: "WhatsApp",
};

// ─── Conversation Detail ──────────────────────────────────────────────────────
function ConversationDetail({
  conv,
  onBack,
}: {
  conv: Conversation;
  onBack: () => void;
}) {
  const sc = STAGE_CONF[conv.stage] ?? STAGE_CONF.understanding;
  const [routed, setRouted] = useState(false);
  const [routedLabel, setRoutedLabel] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadRef.current)
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, []);

  const urgColor =
    conv.urgency === "Urgent"
      ? "var(--ri)"
      : conv.urgency === "Active"
        ? "var(--p)"
        : "var(--ink4)";
  const urgBg =
    conv.urgency === "Urgent"
      ? "var(--rib)"
      : conv.urgency === "Active"
        ? "var(--pp)"
        : "var(--bg3)";

  return (
    <div className="cv-detail">
      {/* Breadcrumb */}
      <div className="cv-detail-hd">
        <button
          className="btn sm ghost"
          style={{ fontFamily: "inherit" }}
          onClick={onBack}
        >
          ← Conversations
        </button>
        <span style={{ color: "var(--ink6)", fontSize: 12 }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
          {conv.account}
        </span>
        <span style={{ fontSize: 11, color: "var(--ink5)" }}>
          · {conv.contact}
        </span>
        <span
          style={{
            fontSize: 10,
            padding: "2px 9px",
            borderRadius: 20,
            fontWeight: 600,
            background: sc.bg,
            color: sc.color,
            marginLeft: 4,
          }}
        >
          {sc.label}
        </span>
        <span
          style={{
            fontSize: 10,
            padding: "2px 9px",
            borderRadius: 20,
            fontWeight: 600,
            background: urgBg,
            color: urgColor,
            marginLeft: 2,
          }}
        >
          {conv.urgency}
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13 }}>{CH_ICON[conv.channel] ?? "💬"}</span>
          <span style={{ fontSize: 11, color: "var(--ink4)" }}>
            {CH_LABEL[conv.channel] ?? conv.channel} · {conv.time}
          </span>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="cv-detail-body">
        {/* LEFT: Thread + memory */}
        <div className="cv-thread-col">
          <div className="cv-thread" ref={threadRef}>
            <div className="cv-thread-label">
              {CH_ICON[conv.channel] ?? "💬"} {CH_LABEL[conv.channel]} ·{" "}
              {conv.contact}
            </div>

            {conv.thread.map((msg, i) => {
              const isAsst = msg.role === "assistant";
              return (
                <div
                  key={i}
                  className={`cv-msg-group ${isAsst ? "from-asst" : "from-cust"}`}
                >
                  <div className="cv-sender-row">
                    <div
                      className={`cv-avatar ${isAsst ? "cv-avatar-asst" : "cv-avatar-cust"}`}
                    >
                      {isAsst ? "✦" : "👤"}
                    </div>
                    <span className="cv-sender-name">
                      {isAsst ? "Zotra Assistant" : conv.contact}
                    </span>
                    <span className="cv-sender-time">{msg.time}</span>
                  </div>
                  <div
                    style={{
                      paddingLeft: isAsst ? 33 : 0,
                      paddingRight: isAsst ? 0 : 33,
                    }}
                  >
                    <span
                      className={isAsst ? "cv-bubble-asst" : "cv-bubble-cust"}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="cv-await">
              <span className="cv-await-pill">
                ⏱ Awaiting your team's action
              </span>
            </div>
          </div>

          {/* Memory strip */}
          <div className="cv-mem-strip">
            <div className="cv-mem-lbl">🧠 Relationship memory</div>
            <div className="cv-mem-chips">
              {conv.memory.map((m, i) => (
                <div key={i} className="cv-mem-chip">
                  <span className="cv-mem-type">{m.type}</span>
                  <span className="cv-mem-val">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Understanding + Actions */}
        <div className="cv-action-col">
          <div className="cv-understanding">
            <div className="cv-u-lbl">✦ AI Understanding</div>
            <div className="cv-u-rows">
              {(
                [
                  ["Goal", conv.understanding.goal],
                  ["Archetype", conv.understanding.archetype],
                  ["Urgency", conv.understanding.urgency],
                  ["Concern", conv.understanding.concern],
                  ["Next step", conv.understanding.next],
                  ["Rel stage", conv.understanding.relStage],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="cv-u-row">
                  <div className="cv-u-key">{k}</div>
                  <div className="cv-u-val">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-actions-pane">
            <div className="cv-actions-lbl">⚡ Suggested actions</div>
            {routed && (
              <div className="cv-routed-banner">
                ✓{" "}
                <span>
                  <b>{routedLabel}</b> — conversation routed · Relationship
                  record updated
                </span>
              </div>
            )}
            {conv.actions.map((action, i) => (
              <button
                key={i}
                className={`cv-action-btn${action.primary ? " pri" : ""}${routed && action.primary ? " routed" : ""}`}
                onClick={() => {
                  setRouted(true);
                  setRoutedLabel(action.label);
                }}
              >
                <div
                  className="cv-act-icon"
                  style={{
                    background: action.primary
                      ? "rgba(255,255,255,.18)"
                      : "var(--pp)",
                  }}
                >
                  {action.icon}
                </div>
                <div>
                  <div className="cv-act-name">{action.label}</div>
                  <div className="cv-act-desc">{action.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export default function ConversationsView() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  if (open) {
    const conv = CONV_DATA.find((c) => c.id === open);
    if (conv)
      return (
        <>
          <style>{STYLES}</style>
          <ConversationDetail conv={conv} onBack={() => setOpen(null)} />
        </>
      );
  }

  const stages = [
    "all",
    "understanding",
    "discovery",
    "service-discussion",
    "re-engagement",
  ];
  const filtered =
    filter === "all" ? CONV_DATA : CONV_DATA.filter((c) => c.stage === filter);
  const counts: Record<string, number> = {};
  CONV_DATA.forEach((c) => {
    counts[c.stage] = (counts[c.stage] ?? 0) + 1;
  });

  return (
    <>
      <style>{STYLES}</style>
      <div className="cv-wrap">
        <div className="cv-hd">
          <div className="cv-hd-top">
            <div>
              <div className="cv-title">Conversations</div>
              <div className="cv-sub">
                Inbound from Conversation Assistant · Review · Route
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button className="btn sm" style={{ fontFamily: "inherit" }}>
                🤖 Asst. Preview
              </button>
            </div>
          </div>
          <div className="cv-tabs">
            {stages.map((s) => {
              const sc = STAGE_CONF[s];
              const label = s === "all" ? "All" : (sc?.label ?? s);
              const count = s === "all" ? CONV_DATA.length : (counts[s] ?? 0);
              return (
                <div
                  key={s}
                  className={`cv-tab${filter === s ? " on" : ""}`}
                  onClick={() => setFilter(s)}
                >
                  {label}
                  <span className="cv-tab-cnt">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cv-body">
          <div className="cv-banner">
            🤖&nbsp; Customers reach you through the{" "}
            <b style={{ marginLeft: 3 }}>Conversation Assistant</b> on your
            website, mobile app, or other channels. Every conversation lands
            here for your team to review and route.
          </div>

          <div className="cv-table">
            <div className="cv-table-hd">
              {[
                "",
                "Conversation",
                "Stage",
                "Archetype",
                "Urgency",
                "Time",
              ].map((h, i) => (
                <div key={i} className="cv-table-hd-cell">
                  {h}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="cv-empty">No conversations in this stage.</div>
            )}

            {filtered.map((conv) => {
              const sc = STAGE_CONF[conv.stage] ?? STAGE_CONF.understanding;
              const urgColor =
                conv.urgency === "Urgent"
                  ? "var(--ri)"
                  : conv.urgency === "Active"
                    ? "var(--p)"
                    : "var(--ink4)";
              const urgBg =
                conv.urgency === "Urgent"
                  ? "var(--rib)"
                  : conv.urgency === "Active"
                    ? "var(--pp)"
                    : "var(--bg3)";
              return (
                <div
                  key={conv.id}
                  className="cv-row"
                  onClick={() => setOpen(conv.id)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {conv.unread && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 8,
                          background: "var(--p)",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ minWidth: 0, paddingRight: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: conv.unread ? 700 : 600,
                          color: "var(--ink)",
                        }}
                      >
                        {conv.account}
                      </span>
                      <span style={{ fontSize: 12 }}>
                        {CH_ICON[conv.channel] ?? "💬"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--ink3)",
                        marginBottom: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conv.topic}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink5)" }}>
                      {conv.contact}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10.5,
                        padding: "2px 9px",
                        borderRadius: 20,
                        fontWeight: 600,
                        background: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>
                    {conv.archetype}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10.5,
                        padding: "2px 8px",
                        borderRadius: 20,
                        fontWeight: 600,
                        background: urgBg,
                        color: urgColor,
                      }}
                    >
                      {conv.urgency}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--ink5)",
                      fontFamily: "DM Mono, monospace",
                    }}
                  >
                    {conv.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
