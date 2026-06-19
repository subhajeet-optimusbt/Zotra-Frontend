export interface Account {
  id: string;
  name: string;
  domain: string;
  size: string;
  industry: string;
  stage: string;
  value: number;
  temp: number;
  heat: 'hot' | 'warm' | 'cool';
  owner: string;
  signals: number[];
  lastTouch: string;
  cycle: number;
  intent: string;
}

export interface Stage {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

export interface SignalType {
  ic: string;
  color: string;
  label: string;
}

export interface PulseItem {
  id: string;
  time: string;
  ts: number;
  type: string;
  account: string;
  title: string;
  detail: string;
  actor: string | null;
  actions?: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: string;
  count: number;
  color: string;
  ic: string;
}

export interface Forecast {
  committed: number;
  bestCase: number;
  closed: number;
  quota: number;
  trend: number[];
}

// ── Added: conversations | assistant | inventory ───────────────────────────
export type ViewType =
  | 'rhythm'
  | 'pulse'
  | 'accounts'
  | 'deals'
  | 'inbox'
  | 'journey'
  | 'projects'
  | 'finance'
  | 'renewal'
  | 'dashboard'
  | 'reports'
  | 'notifications'
  | 'settings'
  | 'profile'
  | 'automation'
  | 'onboarding'
  | 'conversations'
  | 'assistant'
  | 'inventory';

export type TenantAge = 'new' | 'week1' | 'month1' | 'month6' | 'established';

export type ColorScheme = 'default' | 'warm' | 'dark';

export interface Tweaks {
  theme: 'light' | 'dark';
  accent: string;
  density: 'compact' | 'comfortable';
  proactive: boolean;
  tenantAge: TenantAge;
  colorScheme: ColorScheme;
}