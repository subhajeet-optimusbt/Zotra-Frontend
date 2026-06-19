import React, { useState, useEffect } from "react";
import Icon from "../components/Icon";

// ─── Styles ───────────────────────────────────────────────────────────────────
const JV_STYLES = `
.jv{flex:1;overflow-y:auto;background:var(--bg);display:flex;flex-direction:column;min-height:0}
.jv-head{background:var(--bg2);border-bottom:.5px solid var(--brd);padding:18px 28px 0;flex-shrink:0}
.jv-head-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px}
.jv-title{font-family:"Sora",sans-serif;font-size:19px;font-weight:650;color:var(--ink);letter-spacing:-.025em}
.jv-sub{font-size:12.5px;color:var(--ink4);margin-top:2px;max-width:540px;line-height:1.5}
.jv-tabs{display:flex;gap:0;overflow-x:auto;scrollbar-width:none}
.jv-tabs::-webkit-scrollbar{display:none}
.jv-tab{padding:10px 18px;font-size:12px;font-weight:500;color:var(--ink3);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;display:flex;align-items:center;gap:7px;transition:all .13s;flex-shrink:0}
.jv-tab:hover{color:var(--ink)}
.jv-tab.active{color:var(--p);border-bottom-color:var(--p)}
.jv-tab .jv-tab-time{font-size:9.5px;font-family:"DM Mono",monospace;color:var(--ink5)}
.jv-tab.active .jv-tab-time{color:var(--p);opacity:.7}
.jv-tab-ic{width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px}
.jv-tab.active .jv-tab-ic{background:var(--pp)}
.jv-tab:not(.active) .jv-tab-ic{background:var(--bg3)}
.jv-body{flex:1;padding:20px 28px 32px;min-height:0}
.jv-inner{max-width:960px;margin:0 auto}
.jv-emotion{background:linear-gradient(135deg,var(--pp) 0%,var(--bg2) 90%);border:.5px solid var(--brd2);border-radius:14px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:12px}
.jv-em-ic{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff}
.jv-em-text{font-size:14px;font-weight:600;color:var(--p);font-family:"Sora",sans-serif;letter-spacing:-.01em;font-style:italic}
.jv-em-sub{font-size:11px;color:var(--ink4);margin-top:2px}
.jv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.jv-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px}
.jv-card{background:var(--bg2);border:.5px solid var(--brd);border-radius:14px;overflow:hidden;box-shadow:var(--sh-s)}
.jv-card-h{padding:10px 14px;border-bottom:.5px solid var(--brd);display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;color:var(--ink);font-family:"Sora",sans-serif;letter-spacing:-.01em}
.jv-card-ic{width:22px;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.jv-card-b{padding:12px 14px}
.jv-metric-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.jv-metric{background:var(--bg2);border:.5px solid var(--brd);border-radius:12px;padding:12px 14px}
.jv-m-lbl{font-size:9px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--ink5);margin-bottom:5px}
.jv-m-val{font-family:"Sora",sans-serif;font-size:22px;font-weight:600;letter-spacing:-.025em;color:var(--ink);line-height:1}
.jv-m-val.ok{color:var(--ok)}.jv-m-val.ri{color:var(--ri)}.jv-m-val.wa{color:var(--wa)}
.jv-m-sub{font-size:10px;color:var(--ink4);margin-top:4px}
.jv-step{display:flex;align-items:flex-start;gap:10px;padding:9px 11px;border-radius:10px;margin-bottom:7px;transition:all .12s}
.jv-step.done{background:var(--okb);border:.5px solid rgba(29,158,117,.18)}
.jv-step.active{background:var(--pu);border:.5px solid rgba(75,72,200,.2)}
.jv-step.pending{background:var(--bg3);border:.5px solid var(--brd)}
.jv-step-ic{width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.jv-step.done .jv-step-ic{background:var(--ok);color:#fff}
.jv-step.active .jv-step-ic{background:var(--p);color:#fff}
.jv-step.pending .jv-step-ic{background:var(--bg2);color:var(--ink4);border:.5px solid var(--brd2)}
.jv-step-t{font-size:12.5px;font-weight:600;color:var(--ink);line-height:1.3}
.jv-step-s{font-size:11px;color:var(--ink4);margin-top:2px;line-height:1.45}
.jv-sig{position:relative;padding-left:18px;margin-bottom:8px}
.jv-sig::before{content:"";position:absolute;left:5px;top:50%;transform:translateY(-50%);width:7px;height:7px;border-radius:50%}
.jv-sig.intent::before{background:var(--p)}
.jv-sig.alert::before{background:var(--ri)}
.jv-sig.win::before{background:var(--ok)}
.jv-sig.agent::before{background:var(--amber)}
.jv-sig-card{padding:8px 10px;background:var(--bg2);border:.5px solid var(--brd);border-radius:9px}
.jv-sig-t{font-size:11.5px;font-weight:600;color:var(--ink)}
.jv-sig-s{font-size:10.5px;color:var(--ink4);margin-top:1px}
.jv-pill{display:inline-flex;align-items:center;gap:4px;padding:2px 9px;border-radius:12px;font-size:10.5px;font-weight:500}
.jv-pill-ok{background:var(--okb);color:var(--ok)}
.jv-pill-ri{background:var(--rib);color:var(--ri)}
.jv-pill-wa{background:var(--wab);color:var(--wa)}
.jv-pill-br{background:var(--pp);color:var(--p)}
.jv-pill-mu{background:var(--bg3);color:var(--ink3);border:.5px solid var(--brd2)}
.jv-tl{position:relative;padding-left:22px}
.jv-tl::before{content:"";position:absolute;left:7px;top:8px;bottom:8px;width:1.5px;background:linear-gradient(180deg,var(--brd2),var(--brd),transparent)}
.jv-tl-item{position:relative;margin-bottom:10px}
.jv-tl-dot{position:absolute;left:-19px;top:12px;width:12px;height:12px;border-radius:50%;border:1.5px solid var(--brd2);background:var(--bg)}
.jv-tl-dot.done{background:var(--ok);border-color:var(--ok)}
.jv-tl-dot.now{background:var(--p);border-color:var(--p)}
.jv-tl-card{background:var(--bg2);border:.5px solid var(--brd);border-radius:9px;padding:9px 12px}
.jv-tl-card.now{border-color:var(--p);background:var(--pu)}
.jv-tl-t{font-size:12px;font-weight:600;color:var(--ink)}
.jv-tl-s{font-size:10.5px;color:var(--ink4);margin-top:1px}
.jv-tl-time{float:right;font-size:10px;font-family:"DM Mono",monospace;color:var(--ink5)}
.jv-health-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.jv-hcard{padding:10px 12px;background:var(--bg3);border:.5px solid var(--brd);border-radius:9px}
.jv-h-lbl{font-size:9px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink5);margin-bottom:4px}
.jv-h-score{font-size:22px;font-weight:600;letter-spacing:-.02em}
.jv-h-bar{height:4px;background:var(--bg);border-radius:2px;overflow:hidden;margin-top:5px}
.jv-h-fill{height:100%;border-radius:2px}
.jv-opp-row{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:.5px solid var(--brd);font-size:11.5px}
.jv-opp-row:last-child{border-bottom:0}
.jv-opp-name{font-weight:600;flex:1;color:var(--ink)}
.jv-activate{background:linear-gradient(135deg,var(--p) 0%,#7370E0 100%);border-radius:14px;padding:18px 20px;display:flex;align-items:center;gap:16px;margin-bottom:12px;cursor:pointer;transition:opacity .15s}
.jv-activate:hover{opacity:.93}
.jv-activate-ic{width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.jv-activate-t{font-family:"Sora",sans-serif;font-size:15px;font-weight:600;color:#fff;letter-spacing:-.015em;margin-bottom:3px}
.jv-activate-s{font-size:12px;color:rgba(255,255,255,.78);line-height:1.4}
.jv-activate-btn{margin-left:auto;height:32px;padding:0 14px;background:rgba(255,255,255,.2);border:.5px solid rgba(255,255,255,.35);border-radius:8px;font-size:12px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;flex-shrink:0;transition:background .15s}
.jv-activate-btn:hover{background:rgba(255,255,255,.3)}
.jv-reply-box{background:var(--pu);border:.5px solid rgba(75,72,200,.2);border-radius:10px;padding:10px 12px;font-size:11.5px;color:var(--ink3);line-height:1.55}
.jv-reply-lbl{font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--p);margin-bottom:4px;display:flex;align-items:center;gap:5px}
.jv-pbar{height:6px;background:var(--bg3);border-radius:3px;overflow:hidden;margin:5px 0 3px}
.jv-pfill{height:100%;background:var(--p);border-radius:3px}
@media(max-width:900px){.jv-grid2,.jv-grid3{grid-template-columns:1fr}.jv-metric-row{grid-template-columns:repeat(2,1fr)}}
`;

// ─── Journey Stages (matches HTML exactly) ────────────────────────────────────
const JOURNEY_STAGES = [
  { id: "min5",        label: "First 5 min",  time: "0–5 min",  pulseAge: "new",         emotion: '"I didn\'t have to configure anything."',           icon: "plug-zap",    color: "#5552C9" },
  { id: "hr1",         label: "First hour",   time: "Hour 1",   pulseAge: "new",         emotion: '"I finally have visibility."',                      icon: "scan-eye",    color: "#3B38A8" },
  { id: "day1",        label: "Day 1",        time: "Day 1",    pulseAge: "week1",       emotion: '"This behaves like a commercial operating system."', icon: "layers-2",    color: "#3F75DC" },
  { id: "week1",       label: "First week",   time: "Week 1",   pulseAge: "week1",       emotion: '"I don\'t want to work without this anymore."',      icon: "trending-up", color: "#1A9E7C" },
  { id: "month1",      label: "Month 1",      time: "Day 30",   pulseAge: "month1",      emotion: '"This is now running commercial operations."',       icon: "layers",      color: "#7A4EDB" },
  { id: "month6",      label: "Month 6",      time: "6 months", pulseAge: "month6",      emotion: '"Zotra knows my business better than I do."',        icon: "brain",       color: "#D97757" },
  { id: "established", label: "Month 3+",     time: "Mature",   pulseAge: "established", emotion: '"Zotra is the company\'s commercial nervous system."',icon: "network",    color: "#1D9E75" },
];

// ─── Shared prop type ─────────────────────────────────────────────────────────
type StagePanelProps = { activate: () => void };

// ─── Stage: Min 5 ─────────────────────────────────────────────────────────────
const JStageMin5: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate}>
      <div className="jv-activate-ic" ><Icon name="plug-zap" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Open Day 1 onboarding in Pulse</div>
        <div className="jv-activate-s" >Walk through the connect-inbox screen and meet your agents</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-metric-row" >
      <div className="jv-metric" ><div className="jv-m-lbl" >Pipeline detected</div><div className="jv-m-val ok" >₹48L</div><div className="jv-m-sub" >From email scan</div></div>
      <div className="jv-metric" ><div className="jv-m-lbl" >Opportunities</div><div className="jv-m-val" >12</div><div className="jv-m-sub" >Auto-identified</div></div>
      <div className="jv-metric" ><div className="jv-m-lbl" >Deals at risk</div><div className="jv-m-val ri" >3</div><div className="jv-m-sub" >Need attention now</div></div>
      <div className="jv-metric" ><div className="jv-m-lbl" >Missing follow-up</div><div className="jv-m-val wa" >7</div><div className="jv-m-sub" >Proposals sent</div></div>
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--pp)", color: "var(--p)" }}><Icon name="mail" size={12} /></div>
          What Zotra does in 5 minutes
        </div>
        <div className="jv-card-b" >
          <div className="jv-step done" >
            <div className="jv-step-ic" ><Icon name="check" size={12} /></div>
            <div><div className="jv-step-t" >Connects Gmail / Outlook</div><div className="jv-step-s" >One auth click · no manual config</div></div>
          </div>
          <div className="jv-step active" >
            <div className="jv-step-ic" ><Icon name="refresh-cw" size={12} /></div>
            <div><div className="jv-step-t" >Scans 847 email threads</div><div className="jv-step-s" >Last 90 days · ~18 minutes to process</div></div>
          </div>
          <div className="jv-step active" >
            <div className="jv-step-ic" ><Icon name="sparkles" size={12} /></div>
            <div><div className="jv-step-t" >Identifies opportunities</div><div className="jv-step-s" >Leads, RFQs, negotiations, renewals</div></div>
          </div>
          <div className="jv-step pending" >
            <div className="jv-step-ic" ><Icon name="bar-chart-3" size={12} /></div>
            <div><div className="jv-step-t" >Builds workspace automatically</div><div className="jv-step-s" >Accounts, pipeline board, next actions</div></div>
          </div>
        </div>
      </div>

      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="eye" size={12} /></div>
          First signals — surfaced immediately
        </div>
        <div className="jv-card-b" >
          <div className="jv-sig intent"  style={{ marginBottom: 7 }}>
            <div className="jv-sig-card" >
              <div className="jv-sig-t" >Canpango — qualification email received</div>
              <div className="jv-sig-s" >3 threads detected · last reply 2h ago · ₹8.4L</div>
            </div>
          </div>
          <div className="jv-sig alert"  style={{ marginBottom: 7 }}>
            <div className="jv-sig-card" >
              <div className="jv-sig-t" >Northwind Trading — stalled 44 days</div>
              <div className="jv-sig-s" >Proposal sent · follow-up overdue</div>
            </div>
          </div>
          <div className="jv-sig win"  style={{ marginBottom: 7 }}>
            <div className="jv-sig-card" >
              <div className="jv-sig-t" >Northwind Trading — ready to close</div>
              <div className="jv-sig-s" >Contract redline stage · ₹15.6L</div>
            </div>
          </div>
          <div className="jv-sig agent" >
            <div className="jv-sig-card" >
              <div className="jv-sig-t" >3 renewals expiring this month</div>
              <div className="jv-sig-s" >Total ₹12.2L · no drafts sent yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stage: Hour 1 ────────────────────────────────────────────────────────────
const JStageHr1: React.FC<StagePanelProps> = ({ activate }) => {
  const bgMap: Record<string, string>  = { ri: "var(--rib)", wa: "var(--wab)", amber: "var(--amberp)", ok: "var(--okb)", br: "var(--pp)" };
  const clrMap: Record<string, string> = { ri: "var(--ri)",  wa: "var(--wa)",  amber: "var(--amber)",  ok: "var(--ok)", br: "var(--p)"  };

  return (
    <div className="jv-inner" >
      <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#3B38A8 0%,#7370E0 100%)" }}>
        <div className="jv-activate-ic" ><Icon name="scan-eye" size={18} color="#fff" /></div>
        <div>
          <div className="jv-activate-t" >Open Day 1 onboarding in Pulse</div>
          <div className="jv-activate-s" >See the scan-complete state and first intelligence surfaced</div>
        </div>
        <button className="jv-activate-btn" >Open in Pulse →</button>
      </div>

      <div className="jv-grid2" >
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="check-circle" size={12} /></div>
            Setup completed
          </div>
          <div className="jv-card-b" >
            {[
              { cls: "done",   ic: "check",    t: "Gmail connected",           s: "Authorized · historical import started" },
              { cls: "done",   ic: "check",    t: "847 threads imported",      s: "Structured into workspaces automatically" },
              { cls: "done",   ic: "check",    t: "12 opportunities detected", s: "Leads, RFQs, renewals, negotiations" },
              { cls: "active", ic: "sparkles", t: "Workspace generating",      s: "Customer briefs, next actions, risk signals" },
            ].map((st, i) => (
              <div key={i} className={"jv-step " + st.cls}>
                <div className="jv-step-ic" ><Icon name={st.ic} size={12} /></div>
                <div><div className="jv-step-t" >{st.t}</div><div className="jv-step-s" >{st.s}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--rib)", color: "var(--ri)" }}><Icon name="alert-triangle" size={12} /></div>
            Immediate intelligence Zotra flagged
          </div>
          <div className="jv-card-b" >
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                { type: "ri",    icon: "user-x",        text: "Authority gap — no decision maker", sub: "NorthPoint Legal · Dr. Kim sole DM not yet confirmed" },
                { type: "wa",    icon: "circle-dollar",  text: "Budget unclear on 4 deals",         sub: "Propose budget-framing questions" },
                { type: "amber", icon: "clock",          text: "Negotiation stalled 44 days",        sub: "Northwind Trading · terms not progressing · follow-up due" },
                { type: "ok",    icon: "trending-up",    text: "Competitor likely involved",         sub: "Clearview Digital · expansion signal detected language" },
                { type: "br",    icon: "expand",         text: "High expansion potential",           sub: "Northwind Trading · upsell signal detected" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", background: bgMap[item.type], border: "0.5px solid transparent", borderRadius: 9 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: clrMap[item.type], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Icon name={item.icon} size={11} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{item.text}</div>
                    <div style={{ fontSize: 10.5, color: "var(--ink4)", marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Stage: Day 1 ─────────────────────────────────────────────────────────────
const JStageDay1: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#3F75DC 0%,#6398F0 100%)" }}>
      <div className="jv-activate-ic" ><Icon name="layers-2" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Simulate Week 1 in Pulse</div>
        <div className="jv-activate-s" >Closest Pulse stage — pipeline board, agent activity, reply drafts</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--pp)", color: "var(--p)" }}><Icon name="layout-kanban" size={12} /></div>
          Pipeline — auto-organized by stage &amp; heat
        </div>
        <div className="jv-card-b"  style={{ padding: 0 }}>
          <div style={{ padding: "7px 12px", fontSize: "9.5px", fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--ink4)", display: "flex", gap: 8, borderBottom: ".5px solid var(--brd)" }}>
            <span style={{ flex: 1 }}>Account</span>
            <span style={{ width: 54, textAlign: "right" }}>Value</span>
            <span style={{ width: 60, textAlign: "center" }}>Stage</span>
            <span style={{ width: 40 }}>Heat</span>
          </div>
          {[
            { name: "Northwind Trading", val: "₹15.6L", stage: "Closing", cls: "jv-pill-ok", heat: 95 },
            { name: "Marketwake",        val: "$96K",   stage: "Negot.",  cls: "jv-pill-wa", heat: 89 },
            { name: "Clearview Digital", val: "$42K",   stage: "Disc.",   cls: "jv-pill-br", heat: 74 },
            { name: "Proval Consulting", val: "$54K",   stage: "Prop.",   cls: "jv-pill-mu", heat: 72 },
            { name: "NorthPoint Legal",  val: "$14K",   stage: "Qualify", cls: "jv-pill-mu", heat: 31 },
          ].map((r, i) => (
            <div key={i} className="jv-opp-row" >
              <div className="jv-opp-name" >{r.name}</div>
              <div style={{ fontSize: 11, fontFamily: '"DM Mono",monospace', color: "var(--ink3)", width: 54, textAlign: "right" }}>{r.val}</div>
              <span className={"jv-pill " + r.cls} style={{ width: 60, justifyContent: "center", fontSize: 9.5 }}>{r.stage}</span>
              <div style={{ width: 40, display: "flex", alignItems: "center", paddingLeft: 6 }}>
                <div style={{ flex: 1, height: 4, background: "var(--bg3)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: r.heat + "%", height: "100%", borderRadius: 2, background: r.heat > 75 ? "var(--ok)" : r.heat > 50 ? "var(--amber)" : "var(--ink5)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--tp)", color: "var(--td)" }}><Icon name="wand" size={12} /></div>
            Reply assist — drafted in your voice
          </div>
          <div className="jv-card-b" >
            <div className="jv-reply-box" >
              <div className="jv-reply-lbl" ><Icon name="sparkles" size={10} /> Zotra drafted · Northwind Trading</div>
              Hi Sarah — following up on the proposal from last week. Happy to schedule a quick call. Two questions: has your timeline shifted, and is budget approval still expected this quarter?
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button className="btn sm pri" >Send this</button>
              <button className="btn sm" >Edit</button>
              <button className="btn sm" >Regenerate</button>
            </div>
          </div>
        </div>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="file-text" size={12} /></div>
            First proposal generated from RFQ
          </div>
          <div className="jv-card-b" >
            <div className="jv-step done" >
              <div className="jv-step-ic" ><Icon name="check" size={12} /></div>
              <div><div className="jv-step-t" >Verbal commit → draft agreement</div><div className="jv-step-s" >Marketwake · CFO approved scope</div></div>
            </div>
            <div className="jv-step active" >
              <div className="jv-step-ic" ><Icon name="refresh-cw" size={12} /></div>
              <div><div className="jv-step-t" >Pricing structure generated</div><div className="jv-step-s" >3 tiers · margin analysis included</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stage: Week 1 ────────────────────────────────────────────────────────────
const JStageWeek1: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#1D9E75 0%,#2BBF97 100%)" }}>
      <div className="jv-activate-ic" ><Icon name="trending-up" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Simulate Week 1 in Pulse</div>
        <div className="jv-activate-s" >Agent activity, close probability, reply suggestions, time-saved counter</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-metric-row" >
      {[
        { lbl: "Deals progressed",  val: "4",    cls: "ok", sub: "This week" },
        { lbl: "Time saved",        val: "3.2h", cls: "",   sub: "vs manual CRM" },
        { lbl: "Artifacts created", val: "6",    cls: "",   sub: "Proposals, SOWs" },
        { lbl: "Risks caught early",val: "2",    cls: "ri", sub: "Before stalling" },
      ].map((m, i) => (
        <div key={i} className="jv-metric" >
          <div className="jv-m-lbl" >{m.lbl}</div>
          <div className={"jv-m-val" + (m.cls ? " " + m.cls : "")}>{m.val}</div>
          <div className="jv-m-sub" >{m.sub}</div>
        </div>
      ))}
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--amberp)", color: "var(--amber)" }}><Icon name="bot" size={12} /></div>
          Agent activity — week 1
        </div>
        <div className="jv-card-b"  style={{ padding: 0 }}>
          {[
            { ic: "search",         bg: "var(--p)",     name: "Forager",       role: "Enriched 12 accounts from LinkedIn & web", tag: "23 runs",  cls: "jv-pill-ok" },
            { ic: "pencil",         bg: "var(--ok)",    name: "Drafting agent",role: "Wrote 6 proposals, 3 follow-ups",           tag: "9 drafts", cls: "jv-pill-ok" },
            { ic: "alert-triangle", bg: "var(--amber)", name: "Watcher",       role: "Flagged Orbit CISO change, Kairo silence",  tag: "14 alerts",cls: "jv-pill-wa" },
            { ic: "calendar",       bg: "#3F75DC",      name: "Echo",          role: "Scheduled 5 nudges, 2 sent automatically",  tag: "7 tasks",  cls: "jv-pill-br" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", borderBottom: i < 3 ? ".5px solid var(--brd)" : 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={a.ic} size={13} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{a.name}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink4)" }}>{a.role}</div>
              </div>
              <span className={"jv-pill " + a.cls}>{a.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="percent" size={12} /></div>
            Northwind — close probability
          </div>
          <div className="jv-card-b" >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 30, fontWeight: 600, color: "var(--ok)", fontFamily: '"Sora",sans-serif', letterSpacing: "-.02em" }}>87%</div>
              <div style={{ fontSize: 11.5, color: "var(--ink3)" }}>likely to close Thursday</div>
            </div>
            <div className="jv-pbar" ><div className="jv-pfill"  style={{ width: "87%" }} /></div>
            <div style={{ fontSize: 10.5, color: "var(--ink4)" }}>Contract sent · 2 redlines resolved · champion engaged</div>
          </div>
        </div>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--pp)", color: "var(--p)" }}><Icon name="file-stack" size={12} /></div>
            Artifacts auto-generated
          </div>
          <div className="jv-card-b" >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {["2 Proposals", "1 SOW", "2 Quotes", "3 Follow-ups", "1 Status report", "1 Meeting summary"].map((t, i) => (
                <span key={i} className={"jv-pill " + (i < 2 ? "jv-pill-br" : i < 4 ? "jv-pill-ok" : "jv-pill-mu")}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stage: Month 1 ───────────────────────────────────────────────────────────
const JStageMonth1: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#7A4EDB 0%,#9E78EE 100%)" }}>
      <div className="jv-activate-ic" ><Icon name="layers" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Simulate Month 1 in Pulse</div>
        <div className="jv-activate-s" >Day 30 greeting · tone-match score 73% · What Zotra has learned sidebar</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-metric-row" >
      {[
        { lbl: "Total pipeline", val: "₹1.1Cr", cls: "ok", sub: "Tracked auto" },
        { lbl: "Customers",      val: "34",     cls: "",   sub: "With full history" },
        { lbl: "Churn risks",    val: "3",      cls: "ri", sub: "Early detection" },
        { lbl: "Renewals",       val: "5",      cls: "wa", sub: "Drafts ready" },
      ].map((m, i) => (
        <div key={i} className="jv-metric" >
          <div className="jv-m-lbl" >{m.lbl}</div>
          <div className={"jv-m-val" + (m.cls ? " " + m.cls : "")}>{m.val}</div>
          <div className="jv-m-sub" >{m.sub}</div>
        </div>
      ))}
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--pp)", color: "var(--p)" }}><Icon name="activity" size={12} /></div>
          Business health dimensions
        </div>
        <div className="jv-card-b" >
          <div className="jv-health-grid" >
            {[
              { label: "Opportunity health",  score: 82, color: "var(--ok)"    },
              { label: "Relationship health", score: 67, color: "var(--amber)" },
              { label: "Delivery health",     score: 91, color: "var(--ok)"    },
              { label: "Financial health",    score: 54, color: "var(--ri)"    },
            ].map((h, i) => (
              <div key={i} className="jv-hcard" >
                <div className="jv-h-lbl" >{h.label}</div>
                <div className="jv-h-score"  style={{ color: h.color }}>{h.score}</div>
                <div className="jv-h-bar" ><div className="jv-h-fill"  style={{ width: h.score + "%", background: h.color }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="crown" size={12} /></div>
          Portfolio intelligence
        </div>
        <div className="jv-card-b" >
          <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink4)", marginBottom: 7 }}>Best customers by margin</div>
          {[
            { name: "Marketwake",        pct: 89 },
            { name: "Hartwell Ortho",    pct: 85 },
            { name: "Proval Consulting", pct: 61 },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 11.5, color: "var(--ink3)", flex: 1 }}>{c.name}</div>
              <div style={{ flex: 2, height: 5, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: c.pct + "%", height: "100%", background: "var(--p)", borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--ink3)", width: 28, textAlign: "right" }}>{c.pct}%</div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink4)", marginBottom: 6 }}>Expansion signals</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            <span className="jv-pill jv-pill-ok" >Northwind — upsell ready</span>
            <span className="jv-pill jv-pill-br" >Pebble — cross-sell</span>
            <span className="jv-pill jv-pill-wa" >Cinder — at risk</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stage: Month 6 ───────────────────────────────────────────────────────────
const JStageMonth6: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#D97757 0%,#EAA47C 100%)" }}>
      <div className="jv-activate-ic" ><Icon name="brain" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Simulate Month 6 in Pulse</div>
        <div className="jv-activate-s" >6-month retrospective banner · 47 closed · $1.2M won · 312 hours saved</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--amberp)", color: "var(--amber)" }}><Icon name="trophy" size={12} /></div>
          6-month retrospective
        </div>
        <div className="jv-card-b" >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[{ l: "Closed", v: "47" }, { l: "Won", v: "$1.2M" }, { l: "Hours saved", v: "312" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "10px 8px", background: "var(--bg3)", borderRadius: 10 }}>
                <div style={{ fontFamily: '"Sora",sans-serif', fontSize: 20, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.02em" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "var(--ink4)", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink3)", lineHeight: 1.6, padding: "10px 12px", background: "var(--pu)", borderRadius: 9, border: "0.5px solid rgba(75,72,200,.15)" }}>
            Zotra drafted 1,847 replies — you sent 1,520. Watcher caught <strong style={{ color: "var(--ink)" }}>11 champion shifts</strong> before they cost you a deal. Echo filed 4,200 action items from meetings.
          </div>
        </div>
      </div>

      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="chart-line" size={12} /></div>
          Performance deltas vs month 1
        </div>
        <div className="jv-card-b" >
          {[
            { label: "Win rate",     before: "22%",  after: "38%",  delta: "+16%"  },
            { label: "Cycle time",   before: "67d",  after: "49d",  delta: "−18d"  },
            { label: "Reply speed",  before: "6.2h", after: "1.7h", delta: "−72%"  },
            { label: "Churn caught", before: "1/mo", after: "4/mo", delta: "+300%" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < 3 ? "0.5px solid var(--brd)" : 0 }}>
              <div style={{ flex: 1, fontSize: 12, color: "var(--ink3)" }}>{row.label}</div>
              <div style={{ fontSize: 11, color: "var(--ink4)", fontFamily: '"DM Mono",monospace' }}>{row.before}</div>
              <Icon name="arrow-right" size={10} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", fontFamily: '"DM Mono",monospace' }}>{row.after}</div>
              <span className="jv-pill jv-pill-ok"  style={{ fontSize: 9.5, padding: "1px 7px" }}>{row.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Stage: Established ───────────────────────────────────────────────────────
const JStageEstablished: React.FC<StagePanelProps> = ({ activate }) => (
  <div className="jv-inner" >
    <div className="jv-activate"  onClick={activate} style={{ background: "linear-gradient(135deg,#1F8A5B 0%,#34A974 100%)" }}>
      <div className="jv-activate-ic" ><Icon name="network" size={18} color="#fff" /></div>
      <div>
        <div className="jv-activate-t" >Simulate Mature stage in Pulse</div>
        <div className="jv-activate-s" >The full agentic operating view — proactive, self-improving, institutional memory</div>
      </div>
      <button className="jv-activate-btn" >Open in Pulse →</button>
    </div>

    <div className="jv-grid2" >
      <div className="jv-card" >
        <div className="jv-card-h" >
          <div className="jv-card-ic"  style={{ background: "var(--pp)", color: "var(--p)" }}><Icon name="milestone" size={12} /></div>
          Full transformation arc
        </div>
        <div className="jv-card-b" >
          <div className="jv-tl" >
            {[
              { label: "Inbox assistant",        sub: "Email scanning, opportunity detection", when: "Day 1",    type: "done" },
              { label: "Visibility layer",        sub: "Intelligence, gaps, risk signals",      when: "Hour 1",   type: "done" },
              { label: "Commercial OS",           sub: "Pipeline, proposals, reply drafts",     when: "Day 1",    type: "done" },
              { label: "Trusted daily partner",   sub: "Agent trust, habit, daily open",        when: "Week 1",   type: "done" },
              { label: "System of record",        sub: "Teams collaborate inside Zotra",        when: "Month 1",  type: "done" },
              { label: "Agentic operating layer", sub: "Proactive, autonomous, compounding",    when: "Month 3+", type: "now"  },
            ].map((t, i) => (
              <div key={i} className="jv-tl-item" >
                <div className={"jv-tl-dot " + t.type} />
                <div className={"jv-tl-card" + (t.type === "now" ? " now" : "")}>
                  <div className="jv-tl-time" >{t.when}</div>
                  <div className="jv-tl-t"  style={t.type === "now" ? { color: "var(--p)" } : {}}>{t.label}</div>
                  <div className="jv-tl-s" >{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--amberp)", color: "var(--amber)" }}><Icon name="sparkles" size={12} /></div>
            What Zotra does proactively
          </div>
          <div className="jv-card-b" >
            {[
              "Follows up before you remember to",
              "Prepares every meeting brief automatically",
              "Drafts renewals 30 days out",
              "Detects churn risk before silence sets in",
              "Escalates delivery issues to the right person",
              "Suggests weekly strategic moves",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 5 ? 7 : 0 }}>
                <div style={{ width: 18, height: 18, borderRadius: 6, background: "var(--okb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={10} color="var(--ok)" />
                </div>
                <div style={{ fontSize: 12, color: "var(--ink3)" }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="jv-card" >
          <div className="jv-card-h" >
            <div className="jv-card-ic"  style={{ background: "var(--okb)", color: "var(--ok)" }}><Icon name="database" size={12} /></div>
            Commercial memory Zotra holds
          </div>
          <div className="jv-card-b" >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {["Customer relationships", "Delivery history", "Payment reliability", "Renewal patterns", "Negotiation styles", "Buying signals", "Churn indicators", "Expansion triggers", "Stakeholder maps", "Pricing sensitivities"].map((t, i) => (
                <span key={i} className={"jv-pill " + (i % 3 === 0 ? "jv-pill-br" : i % 3 === 1 ? "jv-pill-ok" : "jv-pill-mu")}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Typed stage map ──────────────────────────────────────────────────────────
type StageId = "min5" | "hr1" | "day1" | "week1" | "month1" | "month6" | "established";

const STAGE_PANELS: Record<StageId, React.FC<StagePanelProps>> = {
  min5:        JStageMin5,
  hr1:         JStageHr1,
  day1:        JStageDay1,
  week1:       JStageWeek1,
  month1:      JStageMonth1,
  month6:      JStageMonth6,
  established: JStageEstablished,
};

type JourneyViewProps = {
  setView?: (view: string) => void;
  setTenantAge?: (age: string) => void;
};

// ─── Main JourneyView ─────────────────────────────────────────────────────────
const JourneyView: React.FC<JourneyViewProps> = ({ setView, setTenantAge }) => {
  const [active, setActive] = useState<StageId>("min5");

  useEffect(() => {
    const id = "jv-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = JV_STYLES;
      document.head.appendChild(s);
    }
  }, []);

  const activateStage = (pulseAge: string) => {
    setTenantAge?.(pulseAge);
    setView?.("pulse");
  };

  const cur = JOURNEY_STAGES.find((s) => s.id === active) ?? JOURNEY_STAGES[0];
  const StagePanel = STAGE_PANELS[active as StageId];

  return (
    <div className="jv" >
      <div className="jv-head" >
        <div className="jv-head-row" >
          <div>
            <div className="jv-title" >User lifecycle journey</div>
            <div className="jv-sub" >
              How the Zotra experience evolves — from first connection to commercial command center.
              Each stage has a distinct emotion and distinct UI. Click "Open in Pulse" to simulate it live.
            </div>
          </div>
          <button className="btn sm"  onClick={() => setView?.("pulse")}>
            <Icon name="activity" size={12} /> Back to Pulse
          </button>
        </div>
        <div className="jv-tabs" >
          {JOURNEY_STAGES.map((st) => (
            <div
              key={st.id}
              className={"jv-tab" + (active === st.id ? " active" : "")}
              onClick={() => setActive(st.id as StageId)}
            >
              <div
                className="jv-tab-ic" 
                style={active === st.id ? { background: st.color + "22", color: st.color } : {}}
              >
                <Icon name={st.icon} size={11} />
              </div>
              {st.label}
              <span className="jv-tab-time" >{st.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="jv-body" >
        <div className="jv-emotion" >
          <div className="jv-em-ic"  style={{ background: cur.color }}>
            <Icon name={cur.icon} size={14} color="#fff" />
          </div>
          <div>
            <div className="jv-em-text" >{cur.emotion}</div>
            <div className="jv-em-sub" >The defining emotion a user feels at this stage</div>
          </div>
        </div>
        {StagePanel && <StagePanel activate={() => activateStage(cur.pulseAge)} />}
      </div>
    </div>
  );
};

export default JourneyView;