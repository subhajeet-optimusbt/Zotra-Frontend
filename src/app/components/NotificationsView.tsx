import React from 'react';
import Icon from './Icon';

const NotificationsView: React.FC = () => {
  const groups = [
    { lbl: 'Today', items: [
      { ic: 'mail',           color: 'br', t: 'Sasha @ Northwind replied',          s: '"we\u2019re ready to sign Thursday \u2014 just need clause 4.2 sorted"', time: '23m', acc: 'Northwind Trading', dot: true },
      { ic: 'radar',          color: 'br', t: 'Acme Robotics is shopping',           s: '4 visitors hit /pricing and /security in the last 90 minutes.',         time: '6m',  acc: 'Acme Robotics',     dot: true },
      { ic: 'triangle-alert', color: 'wa', t: 'Kairo champion may be leaving',       s: 'Maya Chen flipped to "Open to opportunities" on LinkedIn.',              time: '41m', acc: 'Kairo Health',      dot: true },
    ]},
    { lbl: 'Earlier today', items: [
      { ic: 'sparkles',       color: 'amber', t: 'Forager finished enrichment',      s: 'Pebble Group · 14 stakeholders added, hierarchy mapped.',  time: '5h', acc: 'Pebble Group' },
      { ic: 'calendar',       color: 'br',    t: 'Demo with Rune Systems in 45 min', s: '3 attendees confirmed. Pre-brief notes ready.',            time: '1h', acc: 'Rune Systems' },
      { ic: 'triangle-alert', color: 'wa',    t: 'Voltic has gone quiet (14 days)',  s: 'Auto-close in 7 days unless re-engaged.',                 time: '2h', acc: 'Voltic Energy' },
    ]},
    { lbl: 'Yesterday', items: [
      { ic: 'trophy',    color: 'ok', t: 'Wisp Studios moved to Closing',     s: 'Forecast updated. $14K added to best case.',              time: 'yest', acc: 'Wisp Studios' },
      { ic: 'user-plus', color: 'br', t: 'Orbit hired a new CISO',            s: 'Daniel Yu (ex-Stripe). Security review may shift.',       time: 'yest', acc: 'Orbit Logistics' },
    ]},
  ];
  const colorMap: Record<string, string> = { br: 'var(--p)', wa: 'var(--wa)', ok: 'var(--ok)', amber: 'var(--amber)', ri: 'var(--ri)' };
  const bgMap: Record<string, string> = { br: 'var(--pp)', wa: 'var(--wab)', ok: 'var(--okb)', amber: 'var(--amberp)', ri: 'var(--rib)' };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
      <div style={{ padding: '16px 28px 14px', background: 'var(--bg2)', borderBottom: '0.5px solid var(--brd)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div className="sora fz22 fw6" >Notifications</div>
          <div className="t-ink4 fz12"  style={{ marginTop: 2 }}>3 new · 8 today</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className="btn sm" ><Icon name="check-check" size={12} /> Mark all read</button>
          <button className="btn sm" ><Icon name="sliders-horizontal" size={12} /> Preferences</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 28px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {groups.map((g, gi) => (
            <div key={gi} style={{ marginBottom: 22 }}>
              <div className="lbl"  style={{ marginBottom: 8 }}>{g.lbl}</div>
              {g.items.map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--bg2)', border: '0.5px solid var(--brd)', borderRadius: 12, marginBottom: 6, cursor: 'pointer' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: bgMap[n.color], color: colorMap[n.color], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={n.ic} size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span className="fz13 fw6 t-ink" >{n.t}</span>
                      {(n as any).dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'inline-block' }} />}
                      <span className="mono fz10 t-ink5"  style={{ marginLeft: 'auto' }}>{n.time}</span>
                    </div>
                    <div className="fz12 t-ink3"  style={{ lineHeight: 1.5 }}>{n.s}</div>
                    <div className="mono fz10 t-ink5"  style={{ marginTop: 4 }}>{n.acc}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
