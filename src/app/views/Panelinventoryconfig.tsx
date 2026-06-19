import React from 'react';

const LOCAL_STYLES = `
.ca-inv-head{display:grid;grid-template-columns:1fr 120px 92px 84px;gap:10px;padding:8px 16px;background:var(--bg3);border-bottom:0.5px solid var(--brd);font-size:9.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5)}
.ca-inv-list{display:flex;flex-direction:column}
.ca-inv-row{display:grid;grid-template-columns:1fr 120px 92px 84px;gap:10px;align-items:center;padding:14px 16px;border-bottom:0.5px solid var(--brd);transition:background .1s}
.ca-inv-row:last-child{border-bottom:none}
.ca-inv-row:hover{background:var(--pu)}
.ca-inv-name{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:2px}
.ca-inv-sub{font-size:11.5px;color:var(--ink4)}
.ca-meter{height:4px;border-radius:2px;background:var(--bg3);overflow:hidden;width:100%}
.ca-meter-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--p),var(--pl));transition:width .3s}
.ca-message-box{margin:14px 16px 16px;padding:12px 13px;background:var(--bg3);border:0.5px solid var(--brd);border-radius:12px;font-size:12.5px;color:var(--ink3);line-height:1.6;font-style:italic}
`;

interface InvRow {
  name: string; sub: string; status: string; statusCls: string; demand: number;
}

const INV_ROWS: InvRow[] = [
  { name: 'Active vertical',     sub: 'Property — units, rent, amenities, availability', status: 'Active',   statusCls: 'ok',    demand: 88 },
  { name: 'Featured items',      sub: 'Unit 4B pinned first in all recommendations',     status: 'Featured', statusCls: 'phase', demand: 72 },
  { name: 'Hidden items',        sub: 'No items are currently hidden',                   status: 'None',     statusCls: 'muted', demand: 0  },
  { name: 'Demand signal logging', sub: 'Unmatched customer queries are logged for review', status: 'On',   statusCls: 'ok',    demand: 63 },
];

export default function PanelInventoryConfig() {
  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div className="ca-wrap">

        {/* Hero */}
        <div className="ca-hero">
          <div>
            <div className="ca-kicker">Inventory-aware answers</div>
            <div className="ca-title">Inventory config</div>
            <div className="ca-desc">Control which inventory the assistant can recommend and how unmatched demand is captured for your team.</div>
            <div className="ca-hero-actions">
              <button className="btn sm pri" style={{ fontFamily: 'inherit' }}>Manage inventory</button>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>Import CSV</button>
              <button className="btn sm" style={{ fontFamily: 'inherit' }}>Sync external system</button>
            </div>
          </div>
          <div className="ca-live-card">
            <div className="ca-live-top">
              <div className="ca-bot-ic">📦</div>
              <div>
                <div className="ca-live-name">Property inventory</div>
                <div className="ca-live-sub">Units · rent · amenities · availability</div>
              </div>
              <span className="ca-status ok" style={{ marginLeft: 'auto' }}>Synced</span>
            </div>
            <div className="ca-preview-msg">Featured units appear first. Hidden units are never shown in customer recommendations.</div>
          </div>
        </div>

        {/* Recommendation controls */}
        <div className="ca-panel">
          <div className="ca-panel-head">
            <div className="ca-panel-icon">📦</div>
            <div>
              <div className="ca-panel-title">Recommendation controls</div>
              <div className="ca-panel-sub">Simple rules for surfacing, hiding, and logging inventory-related demand.</div>
            </div>
          </div>
          <div className="ca-inv-head">
            <div>Setting</div>
            <div>Status</div>
            <div>Demand</div>
            <div></div>
          </div>
          <div className="ca-inv-list">
            {INV_ROWS.map((row, i) => (
              <div key={i} className="ca-inv-row">
                <div>
                  <div className="ca-inv-name">{row.name}</div>
                  <div className="ca-inv-sub">{row.sub}</div>
                </div>
                <div>
                  <span className={`ca-status ${row.statusCls}`}>{row.status}</span>
                </div>
                <div>
                  <div className="ca-meter">
                    <div className="ca-meter-fill" style={{ width: `${row.demand}%` }} />
                  </div>
                </div>
                <div>
                  <button className="btn xs" style={{ fontFamily: 'inherit' }}>
                    {i === 0 ? 'Change' : i === 3 ? 'View' : 'Edit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No-match response */}
        <div className="ca-panel">
          <div className="ca-panel-head">
            <div className="ca-panel-icon">💬</div>
            <div>
              <div className="ca-panel-title">No-match response</div>
              <div className="ca-panel-sub">Used when no available inventory fits the customer request.</div>
            </div>
            <div className="ca-panel-actions">
              <button className="btn xs" style={{ fontFamily: 'inherit' }}>Edit</button>
            </div>
          </div>
          <div className="ca-message-box">
            "We don't have an exact match right now — I can notify you when one becomes available."
          </div>
        </div>

      </div>
    </>
  );
}