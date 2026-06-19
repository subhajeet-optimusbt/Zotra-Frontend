import React, { useState } from 'react';

const LOCAL_STYLES = `
.rs-table{width:100%;border-collapse:collapse}
.rs-table th{text-align:left;padding:9px 16px;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ink5);border-bottom:0.5px solid var(--brd);background:var(--bg3)}
.rs-table td{padding:12px 16px;border-bottom:0.5px solid var(--brd);font-size:12.5px;color:var(--ink2);vertical-align:middle}
.rs-table tr:last-child td{border-bottom:none}
.rs-table tr:hover td{background:var(--pu)}
.rs-stage-num{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink5);font-weight:600}
.rs-badge{font-size:10.5px;padding:2px 10px;border-radius:20px;font-weight:600;white-space:nowrap}
.rs-swatch{width:20px;height:20px;border-radius:5px;border:0.5px solid var(--brd)}
.rs-rule{font-size:11.5px;color:var(--ink4)}
.rs-section-desc{padding:0 18px 14px;font-size:12.5px;color:var(--ink4);line-height:1.55}
`;

interface Stage {
  num: number; key: string; label: string;
  color: string; badgeBg: string; badgeColor: string;
  rule: string;
}

const STAGES: Stage[] = [
  { num: 1, key: 'prospect',  label: 'Prospect',  color: '#B4B2A9', badgeBg: 'var(--bg3)',   badgeColor: '#B4B2A9', rule: 'Manual only' },
  { num: 2, key: 'trust',     label: 'Trust',     color: '#4B48C8', badgeBg: 'var(--pp)',    badgeColor: '#4B48C8', rule: 'Signal-triggered' },
  { num: 3, key: 'service',   label: 'Service',   color: '#1DC4A0', badgeBg: 'var(--tp)',    badgeColor: '#1DC4A0', rule: 'Signal-triggered' },
  { num: 4, key: 'success',   label: 'Success',   color: '#1F8A5B', badgeBg: '#E6FAF1',      badgeColor: '#1F8A5B', rule: 'Manual + signal' },
  { num: 5, key: 'expansion', label: 'Expansion', color: '#D97757', badgeBg: 'var(--amberp)',badgeColor: '#D97757', rule: 'Signal-triggered' },
  { num: 6, key: 'advocacy',  label: 'Advocacy',  color: '#7A4EDB', badgeBg: '#F3EEFF',      badgeColor: '#7A4EDB', rule: 'Manual only' },
];

export default function PanelRelationshipStages() {
  const [stages, setStages] = useState(STAGES);

  return (
    <>
      <style>{LOCAL_STYLES}</style>
      <div className="sv-card">
        <div className="sv-card-hdr">
          <div className="sv-card-icon">🔗</div>
          <div>
            <div className="sv-card-title">Relationship stages</div>
          </div>
        </div>
        <div className="rs-section-desc">
          The six stages shown on every account page. Rename to match your terminology and set transition rules. Stages cannot be reordered or deleted — only renamed and recoloured.
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="rs-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Your label</th>
                <th>Colour</th>
                <th>Transition rule</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stages.map(s => (
                <tr key={s.key}>
                  <td><span className="rs-stage-num">{s.num}</span></td>
                  <td>
                    <span className="rs-badge" style={{ background: s.badgeBg, color: s.badgeColor }}>
                      {s.label}
                    </span>
                  </td>
                  <td>
                    <div className="rs-swatch" style={{ background: s.color }} />
                  </td>
                  <td><span className="rs-rule">{s.rule}</span></td>
                  <td>
                    <button className="btn xs" style={{ fontFamily: 'inherit' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}