import React from "react";
import Icon from "../components/Icon";

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
.zdb-body{flex:1;overflow-y:auto;padding:18px 24px 96px;background:var(--bg3)}
.zdb-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}
.zdb-card{background:var(--bg2);border:.5px solid var(--brd);border-radius:var(--r-l);box-shadow:var(--sh-s);overflow:hidden;margin-bottom:12px}
.zdb-card-h{height:42px;padding:0 15px;border-bottom:.5px solid var(--brd);display:flex;align-items:center;gap:8px}
.zdb-card-t{font-family:"Sora",sans-serif;font-size:13px;font-weight:600;color:var(--ink)}
.zdb-card-act{margin-left:auto;display:flex;gap:5px}
.zdb-two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.zdb-list-row{padding:11px 15px;border-bottom:.5px solid var(--brd);display:flex;align-items:center;gap:10px;cursor:pointer}
.zdb-list-row:hover{background:var(--pu)}
.zdb-list-row:last-child{border-bottom:0}
.zdb-row-main{font-size:12.5px;font-weight:600;color:var(--ink);line-height:1.25}
.zdb-row-sub{font-size:11px;color:var(--ink5);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zdb-score{height:4px;background:var(--bg3);border-radius:999px;overflow:hidden;width:72px;margin-top:5px}
.zdb-score-fill{height:100%;border-radius:999px}
@media(max-width:1200px){.zdb-metrics{grid-template-columns:repeat(2,1fr)}.zdb-two{grid-template-columns:1fr}}
`;

const DashboardView = ({ setView }: { setView?: (view: string) => void }) => {
  React.useEffect(() => {
    const id = "zdb-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  const customers: [string, string, string, string, string, string, number, string, string][] = [
    ["Hartwell Orthodontics", "$4,000", "Strong",   "On Track",     "Current", "61 days",  82, "HO", "ok"],
    ["Acme Dental Group",     "$4,000", "Strong",   "On Track",     "Current", "91 days",  76, "AD", "ok"],
    ["Metro Physio",          "$3,000", "Watch",    "Scope drift",  "Day 14",  "88 days",  50, "MP", "wa"],
    ["Northside Dental",      "$2,200", "At Risk",  "Below target", "Overdue", "58 days",  24, "ND", "ri"],
    ["Clearview Physio",      "$1,800", "New",      "Onboarding",   "Draft",   "120 days", 66, "CP", "br"],
  ];

  const opps = [
    ["Acme SEO + Paid Growth",    "Proposal · $48K ARR",           "br"],
    ["Hartwell Expansion",         "Verbal commit · $18K expansion", "ok"],
    ["Coastal Allied Web Refresh", "Discovery · $32K project",       "wa"],
  ];

  const renewals = [
    ["Hartwell Ortho",   "61 days · expansion detected", "ok"],
    ["Northside Dental", "58 days · delivery risk",      "ri"],
    ["Metro Physio",     "88 days · scope/margin watch", "wa"],
  ];

  const actions = [
    ["Follow up Northside Dental",       "Overdue invoice and renewal risk need owner action",           "ri"],
    ["Send Hartwell expansion proposal", "Expansion signal is strong and champion is responsive",        "ok"],
    ["Resolve Metro scope drift",        "Effort is above estimate; protect margin before next invoice", "wa"],
    ["Approve Acme pricing reply",       "Proposal response waiting in draft",                           "br"],
  ];

  const scoreColor = (v: number) =>
    v > 75 ? "var(--ok)" : v > 55 ? "var(--p)" : v > 35 ? "var(--wa)" : "var(--ri)";

  const avBg = (s: string | number) => {
    const str = String(s);
    if (!str) return "av-1";
    const c = str.charCodeAt(0) + (str.charCodeAt(1) || 0);
    return "av-" + (1 + (c % 7));
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg3)" }}>

      {/* White header — matches Notifications page */}
      <div style={{
        background: "var(--bg2)",
        borderBottom: ".5px solid var(--brd)",
        padding: "18px 24px 16px",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.03em", lineHeight: 1.2 }}>
          Dashboard
        </div>
        <div style={{ fontSize: 13, color: "var(--ink4)", marginTop: 3, fontWeight: 400 }}>
          2 at-risk accounts · 1 overdue invoice · 3 signals need attention · Wednesday, May 13 2026
        </div>
      </div>

      {/* Scrollable grey body */}
      <div className="zdb-body" >

        {/* KPI metrics */}
        <div className="zdb-metrics" >
          <div className="metric" >
            <div className="metric-l" >Monthly Revenue</div>
            <div className="metric-v"  style={{ color: "var(--p)" }}>$18,300</div>
            <div className="metric-s" >↑ $1,500 from expansion</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >Active clients</div>
            <div className="metric-v" >5</div>
            <div className="metric-s" >3 healthy · 1 watch · 1 at risk</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >Avg health score</div>
            <div className="metric-v"  style={{ color: "var(--ok)" }}>57</div>
            <div className="metric-s" >↑ 4 pts vs last month</div>
          </div>
          <div className="metric" >
            <div className="metric-l" >Renewals due</div>
            <div className="metric-v"  style={{ color: "var(--wa)" }}>3</div>
            <div className="metric-s" >Next: Hartwell in 61 days</div>
          </div>
        </div>

        {/* Customer health table */}
        <div className="zdb-card" >
          <div className="zdb-card-h" >
            <Icon name="circle" size={13} />
            <div className="zdb-card-t" >Customer health</div>
            <div className="zdb-card-act" >
              <button className="btn sm"  onClick={() => setView && setView("accounts")}>
                View all →
              </button>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Client", "MRR", "Relationship", "Delivery", "Financial", "Renewal", "Health"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left",
                      padding: "9px 14px",
                      fontSize: 10,
                      color: "var(--ink5)",
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                      borderBottom: ".5px solid var(--brd)",
                      background: "var(--bg3)",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} style={{ cursor: "pointer" }}>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <span className={"av " + avBg(c[0])} style={{ width: 30, height: 30, borderRadius: 8, fontSize: 10 }}>
                          {c[7]}
                        </span>
                        <div>
                          <div className="fz13 fw6 t-ink" >{c[0]}</div>
                          <div className="fz11 t-ink5" >Professional services account</div>
                        </div>
                      </div>
                    </td>
                    <td className="mono"  style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)" }}>{c[1]}</td>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)" }}>
                      <span className={"pill " + c[8]}>{c[2]}</span>
                    </td>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)", fontSize: 12, color: "var(--ink3)" }}>{c[3]}</td>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)", fontSize: 12, color: "var(--ink3)" }}>{c[4]}</td>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)", fontSize: 12, color: "var(--ink3)" }}>{c[5]}</td>
                    <td style={{ padding: "11px 14px", borderBottom: ".5px solid var(--brd)" }}>
                      <div className="zdb-score" >
                        <div className="zdb-score-fill"  style={{ width: c[6] + "%", background: scoreColor(c[6]) }} />
                      </div>
                      <div className="mono fz10"  style={{ color: scoreColor(c[6]), marginTop: 3 }}>{c[6]}/100</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two-col: opportunities + renewals */}
        <div className="zdb-two" >
          <div className="zdb-card" >
            <div className="zdb-card-h" >
              <Icon name="target" size={13} />
              <div className="zdb-card-t" >Open opportunities</div>
              <div className="zdb-card-act" >
                <button className="btn sm"  onClick={() => setView && setView("deals")}>Board →</button>
              </div>
            </div>
            {opps.map((o, i) => (
              <div className="zdb-list-row"  key={i}>
                <span className={"dot " + o[2]}></span>
                <div className="minw0" >
                  <div className="zdb-row-main" >{o[0]}</div>
                  <div className="zdb-row-sub" >{o[1]}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="zdb-card" >
            <div className="zdb-card-h" >
              <Icon name="refresh-cw" size={13} />
              <div className="zdb-card-t" >Upcoming renewals</div>
              <div className="zdb-card-act" >
                <button className="btn sm"  onClick={() => setView && setView("renewal")}>Board →</button>
              </div>
            </div>
            {renewals.map((r, i) => (
              <div className="zdb-list-row"  key={i}>
                <span className={"dot " + r[2]}></span>
                <div className="minw0" >
                  <div className="zdb-row-main" >{r[0]}</div>
                  <div className="zdb-row-sub" >{r[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs attention today */}
        <div className="zdb-card" >
          <div className="zdb-card-h" >
            <Icon name="zap" size={13} />
            <div className="zdb-card-t" >Needs attention today</div>
          </div>
          {actions.map((a, i) => (
            <div className="zdb-list-row"  key={i}>
              <span className={"dot " + a[2]}></span>
              <div className="minw0" >
                <div className="zdb-row-main" >{a[0]}</div>
                <div className="zdb-row-sub" >{a[1]}</div>
              </div>
              <button className="btn xs" >Open</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardView;