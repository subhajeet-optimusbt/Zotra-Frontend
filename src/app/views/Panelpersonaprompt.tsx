import React, { useState } from 'react';

const STYLES = `
.ca-wrap{display:flex;flex-direction:column;gap:16px;max-width:1100px}
.ca-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--bg2) 0%,var(--pu) 100%);border:0.5px solid var(--brd);border-radius:18px;box-shadow:0 1px 4px rgba(40,40,80,.07);padding:18px;display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:stretch}
.ca-hero::after{content:"";position:absolute;right:-70px;top:-90px;width:220px;height:220px;border-radius:50%;background:var(--pp);opacity:.75;pointer-events:none}
.ca-kicker{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--p);margin-bottom:5px}
.ca-title{font-family:"Sora",sans-serif;font-size:22px;font-weight:700;color:var(--ink);letter-spacing:-.03em;margin-bottom:4px}
.ca-desc{font-size:12.5px;color:var(--ink3);line-height:1.55;margin-bottom:2px}
.ca-hero-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.ca-live-card{position:relative;z-index:1;background:rgba(255,255,255,.62);border:0.5px solid var(--brd2);border-radius:16px;padding:12px;box-shadow:0 1px 6px rgba(40,40,80,.07)}
[data-theme="dark"] .ca-live-card{background:rgba(20,20,32,.62)}
.ca-live-top{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.ca-bot-ic{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--p),var(--pl));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.ca-live-name{font-family:"Sora",sans-serif;font-size:13px;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.ca-live-sub{font-size:11px;color:var(--ink4);margin-top:1px}
.ca-status{font-size:10px;padding:2px 8px;border-radius:20px;font-weight:600;white-space:nowrap}
.ca-status.ok{background:var(--okb);color:var(--okf)}
.ca-status.muted{background:var(--bg3);color:var(--ink4);border:0.5px solid var(--brd2)}
.ca-status.phase{background:var(--wab);color:var(--waf)}
.ca-preview-msg{font-size:12.5px;color:var(--ink3);line-height:1.5;padding:9px 10px;background:var(--bg3);border-radius:9px;border:0.5px solid var(--brd)}
.ca-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:14px}
.ca-panel{background:var(--bg2);border:0.5px solid var(--brd);border-radius:16px;box-shadow:0 1px 3px rgba(40,40,80,.05);overflow:hidden}
.ca-panel-head{padding:14px 16px;border-bottom:0.5px solid var(--brd);display:flex;align-items:flex-start;gap:10px}
.ca-panel-icon{width:31px;height:31px;border-radius:10px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:15px}
.ca-panel-title{font-family:"Sora",sans-serif;font-size:13.5px;font-weight:650;color:var(--ink);letter-spacing:-.015em}
.ca-panel-sub{font-size:11.5px;color:var(--ink4);margin-top:2px;line-height:1.45}
.ca-panel-actions{margin-left:auto;display:flex;gap:6px}
.ca-form{padding:14px 16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.ca-field{min-width:0}
.ca-field.full{grid-column:1/-1}
.ca-label{font-size:11px;font-weight:600;color:var(--ink4);margin-bottom:5px;letter-spacing:.02em}
.ca-input,.ca-select,.ca-textarea{width:100%;border:0.5px solid var(--brd2);background:var(--bg3);color:var(--ink);border-radius:9px;font-family:"DM Sans",sans-serif;font-size:12.5px;outline:none;transition:border-color .12s,background .12s;box-sizing:border-box}
.ca-input,.ca-select{height:34px;padding:0 10px}
.ca-textarea{min-height:158px;padding:11px 12px;line-height:1.65;font-family:"DM Mono",monospace;font-size:11.5px;resize:vertical}
.ca-input:focus,.ca-select:focus,.ca-textarea:focus{border-color:var(--p);background:var(--bg2);box-shadow:0 0 0 2.5px rgba(75,72,200,.09)}
.ca-chip-row{display:flex;gap:6px;flex-wrap:wrap}
.ca-chip{font-size:11px;padding:4px 9px;border-radius:999px;background:var(--pp);color:var(--p);border:0.5px solid var(--brd2);font-weight:600}
.ca-rule-list{display:flex;flex-direction:column}
.ca-rule{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:0.5px solid var(--brd)}
.ca-rule:last-child{border-bottom:none}
.ca-rule:hover{background:var(--pu)}
.ca-rule-num{width:27px;height:27px;border-radius:9px;background:var(--pp);color:var(--p);display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:11px;font-weight:700;flex-shrink:0}
.ca-rule-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-rule-sub{font-size:11.5px;color:var(--ink4)}
@media(max-width:1100px){.ca-hero,.ca-grid{grid-template-columns:1fr}.ca-live-card{max-width:460px}.ca-form{grid-template-columns:1fr}}
`;

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="sv-tg" style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: 'none' }} />
      <div style={{ width: 36, height: 20, borderRadius: 20, background: checked ? 'var(--p)' : 'var(--ink6)', transition: 'background .2s', position: 'relative', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', top: 3, left: checked ? 19 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.18)' }} />
      </div>
    </label>
  );
}

export default function PanelPersonaPrompt() {
  const [name, setName]         = useState('Vak');
  const [greeting, setGreeting] = useState("Hi! I'm Vak, your Hartwell Residences assistant 👋");
  const [tone, _setTone]        = useState(['Warm', 'Friendly', 'Professional']);
  const [rule1, setRule1]       = useState(true);
  const [rule2, setRule2]       = useState(true);
  const [rule3, setRule3]       = useState(true);
  const [prompt, setPrompt]     = useState(
`You are Vak, a leasing assistant for Hartwell Residences.

You help prospective residents find the perfect apartment. You have access to live inventory data including unit types, pricing, availability, amenities, and parking.

Your job:
1. Understand what the customer is looking for
2. Ask one clarifying question at a time — never overwhelm
3. Match them to available inventory and present options clearly
4. Guide them toward booking a viewing
5. Capture name, email, and preferred viewing slot to confirm

Always be warm, concise, and professional. End every response with a clear next step.`
  );

  return (
    <>
      <style>{STYLES}</style>
      <div className="ca-wrap">

        {/* Hero */}
        <div className="ca-hero">
          <div>
            <div className="ca-kicker">Conversation Assistant</div>
            <div className="ca-title">Persona & prompt</div>
            <div className="ca-desc">Configure how the customer-facing live chat introduces itself, responds, and guides customers toward the next commercial step.</div>
            <div className="ca-hero-actions">
              <button className="btn sm pri" style={{ fontFamily: 'inherit' }}>Save changes</button>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>Preview assistant</button>
              <button className="btn sm ghost" style={{ fontFamily: 'inherit' }}>Reset</button>
            </div>
          </div>
          <div className="ca-live-card">
            <div className="ca-live-top">
              <div className="ca-bot-ic">🤖</div>
              <div>
                <div className="ca-live-name">{name || 'Vak'}</div>
                <div className="ca-live-sub">Hartwell Residences · Active on website</div>
              </div>
              <span className="ca-status ok" style={{ marginLeft: 'auto' }}>Live</span>
            </div>
            <div className="ca-preview-msg">{greeting}</div>
          </div>
        </div>

        {/* Grid: Identity + Behavior */}
        <div className="ca-grid">
          {/* Assistant identity */}
          <div className="ca-panel">
            <div className="ca-panel-head">
              <div className="ca-panel-icon">✦</div>
              <div>
                <div className="ca-panel-title">Assistant identity</div>
                <div className="ca-panel-sub">Basic personality and response behavior shown to customers.</div>
              </div>
            </div>
            <div className="ca-form">
              <div className="ca-field">
                <div className="ca-label">Assistant name</div>
                <input className="ca-input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="ca-field">
                <div className="ca-label">Language</div>
                <select className="ca-select">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>English + Hindi</option>
                </select>
              </div>
              <div className="ca-field full">
                <div className="ca-label">Greeting message</div>
                <input className="ca-input" value={greeting} onChange={e => setGreeting(e.target.value)} />
              </div>
              <div className="ca-field">
                <div className="ca-label">Tone</div>
                <div className="ca-chip-row">
                  {tone.map(t => <span key={t} className="ca-chip">{t}</span>)}
                </div>
              </div>
              <div className="ca-field">
                <div className="ca-label">Response length</div>
                <select className="ca-select">
                  <option>Concise — 2 to 4 sentences</option>
                  <option>Short — 1 to 2 sentences</option>
                  <option>Detailed when needed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conversation behavior */}
          <div className="ca-panel">
            <div className="ca-panel-head">
              <div className="ca-panel-icon">⚙</div>
              <div>
                <div className="ca-panel-title">Conversation behavior</div>
                <div className="ca-panel-sub">Guardrails for how the assistant leads the conversation.</div>
              </div>
            </div>
            <div className="ca-rule-list">
              {[
                { num: '1', name: 'Ask one question at a time', sub: 'Avoid long forms and keep the chat natural.', val: rule1, set: setRule1 },
                { num: '2', name: 'Guide to a clear next step',  sub: 'Viewing, callback, application, or team handoff.', val: rule2, set: setRule2 },
                { num: '3', name: 'Use only approved inventory', sub: 'Never recommend hidden or unavailable items.', val: rule3, set: setRule3 },
              ].map(r => (
                <div key={r.num} className="ca-rule">
                  <div className="ca-rule-num">{r.num}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ca-rule-name">{r.name}</div>
                    <div className="ca-rule-sub">{r.sub}</div>
                  </div>
                  <Toggle checked={r.val} onChange={r.set} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System prompt */}
        <div className="ca-panel">
          <div className="ca-panel-head">
            <div className="ca-panel-icon">⌘</div>
            <div>
              <div className="ca-panel-title">System prompt</div>
              <div className="ca-panel-sub">Instruction set that shapes every customer conversation.</div>
            </div>
            <div className="ca-panel-actions">
              <button className="btn xs" style={{ fontFamily: 'inherit' }}>Version history</button>
              <button className="btn xs pri" style={{ fontFamily: 'inherit' }}>Edit prompt</button>
            </div>
          </div>
          <div className="ca-form" style={{ gridTemplateColumns: '1fr' }}>
            <div className="ca-field full">
              <textarea className="ca-textarea" value={prompt} onChange={e => setPrompt(e.target.value)} style={{ minHeight: 180 }} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}