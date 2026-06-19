import React from 'react';

// Re-uses .ca-* styles from PanelPersonaPrompt (injected via SettingsView STYLES)
const LOCAL_STYLES = `
.ca-channel-list{display:flex;flex-direction:column}
.ca-channel{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:0.5px solid var(--brd);transition:background .1s}
.ca-channel:last-child{border-bottom:none}
.ca-channel:hover{background:var(--pu)}
.ca-channel.active .ca-ch-ic{background:var(--pp);color:var(--p);border-color:var(--brd2)}
.ca-channel.muted{opacity:.65}
.ca-ch-ic{width:39px;height:39px;border-radius:12px;background:var(--bg3);border:0.5px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.ca-ch-name{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-ch-sub{font-size:11.5px;color:var(--ink4);margin-bottom:4px;line-height:1.4}
.ca-ch-code{font-family:"DM Mono",monospace;font-size:10.5px;color:var(--ink5);background:var(--bg3);border:0.5px solid var(--brd);border-radius:5px;padding:3px 7px;display:inline-block;margin-top:2px;word-break:break-all}
.ca-ch-right{margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0}
`;

interface Channel {
  ic: string; name: string; sub: string; code?: string;
  status: 'active' | 'not-installed' | 'phase2';
  active?: boolean; muted?: boolean;
}

const CHANNELS: Channel[] = [
  { ic: '🌐', name: 'Website live chat', sub: 'Embed script installed · chat.hartwellresidences.com', code: '<script src="https://cdn.zotra.io/widget.js" data-key="hw_live_001"></script>', status: 'active', active: true },
  { ic: '📱', name: 'Mobile app',         sub: 'iOS + Android SDK with native view embed and push notification support.', status: 'not-installed' },
  { ic: '💬', name: 'WhatsApp',           sub: 'Requires Meta Business API credentials. Async conversations with full context continuity.', status: 'phase2', muted: true },
  { ic: '📲', name: 'SMS',                sub: 'Requires Twilio credentials. Numbered option lists replace quick replies in SMS context.', status: 'phase2', muted: true },
];

const STATUS_MAP = {
  'active':        { label: 'Active',        cls: 'ok' },
  'not-installed': { label: 'Not installed', cls: 'muted' },
  'phase2':        { label: 'Phase 2',       cls: 'phase' },
};

export default function PanelChannels() {
  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div className="ca-wrap">

        {/* Hero */}
        <div className="ca-hero">
          <div>
            <div className="ca-kicker">Install points</div>
            <div className="ca-title">Channels</div>
            <div className="ca-desc">Choose where customers can start conversations. Each channel keeps the same assistant memory, inventory awareness, and handoff rules.</div>
            <div className="ca-hero-actions">
              <button className="btn sm pri" style={{ fontFamily: 'inherit' }}>Add channel</button>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>Copy install guide</button>
            </div>
          </div>
          <div className="ca-live-card">
            <div className="ca-live-top">
              <div className="ca-bot-ic">🌐</div>
              <div>
                <div className="ca-live-name">Website live chat</div>
                <div className="ca-live-sub">Primary channel</div>
              </div>
              <span className="ca-status ok" style={{ marginLeft: 'auto' }}>Active</span>
            </div>
            <div className="ca-preview-msg">The website widget is installed and receiving conversations from prospective residents.</div>
          </div>
        </div>

        {/* Connected channels */}
        <div className="ca-panel">
          <div className="ca-panel-head">
            <div className="ca-panel-icon">📡</div>
            <div>
              <div className="ca-panel-title">Connected channels</div>
              <div className="ca-panel-sub">Customers reach you through these channels; your team reviews routed conversations inside Zotra.</div>
            </div>
          </div>
          <div className="ca-channel-list">
            {CHANNELS.map((ch, i) => {
              const sm = STATUS_MAP[ch.status];
              return (
                <div key={i} className={`ca-channel${ch.active ? ' active' : ''}${ch.muted ? ' muted' : ''}`}>
                  <div className="ca-ch-ic">{ch.ic}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ca-ch-name">{ch.name}</div>
                    <div className="ca-ch-sub">{ch.sub}</div>
                    {ch.code && <div className="ca-ch-code">{ch.code}</div>}
                  </div>
                  <div className="ca-ch-right">
                    <span className={`ca-status ${sm.cls}`}>{sm.label}</span>
                    {ch.status === 'active' && (
                      <button className="btn xs" style={{ fontFamily: 'inherit' }}>Configure</button>
                    )}
                    {ch.status === 'not-installed' && (
                      <button className="btn xs pri" style={{ fontFamily: 'inherit' }}>Install</button>
                    )}
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