import React, { useState } from 'react';
import Icon from '../components/Icon';
import { Sparkline } from '../components/Shared';
import { avBg, initials } from '../data';

// ── InboxView ──────────────────────────────────────────────────
const threads = [
  { id: 't1', from: 'Sasha Krieger', acc: 'Northwind Trading', preview: 'we\u2019re ready to sign Thursday — just need clause 4.2 sorted', time: '23m', unread: true, hot: true, av: 'SK' },
  { id: 't2', from: 'Daniel Yu', acc: 'Orbit Logistics', preview: 'New CISO here. Want to revisit security review with my team?', time: '2h', unread: true, av: 'DY' },
  { id: 't3', from: 'Maya Chen', acc: 'Kairo Health', preview: 'I\u2019ll loop in Priya — she owns this now.', time: '4h', unread: true, hot: true, av: 'MC' },
  { id: 't4', from: 'Zotra', acc: 'Acme Robotics', preview: 'Draft #2 ready — used a warmer tone. Want to send?', time: '6h', unread: true, agent: true, av: 'ZO' },
  { id: 't5', from: 'Lucas Reed', acc: 'Rune Systems', preview: 'See you at 12:30. Bringing our infra lead.', time: '1d', av: 'LR' },
  { id: 't6', from: 'Zotra', acc: 'Voltic Energy', preview: 'No reply yet on the ROI calculator. Try a different angle?', time: '1d', agent: true, av: 'ZO' },
  { id: 't7', from: 'Forager', acc: 'Pebble Group', preview: 'Enrichment complete. 14 new stakeholders, hierarchy mapped.', time: '2d', agent: true, av: 'FO' },
];

export const InboxView: React.FC = () => {
  const [sel, setSel] = useState('t1');
  const cur = threads.find(t => t.id === sel) || threads[0];

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, background: 'var(--bg)' }}>
      <div style={{ width: 360, flexShrink: 0, background: 'var(--bg2)', borderRight: '0.5px solid var(--brd)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px 12px', borderBottom: '0.5px solid var(--brd)' }}>
          <div className="sora"  style={{ fontSize: 18, fontWeight: 600 }}>Inbox</div>
          <div className="mono"  style={{ fontSize: 11, color: 'var(--ink4)', marginTop: 3 }}>4 unread · 7 threads</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {threads.map(t => (
            <div
              key={t.id}
              onClick={() => setSel(t.id)}
              style={{
                padding: '11px 18px', borderBottom: '0.5px solid var(--brd)', cursor: 'pointer',
                background: sel === t.id ? 'var(--pu)' : 'transparent',
                borderLeft: sel === t.id ? '2px solid var(--p)' : '2px solid transparent',
                display: 'flex', gap: 11, alignItems: 'flex-start',
              }}
            >
              <span className={'av ' + avBg(t.from)} style={{ width: 32, height: 32, borderRadius: 9, fontSize: 11 }}>{t.av}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                  <span style={{ fontSize: 12.5, fontWeight: (t as any).unread ? 600 : 500, color: 'var(--ink)' }}>{t.from}</span>
                  {(t as any).agent && <span className="tag amber" >AI</span>}
                  {(t as any).hot && <span style={{ background: '#E5566C', width: 5, height: 5, borderRadius: '50%', display: 'inline-block' }}></span>}
                  <span style={{ marginLeft: 'auto', fontFamily: 'DM Mono,monospace', fontSize: 10, color: 'var(--ink5)' }}>{t.time}</span>
                </div>
                <div className="mono"  style={{ fontSize: 10, color: 'var(--ink4)', marginBottom: 4 }}>{t.acc}</div>
                <div style={{ fontSize: 11.5, color: (t as any).unread ? 'var(--ink2)' : 'var(--ink4)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{t.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '16px 22px 14px', borderBottom: '0.5px solid var(--brd)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className={'av ' + avBg(cur.from)} style={{ width: 38, height: 38, borderRadius: 10, fontSize: 13 }}>{cur.av}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sora"  style={{ fontSize: 16, fontWeight: 600 }}>{cur.from} · {cur.acc}</div>
            <div className="mono"  style={{ fontSize: 11, color: 'var(--ink4)' }}>Thread · 4 messages</div>
          </div>
          <button className="btn sm" ><Icon name="sparkles" size={12} /> Draft reply</button>
          <button className="btn sm" ><Icon name="calendar" size={12} /> Schedule</button>
          <button className="ic-btn sm" ><Icon name="archive" size={13} /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ padding: '14px 16px', background: 'var(--bg2)', border: '0.5px solid var(--brd)', borderRadius: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className={'av ' + avBg(cur.from)} style={{ width: 24, height: 24, borderRadius: 7, fontSize: 9 }}>{cur.av}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{cur.from}</span>
                <span className="mono"  style={{ fontSize: 10, color: 'var(--ink5)' }}>Today, 10:18</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65 }}>
                Hey Elena — quick one. We talked it over and we're ready to sign Thursday. Last thing: clause 4.2 (auto-renewal) — can we strike the auto-renew or at least make it 30-day notice? Everything else looks good.<br /><br />— Sasha
              </div>
            </div>
            <div style={{ padding: '14px 16px', background: 'linear-gradient(180deg,var(--pu) 0%,var(--bg2) 90%)', border: '0.5px solid var(--brd2)', borderRadius: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 7, background: 'var(--pg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="sparkles" size={12} color="#fff" /></span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Zotra — suggested reply</span>
                <span className="mono"  style={{ fontSize: 10, color: 'var(--ink5)' }}>draft · matched your tone</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65 }}>
                Sasha — great. We can do 30-day notice on auto-renewal. I'll send the revised redline tonight so we're good for Thursday. Want me to book a 10-min walk-through Thursday AM before signature?<br /><br />— Elena
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                <button className="btn sm pri" ><Icon name="send" size={12} /> Send</button>
                <button className="btn sm" ><Icon name="edit-3" size={12} /> Edit</button>
                <button className="btn sm" ><Icon name="rotate-cw" size={12} /> Try another tone</button>
                <button className="btn sm ghost" ><Icon name="x" size={12} /> Dismiss</button>
              </div>
            </div>
            <div style={{ padding: '11px 14px', background: 'var(--bg2)', border: '0.5px dashed var(--brd2)', borderRadius: 12, textAlign: 'center', color: 'var(--ink4)', fontSize: 12 }}>
              Earlier messages · <span style={{ color: 'var(--p)', cursor: 'pointer' }}>show 2 more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── NotificationsView ──────────────────────────────────────────────────
const notifGroups = [
  {
    lbl: 'Today',
    items: [
      { ic: 'mail',           color: 'br', t: 'Sasha @ Northwind replied',         s: '"we\u2019re ready to sign Thursday — just need clause 4.2 sorted"', time: '23m', acc: 'Northwind Trading', dot: true },
      { ic: 'radar',          color: 'br', t: 'Acme Robotics is shopping',          s: '4 visitors hit /pricing and /security in the last 90 minutes.', time: '6m',  acc: 'Acme Robotics',     dot: true },
      { ic: 'triangle-alert', color: 'wa', t: 'Kairo champion may be leaving',      s: 'Maya Chen flipped to "Open to opportunities" on LinkedIn.', time: '41m', acc: 'Kairo Health',      dot: true },
    ],
  },
  {
    lbl: 'Earlier today',
    items: [
      { ic: 'sparkles',       color: 'amber', t: 'Forager finished enrichment',     s: 'Pebble Group · 14 stakeholders added, hierarchy mapped.', time: '5h',  acc: 'Pebble Group' },
      { ic: 'calendar',       color: 'br', t: 'Demo with Rune Systems in 45 min',   s: '3 attendees confirmed. Pre-brief notes ready.',           time: '1h',  acc: 'Rune Systems' },
      { ic: 'triangle-alert', color: 'wa', t: 'Voltic has gone quiet (14 days)',     s: 'Auto-close in 7 days unless re-engaged.',                time: '2h',  acc: 'Voltic Energy' },
    ],
  },
  {
    lbl: 'Yesterday',
    items: [
      { ic: 'trophy',    color: 'ok', t: 'Wisp Studios moved to Closing',   s: 'Forecast updated. $14K added to best case.',              time: 'yest', acc: 'Wisp Studios' },
      { ic: 'user-plus', color: 'br', t: 'Orbit hired a new CISO',          s: 'Daniel Yu (ex-Stripe). Security review may shift.',       time: 'yest', acc: 'Orbit Logistics' },
    ],
  },
];

const colorMap: Record<string, string> = { br: 'var(--p)', wa: 'var(--wa)', ok: 'var(--ok)', amber: 'var(--amber)', ri: 'var(--ri)' };
const bgMap: Record<string, string>    = { br: 'var(--pp)', wa: 'var(--wab)', ok: 'var(--okb)', amber: 'var(--amberp)', ri: 'var(--rib)' };

export const NotificationsView: React.FC = () => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
    <div style={{ padding: '16px 28px 14px', background: 'var(--bg2)', borderBottom: '0.5px solid var(--brd)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div>
        <div className="sora"  style={{ fontSize: 19, fontWeight: 600 }}>Notifications</div>
        <div style={{ color: 'var(--ink4)', fontSize: 12, marginTop: 2 }}>3 new · 8 today</div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
        <button className="btn sm" ><Icon name="check-check" size={12} /> Mark all read</button>
        <button className="btn sm" ><Icon name="sliders-horizontal" size={12} /> Preferences</button>
      </div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 28px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {notifGroups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 22 }}>
            <div className="lbl"  style={{ marginBottom: 8 }}>{g.lbl}</div>
            {g.items.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--bg2)', border: '0.5px solid var(--brd)', borderRadius: 12, marginBottom: 6, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: bgMap[n.color], color: colorMap[n.color], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={n.ic} size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{n.t}</span>
                    {(n as any).dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'inline-block' }} />}
                    <span className="mono"  style={{ fontSize: 10, color: 'var(--ink5)', marginLeft: 'auto' }}>{n.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5 }}>{n.s}</div>
                  <div className="mono"  style={{ fontSize: 10, color: 'var(--ink5)', marginTop: 4 }}>{n.acc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── SimpleView ──────────────────────────────────────────────────
interface SimpleViewProps { title: string; icon: string; blurb: string; sub?: string; }
export const SimpleView: React.FC<SimpleViewProps> = ({ title, icon, blurb, sub }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
    <div style={{ padding: '18px 24px 14px', background: 'var(--bg2)', borderBottom: '0.5px solid var(--brd)' }}>
      <div className="sora"  style={{ fontSize: 22, fontWeight: 600 }}>{title}</div>
      {sub && <div style={{ color: 'var(--ink4)', fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 28, border: '0.5px dashed var(--brd2)', borderRadius: 16, background: 'var(--bg2)' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--pp)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p)', marginBottom: 10 }}>
          <Icon name={icon} size={22} />
        </div>
        <div className="sora"  style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
        <div style={{ color: 'var(--ink4)', fontSize: 12, marginTop: 6, lineHeight: 1.6 }}>{blurb}</div>
      </div>
    </div>
  </div>
);