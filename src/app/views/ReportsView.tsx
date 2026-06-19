import React, { useState } from 'react';
import Icon from '../components/Icon';

interface ReportsViewProps {
  setView?: (view: string) => void;
}

const STYLES = `
.rv-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg3)}
.rv-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:20px 24px 32px;display:flex;flex-direction:column;gap:14px;background:var(--bg3)}
.rv-card{background:var(--bg2);border:0.5px solid var(--brd);border-radius:14px;box-shadow:var(--sh-s);overflow:hidden}
.rv-card-h{padding:11px 15px;border-bottom:0.5px solid var(--brd);display:flex;align-items:center;gap:8px;color:var(--ink4)}
.rv-card-t{font-size:12.5px;font-weight:600;color:var(--ink);font-family:"Sora",sans-serif;letter-spacing:-0.01em;flex:1}
.rv-card-act{margin-left:auto;display:flex;align-items:center;gap:6px}
.rv-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.rv-grid{display:grid;grid-template-columns:1.35fr .9fr;gap:12px}
.rv-bars{display:flex;align-items:flex-end;gap:10px;height:152px;padding:14px 8px 4px}
.rv-bar{flex:1;min-width:26px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--p),var(--pl));position:relative;box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}
.rv-bar span{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--ink5);font-family:"DM Mono",monospace}
.rv-bar b{position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--ink4);font-family:"DM Mono",monospace;font-weight:500}
.rv-chip-row{display:flex;gap:6px;flex-wrap:wrap}
.rv-mini{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:.5px solid var(--brd)}
.rv-mini:last-child{border-bottom:none}
.rv-mini-ic{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rv-row-main{font-size:12.5px;font-weight:500;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rv-row-sub{font-size:11px;color:var(--ink4);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rv-progress{height:5px;background:var(--bg3);border-radius:4px;overflow:hidden;width:92px}
.rv-progress-fill{height:100%;border-radius:4px}
.rv-table-wrap{overflow-x:auto}
@media(max-width:1050px){
  .rv-grid{grid-template-columns:1fr}
  .rv-kpi-row{grid-template-columns:repeat(2,1fr)}
}
`;

const ReportsView = ({ setView }: ReportsViewProps) => {
  const [range, setRange] = useState('Month');
  const [report, setReport] = useState('Executive');

  React.useEffect(() => {
    const id = 'rv-styles';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  const revenue = [12.8, 14.2, 13.7, 16.4, 17.1, 18.3];
  const months  = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const saved = [
    ['Executive portfolio brief',   'Client health, revenue, risk and next actions',        'Ready',        'ok', 'bar-chart-3'],
    ['Renewal risk report',          'Upcoming renewals, probability and intervention plan', 'Needs review', 'wa', 'refresh-cw'],
    ['Financial aging report',       'Outstanding invoices, overdue amount and margin watch','Ready',        'ok', 'receipt'],
    ['Project health report',        'Delivery health, scope drift and effort variance',     'Draft',        'br', 'kanban-square'],
  ];

  const accounts = [
    ['Hartwell Orthodontics',   '$5,500', '88', 'High',   'Expansion + renewal bundle',      'ok'],
    ['Acme Dental Group',       '$4,000', '82', 'High',   'Website redesign opportunity',    'ok'],
    ['Metro Physiotherapy',     '$3,000', '56', 'Medium', 'Scope drift + invoice watch',     'wa'],
    ['Northside Dental',        '$4,000', '22', 'Low',    'Delivery risk + overdue invoice', 'ri'],
    ['Clearview Physiotherapy', '$1,800', '40', 'New',    'Trust-building onboarding phase', 'br'],
  ];

  const insights = [
    ['Revenue concentration', 'Top 2 clients represent 52% of MRR. Expansion upside is healthy, but renewal concentration should be monitored.', 'wa', 'pie-chart'],
    ['Risk compression',      'Northside has combined delivery, financial and renewal risk. One principal-level intervention is recommended this week.', 'ri', 'triangle-alert'],
    ['Expansion timing',      'Hartwell and Acme show warm expansion signals. Bundle proposals with renewal/project proof points.', 'ok', 'sparkles'],
  ];

  const scoreColor = (v: number) =>
    v > 75 ? 'var(--ok)' : v > 55 ? 'var(--p)' : v > 35 ? 'var(--wa)' : 'var(--ri)';

  const miniIcStyle = (tone: string) => ({
    background: tone === 'ok' ? 'var(--okb)' : tone === 'wa' ? 'var(--wab)' : tone === 'ri' ? 'var(--rib)' : 'var(--pp)',
    color:      tone === 'ok' ? 'var(--okf)' : tone === 'wa' ? 'var(--waf)' : tone === 'ri' ? 'var(--rif)' : 'var(--p)',
  });

  return (
    <div className="rv-wrap" >

      {/* White header — matches Notifications / Dashboard style */}
      <div style={{
        background: 'var(--bg2)',
        borderBottom: '.5px solid var(--brd)',
        padding: '18px 24px 16px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-.03em', lineHeight: 1.2 }}>
            Reports
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink4)', marginTop: 3, fontWeight: 400 }}>
            Portfolio analytics, client health, renewals, aging and export-ready executive summaries
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <select
            className="btn" 
            value={range}
            onChange={e => setRange(e.target.value)}
            style={{ height: 30, minWidth: 90, paddingRight: 8 }}
          >
            <option>Week</option>
            <option>Month</option>
            <option>Quarter</option>
            <option>Year</option>
          </select>
          <button className="btn" ><Icon name="download" size={13} /> Export</button>
          <button className="btn pri" ><Icon name="sparkles" size={13} /> Generate brief</button>
        </div>
      </div>

      {/* Scrollable grey body */}
      <div className="rv-body" >

        {/* KPI row */}
        <div className="rv-kpi-row" >
          <div className="metric" >
            <div className="metric-l" >MRR</div>
            <div className="metric-v"  style={{ color: 'var(--p)' }}>$18.3k</div>
            <div className="metric-s" >↑ 8.9% vs last month</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >Weighted Pipeline</div>
            <div className="metric-v" >$92k</div>
            <div className="metric-s" >3 active expansion paths</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >At-Risk Revenue</div>
            <div className="metric-v"  style={{ color: 'var(--ri)' }}>$4.0k</div>
            <div className="metric-s" >Northside intervention needed</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >Renewal Coverage</div>
            <div className="metric-v"  style={{ color: 'var(--ok)' }}>73%</div>
            <div className="metric-s" >2 high · 1 medium · 1 low</div>
          </div>
        </div>

        {/* Revenue chart + AI insights */}
        <div className="rv-grid" >

          {/* Revenue trend */}
          <div className="rv-card" >
            <div className="rv-card-h" >
              <Icon name="line-chart" size={13} />
              <div className="rv-card-t" >Revenue trend</div>
              <div className="rv-card-act" >
                <div className="rv-chip-row" >
                  {['Executive', 'Revenue', 'Risk'].map(x => (
                    <button
                      key={x}
                      className={'btn xs ' + (report === x ? 'pri' : '')}
                      onClick={() => setReport(x)}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 16px 28px' }}>
              <div className="rv-bars" >
                {revenue.map((v, i) => (
                  <div key={i} className="rv-bar"  style={{ height: (v / 18.3 * 100) + '%' }}>
                    <b>${v}k</b>
                    <span>{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI insights */}
          <div className="rv-card" >
            <div className="rv-card-h" >
              <Icon name="sparkles" size={13} />
              <div className="rv-card-t" >AI report insights</div>
            </div>
            {insights.map((x, i) => (
              <div className="rv-mini"  key={i}>
                <div className="rv-mini-ic"  style={miniIcStyle(x[2])}><Icon name={x[3]} size={14} /></div>
                <div className="minw0" >
                  <div className="rv-row-main" >{x[0]}</div>
                  <div className="rv-row-sub" >{x[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved reports */}
        <div className="rv-card" >
          <div className="rv-card-h" >
            <Icon name="file-text" size={13} />
            <div className="rv-card-t" >Saved reports</div>
            <div className="rv-card-act" >
              <button className="btn sm" ><Icon name="plus" size={12} /> New report</button>
            </div>
          </div>
          {saved.map((r, i) => (
            <div className="rv-mini"  key={i}>
              <div className="rv-mini-ic"  style={miniIcStyle(r[3])}><Icon name={r[4]} size={14} /></div>
              <div className="minw0"  style={{ flex: 1 }}>
                <div className="rv-row-main" >{r[0]}</div>
                <div className="rv-row-sub" >{r[1]}</div>
              </div>
              <span className={'pill ' + r[3]}>{r[2]}</span>
              <button className="btn xs" >Open</button>
            </div>
          ))}
        </div>

        {/* Account report table */}
        <div className="rv-card" >
          <div className="rv-card-h" >
            <Icon name="table" size={13} />
            <div className="rv-card-t" >Account report</div>
            <div className="rv-card-act" >
              <button className="btn sm"  onClick={() => setView && setView('accounts')}>
                Open accounts →
              </button>
            </div>
          </div>
          <div className="rv-table-wrap" >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Client', 'MRR', 'Health', 'Renewal', 'Executive note', 'Score'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left',
                      padding: '9px 14px',
                      fontSize: 10,
                      color: 'var(--ink5)',
                      letterSpacing: '.07em',
                      textTransform: 'uppercase',
                      borderBottom: '.5px solid var(--brd)',
                      background: 'var(--bg3)',
                      fontWeight: 600,
                      fontFamily: '"DM Sans", sans-serif',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accounts.map((a, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)' }}>
                      <div className="fz13 fw6 t-ink" >{a[0]}</div>
                      <div className="fz11 t-ink5" >Professional services account</div>
                    </td>
                    <td className="mono"  style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)', fontSize: 12, color: 'var(--ink3)' }}>
                      {a[1]}
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)' }}>
                      <span className={'pill ' + a[5]}>{a[2]}/100</span>
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)', fontSize: 12, color: 'var(--ink3)' }}>
                      {a[3]}
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)', fontSize: 12, color: 'var(--ink3)' }}>
                      {a[4]}
                    </td>
                    <td style={{ padding: '12px 14px', borderBottom: '.5px solid var(--brd)' }}>
                      <div className="rv-progress" >
                        <div
                          className="rv-progress-fill" 
                          style={{ width: a[2] + '%', background: scoreColor(Number(a[2])) }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsView;