/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { setupTenant, ApiError } from "../services/api";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  sub: string;
  quote: { q: string; c: string };
}

interface Invite {
  email: string;
  role: string;
}
interface Edition {
  name: string;
  price: string;
  desc: string;
  pills: string[];
  recommended?: boolean;
}
interface Agent {
  ic: string;
  bg: string;
  color: string;
  name: string;
  sub: string;
  def: number;
  modeKey: string;
}
interface BootItem {
  n: string;
  h: string;
  p: string;
  status: "done" | "running" | "queued";
}
interface EditionAccent {
  border: string;
  glow: string;
  badge: string;
  badgeBg: string;
}

// ---------------------------------------------------------------------------
// Data  (Connect sources step removed — now 6 steps)
// ---------------------------------------------------------------------------

const STEPS: Step[] = [
  {
    id: "welcome",
    label: "Welcome",
    eyebrow: "Setup · 01",
    title: "Welcome to Zotra.",
    sub: "A reasoning engine for the full arc of every customer — sales, delivery, financials, renewal, expansion. Six short steps to make it yours.",
    quote: {
      q: "Know what you know. Know what you don't. Never confuse the two.",
      c: "— Zotra philosophy",
    },
  },
  {
    id: "company",
    label: "Your company",
    eyebrow: "Setup · 02",
    title: "Tell us about your company.",
    sub: "A few details about the organisation you work for. You can change any of it later from Settings.",
    quote: {
      q: "Every customer, every log entry, every agent action threads through your company's workspace.",
      c: "— Concept guide",
    },
  },
  {
    id: "edition",
    label: "Edition",
    eyebrow: "Setup · 03",
    title: "Pick your edition.",
    sub: "Each edition adds a loop. You can upgrade in-place — nothing migrates, nothing breaks.",
    quote: {
      q: "Zotra is packaged so you adopt one operational loop at a time. Start where the pain is.",
      c: "— Editions overview",
    },
  },
  {
    id: "team",
    label: "Invite team",
    eyebrow: "Setup · 04",
    title: "Bring your team in.",
    sub: "Add anyone who works on customer relationships — partners, project managers, finance. We'll send invites when you launch.",
    quote: {
      q: "Zotra is a co-author, not a system of record. The richer the team, the sharper the reasoning.",
      c: "— Team & roles",
    },
  },
  {
    id: "agents",
    label: "Agents",
    eyebrow: "Setup · 05",
    title: "Set your agents loose — at your pace.",
    sub: "Each agent has three modes. Start with Assists for everything; promote as confidence grows.",
    quote: {
      q: "Assists prepares and waits. Acts executes with immediate logging. Leads manages end-to-end with periodic review.",
      c: "— Agent autonomy",
    },
  },
  {
    id: "launch",
    label: "Launch",
    eyebrow: "Setup · 06",
    title: "You're set. Zotra is listening.",
    sub: "Review your setup below. Everything looks good — hit Launch to start your workspace.",
    quote: {
      q: "A workspace earns its keep on the third week. The first two are listening.",
      c: "— Onboarding playbook",
    },
  },
];

const editions: Edition[] = [
  {
    name: "Free",
    price: "$0 · 30 days",
    desc: "Try Zotra with one inbox and up to three customers. No card. Upgrade in place when you're ready.",
    pills: ["1 loop", "1 seat"],
  },
  {
    name: "Individual",
    price: "$29 / seat",
    desc: "Solo operators & founders. Inbox-native opportunity workspace with the Commercial loop.",
    pills: ["1 loop", "2 agents"],
  },
  {
    name: "Team",
    price: "$79 / seat",
    desc: "Agencies & service teams. Adds project & financial workspaces — scope drift, effort variance, ageing.",
    pills: ["3 loops", "4 agents"],
    recommended: true,
  },
  {
    name: "Business",
    price: "$149 / seat",
    desc: "Portfolio teams. Adds Renewal loop, expansion-signal detection, cross-loop orchestration.",
    pills: ["4 loops", "5 agents"],
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    desc: "Governance, audit, regional residency, APIs. Custom agents and custom evidence bands.",
    pills: ["All loops", "All agents"],
  },
];

const editionIcons: string[] = ["◇", "◆", "⬡", "⬢", "✦"];
const editionAccents: EditionAccent[] = [
  {
    border: "rgba(180,180,194,0.5)",
    glow: "rgba(180,180,194,0.12)",
    badge: "#88889A",
    badgeBg: "#F4F5FA",
  },
  {
    border: "rgba(75,72,200,0.35)",
    glow: "rgba(75,72,200,0.08)",
    badge: "#4B48C8",
    badgeBg: "#EEEEF9",
  },
  {
    border: "rgba(75,72,200,0.55)",
    glow: "rgba(75,72,200,0.13)",
    badge: "#4B48C8",
    badgeBg: "#EEEEF9",
  },
  {
    border: "rgba(29,196,160,0.45)",
    glow: "rgba(29,196,160,0.10)",
    badge: "#065F46",
    badgeBg: "#E3F9F4",
  },
  {
    border: "rgba(18,18,28,0.22)",
    glow: "rgba(18,18,28,0.05)",
    badge: "#18181C",
    badgeBg: "#F0F1F8",
  },
];

const agentList: Agent[] = [
  {
    ic: "⬢",
    bg: "#EEEEF9",
    color: "#4B48C8",
    name: "Commercial Agent",
    sub: "Inference, force scoring, gate checks",
    def: 1,
    modeKey: "commercialAgentMode",
  },
  {
    ic: "◯",
    bg: "#E3F9F4",
    color: "#065F46",
    name: "Delivery Agent",
    sub: "Effort variance, scope drift",
    def: 1,
    modeKey: "deliveryAgentMode",
  },
  {
    ic: "◐",
    bg: "#FFFBEB",
    color: "#92400E",
    name: "Financial Agent",
    sub: "Invoice ageing, payment risk",
    def: 0,
    modeKey: "financialAgentMode",
  },
  {
    ic: "⟳",
    bg: "#FEF2F2",
    color: "#991B1B",
    name: "Renewal Agent",
    sub: "90-day window, expansion signals",
    def: 1,
    modeKey: "renewalAgentMode",
  },
  {
    ic: "○",
    bg: "#F0F1F8",
    color: "#52525E",
    name: "Relationship Agent",
    sub: "Stakeholder map, absence signals",
    def: 0,
    modeKey: "relationshipAgentMode",
  },
];

const modes: string[] = ["Assists", "Acts", "Leads"];

const bootItems: BootItem[] = [
  {
    n: "01",
    h: "Workspace initialised",
    p: "Tenant record created · region locked",
    status: "done",
  },
  {
    n: "02",
    h: "Agent configuration saved",
    p: "Modes committed · autonomy levels active",
    status: "done",
  },
  {
    n: "03",
    h: "Team invites queued",
    p: "Emails will dispatch on launch",
    status: "running",
  },
  {
    n: "04",
    h: "First Morning Pulse scheduled",
    p: "Will fire within the hour after launch",
    status: "queued",
  },
  {
    n: "05",
    h: "Log Stream listening",
    p: "Waiting for first connected source after launch",
    status: "queued",
  },
];

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const inp =
  "h-10 px-3 border border-black/[0.14] rounded-[9px] bg-white text-[#18181C] text-[13px] outline-none focus:border-[#4B48C8] focus:ring-2 focus:ring-[#EEEEF9] transition-all duration-150 w-full placeholder:text-[#C4C4D0]";

// ---------------------------------------------------------------------------
// Setup state
// ---------------------------------------------------------------------------

interface SetupData {
  companyName: string;
  companyDomain: string;
  region: string;
  companySize: string;
  jobRole: string;
  companyType: string;
  edition: string;
  invites: Invite[];
  agentModes: number[];
}

// ---------------------------------------------------------------------------
// Utility components
// ---------------------------------------------------------------------------

function FadeUp({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    const t = setTimeout(() => {
      el.style.transition = `opacity 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.38s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 20);
    return () => clearTimeout(t);
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

function ProgressBar({ cur, total }: { cur: number; total: number }) {
  const pct = ((cur + 1) / total) * 100;
  return (
    <div className="h-0.5 bg-black/[0.06] w-full overflow-hidden" >
      <div
        className="h-full bg-gradient-to-r from-[#4B48C8] to-[#7B79E8]" 
        style={{
          width: `${pct}%`,
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

function StepWelcome() {
  return (
    <div className="flex flex-col gap-4" >
      <div className="grid grid-cols-3 gap-3 mb-2" >
        {[
          {
            ic: "◆",
            h: "Five forces, not 200 fields",
            p: "Panchashakti scores every deal on economic weight, timing, engagement, momentum and trust.",
          },
          {
            ic: "⟳",
            h: "Living trajectory",
            p: "Direction is more predictive than level. Zotra tracks both, continuously, and flags absence signals.",
          },
          {
            ic: "◐",
            h: "Five bounded agents",
            p: "Commercial, Delivery, Financial, Renewal and Relationship — each with its own autonomy.",
          },
        ].map((t, i) => (
          <FadeUp key={t.h} delay={i * 60}>
            <div className="p-5 border border-black/[0.08] rounded-[14px] bg-white shadow-[0_1px_4px_rgba(75,72,200,0.07)] hover:shadow-[0_4px_16px_rgba(75,72,200,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-default" >
              <div className="w-9 h-9 rounded-[9px] bg-[#EEEEF9] grid place-items-center text-[18px] mb-3.5 text-[#4B48C8]" >
                {t.ic}
              </div>
              <div className="font-semibold text-[13.5px] text-[#18181C] tracking-[-0.015em] mb-1.5" >
                {t.h}
              </div>
              <div className="text-[12px] text-[#52525E] leading-[1.55] font-light" >
                {t.p}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
      <FadeUp delay={200}>
        <div className="p-5 border border-[rgba(75,72,200,0.15)] rounded-[14px] bg-gradient-to-br from-[#F5F5FD] to-[#EEEEF9]/60" >
          <div className="font-semibold text-[13px] text-[#18181C] mb-3" >
            What setup covers
          </div>
          <ul className="flex flex-col gap-2" >
            {[
              ["Company", "name, domain, region"],
              ["Edition", "pick the tier that fits"],
              ["Team", "invite people, set roles"],
              ["Agents", "which run, and how autonomously"],
            ].map(([b, rest]) => (
              <li
                key={b}
                className="flex items-start gap-2 text-[12.5px] text-[#52525E]" 
              >
                <span className="text-[#4B48C8] font-bold mt-px shrink-0" >
                  ·
                </span>
                <span>
                  <strong className="text-[#18181C] font-medium" >{b}</strong> —{" "}
                  {rest}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3.5 font-mono text-[10.5px] text-[#88889A] tracking-[0.04em]" >
            ~5 minutes · saves as you go
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

function StepCompany({
  data,
  onChange,
}: {
  data: SetupData;
  onChange: (p: Partial<SetupData>) => void;
}) {
  const companyTypes = [
    "Consulting & advisory",
    "Agency",
    "SaaS",
    "Professional services",
    "Financial services",
    "Other",
  ];
  return (
    <div className="flex flex-col gap-4" >
      <FadeUp delay={0}>
        <div className="flex flex-col gap-1.5" >
          <label className="text-[11.5px] font-medium text-[#2E2E36]" >
            Company name
          </label>
          <input
            className={inp}
            type="text"
            value={data.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
            placeholder="Your company name"
          />
          <div className="text-[11px] text-[#88889A]" >
            The organisation you belong to. Shown in the sidebar and on agent
            reports.
          </div>
        </div>
      </FadeUp>
      <FadeUp delay={60}>
        <div className="grid grid-cols-2 gap-3" >
          <div className="flex flex-col gap-1.5" >
            <label className="text-[11.5px] font-medium text-[#2E2E36]" >
              Company domain
            </label>
            <input
              className={inp}
              type="text"
              value={data.companyDomain}
              onChange={(e) => onChange({ companyDomain: e.target.value })}
              placeholder="yourcompany.com"
            />
            <div className="text-[11px] text-[#88889A]" >
              Verifies colleagues on the same domain automatically.
            </div>
          </div>
          <div className="flex flex-col gap-1.5" >
            <label className="text-[11.5px] font-medium text-[#2E2E36]" >
              Region
            </label>
            <select
              className={inp}
              value={data.region}
              onChange={(e) => onChange({ region: e.target.value })}
            >
              <option value="EU-Frankfurt">EU · Frankfurt</option>
              <option value="US-Virginia">US · Virginia</option>
              <option value="UK-London">UK · London</option>
              <option value="APAC-Singapore">APAC · Singapore</option>
            </select>
            <div className="text-[11px] text-[#88889A]" >
              Where your data is stored at rest.
            </div>
          </div>
        </div>
      </FadeUp>
      <FadeUp delay={120}>
        <div className="grid grid-cols-2 gap-3" >
          <div className="flex flex-col gap-1.5" >
            <label className="text-[11.5px] font-medium text-[#2E2E36]" >
              Company size
            </label>
            <select
              className={inp}
              value={data.companySize}
              onChange={(e) => onChange({ companySize: e.target.value })}
            >
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="201-1000">201–1,000</option>
              <option value="1000+">1,000+</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5" >
            <label className="text-[11.5px] font-medium text-[#2E2E36]" >
              Your role
            </label>
            <select
              className={inp}
              value={data.jobRole}
              onChange={(e) => onChange({ jobRole: e.target.value })}
            >
              <option value="Partner / Founder">Partner / Founder</option>
              <option value="Managing director">Managing director</option>
              <option value="Practice lead">Practice lead</option>
              <option value="Project manager">Project manager</option>
              <option value="Consultant">Consultant</option>
              <option value="Finance / operations">Finance / operations</option>
            </select>
          </div>
        </div>
      </FadeUp>
      <FadeUp delay={180}>
        <div className="flex flex-col gap-1.5" >
          <label className="text-[11.5px] font-medium text-[#2E2E36]" >
            What does your company do?
          </label>
          <div className="flex flex-wrap gap-2" >
            {companyTypes.map((t) => (
              <button
                key={t}
                onClick={() => onChange({ companyType: t })}
                className={`px-3 py-1.5 rounded-lg border text-[12.5px] font-medium transition-all ${data.companyType === t ? "bg-[#4B48C8] border-[#4B48C8] text-white" : "bg-white border-black/[0.14] text-[#52525E] hover:border-[#4B48C8]/40 hover:text-[#4B48C8]"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

function StepEdition({
  data,
  onChange,
}: {
  data: SetupData;
  onChange: (p: Partial<SetupData>) => void;
}) {
  const selected = editions.findIndex((e) => e.name === data.edition);
  return (
    <div className="flex flex-col gap-2.5" >
      {editions.map((ed, i) => {
        const accent = editionAccents[i];
        const isSelected = i === selected;
        return (
          <FadeUp key={ed.name} delay={i * 50}>
            <div
              onClick={() => onChange({ edition: ed.name })}
              style={{
                border: `1.5px solid ${isSelected ? accent.border : "rgba(0,0,0,0.09)"}`,
                boxShadow: isSelected ? `0 0 0 3px ${accent.glow}` : "none",
              }}
              className={`p-4 rounded-[13px] cursor-pointer transition-all duration-150 ${isSelected ? "bg-white" : "bg-white hover:border-black/[0.16]"}`}
            >
              <div className="flex items-center justify-between" >
                <div className="flex items-center gap-3" >
                  <div
                    className="w-8 h-8 rounded-[8px] bg-[#F4F5FA] grid place-items-center text-[16px]" 
                    style={{ color: accent.badge }}
                  >
                    {editionIcons[i]}
                  </div>
                  <div>
                    <div className="font-semibold text-[13.5px] text-[#18181C] tracking-[-0.01em]" >
                      {ed.name}
                    </div>
                    <div className="font-mono text-[10.5px] text-[#88889A] tracking-[0.02em] mt-0.5" >
                      {ed.price}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2" >
                  {ed.pills.map((p) => (
                    <span
                      key={p}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-md" 
                      style={{
                        color: accent.badge,
                        background: accent.badgeBg,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                  {ed.recommended && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md text-[#065F46] bg-[#E3F9F4]" >
                      recommended
                    </span>
                  )}
                </div>
              </div>
              <div className="text-[12px] text-[#52525E] leading-[1.5] mt-2 pl-11" >
                {ed.desc}
              </div>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}

function StepTeam({
  data,
  onChange,
}: {
  data: SetupData;
  onChange: (p: Partial<SetupData>) => void;
}) {
  const roles = ["Partner", "Manager", "Member", "Finance", "Observer"];
  const addRow = () =>
    onChange({ invites: [...data.invites, { email: "", role: "Member" }] });
  const removeRow = (i: number) =>
    onChange({ invites: data.invites.filter((_, j) => j !== i) });
  const updateRow = (i: number, patch: Partial<Invite>) => {
    const next = [...data.invites];
    next[i] = { ...next[i], ...patch };
    onChange({ invites: next });
  };
  return (
    <div className="flex flex-col gap-3" >
      <FadeUp delay={0}>
        <div className="flex flex-col gap-2" >
          {data.invites.map((inv, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_140px_32px] gap-2 items-center" 
            >
              <input
                className={inp}
                type="email"
                value={inv.email}
                onChange={(e) => updateRow(i, { email: e.target.value })}
                placeholder="colleague@company.com"
              />
              <select
                className={inp}
                value={inv.role}
                onChange={(e) => updateRow(i, { role: e.target.value })}
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <button
                onClick={() => removeRow(i)}
                className="h-10 w-8 flex items-center justify-center text-[#88889A] hover:text-[#D7384F] hover:bg-[#FEF2F2] rounded-[8px] transition-all text-[16px]" 
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </FadeUp>
      <FadeUp delay={100}>
        <button
          onClick={addRow}
          className="h-9 px-4 border border-dashed border-black/[0.17] rounded-[9px] text-[12.5px] text-[#52525E] hover:border-[#4B48C8]/50 hover:text-[#4B48C8] hover:bg-[#F5F5FD] transition-all flex items-center gap-2 w-full justify-center" 
        >
          <span className="text-[16px] leading-none" >+</span> Add team member
        </button>
      </FadeUp>
      <FadeUp delay={140}>
        <div className="flex items-center gap-3 text-[#B4B4C2] text-[10.5px] tracking-[0.1em] uppercase font-mono" >
          <div className="flex-1 h-px bg-black/[0.07]"  />
          or
          <div className="flex-1 h-px bg-black/[0.07]"  />
        </div>
      </FadeUp>
      <FadeUp delay={180}>
        <div className="flex flex-col gap-1.5" >
          <div className="text-[12px] font-medium text-[#2E2E36]" >
            Bulk invite
          </div>
          <textarea
            className={inp + " h-[72px] py-2.5 resize-none"}
            placeholder="one email per line, paste from anywhere"
            onBlur={(e) => {
              const lines = e.target.value
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);
              const newInvites = lines.map((email) => ({
                email,
                role: "Member",
              }));
              if (newInvites.length)
                onChange({ invites: [...data.invites, ...newInvites] });
              e.target.value = "";
            }}
          />
        </div>
      </FadeUp>
    </div>
  );
}

function StepAgents({
  data,
  onChange,
}: {
  data: SetupData;
  onChange: (p: Partial<SetupData>) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5" >
      {agentList.map((ag, i) => (
        <FadeUp key={ag.name} delay={i * 50}>
          <div className="flex items-center justify-between p-4 border border-black/[0.09] rounded-[13px] bg-white hover:border-black/[0.14] transition-colors" >
            <div className="flex items-center gap-3" >
              <div
                className="w-9 h-9 rounded-[9px] grid place-items-center text-[18px] shrink-0" 
                style={{ background: ag.bg, color: ag.color }}
              >
                {ag.ic}
              </div>
              <div>
                <div className="font-medium text-[13.5px] text-[#18181C] tracking-[-0.005em]" >
                  {ag.name}
                </div>
                <div className="font-mono text-[10.5px] text-[#88889A] tracking-[0.02em]" >
                  {ag.sub}
                </div>
              </div>
            </div>
            <div className="flex border border-black/[0.12] rounded-[8px] overflow-hidden shrink-0 shadow-sm" >
              {modes.map((m, j) => (
                <button
                  key={m}
                  onClick={() => {
                    const next = [...data.agentModes];
                    next[i] = j;
                    onChange({ agentModes: next });
                  }}
                  className={`px-3 py-1.5 text-[11.5px] font-medium transition-all duration-100 ${data.agentModes[i] === j ? "bg-[#4B48C8] text-white" : "bg-white text-[#52525E] hover:bg-[#F5F5FD] hover:text-[#4B48C8]"} ${j > 0 ? "border-l border-black/[0.10]" : ""}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>
      ))}
      <FadeUp delay={280}>
        <p className="text-[11.5px] text-[#88889A] leading-[1.55] mt-1 font-mono tracking-[0.02em]" >
          Assists prepares and waits · Acts executes with immediate logging ·
          Leads manages end-to-end
        </p>
      </FadeUp>
    </div>
  );
}

// ── Summary row helper ────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-black/[0.06] last:border-0" >
      <span className="font-mono text-[10.5px] text-[#88889A] tracking-[0.05em] uppercase shrink-0 pt-0.5" >
        {label}
      </span>
      <span className="text-[13px] text-[#18181C] font-medium text-right leading-[1.4]" >
        {value || "—"}
      </span>
    </div>
  );
}

function StepLaunch({
  data,
  launching,
  error,
}: {
  data: SetupData;
  launching: boolean;
  error: string | null;
}) {
  const agentSummary = agentList
    .map(
      (ag, i) =>
        `${ag.name.replace(" Agent", "")}: ${modes[data.agentModes[i]]}`,
    )
    .join(" · ");

  const validInvites = data.invites.filter((inv) => inv.email.trim());

  return (
    <div className="flex flex-col gap-4" >
      {/* Boot status */}
      <FadeUp delay={0}>
        <div className="flex flex-col gap-2" >
          {bootItems.map((b, i) => (
            <div
              key={b.n}
              className="flex items-center gap-4 p-3.5 border border-black/[0.09] rounded-[13px] bg-white hover:border-black/[0.14] transition-colors" 
            >
              <div className="font-mono text-[10px] text-[#C4C4D0] tracking-[0.06em] shrink-0 w-5" >
                {b.n}
              </div>
              <div className="flex-1 min-w-0" >
                <div className="font-medium text-[13px] text-[#18181C] tracking-[-0.005em]" >
                  {b.h}
                </div>
                <div className="font-mono text-[11px] text-[#88889A] tracking-[0.02em] mt-0.5" >
                  {b.p}
                </div>
              </div>
              <div
                className={`font-mono text-[9.5px] tracking-[0.08em] uppercase px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1.5 ${
                  b.status === "done"
                    ? "bg-[#E6FAF1] text-[#1D9E75]"
                    : b.status === "running"
                      ? "bg-[#EEEEF9] text-[#4B48C8]"
                      : "bg-[#F0F1F8] text-[#88889A]"
                }`}
              >
                {b.status === "running" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#4B48C8]" 
                    style={{ animation: "pulse-dot 1.4s ease-in-out infinite" }}
                  />
                )}
                {b.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Setup summary */}
      <FadeUp delay={120}>
        <div className="border border-black/[0.09] rounded-[14px] bg-white overflow-hidden" >
          <div className="px-5 py-3.5 border-b border-black/[0.06] bg-[#FAFAFD] flex items-center justify-between" >
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#4B48C8]" >
              <span className="w-3.5 h-[1.5px] bg-[#4B48C8] block"  />
              Setup summary
            </div>
            <span className="font-mono text-[10px] text-[#B4B4C2] tracking-[0.04em]" >
              review before launch
            </span>
          </div>

          <div className="px-5 py-1" >
            {/* Company */}
            <div className="pt-3 pb-1" >
              <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[#B4B4C2] mb-1.5" >
                Company
              </div>
              <SummaryRow label="Name" value={data.companyName} />
              <SummaryRow label="Domain" value={data.companyDomain} />
              <SummaryRow
                label="Region"
                value={data.region.replace("-", " · ")}
              />
              <SummaryRow label="Size" value={data.companySize} />
              <SummaryRow label="Type" value={data.companyType} />
              <SummaryRow label="Role" value={data.jobRole} />
            </div>

            {/* Edition */}
            <div className="pt-3 pb-1 border-t border-black/[0.05]" >
              <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[#B4B4C2] mb-1.5" >
                Edition
              </div>
              <SummaryRow label="Plan" value={data.edition} />
            </div>

            {/* Team */}
            <div className="pt-3 pb-1 border-t border-black/[0.05]" >
              <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[#B4B4C2] mb-1.5" >
                Team
              </div>
              <SummaryRow
                label="Invites"
                value={
                  validInvites.length === 0
                    ? "None added"
                    : validInvites
                        .map((inv) => `${inv.email} (${inv.role})`)
                        .join(", ")
                }
              />
            </div>

            {/* Agents */}
            <div className="pt-3 pb-3 border-t border-black/[0.05]" >
              <div className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[#B4B4C2] mb-1.5" >
                Agents
              </div>
              <div className="flex flex-col gap-1.5" >
                {agentList.map((ag, i) => (
                  <div
                    key={ag.name}
                    className="flex items-center justify-between" 
                  >
                    <span className="text-[12.5px] text-[#52525E]" >
                      {ag.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-md ${
                        data.agentModes[i] === 0
                          ? "bg-[#F0F1F8] text-[#52525E]"
                          : data.agentModes[i] === 1
                            ? "bg-[#EEEEF9] text-[#4B48C8]"
                            : "bg-[#E3F9F4] text-[#065F46]"
                      }`}
                    >
                      {modes[data.agentModes[i]]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {launching && (
        <FadeUp delay={0}>
          <div className="flex items-center gap-3 p-4 border border-[rgba(75,72,200,0.2)] rounded-[13px] bg-[#F5F5FD]" >
            <span className="w-4 h-4 border-2 border-[#4B48C8]/40 border-t-[#4B48C8] rounded-full animate-spin shrink-0"  />
            <div className="text-[13px] text-[#4B48C8] font-medium" >
              Saving setup & launching workspace…
            </div>
          </div>
        </FadeUp>
      )}

      {error && (
        <FadeUp delay={0}>
          <div className="flex items-center gap-2 p-3 bg-[#FEF2F2] border border-[rgba(215,56,79,0.25)] rounded-[9px] text-[12px] text-[#D7384F]" >
            <span>⚠</span> {error} — you can still launch and update settings
            later.
          </div>
        </FadeUp>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function Onboarding() {
  const { userId, tenantId, email: authEmail, fullName } = useAuth();

  const [cur, setCur] = useState<number>(0);
  const [dir, setDir] = useState<number>(1);
  const [animKey, setAnimKey] = useState<number>(0);
  const [launching, setLaunching] = useState(false);
  const [launchError, setLaunchError] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const [setupData, setSetupData] = useState<SetupData>({
    companyName: "",
    companyDomain: "",
    region: "EU-Frankfurt",
    companySize: "1-10",
    jobRole: "Partner / Founder",
    companyType: "",
    edition: "Team",
    invites: [{ email: "", role: "Member" }],
    agentModes: agentList.map((a) => a.def),
  });

  const updateData = (patch: Partial<SetupData>) =>
    setSetupData((prev) => ({ ...prev, ...patch }));

  const step = STEPS[cur];
  const isLast = cur === STEPS.length - 1;
  // Agents step is index 4 (0-based)
  const isAgentsStep = cur === 4;

  // ── Build API payload ──────────────────────────────────────────────────

  const buildPayload = () => {
    const uid = userId || sessionStorage.getItem("zotra_userId") || "";
    const tid = tenantId || sessionStorage.getItem("zotra_tenantId") || "";
    const em = authEmail || sessionStorage.getItem("zotra_email") || "";
    const fn = fullName || sessionStorage.getItem("zotra_fullName") || "";

    const agentModeNames = setupData.agentModes.map((i) =>
      modes[i].toLowerCase(),
    );

    return {
      userId: uid,
      email: em,
      fullName: fn,
      role: 1,
      status: 1,
      isEmailVerified: true,
      tenantId: tid,
      companyName: setupData.companyName || "—",
      companyDomain: setupData.companyDomain || "—",
      orgName: setupData.companyName || "—",
      domain: setupData.companyDomain || "—",
      edition: setupData.edition,
      companySize: setupData.companySize,
      companyType: setupData.companyType || "Other",
      region: setupData.region.replace("-", " - "),
      jobRole: setupData.jobRole,
      commercialAgentMode: agentModeNames[0],
      deliveryAgentMode: agentModeNames[1],
      financialAgentMode: agentModeNames[2],
      renewalAgentMode: agentModeNames[3],
      relationshipAgentMode: agentModeNames[4],
      teamMembers: setupData.invites.filter((inv) => inv.email.trim()),
    };
  };

  // ── Navigation ─────────────────────────────────────────────────────────

  const navigate = (next: number): void => {
    if (next < 0 || next >= STEPS.length) return;
    setDir(next > cur ? 1 : -1);
    setAnimKey((k) => k + 1);
    setCur(next);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  // ── API call fires when leaving Agents step (Continue pressed) ─────────

  const handleContinueFromAgents = async () => {
    setLaunchError(null);
    setLaunching(true);
    try {
      const tid = tenantId || sessionStorage.getItem("zotra_tenantId") || "";
      const uid = userId || sessionStorage.getItem("zotra_userId") || "";
      if (tid && uid) {
        await setupTenant(tid, uid, buildPayload());
      }
    } catch (err: unknown) {
      // Non-blocking — we still advance to the summary/launch step
      if (err instanceof ApiError) {
        setLaunchError((err as ApiError).message);
      } else if (err instanceof Error) {
        setLaunchError(err.message);
      }
    } finally {
      setLaunching(false);
      navigate(cur + 1);
    }
  };

  // ── Final launch — just redirects ──────────────────────────────────────

  const handleLaunch = () => {
    window.location.href = "/app/pulse";
  };

  // ── Continue button handler ────────────────────────────────────────────

  const handleContinue = () => {
    if (isAgentsStep) {
      handleContinueFromAgents();
    } else if (!isLast) {
      navigate(cur + 1);
    } else {
      handleLaunch();
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === "Enter" && !e.shiftKey && !e.metaKey) {
        const tag = (document.activeElement as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        handleContinue();
      }
      if (e.key === "Escape") navigate(cur - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cur, isLast, isAgentsStep]);

  // ── Step renderer ──────────────────────────────────────────────────────

  const renderStep = () => {
    switch (cur) {
      case 0:
        return <StepWelcome />;
      case 1:
        return <StepCompany data={setupData} onChange={updateData} />;
      case 2:
        return <StepEdition data={setupData} onChange={updateData} />;
      case 3:
        return <StepTeam data={setupData} onChange={updateData} />;
      case 4:
        return <StepAgents data={setupData} onChange={updateData} />;
      case 5:
        return (
          <StepLaunch
            data={setupData}
            launching={launching}
            error={launchError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes step-in-fwd {
          from { opacity: 0; transform: translateX(22px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes step-in-back {
          from { opacity: 0; transform: translateX(-22px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .anim-fwd  { animation: step-in-fwd  0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-back { animation: step-in-back 0.32s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="grid grid-cols-[400px_1fr] h-screen overflow-hidden bg-[#F4F5FA]" >
        {/* ── Left rail ── */}
        <aside className="bg-[#F0F1F8] border-r border-black/[0.08] flex flex-col py-8 px-9 overflow-hidden relative" >
          <div
            className="absolute inset-0 pointer-events-none" 
            style={{
              background:
                "radial-gradient(800px 500px at -150px 70%, rgba(75,72,200,0.09), transparent 60%), radial-gradient(600px 400px at 110% -5%, rgba(29,196,160,0.07), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col flex-1 min-h-0" >
            <a href="/" className="flex items-center gap-2.5 shrink-0" >
              <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-[#4B48C8] to-[#7B79E8] shadow-[0_1px_4px_rgba(75,72,200,0.3)] grid place-items-center text-white font-bold text-[15px]" >
                Z
              </div>
              <div>
                <div className="font-bold text-[17px] text-[#18181C] tracking-[-0.025em]" >
                  Zotra
                </div>
                <div className="font-mono text-[10px] text-[#88889A] uppercase tracking-[0.12em] mt-0.5" >
                  Commercial OS
                </div>
              </div>
            </a>

            <div
              className="mt-10 flex-1 overflow-y-auto min-h-0" 
              style={{ scrollbarWidth: "none" }}
            >
              <div className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#B4B4C2] mb-4" >
                Setup · 6 steps
              </div>
              <ul className="flex flex-col gap-0.5 relative" >
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[rgba(75,72,200,0.14)]"  />
                <div
                  className="absolute left-[11px] top-4 w-px bg-[#4B48C8]" 
                  style={{
                    height: `${(cur / (STEPS.length - 1)) * (100 - 8)}%`,
                    transition: "height 0.4s cubic-bezier(0.22,1,0.36,1)",
                    maxHeight: "calc(100% - 32px)",
                  }}
                />
                {STEPS.map((s, i) => {
                  const done = i < cur;
                  const active = i === cur;
                  return (
                    <li
                      key={s.id}
                      onClick={() => i <= cur && navigate(i)}
                      className={`flex items-center gap-3.5 py-2 relative transition-all duration-150 rounded-lg px-1 ${i <= cur ? "cursor-pointer hover:bg-[rgba(75,72,200,0.06)]" : "opacity-35 cursor-default"}`}
                    >
                      <div
                        className={`w-[23px] h-[23px] rounded-full border-[1.5px] grid place-items-center font-mono text-[10px] font-medium shrink-0 z-10 relative transition-all duration-200 ${
                          done
                            ? "bg-[#4B48C8] border-[#4B48C8] text-white shadow-[0_0_0_3px_rgba(75,72,200,0.12)]"
                            : active
                              ? "bg-white border-[#4B48C8] text-[#4B48C8] shadow-[0_0_0_4px_#EEEEF9]"
                              : "bg-[#F0F1F8] border-[rgba(75,72,200,0.25)] text-[#88889A]"
                        }`}
                      >
                        {done ? (
                          <span className="text-[11px] font-semibold" >✓</span>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className={`text-[13px] tracking-[-0.005em] flex-1 transition-colors ${active ? "text-[#18181C] font-medium" : "text-[#52525E]"}`}
                      >
                        {s.label}
                      </span>
                      {active && (
                        <span className="font-mono text-[9px] text-[#4B48C8] tracking-[0.06em] uppercase bg-[#EEEEF9] px-2 py-0.5 rounded-md" >
                          Now
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className="mt-4 p-5 bg-white border border-black/[0.08] rounded-[13px] shadow-[0_1px_4px_rgba(75,72,200,0.07)] shrink-0" 
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="text-[9px] font-semibold tracking-[0.14em] uppercase text-[#4B48C8] mb-2.5 flex items-center gap-1.5" >
                <span className="w-3.5 h-[1.5px] bg-[#4B48C8] block"  />
                {cur === 0
                  ? "First Principle"
                  : cur === 5
                    ? "Onboarding playbook"
                    : "Context"}
              </div>
              <div
                className="text-[13.5px] leading-[1.45] text-[#18181C] tracking-[-0.015em] font-medium" 
                key={cur}
                style={{ animation: "step-in-fwd 0.3s ease both" }}
              >
                {step.quote.q}
              </div>
              <div className="mt-2 font-mono text-[11px] text-[#88889A]" >
                {step.quote.c}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Right stage ── */}
        <main className="flex flex-col overflow-hidden bg-white" >
          <ProgressBar cur={cur} total={STEPS.length} />

          <div className="h-13 flex items-center justify-between px-8 border-b border-black/[0.08] shrink-0 bg-white py-3" >
            <div className="font-mono text-[11px] tracking-[0.04em] text-[#88889A] flex items-center gap-1.5" >
              <span>
                Step{" "}
                <strong className="text-[#18181C] font-medium" >
                  {cur + 1}
                </strong>{" "}
                of <strong className="text-[#18181C] font-medium" >6</strong>
              </span>
              <span className="text-[#D0D0DC]" >·</span>
              <span className="text-[#18181C]" >{step.label}</span>
            </div>
            <button
              onClick={handleLaunch}
              className="text-[12px] text-[#B4B4C2] px-2.5 py-1.5 rounded-[6px] hover:text-[#4B48C8] hover:bg-[#F5F5FD] transition-all" 
            >
              Skip setup
            </button>
          </div>

          <div
            ref={mainRef}
            className="flex-1 overflow-y-auto px-16 pt-11 pb-8" 
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#E0E0EC transparent",
            }}
          >
            <div className="w-full max-w-[620px] mx-auto" >
              <div
                key={`header-${animKey}`}
                className={dir >= 0 ? "anim-fwd" : "anim-back"}
              >
                <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#4B48C8] mb-3" >
                  <span className="w-[18px] h-[1.5px] bg-[#4B48C8] block"  />
                  {step.eyebrow}
                </div>
                <h1 className="text-[31px] font-semibold text-[#18181C] tracking-[-0.028em] leading-[1.12] mb-2.5" >
                  {step.title}
                </h1>
                <p className="text-[15px] text-[#52525E] leading-[1.6] font-light mb-8 max-w-[540px]" >
                  {step.sub}
                </p>
              </div>
              <div
                key={`body-${animKey}`}
                className={dir >= 0 ? "anim-fwd" : "anim-back"}
                style={{ animationDelay: "40ms" }}
              >
                {renderStep()}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-black/[0.08] bg-white px-8 py-3.5 flex items-center justify-between gap-3" >
            <div className="text-[12px] text-[#B4B4C2] flex items-center gap-1.5" >
              <kbd className="inline-flex items-center justify-center w-6 h-5 rounded border border-black/[0.14] bg-[#F4F5FA] font-mono text-[10px] text-[#52525E]" >
                ↵
              </kbd>
              <span className="mr-2" >continue</span>
              <kbd className="inline-flex items-center justify-center px-1.5 h-5 rounded border border-black/[0.14] bg-[#F4F5FA] font-mono text-[10px] text-[#52525E]" >
                esc
              </kbd>
              <span>back</span>
            </div>
            <div className="flex gap-2" >
              <button
                onClick={() => navigate(cur - 1)}
                disabled={cur === 0}
                className="h-[38px] px-5 rounded-[9px] border border-transparent bg-transparent text-[13px] text-[#88889A] font-medium hover:bg-[#F5F5FD] hover:text-[#4B48C8] transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
              >
                Back
              </button>

              {isLast ? (
                <button
                  onClick={handleLaunch}
                  disabled={launching}
                  className="h-[38px] px-5 rounded-[9px] bg-[#1DC4A0] border border-[#1DC4A0] text-white text-[13px] font-medium hover:bg-[#3DD9B8] transition-all flex items-center gap-2 shadow-[0_1px_4px_rgba(29,196,160,0.35)] disabled:opacity-50" 
                >
                  Launch Zotra <span className="font-mono text-[14px]" >→</span>
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  disabled={launching && isAgentsStep}
                  className="h-[38px] px-5 rounded-[9px] bg-[#4B48C8] border border-[#4B48C8] text-white text-[13px] font-medium hover:bg-[#5E5BE0] active:bg-[#3D3AB4] transition-all flex items-center gap-2 shadow-[0_1px_4px_rgba(75,72,200,0.35)] disabled:opacity-50" 
                >
                  {launching && isAgentsStep ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"  />{" "}
                      Saving…
                    </>
                  ) : (
                    <>
                      Continue <span className="font-mono text-[14px]" >→</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
