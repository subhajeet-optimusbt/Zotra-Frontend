import type { Account, Stage, SignalType, PulseItem, Agent, Forecast } from '../types';

// ─── STAGES ──────────────────────────────────────────────────────────────────
export const STAGES = [
  { id: "qualify",     name: "Qualify",     color: "#9CA3AF" },
  { id: "shaping",     name: "Shaping",     color: "#0369A1" },
  { id: "development", name: "Development", color: "#4F46E5" },
  { id: "closing",     name: "Closing",     color: "#16A34A" },
];

// ─── ACCOUNTS ─────────────────────────────────────────────────────────────────
export const ACCOUNTS: Account[] = [
  // ── Qualify ────────────────────────────────────────────────────────────────
  {
    id: "a1",  name: "Acme Corp",       domain: "acme.com",
    stage: "qualify",     value: 48000,  heat: "cool", cycle: 8,
    lastTouch: "2d ago",  intent: "Exploring automation options",
    signals: [1,2,1,3,2,1,2,3,2,1,2,1,1,2],
    size: "Mid-market",   industry: "Manufacturing", temp: 32, owner: "Sara Lin",
  },
  {
    id: "a2",  name: "Blue Ridge Tech", domain: "blueridge.io",
    stage: "qualify",     value: 62000,  heat: "warm", cycle: 5,
    lastTouch: "1d ago",  intent: "Evaluating vendor shortlist",
    signals: [2,3,4,3,2,3,4,5,4,3,4,3,4,5],
    size: "SMB",          industry: "Technology",    temp: 54, owner: "Tom Reed",
  },
  {
    id: "a3",  name: "Cortex Labs",     domain: "cortexlabs.ai",
    stage: "qualify",     value: 31000,  heat: "cool", cycle: 14,
    lastTouch: "5d ago",  intent: "Initial discovery call done",
    signals: [1,1,2,1,1,2,1,1,2,1,1,2,1,1],
    size: "Startup",      industry: "AI / ML",       temp: 28, owner: "Sara Lin",
  },

  // ── Shaping ────────────────────────────────────────────────────────────────
  {
    id: "a4",  name: "Dune Analytics",  domain: "dune.xyz",
    stage: "shaping",     value: 95000,  heat: "warm", cycle: 18,
    lastTouch: "3d ago",  intent: "Mapping requirements to platform",
    signals: [3,4,3,5,4,4,5,4,5,5,4,5,6,5],
    size: "Mid-market",   industry: "Analytics",     temp: 61, owner: "James Park",
  },
  {
    id: "a5",  name: "Ember Systems",   domain: "embersys.com",
    stage: "shaping",     value: 120000, heat: "hot",  cycle: 11,
    lastTouch: "Today",   intent: "Strong intent, scoping POC",
    signals: [4,5,6,5,7,6,7,8,7,8,7,8,9,9],
    size: "Enterprise",   industry: "Infrastructure", temp: 88, owner: "Tom Reed",
  },
  {
    id: "a6",  name: "Fluxpoint AI",    domain: "fluxpoint.ai",
    stage: "shaping",     value: 74000,  heat: "warm", cycle: 22,
    lastTouch: "2d ago",  intent: "Aligning on integration approach",
    signals: [3,3,4,3,4,4,3,5,4,4,5,4,4,5],
    size: "SMB",          industry: "AI / ML",       temp: 57, owner: "Sara Lin",
  },
  {
    id: "a7",  name: "Grayscale IO",    domain: "grayscale.io",
    stage: "shaping",     value: 58000,  heat: "cool", cycle: 31,
    lastTouch: "6d ago",  intent: "Slowed down, champion changed",
    signals: [2,2,1,2,1,1,2,1,1,2,1,1,1,1],
    size: "Mid-market",   industry: "FinTech",       temp: 22, owner: "James Park",
  },

  // ── Development ────────────────────────────────────────────────────────────
  {
    id: "a8",  name: "Harbour Cloud",   domain: "harbourcloud.co",
    stage: "development", value: 210000, heat: "hot",  cycle: 9,
    lastTouch: "Today",   intent: "Business case approved, moving fast",
    signals: [5,6,7,6,8,7,8,9,8,9,9,9,10,10],
    size: "Enterprise",   industry: "Cloud / SaaS",  temp: 94, owner: "Tom Reed",
  },
  {
    id: "a9",  name: "Iris Dynamics",   domain: "irisdyn.com",
    stage: "development", value: 145000, heat: "warm", cycle: 27,
    lastTouch: "1d ago",  intent: "Proposal review with exec sponsor",
    signals: [4,5,4,6,5,5,6,5,6,7,6,6,7,6],
    size: "Mid-market",   industry: "Robotics",      temp: 68, owner: "Sara Lin",
  },
  {
    id: "a10", name: "Juno Software",   domain: "junosoft.dev",
    stage: "development", value: 88000,  heat: "warm", cycle: 35,
    lastTouch: "4d ago",  intent: "Technical validation in progress",
    signals: [3,4,3,4,4,3,4,4,3,4,3,4,4,3],
    size: "SMB",          industry: "Dev Tools",     temp: 51, owner: "James Park",
  },
  {
    id: "a11", name: "Kindred Systems",  domain: "kindredsys.com",
    stage: "development", value: 165000, heat: "hot",  cycle: 16,
    lastTouch: "Today",   intent: "Legal reviewing MSA terms",
    signals: [5,6,5,7,6,7,8,7,8,8,9,8,9,10],
    size: "Enterprise",   industry: "Security",      temp: 85, owner: "Tom Reed",
  },

  // ── Closing ────────────────────────────────────────────────────────────────
  {
    id: "a12", name: "Luma Ventures",   domain: "lumavc.com",
    stage: "closing",     value: 310000, heat: "hot",  cycle: 6,
    lastTouch: "Today",   intent: "Final pricing call scheduled",
    signals: [7,8,8,9,8,9,9,10,9,10,10,10,10,10],
    size: "Enterprise",   industry: "Venture / PE",  temp: 97, owner: "Tom Reed",
  },
  {
    id: "a13", name: "Mosaic Health",   domain: "mosaichealth.io",
    stage: "closing",     value: 195000, heat: "hot",  cycle: 12,
    lastTouch: "Yesterday", intent: "Verbal commit, awaiting signature",
    signals: [6,7,7,8,8,9,8,9,9,10,9,10,10,10],
    size: "Mid-market",   industry: "Health Tech",   temp: 91, owner: "Sara Lin",
  },
  {
    id: "a14", name: "Novu Platforms",  domain: "novu.io",
    stage: "closing",     value: 78000,  heat: "warm", cycle: 19,
    lastTouch: "2d ago",  intent: "Procurement aligned, minor redlines",
    signals: [5,5,6,6,5,6,6,7,6,7,7,6,7,7],
    size: "SMB",          industry: "Productivity",  temp: 73, owner: "James Park",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const avBg = (s: string): string => {
  if (!s) return 'av-1';
  const c = s.charCodeAt(0) + (s.charCodeAt(1) || 0);
  return 'av-' + (1 + (c % 7));
};

export const fmt$ = (n: number): string => {
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n;
};

export const initials = (n: string): string =>
  n.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();

// ─── Signal types ─────────────────────────────────────────────────────────────
export const SIGNAL_TYPES: Record<string, SignalType> = {
  intent:  { ic: 'radar',          color: 'br',    label: 'Intent'   },
  email:   { ic: 'mail',           color: 'te',    label: 'Reply'    },
  meeting: { ic: 'calendar',       color: 'br',    label: 'Meeting'  },
  call:    { ic: 'phone',          color: 'ok',    label: 'Call'     },
  agent:   { ic: 'sparkles',       color: 'amber', label: 'Agent'    },
  doc:     { ic: 'file-text',      color: 'mu',    label: 'Document' },
  alert:   { ic: 'triangle-alert', color: 'wa',    label: 'Risk'     },
  win:     { ic: 'trophy',         color: 'ok',    label: 'Won'      },
  loss:    { ic: 'x-circle',       color: 'ri',    label: 'Lost'     },
  visit:   { ic: 'globe',          color: 'br',    label: 'Visit'    },
  hire:    { ic: 'user-plus',      color: 'br',    label: 'Hire'     },
};

// ─── Pulse feed ───────────────────────────────────────────────────────────────
export const PULSE: PulseItem[] = [
  { id: 'p1',  time: 'just now',  ts: 0,    type: 'agent',   account: 'orbit',
    title: 'Drafted 3 follow-ups for stalled deals',
    detail: 'Zotra paused outreach on Acme, Cinder, and Voltic after detecting "out of office" patterns. Drafts ready for your review.',
    actor: 'Zotra', actions: ['Review drafts', 'Send all', 'Dismiss'] },
  { id: 'p2',  time: '6m ago',   ts: 6,    type: 'intent',  account: 'acme',
    title: 'Acme Robotics is shopping',
    detail: '4 people from Acme visited /pricing and /security in the last 90 minutes. New visitor: VP of Engineering.',
    actor: null, actions: ['Open account', 'Brief me', 'Add to sequence'] },
  { id: 'p3',  time: '23m ago',  ts: 23,   type: 'email',   account: 'northwind',
    title: 'Sasha @ Northwind: "we\u2019re ready to sign Thursday"',
    detail: 'Reply on the redlined MSA \u2014 they accepted clause 4.2, pushing back only on auto-renewal.',
    actor: null, actions: ['Reply', 'Mark as won', 'Loop in Legal'] },
  { id: 'p4',  time: '41m ago',  ts: 41,   type: 'agent',   account: 'kairo',
    title: 'Kairo Health champion change detected',
    detail: 'Maya Chen (Director of Engineering, your champion) updated her LinkedIn to \u201cOpen to opportunities\u201d. Recommend doubling down on backup contact Priya Shah.',
    actor: 'Watcher', actions: ['Brief me', 'Suggest meeting'] },
  { id: 'p5',  time: '1h ago',   ts: 60,   type: 'meeting', account: 'rune',
    title: 'Demo with Rune Systems in 45 min',
    detail: '3 attendees confirmed. Pre-brief notes ready.',
    actor: 'Zotra', actions: ['Open pre-brief', 'Join meeting'] },
  { id: 'p6',  time: '2h ago',   ts: 120,  type: 'alert',   account: 'voltic',
    title: 'Voltic has gone quiet (14 days)',
    detail: 'No replies, no opens, no site visits since April 28. Cycle still active \u2014 auto-close in 7 days unless re-engaged.',
    actor: 'Watcher', actions: ['Re-engage', 'Mark dormant', 'Snooze'] },
  { id: 'p7',  time: '3h ago',   ts: 180,  type: 'hire',    account: 'orbit',
    title: 'Orbit hired a new CISO',
    detail: 'Daniel Yu joined as Chief Information Security Officer (was at Stripe). Security review concerns may shift.',
    actor: null, actions: ['Update brief', 'Draft intro'] },
  { id: 'p8',  time: '5h ago',   ts: 300,  type: 'agent',   account: 'pebble',
    title: 'Pebble Group enrichment complete',
    detail: 'Added 14 stakeholders, mapped reporting hierarchy, identified procurement contact.',
    actor: 'Forager', actions: ['View org map'] },
  { id: 'p9',  time: 'yesterday', ts: 1440, type: 'visit',  account: 'tessera',
    title: 'Tessera Health: champion forwarded your one-pager internally',
    detail: '4 unique opens from tessera.md addresses in the last 6 hours.',
    actor: null, actions: ['Open account'] },
  { id: 'p10', time: 'yesterday', ts: 1500, type: 'win',    account: 'wisp',
    title: 'Wisp Studios moved to Closing',
    detail: 'You moved this deal to Closing stage after the procurement call. Forecast updated.',
    actor: null, actions: ['Update forecast'] },
];

// ─── Agents ───────────────────────────────────────────────────────────────────
export const AGENTS: Agent[] = [
  { id: 'compass',  name: 'Zotra',    role: 'Outreach drafting',        status: 'working', count: 7, color: '#4B48C8', ic: 'compass'  },
  { id: 'watcher',  name: 'Watcher',  role: 'Signals + champion shifts', status: 'live',    count: 2, color: '#1DC4A0', ic: 'eye'      },
  { id: 'forager',  name: 'Forager',  role: 'Account enrichment',        status: 'idle',    count: 0, color: '#D97757', ic: 'search'   },
  { id: 'sculptor', name: 'Sculptor', role: 'CRM hygiene',               status: 'working', count: 3, color: '#7A4EDB', ic: 'pen-tool' },
  { id: 'echo',     name: 'Echo',     role: 'Meeting notetaker',         status: 'idle',    count: 0, color: '#3F75DC', ic: 'mic'      },
];

// ─── Forecast ─────────────────────────────────────────────────────────────────
export const FORECAST: Forecast = {
  committed: 412000,
  bestCase:  716000,
  closed:    248000,
  quota:     900000,
  trend: [180, 210, 195, 240, 260, 280, 312, 348, 380, 412],
};

// ─── Omnibar suggestions ──────────────────────────────────────────────────────
export const SUGGESTIONS = [
  { type: 'query',  label: 'Accounts cooling off this week'              },
  { type: 'query',  label: 'Deals at risk of slipping the quarter'       },
  { type: 'query',  label: "Who hasn't replied to me in 7 days?"         },
  { type: 'query',  label: 'Pipeline by industry'                        },
  { type: 'action', label: 'Draft a follow-up for Acme Robotics'         },
  { type: 'action', label: 'Schedule a re-engage sequence for dormant accounts' },
  { type: 'action', label: 'Brief me on Kairo Health'                    },
];