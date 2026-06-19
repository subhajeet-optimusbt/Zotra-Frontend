import React, { useState } from "react";
import Icon from "../components/Icon";

// ── Types ─────────────────────────────────────────────────────────────────────
type AgentState = "working" | "pending" | "done" | "idle" | "scheduled";
type AgentMode  = "Acts" | "Assists";

interface Agent {
  id: string;
  name: string;
  ic: string;
  icBg: string;
  icFg: string;
  mode: AgentMode;
  state: AgentState;
  stateLabel: string;
  stateBg: string;
  stateFg: string;
  pulse: boolean;
  action: string;
  detail: string;
  customer: string;
  time: string;
  runsToday: number;
}

type FilterId = "all" | "active" | "done" | "idle";

interface AutomationViewProps {
  setView?: (v: string) => void;
}

// ── Agent data ────────────────────────────────────────────────────────────────
const AUTOMATION_AGENTS: Agent[] = [
  {
    id: "watcher", name: "Watcher", ic: "eye",
    icBg: "var(--pp)", icFg: "var(--p)",
    mode: "Acts", state: "working", stateLabel: "Working now",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: true,
    action: "Scanning Marketwake engagement",
    detail: "Reply gap detected — 9 days since David replied. Engagement score declining. Suggested action queued for review.",
    customer: "Marketwake", time: "now", runsToday: 4,
  },
  {
    id: "forager", name: "Forager", ic: "search",
    icBg: "var(--amberp)", icFg: "var(--amber)",
    mode: "Acts", state: "working", stateLabel: "Working now",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: true,
    action: "Enriching NorthPoint Legal",
    detail: "Org map building. Dr. Kim confirmed as sole decision-maker. LinkedIn scan running for additional stakeholder contacts.",
    customer: "NorthPoint Legal", time: "now", runsToday: 2,
  },
  {
    id: "comms", name: "Comms", ic: "send",
    icBg: "var(--pp)", icFg: "var(--p)",
    mode: "Assists", state: "pending", stateLabel: "2 pending",
    stateBg: "var(--wab)", stateFg: "var(--waf)", pulse: true,
    action: "2 drafts awaiting your review",
    detail: "Northwind Trading follow-up and Canpango qualification reply are ready. Nothing sends until you approve.",
    customer: "Multiple", time: "now", runsToday: 3,
  },
  {
    id: "opportunity", name: "Opportunity", ic: "target",
    icBg: "var(--pp)", icFg: "var(--p)",
    mode: "Assists", state: "done", stateLabel: "Done · 3h",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: false,
    action: "Draft agreement ready",
    detail: "Verbal commit received from David Chen. $96K agreement drafted and sitting in your review queue — nothing is sent until you confirm.",
    customer: "Marketwake", time: "3h", runsToday: 3,
  },
  {
    id: "financial", name: "Financial", ic: "receipt",
    icBg: "var(--amberp)", icFg: "var(--amber)",
    mode: "Acts", state: "done", stateLabel: "Done · 1h",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: false,
    action: "Invoice Day 22 alert logged",
    detail: "DataBridge #INV-2026-004 is 8 days overdue. Two email reminders sent with no response. Escalation logged — a call is recommended.",
    customer: "DataBridge", time: "1h", runsToday: 2,
  },
  {
    id: "project", name: "Project", ic: "kanban-square",
    icBg: "#E8F5E9", icFg: "#2E7D32",
    mode: "Acts", state: "done", stateLabel: "Done · 1h",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: false,
    action: "Scope drift +30% flagged",
    detail: "Metro Content effort is 30% over estimate. Gross margin has dropped to 16%. Change order drafted and ready for your review before sending to client.",
    customer: "Metro Content", time: "1h", runsToday: 2,
  },
  {
    id: "renewal", name: "Renewal", ic: "refresh-cw",
    icBg: "var(--tp)", icFg: "var(--td)",
    mode: "Acts", state: "done", stateLabel: "Done · 2h",
    stateBg: "var(--okb)", stateFg: "var(--okf)", pulse: false,
    action: "Renewal brief filed",
    detail: "Hartwell Ortho contract ends in 61 days. Brief includes the paid search expansion signal Rachel mentioned on last call. Ready to send.",
    customer: "Hartwell Ortho", time: "2h", runsToday: 1,
  },
  {
    id: "escalation", name: "Escalation", ic: "alert-triangle",
    icBg: "var(--rib)", icFg: "var(--ri)",
    mode: "Assists", state: "idle", stateLabel: "Idle",
    stateBg: "var(--bg3)", stateFg: "var(--ink4)", pulse: false,
    action: "No converging risks detected",
    detail: "Portfolio scanned across all 10 active accounts. No simultaneous risk signals found. All accounts within normal thresholds.",
    customer: "Portfolio", time: "6h", runsToday: 0,
  },
  {
    id: "portfolio", name: "Portfolio Intelligence", ic: "globe",
    icBg: "var(--bg3)", icFg: "var(--ink3)",
    mode: "Acts", state: "scheduled", stateLabel: "Next · 6h",
    stateBg: "var(--bg3)", stateFg: "var(--ink4)", pulse: false,
    action: "Last scan clean",
    detail: "Revenue concentration within normal range. No cohort churn patterns detected. Pipeline velocity trends stable. Next scheduled run in 6 hours.",
    customer: "All accounts", time: "6h", runsToday: 1,
  },
];

// ── Injected styles ───────────────────────────────────────────────────────────
const styles = `
@keyframes av-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}
.av-pulse { animation: av-pulse 1.8s ease-in-out infinite; }

.av-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--bg);
}
.av-header {
  flex-shrink: 0;
  padding: 18px 24px 14px;
  background: var(--bg2);
  border-bottom: 0.5px solid var(--brd);
}
.av-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}
.av-title {
  font-family: "Sora", sans-serif;
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin-bottom: 3px;
}
.av-sub {
  font-size: 12.5px;
  color: var(--ink4);
}
.av-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 14px;
}
.av-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 13px;
  background: var(--bg2);
  border: 0.5px solid var(--brd2);
  border-radius: 20px;
  box-shadow: var(--sh-s);
}
.av-chip-num {
  font-family: "Sora", sans-serif;
  font-size: 15px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.av-chip-lbl {
  font-size: 11.5px;
  color: var(--ink4);
}
.av-filters {
  display: flex;
  gap: 5px;
}
.av-filter-cnt {
  font-family: "DM Mono", monospace;
  font-size: 9.5px;
  padding: 0 5px;
  border-radius: 8px;
  margin-left: 3px;
}
.av-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px 40px;
}
.av-list-inner {
  max-width: 840px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.av-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--ink4);
}
.av-card {
  background: var(--bg2);
  border-radius: 13px;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.av-card-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  cursor: pointer;
}
.av-card-ic {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.av-card-body {
  flex: 1;
  min-width: 0;
}
.av-card-name-row {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 3px;
}
.av-card-name {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.av-mode-badge {
  font-size: 9.5px;
  font-family: "DM Mono", monospace;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 4px;
  border: 0.5px solid var(--brd2);
}
.av-card-action {
  font-size: 12px;
  color: var(--ink3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.av-card-customer {
  color: var(--ink5);
  margin-left: 6px;
}
.av-card-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.av-state-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 11px;
  border-radius: 20px;
}
.av-pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
}
.av-expand-panel {
  border-top: 0.5px solid var(--brd);
  background: var(--pu);
  padding: 14px 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.av-expand-text {
  flex: 1;
  min-width: 0;
}
.av-expand-detail {
  font-size: 12.5px;
  color: var(--ink3);
  line-height: 1.65;
  margin-bottom: 10px;
}
.av-expand-meta {
  display: flex;
  gap: 16px;
}
.av-meta-item {
  font-size: 11px;
  color: var(--ink4);
}
.av-meta-val {
  font-weight: 600;
  color: var(--ink);
}
.av-expand-btns {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
`;

// ── Component ─────────────────────────────────────────────────────────────────
const AutomationView: React.FC<AutomationViewProps> = ({ setView }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter]     = useState<FilterId>("all");

  const counts = {
    working: AUTOMATION_AGENTS.filter((a) => a.state === "working").length,
    pending: AUTOMATION_AGENTS.filter((a) => a.state === "pending").length,
    done:    AUTOMATION_AGENTS.filter((a) => a.state === "done").length,
    idle:    AUTOMATION_AGENTS.filter((a) => ["idle", "scheduled"].includes(a.state)).length,
    total:   AUTOMATION_AGENTS.reduce((s, a) => s + a.runsToday, 0),
  };

  const FILTERS: { id: FilterId; label: string; count: number }[] = [
    { id: "all",    label: "All",        count: AUTOMATION_AGENTS.length },
    { id: "active", label: "Active now", count: counts.working + counts.pending },
    { id: "done",   label: "Done today", count: counts.done },
    { id: "idle",   label: "Idle",       count: counts.idle },
  ];

  const STAT_CHIPS = [
    { v: counts.working, l: "Working now",    dot: "var(--p)",    pulse: true  },
    { v: counts.pending, l: "Pending review", dot: "var(--wa)",   pulse: true  },
    { v: counts.done,    l: "Done today",     dot: "var(--ok)",   pulse: false },
    { v: counts.idle,    l: "Idle",           dot: "var(--ink5)", pulse: false },
  ];

  const visible =
    filter === "all"    ? AUTOMATION_AGENTS
    : filter === "active" ? AUTOMATION_AGENTS.filter((a) => ["working", "pending"].includes(a.state))
    : filter === "done"   ? AUTOMATION_AGENTS.filter((a) => a.state === "done")
    : AUTOMATION_AGENTS.filter((a) => ["idle", "scheduled"].includes(a.state));

  return (
    <div className="av-shell" >
      <style>{styles}</style>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="av-header" >

        {/* Title + Configure */}
        <div className="av-title-row" >
          <div>
            <div className="av-title" >Automation</div>
            <div className="av-sub" >
              {AUTOMATION_AGENTS.length} agents running in the background · {counts.total} actions taken today
            </div>
          </div>
          <button
            className="btn sm" 
            style={{ flexShrink: 0, marginTop: 2 }}
            onClick={() => setView?.("settings")}
          >
            <Icon name="sliders-horizontal" size={12} /> Configure
          </button>
        </div>

        {/* Stat chips */}
        <div className="av-chips" >
          {STAT_CHIPS.map((s, i) => (
            <div key={i} className="av-chip" >
              <span
                className={s.pulse ? "av-pulse" : ""}
                style={{
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: s.dot,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span className="av-chip-num" >{s.v}</span>
              <span className="av-chip-lbl" >{s.l}</span>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="av-filters" >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`btn sm${filter === f.id ? " pri" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span
                className="av-filter-cnt" 
                style={{
                  background: filter === f.id ? "rgba(255,255,255,.22)" : "var(--bg3)",
                  color:      filter === f.id ? "#fff" : "var(--ink4)",
                }}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Agent list ─────────────────────────────────────────────────────── */}
      <div className="av-list" >
        <div className="av-list-inner" >

          {visible.length === 0 && (
            <div className="av-empty" >
              <Icon name="cpu" size={28} />
              <div style={{ marginTop: 12, fontSize: 13 }}>No agents in this state right now.</div>
            </div>
          )}

          {visible.map((agent) => {
            const isOpen = expanded === agent.id;
            return (
              <div
                key={agent.id}
                className="av-card" 
                style={{
                  border:     isOpen ? "1.5px solid var(--p)" : "0.5px solid var(--brd)",
                  boxShadow:  isOpen ? "0 0 0 3px rgba(75,72,200,.07), var(--sh-s)" : "var(--sh-s)",
                }}
              >
                {/* ── Row ── */}
                <div
                  className="av-card-row" 
                  onClick={() => setExpanded(isOpen ? null : agent.id)}
                >
                  {/* Icon bubble */}
                  <div
                    className="av-card-ic" 
                    style={{ background: agent.icBg, color: agent.icFg }}
                  >
                    <Icon name={agent.ic} size={16} />
                  </div>

                  {/* Name + action line */}
                  <div className="av-card-body" >
                    <div className="av-card-name-row" >
                      <span className="av-card-name" >{agent.name}</span>
                      <span
                        className="av-mode-badge" 
                        style={{
                          background: agent.mode === "Acts" ? "var(--pp)" : "var(--bg3)",
                          color:      agent.mode === "Acts" ? "var(--p)"  : "var(--ink4)",
                        }}
                      >
                        {agent.mode}
                      </span>
                    </div>
                    <div className="av-card-action" >
                      {agent.action}
                      <span className="av-card-customer" >· {agent.customer}</span>
                    </div>
                  </div>

                  {/* State badge + chevron */}
                  <div className="av-card-right" >
                    <span
                      className="av-state-badge" 
                      style={{ background: agent.stateBg, color: agent.stateFg }}
                    >
                      {agent.pulse && (
                        <span className="av-pulse-dot av-pulse"  />
                      )}
                      {agent.stateLabel}
                    </span>
                    <Icon
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={14}
                      style={{ color: "var(--ink4)" }}
                    />
                  </div>
                </div>

                {/* ── Expanded panel ── */}
                {isOpen && (
                  <div className="av-expand-panel" >
                    <div className="av-expand-text" >
                      <div className="av-expand-detail" >{agent.detail}</div>
                      <div className="av-expand-meta" >
                        <div className="av-meta-item" >
                          Runs today: <span className="av-meta-val" >{agent.runsToday}</span>
                        </div>
                        <div className="av-meta-item" >
                          Last: <span className="av-meta-val" >
                            {agent.time === "now" ? "running now" : `${agent.time} ago`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="av-expand-btns" >
                      {agent.state === "pending" && (
                        <button className="btn sm pri" >
                          <Icon name="check" size={11} /> Review drafts
                        </button>
                      )}
                      <button
                        className="btn sm" 
                        onClick={(e) => { e.stopPropagation(); setView?.("settings"); }}
                      >
                        <Icon name="sliders-horizontal" size={11} /> Configure
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AutomationView;