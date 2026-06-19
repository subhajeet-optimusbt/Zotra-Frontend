import React from 'react';

const LOCAL_STYLES = `
.ca-esc-message-box{margin:0 16px 16px;padding:12px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:12px;font-size:12.5px;color:var(--ink3);line-height:1.6;font-style:italic}
.ca-esc-divider{border:none;border-top:0.5px solid var(--brd);margin:0}
`;

interface EscRule { num: string; name: string; sub: string; }

const TRIGGERS: EscRule[] = [
  { num: '01', name: 'Frustration signal',   sub: 'Escalate after 2 consecutive expressions of frustration.' },
  { num: '02', name: 'No progress',           sub: 'Escalate after 3 turns with no advancement.' },
  { num: '03', name: 'Legal / contractual',   sub: 'Always escalate — never handle autonomously.' },
  { num: '04', name: 'VIP accounts',          sub: 'Escalate immediately for accounts flagged as VIP.' },
];

const ROUTING: EscRule[] = [
  { num: 'A', name: 'Escalation routing', sub: 'Account lead first · Manager if unavailable · 15-min timeout.' },
  { num: 'B', name: 'Quiet hours',         sub: '10:00 PM – 8:00 AM · Queue for next morning.' },
];

export default function PanelEscalationRules() {
  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div className="ca-wrap">

        {/* Hero */}
        <div className="ca-hero">
          <div>
            <div className="ca-kicker">Human handoff</div>
            <div className="ca-title">Escalation rules</div>
            <div className="ca-desc">Define when the assistant should stop autonomous handling and transfer the conversation with context to your team.</div>
            <div className="ca-hero-actions">
              <button className="btn sm pri" style={{ fontFamily: 'inherit' }}>Save rules</button>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>Test handoff</button>
            </div>
          </div>
          <div className="ca-live-card">
            <div className="ca-live-top">
              <div className="ca-bot-ic">🔀</div>
              <div>
                <div className="ca-live-name">Context-first handoff</div>
                <div className="ca-live-sub">Summary · signals · next action</div>
              </div>
              <span className="ca-status ok" style={{ marginLeft: 'auto' }}>Enabled</span>
            </div>
            <div className="ca-preview-msg">When escalated, the team receives the full conversation summary and recommended next step.</div>
          </div>
        </div>

        {/* Two-column grid */}
        <div className="ca-grid">

          {/* Triggers */}
          <div className="ca-panel">
            <div className="ca-panel-head">
              <div className="ca-panel-icon">⚠</div>
              <div>
                <div className="ca-panel-title">Escalation triggers</div>
                <div className="ca-panel-sub">Situations where the assistant should involve a human.</div>
              </div>
            </div>
            <div className="ca-rule-list">
              {TRIGGERS.map(r => (
                <div key={r.num} className="ca-rule">
                  <div className="ca-rule-num">{r.num}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ca-rule-name">{r.name}</div>
                    <div className="ca-rule-sub">{r.sub}</div>
                  </div>
                  <button className="btn xs" style={{ fontFamily: 'inherit' }}>Edit</button>
                </div>
              ))}
            </div>
          </div>

          {/* Routing */}
          <div className="ca-panel">
            <div className="ca-panel-head">
              <div className="ca-panel-icon">👥</div>
              <div>
                <div className="ca-panel-title">Routing &amp; coverage</div>
                <div className="ca-panel-sub">Who receives the handoff and when.</div>
              </div>
            </div>
            <div className="ca-rule-list">
              {ROUTING.map(r => (
                <div key={r.num} className="ca-rule">
                  <div className="ca-rule-num">{r.num}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ca-rule-name">{r.name}</div>
                    <div className="ca-rule-sub">{r.sub}</div>
                  </div>
                  <button className="btn xs" style={{ fontFamily: 'inherit' }}>Edit</button>
                </div>
              ))}
            </div>

            {/* Handoff message sub-section */}
            <hr className="ca-esc-divider" />
            <div className="ca-panel-head" style={{ borderBottom: '0.5px solid var(--brd)' }}>
              <div className="ca-panel-icon">✉</div>
              <div>
                <div className="ca-panel-title">Customer handoff message</div>
                <div className="ca-panel-sub">Shown before transferring to the team.</div>
              </div>
              <div className="ca-panel-actions">
                <button className="btn xs" style={{ fontFamily: 'inherit' }}>Edit</button>
              </div>
            </div>
            <div className="ca-esc-message-box">
              "I'm connecting you with a member of our team who can help further. They'll be with you shortly — typically within a few minutes during business hours."
            </div>
          </div>

        </div>
      </div>
    </>
  );
}