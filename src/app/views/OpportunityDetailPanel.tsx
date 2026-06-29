import React from "react";
import Icon from "../components/Icon";
import { Sparkline } from "../components/Shared";
import { STAGES, avBg, initials, fmt$ } from "../data";
import { baseUrl, apiFetch } from "../utils/utils";
import { getToken } from "../../services/api";

// ─── Prop types ───────────────────────────────────────────────────────────────
interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  stage: string;
  phase: string;
  heat: "hot" | "warm" | "cool";
  value: number;
  cycle: number;
  lastTouch: string;
  intent: string;
  signals: number[];
  status: string;
  dealType: string;
  panchashaktiScore: number;
  health: number;
}

interface Props {
  opp: Opportunity;
  onClose: () => void;
  panelWidth: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

// ─── API types ────────────────────────────────────────────────────────────────
interface ApiInference {
  rowKey: string;
  inferenceType: string;
  inferenceName: string;
  questionText: string;
  answerText: string;
  score: number;
  thresholdScore: number;
  passed: boolean;
  confidence: number;
  status: string;
  evidenceSummary: string;
  why: string;
  phase: string;
}

interface ApiForceSnapshot {
  arthaScore: number;
  arthaDirection: string;
  layaScore: number;
  layaDirection: string;
  kriyaScore: number;
  kriyaDirection: string;
  gatiScore: number;
  gatiDirection: string;
  rasaScore: number;
  rasaDirection: string;
  compositeScore: number;
}

interface ApiGap {
  rowKey: string;
  inferenceType: string;
  gapType: string;
  severity: string;
  status: string;
  recommendedQuestion: string;
  priority: string;
  whyItMatters: string;
}

interface ApiMotion {
  rowKey?: string;
  motionCode: string;
  motionName: string;
  objective: string;
  reason: string;
  questionsJson: string;
  successCriteriaJson: string;
  status: string;
}

interface ApiConversationPlan {
  objective: string;
  motionCode: string;
  motionName: string;
  primaryQuestion: string;
  questionsJson: string;
  successCriteriaJson: string;
  desiredOutcome: string;
}

interface ApiReplyDraft {
  rowKey?: string;
  subject: string;
  body: string;
  channel: string;
  generationStatus: string;
  reviewStatus: string;
}

interface ApiReplyValidation {
  validationStatus: string;
  validationScore: number;
  gapCoverageStatus: string;
  planAlignmentStatus: string;
  questionCoverageStatus: string;
  policyStatus: string;
  toneStatus: string;
  safetyStatus?: string;
  passed: boolean;
  recommendation: string;
}

interface ApiEvidenceItem {
  rowKey: string;
  inferenceType: string;
  evidenceText: string;
  evidenceBand: string;
  confidence: number;
  sourceType: string;
  createdAt?: string;
}

interface ApiHumanAssertion {
  rowKey: string;
  inferenceType: string;
  assertionType: string;
  assertionText: string;
  createdBy?: string;
  createdAt?: string;
}

interface ApiContact {
  rowKey?: string;
  fullName?: string;
  contactName?: string;
  name?: string;
  email?: string;
  role?: string;
  title?: string;
  department?: string;
  authority?: string;
  influence?: string;
  stakeholderRole?: string;
  lastContactAt?: string | null;
  lastTouchAt?: string | null;
  isDm?: boolean;
}

interface ApiStateDelta {
  rowKey?: string;
  deltaType?: string;
  inferenceType?: string;
  direction?: string;
  summary?: string;
  createdAt?: string;
}

interface ApiPulseEvent {
  rowKey?: string;
  eventType?: string;
  summary?: string;
  detail?: string;
  score?: number;
  createdAt?: string;
}

interface ApiActivityEvent {
  rowKey?: string;
  activityType?: string;
  title?: string;
  description?: string;
  source?: string;
  severity?: string;
  authorType?: string;
  agentType?: string;
  entityType?: string;
  entityId?: string;
  workspaceType?: string;
  organizationId?: string;
  accountId?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
}

interface ApiWorkspace {
  workspaceName: string;
  currentPhase: string;
  status: string;
  stage: string;
  accountId: string;
  dealType: string | null;
  dealValue: number | null;
  panchashaktiScore: number;
  arthaScore?: number;
  layaScore?: number;
  kriyaScore?: number;
  gatiScore?: number;
  rasaScore?: number;
  compositeScore?: number;
  opportunityHealth: number;
  stageEnteredAt: string;
  lastTouchAt: string;
  ownerId: string | null;
  createdAt?: string;
}

interface ApiAccount {
  accountName: string;
  domain: string;
  industry: string;
  accountType: string;
}

interface OpportunityProfile {
  opportunity?: ApiWorkspace;
  workspace?: ApiWorkspace;
  account: ApiAccount | null;
  inferences: ApiInference[];
  forceSnapshots?: ApiForceSnapshot[];
  forceSnapshot?: ApiForceSnapshot | null;
  openGaps: ApiGap[];
  resolvedGaps?: ApiGap[];
  activeMotion?: ApiMotion | null;
  selectedMotion?: ApiMotion | null;
  activeConversationPlan?: ApiConversationPlan | null;
  conversationPlan?: ApiConversationPlan | null;
  latestReplyDraft?: ApiReplyDraft | null;
  replyDraft?: ApiReplyDraft | null;
  latestReplyValidation?: ApiReplyValidation | null;
  replyValidation?: ApiReplyValidation | null;
  evidenceItems: ApiEvidenceItem[];
  humanAssertions?: ApiHumanAssertion[];
  primaryContact?: ApiContact[] | ApiContact | null;
  contacts?: ApiContact[] | ApiContact | null;
  stakeholders?: ApiContact[] | ApiContact | null;
  accountContacts?: ApiContact[];
  stateDeltas?: ApiStateDelta[];
  pulseStream?: ApiPulseEvent[];
  timeline?: ApiPulseEvent[];
  intakes?: any[];
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    accept: "*/*",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseJsonArray(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

function directionArrow(dir: string): "up" | "dn" | null {
  if (dir === "Up") return "up";
  if (dir === "Down") return "dn";
  return null;
}

function relTime(iso?: string | null): string {
  if (!iso) return "Unknown";
  try {
    const ms = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(ms / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

// ─── Reply body formatter ─────────────────────────────────────────────────────
function splitIntoSentences(body: string): string[] {
  // Split after every . or ? (followed by space or end of string), keeping punctuation attached
  const parts = body.split(/(?<=[.?])(?:\s+|$)/);
  return parts.map((s) => s.trim()).filter(Boolean);
}

function formatReplyBody(body: string): React.ReactNode {
  const sentences = splitIntoSentences(body);
  return sentences.map((sentence, i) => (
    <React.Fragment key={i}>
      {sentence}
      {i < sentences.length - 1 && <br />}
    </React.Fragment>
  ));
}

function bodyToEditText(body: string): string {
  // Convert body to newline-separated sentences for the textarea
  return splitIntoSentences(body).join("\n");
}

const TABS = [
  { id: "overview", label: "Overview", icon: "layout-grid" },
  { id: "intelligence", label: "Intelligence", icon: "sparkles" },
  { id: "gaps", label: "Gaps", icon: "alert-circle" },
  { id: "motion", label: "Motion", icon: "zap" },
  { id: "reply", label: "Reply draft", icon: "mail" },
  { id: "evidence", label: "Evidence", icon: "file-text" },
  { id: "stakeholders", label: "Stakeholders", icon: "users" },
  { id: "activity", label: "Activity", icon: "clock" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const ODP_CSS = `
@keyframes odp-slide-in{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes odp-bd-in{from{opacity:0}to{opacity:1}}
@keyframes odp-sk-pulse{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes odp-handle-appear{0%{opacity:0;transform:translateX(4px)}60%{opacity:1;transform:translateX(-2px)}100%{opacity:.7;transform:translateX(0)}}
@keyframes odp-handle-pulse{0%,100%{opacity:.55}50%{opacity:1}}

.odp-backdrop{position:absolute;inset:0;background:rgba(20,18,40,.32);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:29;animation:odp-bd-in .18s ease;}

.odp-panel{
  position:absolute;top:0;right:0;bottom:0;
  background:var(--bg,#fff);
  border-left:0.5px solid var(--brd,#e2e8f0);
  box-shadow:-8px 0 40px rgba(60,50,150,.16);
  z-index:30;
  display:flex;flex-direction:column;
  overflow:hidden;
  animation:odp-slide-in .22s cubic-bezier(.4,0,.2,1);
}

.odp-resize{
  position:absolute;left:0;top:0;bottom:0;width:16px;
  cursor:ew-resize;z-index:31;
  display:flex;align-items:center;justify-content:center;
}
.odp-resize-grip{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;
  width:16px;height:48px;
  border-radius:0 6px 6px 0;
  background:rgba(75,72,200,0.06);
  border:0.5px solid rgba(75,72,200,0.14);
  border-left:none;
  transition:background .15s,border-color .15s;
  animation:odp-handle-appear .5s ease .3s both;
}
.odp-resize:hover .odp-resize-grip{
  background:rgba(75,72,200,0.14);
  border-color:rgba(75,72,200,0.30);
}
.odp-resize-dot{
  width:3px;height:3px;border-radius:50%;
  background:#4B48C8;opacity:.5;
  animation:odp-handle-pulse 2s ease-in-out infinite;
}
.odp-resize-dot:nth-child(2){animation-delay:.25s;}
.odp-resize-dot:nth-child(3){animation-delay:.5s;}
.odp-resize-hint{
  position:absolute;left:20px;top:50%;transform:translateY(-50%);
  background:rgba(30,27,60,.88);color:#fff;
  font-size:10px;font-weight:500;letter-spacing:.02em;
  padding:4px 8px;border-radius:5px;white-space:nowrap;
  pointer-events:none;
  opacity:0;
  transition:opacity .2s;
}
.odp-resize-hint::before{
  content:"";position:absolute;left:-4px;top:50%;transform:translateY(-50%);
  width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;
  border-right:4px solid rgba(30,27,60,.88);
}
.odp-resize:hover .odp-resize-hint{opacity:1;}

.odp-hdr{
  padding:12px 16px 0;
  border-bottom:0.5px solid var(--brd,#e2e8f0);
  flex-shrink:0;
  background:var(--bg,#fff);
}
.odp-hdr-top{
  display:flex;align-items:center;gap:8px;
  margin-bottom:12px;
}
.odp-av{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;}
.odp-hdr-name-block{flex:1;min-width:0;}
.odp-name{font-family:"Sora",sans-serif;font-size:14px;font-weight:700;letter-spacing:-0.02em;color:var(--ink,#0f1117);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.odp-meta{font-size:10.5px;color:var(--ink5,#9399a8);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.odp-hdr-actions{display:flex;align-items:center;gap:6px;flex-shrink:0;}
.odp-act-btn{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 12px;border-radius:8px;background:#4B48C8;color:#fff;font-size:11.5px;font-weight:600;letter-spacing:-0.01em;border:none;cursor:pointer;flex-shrink:0;box-shadow:0 1px 2px rgba(75,72,200,.25),0 4px 12px rgba(75,72,200,.22);transition:filter .13s;}
.odp-act-btn:hover{filter:brightness(.9);}
.odp-close-btn{width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:7px;border:none;background:#4B48C8;cursor:pointer;color:#fff;flex-shrink:0;transition:filter .12s;box-shadow:0 1px 3px rgba(75,72,200,.30);}
.odp-close-btn:hover{filter:brightness(.88);}
.odp-opp-id{font-family:"DM Mono",monospace;font-size:9px;color:var(--ink5,#9399a8);letter-spacing:0.04em;margin-top:1px;}

/* ── Stats strip — individual accent-bordered cards ── */
.odp-stats{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:8px;
  margin:0 0 14px;
}
.odp-stat{
  padding:10px 12px 11px;
  border-radius:9px;
  border:0.5px solid var(--brd,#e2e8f0);
  background:var(--bg,#fff);
  border-left:3px solid transparent;
  transition:box-shadow .15s;
  position:relative;
}
.odp-stat:hover{box-shadow:0 2px 12px rgba(0,0,0,.08);}
.odp-stat.accent-value{border-left-color:#22c55e;background:linear-gradient(105deg,rgba(34,197,94,0.04) 0%,transparent 60%);}
.odp-stat.accent-score{border-left-color:#4B48C8;background:linear-gradient(105deg,rgba(75,72,200,0.05) 0%,transparent 60%);}
.odp-stat.accent-days{border-left-color:#f59e0b;background:linear-gradient(105deg,rgba(245,158,11,0.04) 0%,transparent 60%);}
.odp-stat.accent-phase{border-left-color:#0ea5e9;background:linear-gradient(105deg,rgba(14,165,233,0.04) 0%,transparent 60%);}
.odp-stat-l{
  font-size:8px;font-weight:700;letter-spacing:.11em;
  text-transform:uppercase;color:var(--ink5,#9399a8);
  margin-bottom:5px;line-height:1;
}
.odp-stat-v{
  font-family:"Sora",sans-serif;font-size:15px;font-weight:800;
  letter-spacing:-0.03em;color:var(--ink,#0f1117);line-height:1.1;
}
.odp-stat-v.pscore{color:#4B48C8;}
.odp-stat-v.heat-hot{color:#E5566C;}
.odp-stat-v.heat-warm{color:#D97757;}
.odp-stat-v.heat-cool{color:#4B6FDB;}
/* Phase pill inside the stat card */
.odp-stat-phase-pill{
  display:inline-flex;padding:3px 9px;
  border-radius:20px;font-size:11px;font-weight:700;
  background:rgba(14,165,233,0.10);color:#0369a1;
  border:0.5px solid rgba(14,165,233,0.22);
  letter-spacing:.01em;line-height:1.4;
  max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}

/* ── Stepper ── */
.odp-stepper{display:flex;align-items:center;padding:10px 16px 12px;gap:0;flex-shrink:0;}
.odp-step{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
.odp-step-circle{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:2px solid var(--brd2,#dde1ea);background:var(--bg3,#f1f3f7);color:var(--ink5,#9399a8);position:relative;z-index:2;flex-shrink:0;transition:background .2s,border-color .2s,color .2s;}
.odp-step-circle.active{background:#4B48C8;border-color:#4B48C8;color:#fff;box-shadow:0 0 0 3px rgba(75,72,200,.18);}
.odp-step-circle.done{background:rgba(75,72,200,.09);border-color:rgba(75,72,200,.30);color:#4B48C8;}
.odp-step-label{font-size:8.5px;font-weight:500;color:var(--ink5);white-space:nowrap;}
.odp-step-label.active{font-weight:700;color:#4B48C8;}
.odp-step-line{flex:1;height:2px;background:var(--brd2,#dde1ea);margin-bottom:12px;transition:background .2s;}
.odp-step-line.done{background:rgba(75,72,200,.30);}

/* Warning */
.odp-warn{margin:0 16px 10px;background:#fffbeb;border:0.5px solid #f5d878;border-radius:9px;padding:7px 12px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
.odp-warn-ic{color:#d97706;flex-shrink:0;display:flex;align-items:center;}
.odp-warn-txt{font-size:11px;color:#78540e;flex:1;font-weight:500;}
.odp-warn-btn{font-size:11px;font-weight:600;color:#78540e;border:0.5px solid #d4a309;border-radius:6px;padding:3px 9px;background:transparent;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background .12s;}
.odp-warn-btn:hover{background:rgba(245,216,120,.25);}

/* ── Tabs — refined with icon background + active pill ── */
.odp-tabs{
  display:flex;align-items:stretch;
  padding:0 12px;gap:2px;
  flex-shrink:0;overflow-x:auto;
  background:var(--bg2,#f8fafc);
  border-bottom:1px solid var(--brd,#e2e8f0);
}
.odp-tabs::-webkit-scrollbar{display:none;}
.odp-tab{
  display:inline-flex;align-items:center;gap:5px;
  height:42px;padding:0 9px;
  font-size:11.5px;font-weight:500;
  color:var(--ink4,#6b7280);
  border:none;background:transparent;cursor:pointer;
  border-bottom:2.5px solid transparent;
  white-space:nowrap;font-family:inherit;
  transition:color .12s,background .12s;
  position:relative;top:0.5px;
  border-radius:6px 6px 0 0;
  letter-spacing:-0.01em;
}
.odp-tab:hover{
  color:var(--ink,#0f1117);
  background:rgba(75,72,200,0.04);
}
.odp-tab.active{
  color:#4B48C8;font-weight:700;
  border-bottom-color:#4B48C8;
  background:rgba(75,72,200,0.07);
}
.odp-tab .odp-tab-icon{
  display:flex;align-items:center;justify-content:center;
  width:20px;height:20px;border-radius:6px;
  background:rgba(0,0,0,0.04);
  color:var(--ink5,#9399a8);
  transition:background .12s,color .12s;
  flex-shrink:0;
}
.odp-tab:hover .odp-tab-icon{background:rgba(75,72,200,0.09);color:#4B48C8;}
.odp-tab.active .odp-tab-icon{background:rgba(75,72,200,0.16);color:#4B48C8;}
.odp-tab-badge{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:16px;height:16px;padding:0 4px;
  border-radius:99px;
  background:#E5566C;color:#fff;
  font-size:8.5px;font-weight:700;line-height:1;
}
.odp-tab.active .odp-tab-badge{background:#4B48C8;}

/* Body */
.odp-body{
  flex:1;
  overflow-y:auto;
  overflow-x:hidden;
  padding:14px 16px 24px;
  min-height:0;
}
.odp-body::-webkit-scrollbar{width:4px;}
.odp-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.10);border-radius:99px;}

/* Section header */
.odp-sh{font-size:9.5px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:8px;}

/* Card */
.odp-card{background:var(--bg2,#f8fafc);border:0.5px solid var(--brd,#e2e8f0);border-radius:10px;padding:14px 16px;margin-bottom:12px;}
.odp-card:last-child{margin-bottom:0;}

/* Skeleton */
.odp-sk{border-radius:5px;background:var(--bg3);animation:odp-sk-pulse 1.4s ease-in-out infinite;}

/* Force bars */
.odp-force-row{margin-bottom:0;padding:11px 0;border-bottom:0.5px solid var(--brd);}
.odp-force-row:last-child{border-bottom:none;padding-bottom:0;}
.odp-force-row:first-child{padding-top:0;}
.odp-force-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
.odp-force-name{font-size:12.5px;font-weight:700;color:var(--ink);}
.odp-force-score{font-family:"DM Mono",monospace;font-size:12px;font-weight:700;color:var(--ink3);display:flex;align-items:center;gap:4px;}
.odp-force-score .up{color:#16a34a;}
.odp-force-score .dn{color:#dc2626;}
.odp-force-sub{font-size:10.5px;color:var(--ink5);margin-bottom:6px;}
.odp-force-track{height:6px;border-radius:99px;background:var(--brd,#e8eaf0);overflow:hidden;}
.odp-force-fill{height:100%;border-radius:99px;transition:width .6s cubic-bezier(.4,0,.2,1);}
.fill-artha{background:linear-gradient(90deg,#b45309,#f59e0b);}
.fill-laya{background:linear-gradient(90deg,#4338ca,#6366f1);}
.fill-kriya{background:linear-gradient(90deg,#1d4ed8,#3b82f6);}
.fill-gati{background:linear-gradient(90deg,#15803d,#22c55e);}
.fill-rasa{background:linear-gradient(90deg,#9333ea,#c084fc);}

/* overview score ring */
.odp-ov-score-ring{display:flex;align-items:center;gap:16px;padding:14px 16px;background:linear-gradient(135deg,rgba(75,72,200,0.06),rgba(75,72,200,0.02));border-radius:10px;border:0.5px solid rgba(75,72,200,0.15);margin-bottom:14px;}
.odp-ov-ring-num{font-family:"Sora",sans-serif;font-size:34px;font-weight:800;color:#4B48C8;letter-spacing:-0.04em;line-height:1;}
.odp-ov-ring-denom{font-family:"DM Mono",monospace;font-size:13px;color:var(--ink5);margin-top:2px;}
.odp-ov-ring-meta{display:flex;flex-direction:column;gap:3px;}
.odp-ov-ring-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink5);}
.odp-ov-ring-sub{font-size:11.5px;color:var(--ink3);}

/* quick kv row */
.odp-ov-kv-row{display:flex;align-items:center;gap:0;border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;margin-bottom:14px;}
.odp-ov-kv{flex:1;padding:10px 14px;border-right:0.5px solid var(--brd);}
.odp-ov-kv:last-child{border-right:none;}
.odp-ov-kv-l{font-size:8.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink5);margin-bottom:4px;}
.odp-ov-kv-v{font-size:12.5px;font-weight:700;color:var(--ink);}

/* Inference cards */
.odp-inf-list{display:flex;flex-direction:column;gap:0;}
.odp-inf-card{display:flex;align-items:stretch;gap:0;border-bottom:0.5px solid var(--brd);padding:14px 16px;transition:background .12s;}
.odp-inf-card:last-child{border-bottom:none;}
.odp-inf-card:hover{background:var(--bg3);}
.odp-inf-left{display:flex;flex-direction:column;justify-content:center;gap:4px;flex:1;min-width:0;}
.odp-inf-name{font-size:12.5px;font-weight:700;color:var(--ink);line-height:1.3;}
.odp-inf-type{font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink5);letter-spacing:.03em;margin-top:1px;}
.odp-inf-evidence{font-size:11.5px;color:var(--ink4);line-height:1.5;margin-top:5px;font-style:italic;}
.odp-inf-right{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:7px;flex-shrink:0;padding-left:16px;min-width:84px;}
.odp-inf-score-wrap{display:flex;align-items:baseline;gap:2px;}
.odp-inf-score{font-family:"DM Mono",monospace;font-size:16px;font-weight:700;color:#4B48C8;line-height:1;}
.odp-inf-score-max{font-family:"DM Mono",monospace;font-size:10px;color:var(--ink5);font-weight:400;}
.odp-inf-bar-track{width:76px;height:5px;border-radius:99px;background:var(--bg3);overflow:hidden;flex-shrink:0;}
.odp-inf-bar-fill{height:100%;border-radius:99px;transition:width .5s cubic-bezier(.4,0,.2,1);}
.odp-inf-bar-fill.strong{background:linear-gradient(90deg,#16a34a,#4ade80);}
.odp-inf-bar-fill.partial{background:linear-gradient(90deg,#6d28d9,#a78bfa);}
.odp-inf-bar-fill.weak{background:linear-gradient(90deg,#c2410c,#fb923c);}
.odp-inf-bar-fill.missing{background:var(--brd2);}

.odp-status-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;white-space:nowrap;letter-spacing:.03em;}
.odp-status-pill::before{content:"";width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.odp-status-pill.strong{background:#dcfce7;color:#15803d;}
.odp-status-pill.strong::before{background:#16a34a;}
.odp-status-pill.partial{background:#ede9fe;color:#6d28d9;}
.odp-status-pill.partial::before{background:#7c3aed;}
.odp-status-pill.weak{background:#fff7ed;color:#c2410c;}
.odp-status-pill.weak::before{background:#ea580c;}
.odp-status-pill.missing{background:#fee2e2;color:#b91c1c;}
.odp-status-pill.missing::before{background:#dc2626;}

/* phase chip */
.odp-phase-chip{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink5);}

/* Snapshot */
.odp-snap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:6px;}
.odp-snap-cell{display:flex;flex-direction:column;gap:5px;}
.odp-snap-label{font-size:9px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);}
.odp-snap-pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:10.5px;font-weight:700;letter-spacing:.03em;white-space:nowrap;width:fit-content;}
.odp-snap-pill.blocked{background:#fee2e2;color:#b91c1c;}
.odp-snap-pill.no{background:#fee2e2;color:#b91c1c;}
.odp-snap-pill.gap-driven{background:#ede9fe;color:#6d28d9;}
.odp-snap-pill.yes{background:#dcfce7;color:#15803d;}
.odp-snap-pill.active{background:#dbeafe;color:#1d4ed8;}
.odp-blocking-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
.odp-block-tag{display:inline-flex;padding:2px 9px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fee2e2;color:#b91c1c;border:0.5px solid #fca5a5;}

/* Gaps */
.odp-gap-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-gap-section-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-gap-count-pill{display:inline-flex;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fee2e2;color:#b91c1c;}
.odp-gap-row{border:0.5px solid var(--brd,#e2e8f0);border-radius:10px;overflow:hidden;margin-bottom:10px;background:var(--bg,#fff);}
.odp-gap-row:last-child{margin-bottom:0;}
.odp-gap-row-head{display:flex;align-items:center;gap:10px;padding:11px 14px;}
.odp-gap-critical{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fee2e2;color:#b91c1c;flex-shrink:0;}
.odp-gap-high{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#fff7ed;color:#c2410c;flex-shrink:0;}
.odp-gap-title{font-size:13px;font-weight:700;color:var(--ink);flex:1;}
.odp-gap-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.odp-gap-action-btn{font-size:11.5px;font-weight:500;color:var(--ink4);background:none;border:none;cursor:pointer;padding:0;transition:color .12s;}
.odp-gap-action-btn:hover{color:var(--p,#4B48C8);}
.odp-gap-quote{margin:0 14px;padding:9px 12px;background:var(--bg3,#f8fafc);border-radius:7px;font-size:12px;font-style:italic;color:var(--ink3);line-height:1.55;border-left:2.5px solid #4B48C8;}
.odp-gap-desc{padding:8px 14px 12px;font-size:11.5px;color:var(--ink4);line-height:1.55;}

.odp-gap-status{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.03em;white-space:nowrap;flex-shrink:0;}
.odp-gap-status.open{background:#fff7ed;color:#c2410c;border:0.5px solid #fdba74;}
.odp-gap-status.resolved{background:#dcfce7;color:#15803d;}
.odp-gap-status.dismissed{background:var(--bg3);color:var(--ink5);}

.odp-resolved-head{display:flex;align-items:center;justify-content:space-between;margin:16px 0 10px;}
.odp-resolved-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-resolved-pill{display:inline-flex;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#dcfce7;color:#15803d;}
.odp-resolved-row{display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:0.5px solid var(--brd);}
.odp-resolved-row:last-child{border-bottom:none;}
.odp-resolved-name{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px;}
.odp-resolved-sub{font-size:11.5px;color:var(--ink5);line-height:1.45;}

/* Motion */
.odp-motion-card{border:0.5px solid var(--brd);border-radius:10px;padding:16px;margin-bottom:12px;background:var(--bg,#fff);}
.odp-motion-eyebrow{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:8px;}
.odp-motion-stage-pill{display:inline-flex;padding:2px 9px;border-radius:20px;font-size:9.5px;font-weight:700;letter-spacing:.04em;background:#ede9fe;color:#6d28d9;}
.odp-motion-title{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px;}
.odp-motion-desc{font-size:12.5px;color:var(--ink3);line-height:1.55;margin-bottom:12px;}
.odp-motion-why{background:var(--bg3,#f8fafc);border-radius:7px;padding:9px 12px;font-size:12px;color:var(--ink3);line-height:1.55;}
.odp-conv-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.odp-conv-title{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);}
.odp-conv-active-pill{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:9px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#dcfce7;color:#15803d;}
.odp-conv-questions-label{font-size:11.5px;color:var(--ink4);margin-bottom:10px;}
.odp-conv-q{display:flex;align-items:flex-start;gap:10px;background:rgba(255,241,242,.7);border:0.5px solid #fca5a5;border-radius:8px;padding:10px 12px;margin-bottom:8px;font-size:12.5px;color:var(--ink2);line-height:1.55;}
.odp-conv-q:last-child{margin-bottom:0;}
.odp-conv-q-num{width:20px;height:20px;border-radius:50%;background:#E5566C;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.odp-success-label{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);margin:14px 0 8px;}

/* Reply */
.odp-reply-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-reply-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-reply-dot{width:8px;height:8px;border-radius:50%;background:var(--brd2);flex-shrink:0;}
.odp-pending-pill{display:inline-flex;padding:2px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#fff7ed;color:#c2410c;border:0.5px solid #fdba74;}
.odp-approved-pill{display:inline-flex;padding:2px 9px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;background:#dcfce7;color:#15803d;}
.odp-reply-subject-label{font-size:9px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);margin-bottom:5px;}
.odp-reply-subject{font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:12px;padding-bottom:12px;border-bottom:0.5px solid var(--brd);}
.odp-reply-body{font-size:13px;color:var(--ink2);line-height:1.9;padding-bottom:14px;border-bottom:0.5px solid var(--brd);margin-bottom:14px;}
.odp-validation-card{background:var(--bg2,#f8fafc);border:0.5px solid var(--brd);border-radius:10px;padding:14px 16px;}
.odp-validation-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.odp-validation-title{font-size:13px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-validation-score{font-family:"DM Mono",monospace;font-size:13px;font-weight:700;color:#16a34a;}
.odp-validation-row{display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:0.5px solid var(--brd);font-size:12.5px;color:var(--ink);}
.odp-validation-row:last-child{border-bottom:none;}
.odp-validation-sub{font-size:11px;color:var(--ink5);margin-top:2px;}

/* Evidence */
.odp-ev-wrap{border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;background:var(--bg,#fff);margin-bottom:14px;}
.odp-ev-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ev-title{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--ink);}
.odp-ev-count{display:inline-flex;padding:2px 10px;border-radius:20px;background:var(--bg3);border:0.5px solid var(--brd2);font-size:11px;font-weight:600;color:var(--ink4);}
.odp-ev-item{display:flex;align-items:flex-start;gap:14px;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ev-item:last-child{border-bottom:none;}
.odp-ev-left{display:flex;flex-direction:column;gap:4px;min-width:106px;flex-shrink:0;}
.odp-ev-slug{font-family:"DM Mono",monospace;font-size:10.5px;color:var(--ink4);line-height:1.4;}
.odp-ev-source{font-size:10px;color:var(--ink5);font-style:italic;}
.odp-ev-text{font-size:12.5px;color:var(--ink2);line-height:1.55;flex:1;font-style:italic;}
.odp-ev-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;min-width:64px;}
.odp-band-pill{display:inline-flex;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.04em;white-space:nowrap;}
.odp-band-pill.high{background:#dcfce7;color:#15803d;}
.odp-band-pill.medium{background:#fef9c3;color:#a16207;}
.odp-band-pill.low{background:#fee2e2;color:#b91c1c;}
.odp-conf{font-family:"DM Mono",monospace;font-size:11.5px;font-weight:600;color:var(--ink4);}

/* Human assertions */
.odp-ha-wrap{border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;background:var(--bg,#fff);}
.odp-ha-header{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ha-title{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--ink5);}
.odp-ha-add{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:500;color:var(--ink4);background:none;border:none;cursor:pointer;padding:0;transition:color .12s;}
.odp-ha-add:hover{color:var(--p,#4B48C8);}
.odp-ha-item{display:flex;align-items:flex-start;gap:10px;padding:11px 16px;border-bottom:0.5px solid var(--brd);}
.odp-ha-item:last-child{border-bottom:none;}
.odp-ha-label{font-size:12.5px;font-weight:700;color:#15803d;display:flex;align-items:center;gap:6px;margin-bottom:3px;}
.odp-ha-key{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink4);font-weight:400;}
.odp-ha-meta{font-size:11.5px;color:var(--ink3);line-height:1.5;font-style:italic;}
.odp-ha-empty{padding:22px 16px;text-align:center;color:var(--ink5);font-size:12px;}
.odp-ha-placeholder{display:flex;align-items:center;justify-content:center;height:38px;border:1.5px dashed var(--brd2);border-radius:8px;font-size:12px;color:var(--ink4);cursor:pointer;gap:5px;background:transparent;width:100%;margin-top:8px;transition:border-color .12s,color .12s;}
.odp-ha-placeholder:hover{border-color:var(--p,#4B48C8);color:var(--p,#4B48C8);}

/* Stakeholders */
.odp-sh-wrap{background:var(--bg,#fff);border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;}
.odp-sh-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);}
.odp-sh-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-sh-add{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 12px;border-radius:7px;font-size:12px;font-weight:500;color:var(--ink4);border:0.5px solid var(--brd2);background:transparent;cursor:pointer;transition:background .12s,color .12s;}
.odp-sh-add:hover{background:var(--bg3);color:var(--ink);}
.odp-sh-item{display:flex;align-items:flex-start;gap:0;padding:0;border-bottom:0.5px solid var(--brd);}
.odp-sh-item:last-child{border-bottom:none;}
.odp-sh-av-col{display:flex;flex-direction:column;align-items:center;padding:14px 10px 14px 16px;gap:6px;}
.odp-sh-av{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.odp-sh-index{font-family:"DM Mono",monospace;font-size:9px;color:var(--ink5);font-weight:600;}
.odp-sh-info{flex:1;min-width:0;padding:13px 16px 13px 0;}
.odp-sh-name-row{display:flex;align-items:center;gap:7px;margin-bottom:4px;flex-wrap:wrap;}
.odp-sh-name{font-size:13px;font-weight:700;color:var(--ink);}
.odp-sh-role-tag{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10.5px;font-weight:600;}
.odp-sh-role-tag.champion{background:#ede9fe;color:#6d28d9;}
.odp-sh-role-tag.economic_buyer{background:#dbeafe;color:#1d4ed8;}
.odp-sh-role-tag.evaluator{background:#f0fdf4;color:#166534;border:0.5px solid #bbf7d0;}
.odp-sh-role-tag.blocker{background:#fee2e2;color:#b91c1c;}
.odp-sh-role-tag.influencer{background:#fef9c3;color:#854d0e;}
.odp-sh-role-tag.contact{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2);}
.odp-sh-role-tag.dm{display:inline-flex;padding:2px 7px;border-radius:4px;font-size:9.5px;font-weight:700;letter-spacing:.04em;background:#1d4ed8;color:#fff;}
.odp-sh-email{font-size:11px;color:var(--ink5);margin-bottom:8px;display:flex;align-items:center;gap:4px;}
.odp-sh-divider{height:0.5px;background:var(--brd);margin:6px 0 10px;}
.odp-sh-attrs{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.odp-sh-attr-cell{display:flex;flex-direction:column;gap:2px;}
.odp-sh-attr-label{font-size:8.5px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--ink5);}
.odp-sh-attr-val{font-size:12px;font-weight:600;color:var(--ink2);text-transform:capitalize;}
.odp-sh-attr-val.email-val{font-size:11px;text-transform:none;font-family:"DM Mono",monospace;color:var(--ink3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.odp-sh-empty{padding:36px 16px;text-align:center;color:var(--ink5);font-size:13px;}

/* Activity feed */
.odp-act-wrap{background:var(--bg,#fff);border:0.5px solid var(--brd);border-radius:10px;overflow:hidden;margin-bottom:14px;}
.odp-act-header{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:0.5px solid var(--brd);background:var(--bg2);}
.odp-act-title{font-size:14px;font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;}
.odp-act-count{display:inline-flex;padding:2px 9px;border-radius:20px;font-size:10.5px;font-weight:600;color:var(--ink4);background:var(--bg3);border:0.5px solid var(--brd2);}

.odp-feed{padding:8px 0;}
.odp-tl-item{
  display:flex;align-items:flex-start;gap:12px;
  padding:11px 16px;position:relative;
  transition:background .12s;
}
.odp-tl-item:hover{background:var(--bg3);}
.odp-tl-item::before{
  content:"";position:absolute;
  left:40px;top:44px;bottom:-2px;
  width:1.5px;
  background:linear-gradient(180deg,var(--brd2) 60%,transparent 100%);
}
.odp-tl-item:last-child::before{display:none;}
.odp-tl-icon{
  width:30px;height:30px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;color:var(--ink4);
  background:var(--bg3);border:0.5px solid var(--brd2);
  position:relative;z-index:1;
}
.odp-tl-icon.purple{background:rgba(109,40,217,0.10);border-color:rgba(109,40,217,0.20);color:#6d28d9;}
.odp-tl-icon.blue{background:rgba(29,78,216,0.09);border-color:rgba(29,78,216,0.18);color:#1d4ed8;}
.odp-tl-icon.red{background:rgba(185,28,28,0.09);border-color:rgba(185,28,28,0.18);color:#b91c1c;}
.odp-tl-icon.green{background:rgba(21,128,61,0.09);border-color:rgba(21,128,61,0.18);color:#15803d;}

.odp-tl-body{flex:1;min-width:0;padding-top:3px;}
.odp-tl-top{display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;}
.odp-tl-title{font-size:12.5px;font-weight:700;color:var(--ink);line-height:1.3;flex:1;min-width:0;}
.odp-tl-time{font-size:10px;color:var(--ink5);font-weight:400;flex-shrink:0;white-space:nowrap;}
.odp-tl-desc{font-size:11.5px;color:var(--ink4);line-height:1.45;margin-bottom:5px;}
.odp-tl-chips{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
.odp-tl-chip{
  display:inline-flex;align-items:center;gap:3px;
  padding:2px 7px;border-radius:4px;
  font-family:"DM Mono",monospace;font-size:9.5px;font-weight:600;
  background:var(--bg3);border:0.5px solid var(--brd2);color:var(--ink5);
  text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;
}
.odp-tl-chip.source{background:rgba(75,72,200,0.07);border-color:rgba(75,72,200,0.18);color:#4B48C8;}
.odp-tl-chip.agent{background:rgba(21,128,61,0.07);border-color:rgba(21,128,61,0.18);color:#15803d;}
.odp-tl-chip.sev-high,.odp-tl-chip.sev-critical{background:rgba(185,28,28,0.07);border-color:rgba(185,28,28,0.18);color:#b91c1c;}
.odp-tl-chip.sev-medium{background:rgba(194,65,12,0.07);border-color:rgba(194,65,12,0.18);color:#c2410c;}
.odp-act-empty{padding:40px 16px;text-align:center;color:var(--ink5);font-size:13px;}

.odp-delta-row{display:flex;align-items:center;gap:10px;padding:8px 16px;border-bottom:0.5px solid var(--brd);}
.odp-delta-row:last-child{border-bottom:none;}
.odp-delta-pill{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10.5px;font-weight:700;flex-shrink:0;}
.odp-delta-pill.improved{background:#dcfce7;color:#15803d;}
.odp-delta-pill.declined{background:#fee2e2;color:#b91c1c;}
.odp-delta-pill.new{background:#dbeafe;color:#1d4ed8;}
.odp-delta-type{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink4);flex:1;}
.odp-delta-time{font-size:10.5px;color:var(--ink5);flex-shrink:0;}

.odp-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;flex:1;padding:28px;text-align:center;color:var(--ink4);}

/* Reply body edit */
.odp-reply-edit-btn{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:var(--ink4);background:none;border:0.5px solid var(--brd2);border-radius:6px;padding:3px 9px;cursor:pointer;transition:color .12s,border-color .12s;}
.odp-reply-edit-btn:hover{color:#4B48C8;border-color:#4B48C8;}
.odp-reply-edit-btn.cancel{color:#b91c1c;border-color:#fca5a5;}
.odp-reply-edit-btn.cancel:hover{border-color:#b91c1c;}
.odp-reply-textarea{width:100%;min-height:140px;resize:vertical;border:1px solid #4B48C8;border-radius:8px;padding:12px 14px;font-size:13px;color:var(--ink2);line-height:1.72;font-family:inherit;background:var(--bg);outline:none;box-shadow:0 0 0 3px rgba(75,72,200,.10);transition:border-color .15s,box-shadow .15s;margin-bottom:10px;box-sizing:border-box;}
.odp-reply-textarea:focus{border-color:#4B48C8;box-shadow:0 0 0 3px rgba(75,72,200,.15);}
`;

// ─── Sub-components ───────────────────────────────────────────────────────────
const ForceBar: React.FC<{
  name: string;
  subtitle: string;
  score: number;
  fillClass: string;
  trend?: "up" | "dn" | null;
}> = ({ name, subtitle, score, fillClass, trend }) => (
  <div className="odp-force-row">
    <div className="odp-force-head">
      <span className="odp-force-name">{name}</span>
      <span className="odp-force-score">
        {score}
        {trend === "up" && <span className="up">↑</span>}
        {trend === "dn" && <span className="dn">↓</span>}
      </span>
    </div>
    <div className="odp-force-sub">{subtitle}</div>
    <div className="odp-force-track">
      <div
        className={`odp-force-fill ${fillClass}`}
        style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
      />
    </div>
  </div>
);

const CheckCircle: React.FC<{ color?: string }> = ({ color = "#16a34a" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ flexShrink: 0, marginTop: 1 }}
  >
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.4" />
    <path
      d="M5 8l2.5 2.5 4-4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SkeletonBlock: React.FC<{
  width?: string | number;
  height?: number;
  style?: React.CSSProperties;
}> = ({ width = "100%", height = 12, style }) => (
  <span
    className="odp-sk"
    style={{ display: "block", width, height, ...style }}
  />
);

const LoadingSkeleton: React.FC = () => (
  <div
    style={{
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}
  >
    <SkeletonBlock height={16} width="60%" />
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <SkeletonBlock key={i} height={46} style={{ borderRadius: 8 }} />
      ))}
    </div>
    <SkeletonBlock height={8} width="80%" />
    <SkeletonBlock height={8} width="65%" />
    <SkeletonBlock height={8} width="72%" />
    <SkeletonBlock height={100} style={{ borderRadius: 10 }} />
    <SkeletonBlock height={100} style={{ borderRadius: 10 }} />
  </div>
);

function tlIcon(eventType?: string): { cls: string; icon: string } {
  const t = (eventType ?? "").toLowerCase();
  if (t === "workspace_created" || t.includes("workspace_open"))
    return { cls: "green", icon: "briefcase" };
  if (t === "workspace_closed" || t.includes("workspace_close"))
    return { cls: "", icon: "x-circle" };
  if (t === "signal_detected" || t.includes("signal"))
    return { cls: "purple", icon: "zap" };
  if (t.includes("evidence")) return { cls: "purple", icon: "file-text" };
  if (t.includes("inference")) return { cls: "blue", icon: "sparkles" };
  if (t.includes("gap")) return { cls: "red", icon: "alert-circle" };
  if (t.includes("motion")) return { cls: "purple", icon: "zap" };
  if (t.includes("plan") || t.includes("conversation"))
    return { cls: "blue", icon: "list" };
  if (t.includes("reply") || t.includes("draft"))
    return { cls: "blue", icon: "mail" };
  if (t.includes("email") || t.includes("intake"))
    return { cls: "blue", icon: "mail" };
  if (t.includes("score") || t.includes("force"))
    return { cls: "purple", icon: "activity" };
  if (t.includes("stage") || t.includes("phase"))
    return { cls: "green", icon: "arrow-right" };
  if (t.includes("contact") || t.includes("stakeholder"))
    return { cls: "blue", icon: "users" };
  return { cls: "", icon: "clock" };
}

function activityLabel(a: ApiActivityEvent): string {
  if (a.title) return a.title;
  const t = (a.activityType ?? "event").replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ─── Main component ───────────────────────────────────────────────────────────
const OpportunityDetailPanel: React.FC<Props> = ({
  opp,
  onClose,
  panelWidth,
  onResizeStart,
}) => {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const [profile, setProfile] = React.useState<OpportunityProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isEditingBody, setIsEditingBody] = React.useState(false);
  const [editedBody, setEditedBody] = React.useState<string>("");
  // ── Send email state ──────────────────────────────────────────────────────
  const [isSending, setIsSending] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = React.useState(false);

  React.useEffect(() => {
    let el = document.getElementById("odp-styles") as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "odp-styles";
      document.head.appendChild(el);
    }
    el.textContent = ODP_CSS;
  }, []);

  const fetchProfile = React.useCallback(() => {
    if (!opp.id) return;
    setLoading(true);
    setError(null);
    setProfile(null);
    apiFetch(`${baseUrl()}/opportunities/${opp.id}/profile`, {
      headers: authHeaders(),
    })
      .then((r: any) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: any) => {
        setProfile(data as OpportunityProfile);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [opp.id]);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const ws = profile?.opportunity ?? profile?.workspace ?? null;
  const account = profile?.account ?? null;

  const forcesRaw =
    profile?.forceSnapshots?.[0] ?? profile?.forceSnapshot ?? null;
  const forces =
    forcesRaw ??
    (ws
      ? ({
          arthaScore: ws.arthaScore ?? 0,
          layaScore: ws.layaScore ?? 0,
          kriyaScore: ws.kriyaScore ?? 0,
          gatiScore: ws.gatiScore ?? 0,
          rasaScore: ws.rasaScore ?? 0,
          compositeScore: ws.compositeScore ?? ws.panchashaktiScore ?? 0,
          arthaDirection: "Flat",
          layaDirection: "Flat",
          kriyaDirection: "Flat",
          gatiDirection: "Flat",
          rasaDirection: "Flat",
        } as ApiForceSnapshot)
      : null);

  const inferences = profile?.inferences ?? [];
  const openGaps = profile?.openGaps ?? [];
  const resolvedGaps = profile?.resolvedGaps ?? [];
  const motion = profile?.activeMotion ?? profile?.selectedMotion ?? null;
  const convPlan =
    profile?.activeConversationPlan ?? profile?.conversationPlan ?? null;
  const replyDraft = profile?.latestReplyDraft ?? profile?.replyDraft ?? null;
  const replyValidation =
    profile?.latestReplyValidation ?? profile?.replyValidation ?? null;
  const evidenceItems = profile?.evidenceItems ?? [];
  const humanAssertions = profile?.humanAssertions ?? [];
  const stateDeltas = profile?.stateDeltas ?? [];
  const pulseStream = profile?.pulseStream ?? profile?.timeline ?? [];
  const activityLog: ApiActivityEvent[] = (profile as any)?.activity ?? [];

  const allStakeholders: ApiContact[] = React.useMemo(() => {
    if (!profile) return [];
    const p = profile as any;
    const candidates: any[] =
      p.stakeHolders ??
      p.primaryContact ??
      p.contacts ??
      p.stakeholders ??
      p.accountContacts ??
      [];

    const normalise = (val: any): ApiContact[] => {
      if (!val) return [];
      if (Array.isArray(val)) return val as ApiContact[];
      return [val as ApiContact];
    };

    const list: ApiContact[] = [];
    normalise(candidates).forEach((s: ApiContact) => {
      const dup = list.some(
        (x) =>
          (x.rowKey && x.rowKey === s.rowKey) ||
          (x.email && x.email === s.email),
      );
      if (!dup) list.push(s);
    });
    return list;
  }, [profile]);

  const displayName = ws?.workspaceName ?? opp.name;
  const displayStage = ws?.currentPhase ?? opp.stage;
  const displayValue = ws?.dealValue ?? opp.value;
  const pScore =
    forces?.compositeScore ?? ws?.panchashaktiScore ?? opp.panchashaktiScore;
  const heatLabel =
    opp.heat === "hot" ? "Hot" : opp.heat === "warm" ? "Warm" : "Cool";
  const domain =
    account?.domain ?? `${displayName.toLowerCase().replace(/\s+/g, "")}.com`;
  const industry = account?.industry ?? "—";
  const criticalGaps = openGaps.filter((g) => g.severity === "Critical");
  const blockingTypes = criticalGaps.map((g) => g.inferenceType);

  const motionQuestions = parseJsonArray(
    motion?.questionsJson ?? convPlan?.questionsJson,
  );
  const successCriteria = parseJsonArray(
    motion?.successCriteriaJson ?? convPlan?.successCriteriaJson,
  );

  const validationChecks = replyValidation
    ? [
        {
          label: "Plan alignment",
          sub: "Questions in draft match conversation plan",
          passed: replyValidation.planAlignmentStatus === "passed",
        },
        {
          label: "Policy check",
          sub: "Tone and language within guidelines",
          passed: replyValidation.policyStatus === "passed",
        },
        {
          label: "Gap coverage",
          sub:
            replyValidation.gapCoverageStatus === "partial"
              ? "Partial — some signals still missing"
              : "All gaps addressed",
          passed: replyValidation.gapCoverageStatus !== "failed",
        },
        {
          label: "Tone",
          sub: "Tone matches expected channel and context",
          passed: replyValidation.toneStatus === "passed",
        },
        {
          label: "Safety",
          sub: "No unsafe content detected",
          passed: (replyValidation as any).safetyStatus === "passed",
        },
      ]
    : [];

  const tabBadge = (id: TabId) => {
    if (id === "gaps") return openGaps.length;
    if (id === "intelligence") return inferences.length;
    if (id === "evidence") return evidenceItems.length;
    if (id === "stakeholders") return allStakeholders.length;
    return 0;
  };

  // ── Send email handler ────────────────────────────────────────────────────
  const handleSendEmail = React.useCallback(() => {
    if (!replyDraft?.rowKey) return;
    const body = editedBody || replyDraft.body;
    setIsSending(true);
    setSendError(null);
    setSendSuccess(false);
    apiFetch(
      `${baseUrl()}/communication/reply-drafts/${replyDraft.rowKey}/send?workspaceId=${opp.id}`,
      {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ body, sentBy: "user" }),
      },
    )
      .then((r: any) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setSendSuccess(true);
        setIsEditingBody(false);
      })
      .catch((err: Error) => setSendError(err.message))
      .finally(() => setIsSending(false));
  }, [replyDraft, editedBody]);

  return (
    <>
      <div className="odp-backdrop" onClick={onClose} />
      <div
        className="odp-panel"
        style={{ width: panelWidth, minWidth: 320, maxWidth: "90%" }}
      >
        {/* Resize handle */}
        <div className="odp-resize" onMouseDown={onResizeStart}>
          <div className="odp-resize-grip">
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
            <div className="odp-resize-dot" />
          </div>
          <span className="odp-resize-hint">Drag to resize</span>
        </div>

        {/* Header */}
        <div className="odp-hdr">
          <div className="odp-hdr-top">
            <div className={"odp-av " + avBg(displayName)}>
              {initials(displayName)}
            </div>
            <div className="odp-hdr-name-block">
              <div className="odp-name">{displayName}</div>
            </div>
            <div className="odp-hdr-actions">
              <button
                className="odp-close-btn"
                onClick={onClose}
                aria-label="Close"
              >
                <Icon name="x" size={12} />
              </button>
            </div>
          </div>

          {/* ── Enhanced stat cards ── */}
          <div className="odp-stats">
            <div className="odp-stat accent-value">
              <div className="odp-stat-l">Deal value</div>
              <div className="odp-stat-v">
                {displayValue && displayValue > 0 ? fmt$(displayValue) : "—"}
              </div>
            </div>
            <div className="odp-stat accent-score">
              <div className="odp-stat-l">Panchashakti</div>
              <div className="odp-stat-v pscore">
                {pScore}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "var(--ink5)",
                    fontFamily: '"DM Mono",monospace',
                    letterSpacing: 0,
                  }}
                >
                  /100
                </span>
              </div>
            </div>
            <div className="odp-stat accent-days">
              <div className="odp-stat-l">Stage days</div>
              <div className="odp-stat-v">
                {opp.cycle > 0 ? `${opp.cycle}d` : "—"}
              </div>
            </div>
            <div className="odp-stat accent-phase">
              <div className="odp-stat-l">Phase</div>
              <div style={{ marginTop: 2 }}>
                <span className="odp-stat-phase-pill">
                  {displayStage || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Enhanced tabs ── */}
        <div className="odp-tabs" role="tablist">
          {TABS.map((t) => {
            const badge = tabBadge(t.id);
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                className={`odp-tab${isActive ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span className="odp-tab-icon">
                  <Icon name={t.icon} size={12} />
                </span>
                <span>{t.label}</span>
                {badge > 0 && <span className="odp-tab-badge">{badge}</span>}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="odp-body">
          {loading && <LoadingSkeleton />}

          {error && (
            <div className="odp-error">
              <Icon name="wifi-off" size={28} />
              <div
                style={{ fontWeight: 600, color: "var(--ink3)", fontSize: 13 }}
              >
                Could not load opportunity profile
              </div>
              <div style={{ fontSize: 12, color: "var(--ink5)" }}>{error}</div>
              <button className="btn sm" onClick={fetchProfile}>
                <Icon name="refresh-cw" size={12} /> Retry
              </button>
            </div>
          )}

          {!loading && !error && profile && (
            <>
              {/* ══ OVERVIEW ══ */}
              {activeTab === "overview" && (
                <>
                  <div className="odp-ov-score-ring">
                    <div>
                      <div className="odp-ov-ring-num">{pScore}</div>
                      <div className="odp-ov-ring-denom">/100</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="odp-ov-ring-label">
                        Panchashakti Score
                      </div>
                      <div className="odp-ov-ring-sub">
                        {pScore >= 70
                          ? "Strong deal — ready to advance"
                          : pScore >= 40
                            ? "Moderate — gaps need addressing"
                            : "Weak — critical signals missing"}
                      </div>
                      <div
                        style={{
                          marginTop: 9,
                          height: 5,
                          borderRadius: 99,
                          background: "var(--brd)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${Math.min(100, pScore)}%`,
                            borderRadius: 99,
                            background:
                              "linear-gradient(90deg,#4B48C8,#818cf8)",
                            transition: "width .6s cubic-bezier(.4,0,.2,1)",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 5,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        className={`odp-status-pill ${opp.heat === "hot" ? "strong" : opp.heat === "warm" ? "partial" : "weak"}`}
                      >
                        {opp.heat === "hot"
                          ? "Hot"
                          : opp.heat === "warm"
                            ? "Warm"
                            : "Cool"}
                      </span>
                      <span
                        style={{
                          fontFamily: '"DM Mono",monospace',
                          fontSize: 10,
                          color: "var(--ink5)",
                        }}
                      >
                        {displayStage}
                      </span>
                    </div>
                  </div>

                  <div className="odp-ov-kv-row">
                    <div className="odp-ov-kv">
                      <div className="odp-ov-kv-l">Value</div>
                      <div className="odp-ov-kv-v">
                        {displayValue && displayValue > 0
                          ? fmt$(displayValue)
                          : "—"}
                      </div>
                    </div>
                    <div className="odp-ov-kv">
                      <div className="odp-ov-kv-l">Stage days</div>
                      <div className="odp-ov-kv-v">
                        {opp.cycle > 0 ? `${opp.cycle}d` : "—"}
                      </div>
                    </div>
                    <div className="odp-ov-kv">
                      <div className="odp-ov-kv-l">Open gaps</div>
                      <div
                        className="odp-ov-kv-v"
                        style={{
                          color: openGaps.length > 0 ? "#b91c1c" : "#15803d",
                        }}
                      >
                        {openGaps.length}
                      </div>
                    </div>
                    <div className="odp-ov-kv">
                      <div className="odp-ov-kv-l">Last touch</div>
                      <div className="odp-ov-kv-v" style={{ fontSize: 11 }}>
                        {opp.lastTouch}
                      </div>
                    </div>
                  </div>

                  <div className="odp-sh">Five Forces</div>
                  <div className="odp-card" style={{ padding: "12px 16px" }}>
                    <ForceBar
                      name="Artha"
                      subtitle="Economic value, budget, ROI"
                      score={forces?.arthaScore ?? 0}
                      fillClass="fill-artha"
                      trend={directionArrow(forces?.arthaDirection ?? "")}
                    />
                    <ForceBar
                      name="Laya"
                      subtitle="Timing, urgency, momentum"
                      score={forces?.layaScore ?? 0}
                      fillClass="fill-laya"
                      trend={directionArrow(forces?.layaDirection ?? "")}
                    />
                    <ForceBar
                      name="Kriya"
                      subtitle="Execution clarity, next-step readiness"
                      score={forces?.kriyaScore ?? 0}
                      fillClass="fill-kriya"
                      trend={directionArrow(forces?.kriyaDirection ?? "")}
                    />
                    <ForceBar
                      name="Gati"
                      subtitle="Movement, alternatives, competition"
                      score={forces?.gatiScore ?? 0}
                      fillClass="fill-gati"
                      trend={directionArrow(forces?.gatiDirection ?? "")}
                    />
                    <ForceBar
                      name="Rasa"
                      subtitle="Relationship, trust, authority"
                      score={forces?.rasaScore ?? 0}
                      fillClass="fill-rasa"
                      trend={directionArrow(forces?.rasaDirection ?? "")}
                    />
                  </div>

                  <div className="odp-card" style={{ marginTop: 12 }}>
                    <div className="odp-sh" style={{ marginBottom: 10 }}>
                      Engagement Signals (14d)
                    </div>
                    <Sparkline
                      data={opp.signals}
                      width={280}
                      height={32}
                      color="var(--p)"
                    />
                  </div>
                </>
              )}

              {/* ══ INTELLIGENCE ══ */}
              {activeTab === "intelligence" && (
                <>
                  <div
                    style={{
                      border: "0.5px solid var(--brd)",
                      borderRadius: 10,
                      overflow: "hidden",
                      background: "var(--bg)",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        padding: "13px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "0.5px solid var(--brd)",
                        background: "var(--bg2)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--ink)",
                        }}
                      >
                        <Icon name="sparkles" size={14} /> Inference results
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#15803d",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#16a34a",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {inferences.filter((i) => i.passed).length} passed
                        </span>
                        <span
                          style={{
                            width: 1,
                            height: 12,
                            background: "var(--brd2)",
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#b91c1c",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#dc2626",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          {inferences.filter((i) => !i.passed).length} missing
                        </span>
                      </div>
                    </div>

                    <div className="odp-inf-list">
                      {inferences.map((inf) => {
                        const statusCls = inf.status.toLowerCase();
                        const barPct = Math.min(100, inf.score);
                        const evidenceText =
                          inf.evidenceSummary ||
                          (inf.passed ? inf.answerText : null);
                        return (
                          <div key={inf.rowKey} className="odp-inf-card">
                            <div className="odp-inf-left">
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 7,
                                }}
                              >
                                <div className="odp-inf-name">
                                  {inf.inferenceName}
                                </div>
                                <span className="odp-phase-chip">
                                  {inf.phase}
                                </span>
                              </div>
                              <div className="odp-inf-type">
                                {inf.inferenceType}
                              </div>
                              {evidenceText && (
                                <div className="odp-inf-evidence">
                                  "{evidenceText}"
                                </div>
                              )}
                              {!inf.passed && (
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: "var(--ink5)",
                                    marginTop: 4,
                                    fontStyle: "italic",
                                  }}
                                >
                                  {inf.questionText}
                                </div>
                              )}
                            </div>
                            <div className="odp-inf-right">
                              <span className={`odp-status-pill ${statusCls}`}>
                                {inf.status}
                              </span>
                              <div className="odp-inf-score-wrap">
                                <span className="odp-inf-score">
                                  {inf.score}
                                </span>
                                <span className="odp-inf-score-max">/100</span>
                              </div>
                              <div className="odp-inf-bar-track">
                                <div
                                  className={`odp-inf-bar-fill ${statusCls}`}
                                  style={{ width: `${barPct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {inferences.length === 0 && (
                        <div
                          style={{
                            padding: "32px 16px",
                            textAlign: "center",
                            color: "var(--ink5)",
                            fontSize: 13,
                          }}
                        >
                          No inferences yet.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="odp-card" style={{ marginTop: 12 }}>
                    <div className="odp-sh" style={{ marginBottom: 10 }}>
                      Workspace Snapshot
                    </div>
                    <div className="odp-snap-grid">
                      <div className="odp-snap-cell">
                        <span className="odp-snap-label">Readiness</span>
                        <span
                          className={`odp-snap-pill ${criticalGaps.length > 0 ? "blocked" : "yes"}`}
                        >
                          {criticalGaps.length > 0 ? "BLOCKED" : "READY"}
                        </span>
                      </div>
                      <div className="odp-snap-cell">
                        <span className="odp-snap-label">Can Advance</span>
                        <span
                          className={`odp-snap-pill ${criticalGaps.length > 0 ? "no" : "yes"}`}
                        >
                          {criticalGaps.length > 0 ? "NO" : "YES"}
                        </span>
                      </div>
                      <div className="odp-snap-cell">
                        <span className="odp-snap-label">Motion</span>
                        <span className="odp-snap-pill gap-driven">
                          {motion?.motionCode
                            ?.replace(/_/g, "-")
                            .toUpperCase() ?? "—"}
                        </span>
                      </div>
                    </div>
                    {blockingTypes.length > 0 && (
                      <div style={{ marginTop: 14 }}>
                        <div className="odp-sh" style={{ marginBottom: 7 }}>
                          Blocking Items
                        </div>
                        <div className="odp-blocking-row">
                          {blockingTypes.map((t) => (
                            <span key={t} className="odp-block-tag">
                              {t.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ══ GAPS ══ */}
              {activeTab === "gaps" && (
                <>
                  {openGaps.length > 0 && (
                    <>
                      <div className="odp-gap-section-head">
                        <div className="odp-gap-section-title">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="8"
                              r="7"
                              stroke="var(--ink3)"
                              strokeWidth="1.4"
                            />
                            <path
                              d="M8 5v4M8 10.5v.5"
                              stroke="var(--ink3)"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Open gaps
                        </div>
                        <span className="odp-gap-count-pill">
                          {criticalGaps.length > 0
                            ? `${criticalGaps.length} critical`
                            : `${openGaps.length} open`}
                        </span>
                      </div>
                      {openGaps.map((g) => {
                        const inf = inferences.find(
                          (i) => i.inferenceType === g.inferenceType,
                        );
                        const statusVal = (g.status ?? "Open").toLowerCase();
                        return (
                          <div key={g.rowKey} className="odp-gap-row">
                            <div className="odp-gap-row-head">
                              <span
                                className={
                                  g.severity === "Critical"
                                    ? "odp-gap-critical"
                                    : "odp-gap-high"
                                }
                              >
                                {g.severity.toUpperCase()}
                              </span>
                              <span className={`odp-gap-status ${statusVal}`}>
                                {g.status ?? "Open"}
                              </span>
                              <span className="odp-gap-title">
                                {inf?.inferenceName ??
                                  g.inferenceType.replace(/_/g, " ")}
                              </span>
                              <div className="odp-gap-actions">
                                <button className="odp-gap-action-btn">
                                  Dismiss
                                </button>
                                <button
                                  className="odp-gap-action-btn"
                                  style={{ color: "#4B48C8", fontWeight: 600 }}
                                >
                                  Resolve
                                </button>
                              </div>
                            </div>
                            <div className="odp-gap-quote">
                              "{g.recommendedQuestion}"
                            </div>
                            <div className="odp-gap-desc">{g.whyItMatters}</div>
                          </div>
                        );
                      })}
                    </>
                  )}

                  {(() => {
                    const resolved =
                      resolvedGaps.length > 0
                        ? resolvedGaps
                        : inferences
                            .filter((i) => i.passed)
                            .map((i) => ({
                              rowKey: i.rowKey,
                              inferenceType: i.inferenceType,
                              gapType: "",
                              severity: "",
                              status: "resolved",
                              recommendedQuestion: i.questionText,
                              priority: "",
                              whyItMatters: i.evidenceSummary || i.why,
                            }));
                    if (!resolved.length) return null;
                    return (
                      <>
                        <div className="odp-resolved-head">
                          <div className="odp-resolved-title">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M4 8l3 3 5-5"
                                stroke="#16a34a"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {resolvedGaps.length > 0
                              ? "Resolved gaps"
                              : "Passed inferences"}
                          </div>
                          <span className="odp-resolved-pill">
                            {resolved.length}{" "}
                            {resolvedGaps.length > 0 ? "resolved" : "passed"}
                          </span>
                        </div>
                        <div className="odp-card">
                          {resolved.map((r) => {
                            const inf = inferences.find(
                              (i) => i.inferenceType === r.inferenceType,
                            );
                            return (
                              <div key={r.rowKey} className="odp-resolved-row">
                                <CheckCircle />
                                <div>
                                  <div className="odp-resolved-name">
                                    {inf?.inferenceName ??
                                      r.inferenceType.replace(/_/g, " ")}
                                  </div>
                                  <div className="odp-resolved-sub">
                                    {inf?.evidenceSummary ||
                                      r.whyItMatters ||
                                      "Resolved automatically."}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}

                  {openGaps.length === 0 &&
                    resolvedGaps.length === 0 &&
                    inferences.filter((i) => i.passed).length === 0 && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px 16px",
                          color: "var(--ink5)",
                          fontSize: 13,
                        }}
                      >
                        No gaps found.
                      </div>
                    )}
                </>
              )}

              {/* ══ MOTION ══ */}
              {activeTab === "motion" && (
                <>
                  {motion ? (
                    <div className="odp-motion-card">
                      <div className="odp-motion-eyebrow">
                        Selected Motion
                        <span className="odp-motion-stage-pill">
                          {motion.motionCode.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="odp-motion-title">
                        {motion.motionName}
                      </div>
                      <div className="odp-motion-desc">{motion.objective}</div>
                      <div className="odp-motion-why">
                        <strong>Why selected:</strong> {motion.reason}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="odp-card"
                      style={{
                        textAlign: "center",
                        color: "var(--ink5)",
                        fontSize: 13,
                      }}
                    >
                      No motion selected yet.
                    </div>
                  )}

                  {convPlan && (
                    <div className="odp-card">
                      <div className="odp-conv-head">
                        <span className="odp-conv-title">
                          Conversation Plan
                        </span>
                        <span className="odp-conv-active-pill">ACTIVE</span>
                      </div>
                      <div className="odp-conv-questions-label">
                        <strong>Questions to ask</strong> ·{" "}
                        {motionQuestions.length} planned
                      </div>
                      {motionQuestions.map((q, i) => (
                        <div key={i} className="odp-conv-q">
                          <span className="odp-conv-q-num">{i + 1}</span>
                          <span>{q}</span>
                        </div>
                      ))}
                      {successCriteria.length > 0 && (
                        <>
                          <div className="odp-success-label">
                            Success Criteria
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 7,
                            }}
                          >
                            {successCriteria.map((c, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  fontSize: 12.5,
                                  color: "var(--ink3)",
                                }}
                              >
                                <CheckCircle color="#4B48C8" /> {c}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* ══ REPLY DRAFT ══ */}
              {activeTab === "reply" && (
                <>
                  {replyDraft ? (
                    <div className="odp-card" style={{ padding: "16px" }}>
                      <div className="odp-reply-head">
                        <div className="odp-reply-title">
                          <span className="odp-reply-dot" />
                          Draft reply
                        </div>
                        {replyDraft.reviewStatus === "pending" ? (
                          <span className="odp-pending-pill">
                            PENDING REVIEW
                          </span>
                        ) : (
                          <span className="odp-approved-pill">
                            {replyDraft.reviewStatus?.toUpperCase() ?? "DRAFT"}
                          </span>
                        )}
                      </div>
                      <div className="odp-reply-subject-label">Subject</div>
                      <div className="odp-reply-subject">
                        {replyDraft.subject}
                      </div>

                      {/* ── Reply body: read or edit ── */}
                      <div style={{ marginBottom: 14 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: ".10em",
                              textTransform: "uppercase" as const,
                              color: "var(--ink5)",
                            }}
                          >
                            Body
                          </span>
                          {isEditingBody ? (
                            <button
                              className="odp-reply-edit-btn cancel"
                              onClick={() => {
                                setIsEditingBody(false);
                                setEditedBody(replyDraft.body);
                              }}
                            >
                              <Icon name="x" size={11} /> Cancel
                            </button>
                          ) : (
                            <button
                              className="odp-reply-edit-btn"
                              onClick={() => {
                                setEditedBody(bodyToEditText(replyDraft.body));
                                setIsEditingBody(true);
                                // Reset send state when starting a new edit
                                setSendSuccess(false);
                                setSendError(null);
                              }}
                            >
                              <Icon name="edit-2" size={11} /> Edit
                            </button>
                          )}
                        </div>

                        {isEditingBody ? (
                          <textarea
                            className="odp-reply-textarea"
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            autoFocus
                          />
                        ) : (
                          <div
                            className="odp-reply-body"
                            style={{
                              borderBottom: "none",
                              marginBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            {formatReplyBody(editedBody || replyDraft.body)}
                          </div>
                        )}
                      </div>

                      {/* ── Action buttons ── */}
                      <div
                        style={{
                          borderTop: "0.5px solid var(--brd)",
                          paddingTop: 14,
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="btn sm pri"
                          onClick={handleSendEmail}
                          disabled={isSending || sendSuccess}
                          style={{
                            opacity: isSending ? 0.7 : 1,
                            cursor:
                              isSending || sendSuccess
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          <Icon
                            name={sendSuccess ? "check" : "mail"}
                            size={12}
                          />
                          {isSending
                            ? "Sending…"
                            : sendSuccess
                              ? "Sent!"
                              : "Send email"}
                        </button>
                        <button className="btn sm">
                          <Icon name="copy" size={12} /> Copy
                        </button>
                        <button className="btn sm">
                          <Icon name="refresh-cw" size={12} /> Regenerate
                        </button>
                      </div>

                      {/* ── Send feedback ── */}
                      {sendError && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: "8px 11px",
                            background: "#fef2f2",
                            border: "0.5px solid #fca5a5",
                            borderRadius: 7,
                            fontSize: 11.5,
                            color: "#b91c1c",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Icon name="alert-circle" size={12} />
                          Failed to send: {sendError}
                        </div>
                      )}
                      {sendSuccess && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: "8px 11px",
                            background: "#f0fdf4",
                            border: "0.5px solid #86efac",
                            borderRadius: 7,
                            fontSize: 11.5,
                            color: "#15803d",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Icon name="check-circle" size={12} />
                          Email sent successfully.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="odp-card"
                      style={{
                        textAlign: "center",
                        color: "var(--ink5)",
                        fontSize: 13,
                      }}
                    >
                      No reply draft generated yet.
                    </div>
                  )}

                  {replyValidation && (
                    <div
                      className="odp-validation-card"
                      style={{ marginTop: 12 }}
                    >
                      <div className="odp-validation-head">
                        <div className="odp-validation-title">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="12"
                              height="12"
                              rx="2"
                              stroke="var(--ink3)"
                              strokeWidth="1.3"
                            />
                            <path
                              d="M5 8l2.5 2.5 4-4"
                              stroke="var(--ink3)"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Validation report
                        </div>
                        <span className="odp-validation-score">
                          {replyValidation.validationScore}/100
                        </span>
                      </div>
                      {validationChecks.map((v, i) => (
                        <div key={i} className="odp-validation-row">
                          <CheckCircle
                            color={v.passed ? "#16a34a" : "#dc2626"}
                          />
                          <div>
                            <div style={{ fontSize: 12.5, fontWeight: 600 }}>
                              {v.label}
                            </div>
                            <div className="odp-validation-sub">{v.sub}</div>
                          </div>
                        </div>
                      ))}
                      {replyValidation.recommendation && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: "8px 11px",
                            background: "var(--bg3)",
                            borderRadius: 7,
                            fontSize: 11.5,
                            color: "var(--ink4)",
                          }}
                        >
                          {replyValidation.recommendation}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* ══ EVIDENCE ══ */}
              {activeTab === "evidence" && (
                <>
                  <div className="odp-ev-wrap">
                    <div className="odp-ev-header">
                      <div className="odp-ev-title">
                        <Icon name="file-text" size={14} />
                        Evidence items
                      </div>
                      <span className="odp-ev-count">
                        {evidenceItems.length} items
                      </span>
                    </div>
                    {evidenceItems.length > 0 ? (
                      evidenceItems.map((ev) => {
                        const inf = inferences.find(
                          (i) => i.inferenceType === ev.inferenceType,
                        );
                        return (
                          <div key={ev.rowKey} className="odp-ev-item">
                            <div className="odp-ev-left">
                              <span className="odp-ev-slug">
                                {inf?.inferenceName ?? ev.inferenceType}
                              </span>
                              {ev.sourceType && (
                                <span className="odp-ev-source">
                                  {ev.sourceType}
                                </span>
                              )}
                            </div>
                            <div className="odp-ev-text">
                              "{ev.evidenceText}"
                            </div>
                            <div className="odp-ev-right">
                              <span
                                className={`odp-band-pill ${ev.evidenceBand.toLowerCase()}`}
                              >
                                {ev.evidenceBand.toUpperCase()}
                              </span>
                              <span className="odp-conf">
                                {Math.round(ev.confidence * 100)}%
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        style={{
                          padding: "32px 16px",
                          textAlign: "center",
                          color: "var(--ink5)",
                          fontSize: 13,
                        }}
                      >
                        No evidence items collected yet.
                      </div>
                    )}
                  </div>

                  <div className="odp-ha-wrap">
                    <div className="odp-ha-header">
                      <span className="odp-ha-title">Human Assertions</span>
                      <button className="odp-ha-add">
                        <Icon name="plus" size={11} /> Add assertion
                      </button>
                    </div>
                    {humanAssertions.length > 0 ? (
                      <>
                        {humanAssertions.map((ha) => (
                          <div key={ha.rowKey} className="odp-ha-item">
                            <CheckCircle />
                            <div>
                              <div className="odp-ha-label">
                                {ha.assertionType ?? "Confirmation"} ·{" "}
                                <span className="odp-ha-key">
                                  {ha.inferenceType}
                                </span>
                              </div>
                              <div className="odp-ha-meta">
                                "{ha.assertionText}"
                                {(ha.createdBy || ha.createdAt) && (
                                  <span style={{ color: "var(--ink5)" }}>
                                    {" "}
                                    — {ha.createdBy ?? "User"}
                                    {ha.createdAt
                                      ? `, ${relTime(ha.createdAt)}`
                                      : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div style={{ padding: "0 16px 14px" }}>
                          <button className="odp-ha-placeholder">
                            <Icon name="plus" size={12} /> Confirm, correct or
                            override an inference result
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="odp-ha-empty">
                          No human assertions yet.
                        </div>
                        <div style={{ padding: "0 16px 14px" }}>
                          <button className="odp-ha-placeholder">
                            <Icon name="plus" size={12} /> Confirm, correct or
                            override an inference result
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* ══ STAKEHOLDERS ══ */}
              {activeTab === "stakeholders" && (
                <div className="odp-sh-wrap">
                  <div className="odp-sh-header">
                    <div className="odp-sh-title">
                      <Icon name="users" size={14} /> Stakeholder map
                      <span
                        style={{
                          fontFamily: '"DM Mono",monospace',
                          fontSize: 11,
                          fontWeight: 400,
                          color: "var(--ink5)",
                        }}
                      >
                        {allStakeholders.length} contact
                        {allStakeholders.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <button className="odp-sh-add">
                      <Icon name="plus" size={11} /> Add
                    </button>
                  </div>

                  {allStakeholders.length > 0 ? (
                    allStakeholders.map((s, idx) => {
                      const name =
                        s.fullName ??
                        s.contactName ??
                        s.name ??
                        s.email ??
                        "Unknown";
                      const role = s.stakeholderRole ?? s.role ?? "contact";
                      const title = s.title ?? s.department ?? null;
                      const roleClass = role
                        .toLowerCase()
                        .replace(/[\s-]+/g, "_");
                      const isDm =
                        s.isDm ??
                        (role.toLowerCase().includes("economic") ||
                          role.toLowerCase().includes("dm"));
                      const domain = s.email ? s.email.split("@")[1] : null;
                      const lastTouch =
                        s.lastContactAt ?? (s as any).lastTouchAt ?? null;
                      const accountName =
                        (s as any).accountName ?? account?.accountName ?? null;

                      return (
                        <div key={idx} className="odp-sh-item">
                          <div className="odp-sh-av-col">
                            <div className={"odp-sh-av " + avBg(name)}>
                              {initials(name)}
                            </div>
                            <span className="odp-sh-index">#{idx + 1}</span>
                          </div>
                          <div className="odp-sh-info">
                            <div className="odp-sh-name-row">
                              <span className="odp-sh-name">{name}</span>
                              <span className={`odp-sh-role-tag ${roleClass}`}>
                                {role.replace(/_/g, " ")}
                              </span>
                              {isDm && (
                                <span className="odp-sh-role-tag dm">DM</span>
                              )}
                            </div>
                            <div className="odp-sh-email">
                              {title ? (
                                <>
                                  <Icon name="briefcase" size={10} /> {title}
                                </>
                              ) : domain ? (
                                <>
                                  <Icon name="globe" size={10} /> {domain}
                                </>
                              ) : null}
                              {accountName && (
                                <span
                                  style={{
                                    color: "var(--brd2)",
                                    margin: "0 3px",
                                  }}
                                >
                                  ·
                                </span>
                              )}
                              {accountName && <span>{accountName}</span>}
                            </div>
                            <div className="odp-sh-divider" />
                            <div className="odp-sh-attrs">
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">Email</span>
                                <span className="odp-sh-attr-val email-val">
                                  {s.email ?? "—"}
                                </span>
                              </div>
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">
                                  Authority
                                </span>
                                <span className="odp-sh-attr-val">
                                  {s.authority ?? "—"}
                                </span>
                              </div>
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">
                                  Influence
                                </span>
                                <span className="odp-sh-attr-val">
                                  {s.influence ?? "—"}
                                </span>
                              </div>
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">
                                  Last Contact
                                </span>
                                <span className="odp-sh-attr-val">
                                  {lastTouch ? relTime(lastTouch) : "—"}
                                </span>
                              </div>
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">
                                  Source
                                </span>
                                <span className="odp-sh-attr-val">
                                  {(s as any).source ??
                                    (s as any).createdBy ??
                                    "—"}
                                </span>
                              </div>
                              <div className="odp-sh-attr-cell">
                                <span className="odp-sh-attr-label">Added</span>
                                <span className="odp-sh-attr-val">
                                  {(s as any).createdAt
                                    ? relTime((s as any).createdAt)
                                    : "—"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="odp-sh-empty">
                      No stakeholders mapped yet.
                      <br />
                      <span style={{ fontSize: 11 }}>
                        Add contacts involved in this opportunity.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ══ ACTIVITY ══ */}
              {activeTab === "activity" && (
                <div className="odp-act-wrap">
                  <div className="odp-act-header">
                    <div className="odp-act-title">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M8 5v3.5l2 1.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Activity
                    </div>
                    <span className="odp-act-count">
                      {activityLog.length > 0
                        ? `${activityLog.length} event${activityLog.length !== 1 ? "s" : ""}`
                        : "No events"}
                    </span>
                  </div>

                  {activityLog.length > 0 ? (
                    <div className="odp-feed">
                      {[...activityLog].reverse().map((a, i) => {
                        const { cls, icon } = tlIcon(
                          a.activityType ?? a.source ?? "",
                        );
                        const label = activityLabel(a);
                        const sevCls = `sev-${(a.severity ?? "").toLowerCase()}`;
                        const hasChips =
                          a.source ||
                          a.agentType ||
                          (a.severity && a.severity.toLowerCase() !== "low");
                        return (
                          <div key={a.rowKey ?? i} className="odp-tl-item">
                            <div className={`odp-tl-icon ${cls}`}>
                              <Icon name={icon} size={13} />
                            </div>
                            <div className="odp-tl-body">
                              <div className="odp-tl-top">
                                <span className="odp-tl-title">{label}</span>
                                <span className="odp-tl-time">
                                  {relTime(a.createdAt)}
                                </span>
                              </div>
                              {a.description && (
                                <div className="odp-tl-desc">
                                  {a.description}
                                </div>
                              )}
                              {hasChips && (
                                <div className="odp-tl-chips">
                                  {a.source && (
                                    <span className="odp-tl-chip source">
                                      {a.source}
                                    </span>
                                  )}
                                  {a.agentType && (
                                    <span className="odp-tl-chip agent">
                                      {a.agentType.replace(/_/g, " ")}
                                    </span>
                                  )}
                                  {a.severity &&
                                    a.severity.toLowerCase() !== "low" && (
                                      <span className={`odp-tl-chip ${sevCls}`}>
                                        {a.severity}
                                      </span>
                                    )}
                                  {a.activityType && (
                                    <span className="odp-tl-chip">
                                      {a.activityType.replace(/_/g, " ")}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="odp-feed">
                      {replyDraft &&
                        (() => {
                          const { cls, icon } = tlIcon("reply");
                          return (
                            <div className="odp-tl-item">
                              <div className={`odp-tl-icon ${cls}`}>
                                <Icon name={icon} size={13} />
                              </div>
                              <div className="odp-tl-body">
                                <div className="odp-tl-top">
                                  <span className="odp-tl-title">
                                    Reply draft generated
                                  </span>
                                  <span className="odp-tl-time">
                                    {relTime((replyDraft as any).createdAt)}
                                  </span>
                                </div>
                                <div className="odp-tl-desc">
                                  {motion?.motionName ?? "Motion"} · score{" "}
                                  {replyValidation?.validationScore ?? "—"}/100
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      {criticalGaps.map((g, i) => {
                        const inf = inferences.find(
                          (x) => x.inferenceType === g.inferenceType,
                        );
                        return (
                          <div key={i} className="odp-tl-item">
                            <div className="odp-tl-icon red">
                              <Icon name="alert-circle" size={13} />
                            </div>
                            <div className="odp-tl-body">
                              <div className="odp-tl-top">
                                <span className="odp-tl-title">
                                  Gap detected
                                </span>
                                <span className="odp-tl-time">
                                  {relTime((g as any).createdAt)}
                                </span>
                              </div>
                              <div className="odp-tl-desc">
                                {inf?.inferenceName ??
                                  g.inferenceType.replace(/_/g, " ")}{" "}
                                — critical
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {ws && (
                        <div className="odp-tl-item">
                          <div className="odp-tl-icon green">
                            <Icon name="briefcase" size={13} />
                          </div>
                          <div className="odp-tl-body">
                            <div className="odp-tl-top">
                              <span className="odp-tl-title">
                                Workspace created
                              </span>
                              <span className="odp-tl-time">
                                {relTime(ws.createdAt)}
                              </span>
                            </div>
                            <div className="odp-tl-desc">
                              Opportunity opened ·{" "}
                              {opp.cycle > 0 ? `${opp.cycle} days` : "recently"}{" "}
                              in {displayStage}
                            </div>
                          </div>
                        </div>
                      )}
                      {!replyDraft && criticalGaps.length === 0 && !ws && (
                        <div className="odp-act-empty">
                          No activity recorded yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OpportunityDetailPanel;
