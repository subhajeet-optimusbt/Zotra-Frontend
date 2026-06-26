import{r as g,j as e}from"./vendor-react-DTmZBiFG.js";import{A as w,S as E,I as i,i as A,a as x,f as M}from"./AppShell-wgqEMsup.js";import{S as F}from"./Shared-BmJpXX_S.js";const R={acme:{contacts:[{name:"James Whitfield",role:"VP Engineering",type:"sole_decision_maker",authority:"final",av:"JW"},{name:"Priya Nair",role:"Head of Procurement",type:"financial_approver",authority:"high",av:"PN"}],threads:[{id:"eth_acme_001",subject:"Re: Pricing + Security Review",status:"open",messageCount:4,lastAt:"2h ago",messages:[{dir:"inbound",from:"James Whitfield",at:"May 15 09:14",body:"Hi — we've been reviewing the pricing page and had a few questions about enterprise security. Can you walk us through SOC2 compliance and how data residency works? Our VP Eng wants this before we move forward."},{dir:"outbound",from:"Michael",at:"May 15 10:30",body:"James — absolutely. We're SOC2 Type II certified and support data residency in US, EU, and APAC regions. Happy to set up a technical call with our security team. Would Thursday work?"},{dir:"agent",from:"Zotra",at:"May 15 10:31",isAction:!0,body:"Intent spike detected: 4 Acme Robotics visitors on /pricing and /security in the last 90 minutes. New visitor: VP of Engineering. Recommend immediate follow-up."}]}],gaps:[{type:"budget_confirmed",severity:"medium",status:"open",question:"Has the budget been formally approved at board level?",why:"Pricing page visits suggest evaluation but no budget confirmation received."},{type:"security_sign_off",severity:"high",status:"open",question:"Who needs to sign off on the security review?",why:"VP Engineering involved but security team not yet engaged."}],readiness:82,phase:"negotiation",aibrief:"Acme Robotics is in active negotiation. Strong intent signal — 4 team members visited /pricing and /security in the last 90 minutes including the VP of Engineering. Budget is likely approved (850-person manufacturing firm, $84K ARR deal). Key blocker: security review sign-off. Recommended action: schedule technical security call this week to unblock."},northwind:{contacts:[{name:"Sasha Krieger",role:"VP Procurement",type:"champion",authority:"medium",av:"SK"},{name:"Omar Hassan",role:"CEO",type:"sole_decision_maker",authority:"final",av:"OH"}],threads:[{id:"eth_nwnd_001",subject:"Re: MSA redline — ready to sign Thursday",status:"open",messageCount:6,lastAt:"23m ago",messages:[{dir:"inbound",from:"Sasha Krieger",at:"May 15 14:30",body:"We're ready to sign Thursday. Omar reviewed the redlined MSA — accepted clause 4.2, only pushing back on the auto-renewal term. Can you confirm you're flexible on changing that to manual renewal with 30-day notice?"},{dir:"outbound",from:"Michael",at:"May 15 14:55",body:"Sasha — great news. Yes, we can move to manual renewal with 30-day notice. I'll update clause 8.1 and send the clean version today. Shall we say 2pm Thursday for the signing call?"},{dir:"agent",from:"Zotra",at:"May 15 14:56",isAction:!0,body:"Contract redline accepted on clause 4.2. Auto-renewal term under negotiation. Deal on track to close Thursday. Forecast updated to Committed."}]}],gaps:[],readiness:94,phase:"closing",aibrief:"Northwind Trading is on the verge of closing. Sasha Krieger confirmed they're ready to sign Thursday after accepting clause 4.2. Only outstanding item: auto-renewal changed to manual with 30-day notice. $156K ARR deal. No qualification gaps. Recommended action: send updated MSA today, confirm Thursday 2pm signing call."},rune:{contacts:[{name:"David Chen",role:"CTO",type:"sole_decision_maker",authority:"final",av:"DC"},{name:"Lisa Park",role:"Head of DevOps",type:"champion",authority:"medium",av:"LP"}],threads:[{id:"eth_rune_001",subject:"Re: Pilot expansion scope",status:"open",messageCount:5,lastAt:"5h ago",messages:[{dir:"inbound",from:"David Chen",at:"May 15 08:00",body:"The pilot results have been strong — team is happy. We want to expand to the full 3 product lines as discussed. Can you put together the expanded proposal? We're targeting a July 1 go-live."},{dir:"outbound",from:"Michael",at:"May 15 09:15",body:"David — fantastic to hear. Putting together the full expansion proposal now — will include pricing for all 3 product lines, implementation timeline, and dedicated support SLA. You'll have it by end of day."}]}],gaps:[],readiness:88,phase:"negotiation",aibrief:"Rune Systems pilot is expanding. David Chen (CTO) confirmed strong pilot results and wants to expand to all 3 product lines by July 1. $96K ARR deal in negotiation. No qualification gaps. Recommended action: send full expansion proposal today, confirm July 1 timeline is achievable with implementation team."},orbit:{contacts:[{name:"Daniel Yu",role:"CISO",type:"sole_decision_maker",authority:"final",av:"DY"},{name:"Rachel Kim",role:"VP Operations",type:"financial_approver",authority:"high",av:"RK"}],threads:[{id:"eth_orbt_001",subject:"Security review — new CISO onboarding",status:"open",messageCount:3,lastAt:"1h ago",messages:[{dir:"agent",from:"Watcher",at:"May 15 10:00",isAction:!0,body:"Champion change detected: Daniel Yu joined Orbit Logistics as CISO (previously at Stripe). Security review concerns may shift. Recommend re-engaging with updated security documentation tailored to his background."},{dir:"outbound",from:"Michael",at:"May 15 11:00",body:"Daniel — congratulations on joining Orbit. I'm Michael from Zotra — we've been working with Rachel on the security evaluation. I'd love to set up a 30-minute intro call to walk you through where we are and answer any questions from your perspective."}]}],gaps:[{type:"ciso_sign_off",severity:"high",status:"open",question:"What are Daniel Yu's specific security requirements coming from Stripe?",why:"New CISO joined mid-evaluation. His requirements may differ from previous reviewer."}],readiness:71,phase:"evaluation",aibrief:"Orbit Logistics ($510K ARR) has a new CISO — Daniel Yu, previously at Stripe. This is the largest deal in pipeline. Security review was in progress with previous contact. Recommend immediate re-engagement with Daniel to understand his specific requirements. Champion Rachel Kim (VP Ops) is aligned. Key risk: evaluation reset due to CISO change."},cinder:{contacts:[{name:"Alex Morgan",role:"CEO",type:"sole_decision_maker",authority:"final",av:"AM"},{name:"Tom Reid",role:"Head of Security",type:"champion",authority:"medium",av:"TR"}],threads:[{id:"eth_cndr_001",subject:"Re: Security documentation request",status:"open",messageCount:2,lastAt:"6h ago",messages:[{dir:"inbound",from:"Tom Reid",at:"May 15 07:30",body:"Hi — we're in the security review phase and need your penetration test report, SOC2 Type II report, and subprocessor list. Can you share those under NDA?"},{dir:"outbound",from:"Michael",at:"May 15 09:00",body:"Tom — absolutely. I'll send the NDA over now and share the security package as soon as it's countersigned. We have all three documents ready. Typical turnaround is 24 hours."}]}],gaps:[{type:"nda_pending",severity:"medium",status:"open",question:"Has the NDA been countersigned?",why:"Security docs can't be shared until NDA is executed."},{type:"decision_maker",severity:"low",status:"open",question:"Is Alex Morgan directly involved in the evaluation decision?",why:"Tom Reid is running the review but Alex signs off commercially."}],readiness:66,phase:"evaluation",aibrief:"Cinder Labs is in security review (evaluation stage). Tom Reid (Head of Security) requested penetration test report, SOC2, and subprocessor list. NDA in progress — security docs on hold until countersigned. $32K ARR deal. CEO Alex Morgan is the commercial decision-maker but not yet engaged directly. Recommended action: follow up on NDA today."},kairo:{contacts:[{name:"Maya Chen",role:"Director of Engineering",type:"champion",authority:"medium",av:"MC"},{name:"Priya Shah",role:"VP Product",type:"sole_decision_maker",authority:"final",av:"PS"}],threads:[{id:"eth_kair_001",subject:"Re: Compare page follow-up",status:"open",messageCount:3,lastAt:"1d ago",messages:[{dir:"agent",from:"Watcher",at:"May 14 16:00",isAction:!0,body:"Champion risk: Maya Chen (Director of Engineering) updated LinkedIn to 'Open to opportunities'. She may be leaving Kairo Health. Recommend engaging backup contact Priya Shah (VP Product) immediately."},{dir:"outbound",from:"Michael",at:"May 14 17:00",body:"Priya — I'm Michael from Zotra. I've been working with Maya Chen on your evaluation. I wanted to reach out directly to make sure you have everything you need from our side to move things forward. Happy to set up a call at your convenience."}]}],gaps:[{type:"champion_risk",severity:"high",status:"open",question:"Is Maya Chen still the right champion given her LinkedIn activity?",why:"Champion may be leaving. Need to confirm Priya Shah is engaged."},{type:"timeline",severity:"medium",status:"open",question:"What is Kairo's target go-live date?",why:"Discovery started 26 days ago with no timeline confirmed."}],readiness:52,phase:"discovery",aibrief:"Kairo Health has a champion risk — Maya Chen (Director of Engineering) is showing signals of leaving the company. Priya Shah (VP Product) has been contacted as a backup. $240K ARR deal in discovery phase. Timeline not confirmed. Recommended action: prioritise call with Priya Shah this week to re-establish champion relationship and confirm evaluation timeline."},tessera:{contacts:[{name:"James Liu",role:"Compliance Director",type:"sole_decision_maker",authority:"final",av:"JL"},{name:"Sarah Wong",role:"IT Manager",type:"champion",authority:"medium",av:"SW"}],threads:[{id:"eth_tess_001",subject:"Re: Compliance one-pager",status:"open",messageCount:4,lastAt:"7h ago",messages:[{dir:"agent",from:"Watcher",at:"May 15 06:00",isAction:!0,body:"Sarah Wong forwarded the compliance one-pager internally. 4 unique opens from tessera.md addresses in the last 6 hours — including Compliance Director James Liu."},{dir:"outbound",from:"Michael",at:"May 15 09:30",body:"James — I noticed your team has been reviewing our compliance documentation. Happy to set up a 30-minute call to walk through how we handle HIPAA requirements specifically for healthcare providers your size. Would this week work?"}]}],gaps:[{type:"hipaa_requirements",severity:"medium",status:"open",question:"What specific HIPAA controls does Tessera require?",why:"Compliance focus confirmed but specific requirements not yet documented."}],readiness:68,phase:"evaluation",aibrief:"Tessera Health ($188K ARR) is in evaluation. Sarah Wong (IT Manager) forwarded the compliance one-pager internally — 4 opens from tessera.md including Compliance Director James Liu. Strong internal engagement signal. HIPAA compliance is the key evaluation criterion. Recommended action: schedule compliance-focused call with James Liu this week."},voltic:{contacts:[{name:"Omar Hassan",role:"CEO",type:"sole_decision_maker",authority:"final",av:"OH"},{name:"Chloe Park",role:"Head of Strategy",type:"champion",authority:"medium",av:"CP"}],threads:[{id:"eth_vltc_001",subject:"Re: ROI calculator follow-up",status:"stalled",messageCount:5,lastAt:"14d ago",messages:[{dir:"outbound",from:"Michael",at:"May 1 10:00",body:"Chloe — following up on the ROI calculator we shared. Based on your numbers, you're looking at approximately $2.1M in efficiency gains in year one. Happy to walk through the assumptions on a call. Are you still the right person to talk to about this?"},{dir:"agent",from:"Zotra",at:"May 1 10:01",isDraft:!0,body:"Chloe — I wanted to check in. It's been a couple of weeks since we shared the ROI analysis. I know things get busy — is this still a priority for Q3, or has the timeline shifted? Happy to adjust our approach to fit your schedule. — Michael"}]}],gaps:[{type:"re_engagement",severity:"high",status:"open",question:"Why has Voltic gone quiet after 14 days with no reply?",why:"No replies, opens, or site visits in 14 days. Auto-close risk in 7 days."},{type:"timeline_shift",severity:"medium",status:"open",question:"Has the Q3 timeline shifted internally at Voltic Energy?",why:"ROI calculator shared but no response. Budget cycle may have changed."}],readiness:38,phase:"discovery",aibrief:"Voltic Energy has gone quiet — 14 days with no reply, no opens, no site visits. Auto-close risk in 7 days. $320K ARR deal in discovery. Last interaction: ROI calculator shared May 1. Chloe Park (Head of Strategy) is the champion but unresponsive. Draft re-engage ready. Recommended action: send re-engagement message today, escalate to Omar Hassan (CEO) if no reply in 48h."},pebble:{contacts:[{name:"Sofia Mendes",role:"CEO",type:"sole_decision_maker",authority:"final",av:"SM"},{name:"Luke Brien",role:"Head of Ops",type:"champion",authority:"medium",av:"LB"}],threads:[{id:"eth_pbbl_001",subject:"Re: Enrichment complete — org map ready",status:"open",messageCount:3,lastAt:"2d ago",messages:[{dir:"agent",from:"Forager",at:"May 13 15:00",isAction:!0,body:"Pebble Group enrichment complete. Added 14 stakeholders, mapped reporting hierarchy, identified procurement contact: Luke Brien (Head of Ops). Org chart available in account workspace."},{dir:"outbound",from:"Michael",at:"May 13 16:00",body:"Sofia — great to connect. I've done some research on Pebble Group and I think there's a strong fit for how we help media companies manage their pricing workflows. Would you have 20 minutes this week for a discovery call?"}]}],gaps:[{type:"discovery_needed",severity:"medium",status:"open",question:"What is Pebble Group's primary pain point with pricing workflows?",why:"Enrichment complete but discovery call not yet scheduled."},{type:"budget_unknown",severity:"low",status:"open",question:"Is there an allocated budget for tooling this year?",why:"No budget signal from initial outreach."}],readiness:42,phase:"discovery",aibrief:"Pebble Group is in early discovery. Forager enrichment added 14 stakeholders and identified Luke Brien (Head of Ops) as procurement contact. Sofia Mendes (CEO) is the decision-maker. $64K ARR deal. Discovery call not yet scheduled. Recommended action: follow up on discovery call request with Sofia this week."},wisp:{contacts:[{name:"Emma Davis",role:"Founder",type:"sole_decision_maker",authority:"final",av:"ED"},{name:"Tom Walsh",role:"Operations Lead",type:"champion",authority:"medium",av:"TW"}],threads:[{id:"eth_wisp_001",subject:"Re: Mutual action plan — closing",status:"open",messageCount:6,lastAt:"3h ago",messages:[{dir:"inbound",from:"Emma Davis",at:"May 15 09:00",body:"Michael — we've reviewed the mutual action plan and we're happy to proceed. Tom will handle the onboarding coordination from our side. Can you confirm the go-live date and send the final agreement?"},{dir:"outbound",from:"Michael",at:"May 15 10:15",body:"Emma — brilliant, really pleased to hear it. Go-live confirmed for June 1. Sending the final agreement now. Tom — looking forward to working with you on the onboarding. I'll send the kickoff agenda separately."},{dir:"agent",from:"Zotra",at:"May 15 10:16",isAction:!0,body:"Deal moved to Closing stage. Go-live: June 1. Agreement sent to Emma Davis. Forecast updated. Onboarding workspace activated."}]}],gaps:[],readiness:95,phase:"closing",aibrief:"Wisp Studios is closing. Emma Davis (Founder) confirmed they're proceeding — mutual action plan accepted, go-live June 1. $14K ARR deal. Final agreement sent. Tom Walsh handling onboarding coordination. No qualification gaps. Recommended action: confirm agreement countersignature and send onboarding kickoff agenda."},merit:{contacts:[{name:"Grace Kim",role:"Managing Partner",type:"sole_decision_maker",authority:"final",av:"GK"}],threads:[{id:"eth_mert_001",subject:"Initial enquiry — legal sector",status:"open",messageCount:1,lastAt:"3d ago",messages:[{dir:"inbound",from:"Grace Kim",at:"May 12 11:00",body:"Hello — a colleague mentioned your platform. We're a 90-person legal firm and we're looking at tools to help manage our client pipeline better. Could you tell me more about how this works for professional services?"},{dir:"agent",from:"Zotra",at:"May 12 11:15",isDraft:!0,body:"Grace — thank you for reaching out. We work with several legal and professional services firms. The approach that tends to work well is starting with a 20-minute discovery call to understand your current pipeline process. Would this week work? — Michael"}]}],gaps:[{type:"budget_unknown",severity:"high",status:"open",question:"Is there a budget allocated for pipeline tooling this year?",why:"No budget signal in initial enquiry."},{type:"timeline_unknown",severity:"medium",status:"open",question:"What's the timeline for making a decision?",why:"Enquiry received 3 days ago with no follow-up yet."},{type:"scope_unknown",severity:"low",status:"open",question:"Which specific pipeline challenges are they trying to solve?",why:"Generic enquiry — needs discovery call to qualify."}],readiness:22,phase:"qualification",aibrief:"Merit & Vine is a new inbound lead from Grace Kim (Managing Partner). 90-person legal firm looking at pipeline tooling. Very early stage — no budget, timeline, or scope confirmed. Draft reply ready. 3 qualification gaps open. Recommended action: send draft reply and book discovery call this week."},sable:{contacts:[{name:"Liam Torres",role:"Head of Retail Ops",type:"champion",authority:"medium",av:"LT"},{name:"Dana Chu",role:"CEO",type:"sole_decision_maker",authority:"final",av:"DC"}],threads:[{id:"eth_sabl_001",subject:"Initial outreach — Sable & Co",status:"open",messageCount:1,lastAt:"5d ago",messages:[{dir:"outbound",from:"Michael",at:"May 10 09:00",body:"Liam — I came across Sable & Co while researching fast-growing retail operations teams. We help companies like yours manage their sales pipeline more efficiently. Would you have 15 minutes for a quick call to see if there's a fit?"},{dir:"agent",from:"Zotra",at:"May 10 09:01",isDraft:!0,body:"Liam — following up on my message from earlier this week. I know inboxes get busy — if pipeline efficiency isn't a priority right now, just let me know and I'll check back in next quarter. — Michael"}]}],gaps:[{type:"no_response",severity:"high",status:"open",question:"Why hasn't Liam responded after 5 days?",why:"Cold outbound — no response, no engagement signals."},{type:"qualification",severity:"medium",status:"open",question:"Is Sable & Co actively looking for pipeline tooling?",why:"Outbound lead — intent not confirmed."}],readiness:15,phase:"qualification",aibrief:"Sable & Co is an outbound lead — cold outreach to Liam Torres (Head of Retail Ops) 5 days ago with no response. $24K ARR potential. Very early stage. Dana Chu (CEO) is the decision-maker but not yet contacted. Draft follow-up ready. Recommended action: send follow-up today, consider reaching out to Dana directly if no reply in 48h."}},D=`
/* ── Detail drawer ── */
.acc-detail-panel {
  position: absolute; top: 0; right: 0; bottom: 0;
  width: min(620px, 72%);
  background: var(--bg, #F6F6FB);
  border-left: 0.5px solid var(--brd, var(--brd));
  box-shadow: -12px 0 32px rgba(60,50,150,.12);
  z-index: 100; display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform .25s cubic-bezier(.4,0,.2,1);
}
.acc-detail-panel.open { transform: translateX(0); }

/* bar */
.adp-bar {
  height: 50px; background: var(--bg2, #fff);
  border-bottom: 0.5px solid var(--brd, var(--brd));
  display: flex; align-items: center; gap: 10px; padding: 0 16px; flex-shrink: 0;
}
.adp-ic-btn {
  width: 26px; height: 26px; border-radius: 7px;
  border: 0.5px solid var(--brd2, var(--brd2));
  background: var(--bg2, #fff); display: flex; align-items: center;
  justify-content: center; cursor: pointer; color: var(--ink3, var(--ink3));
  transition: all .12s; flex-shrink: 0;
}
.adp-ic-btn:hover { background: var(--pu, #F4F3FC); color: var(--p, #5552C9); border-color: var(--brd3, var(--brd3)); }
.adp-ic-btn.close { background: #4B48C8; color: #fff; border: none; box-shadow: 0 1px 3px rgba(75,72,200,.30); }
.adp-ic-btn.close:hover { filter: brightness(.88); background: #4B48C8; color: #fff; border-color: transparent; }

/* scroll */
.adp-scroll { flex: 1; overflow-y: auto; }
.adp-scroll::-webkit-scrollbar { width: 4px; }
.adp-scroll::-webkit-scrollbar-thumb { background: var(--brd2, var(--brd2)); border-radius: 99px; }

/* hero */
.adp-hero {
  padding: 18px 22px;
  background: var(--bg2, #fff);
  border-bottom: 0.5px solid var(--brd, var(--brd));
  display: flex; gap: 14px; align-items: flex-start;
}
.adp-hero-name {
  font-family: "Sora", sans-serif; font-size: 18px; font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink, var(--ink)); margin-bottom: 2px; line-height: 1.2;
}
.adp-hero-meta {
  font-size: 12px; color: var(--ink4, var(--ink4));
  font-family: "DM Mono", monospace;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}

/* stats row */
.adp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  background: var(--bg2, #fff);
  border-bottom: 0.5px solid var(--brd, var(--brd));
}
.adp-stat {
  padding: 12px 16px;
  border-right: 0.5px solid var(--brd, var(--brd));
}
.adp-stat:last-child { border-right: 0; }
.adp-stat-l {
  font-size: 9.5px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--ink5, var(--ink5)); margin-bottom: 3px;
}
.adp-stat-v {
  font-family: "Sora", sans-serif; font-size: 16px; font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink, var(--ink)); line-height: 1.1;
}

/* tab bar */
.adp-tabs {
  display: flex; padding: 0 12px; gap: 1px;
  background: var(--bg2, #fff);
  border-bottom: 0.5px solid var(--brd, var(--brd));
  overflow-x: auto; scrollbar-width: none;
}
.adp-tabs::-webkit-scrollbar { display: none; }
.adp-tab {
  height: 40px; padding: 0 10px; border: none;
  border-bottom: 2.5px solid transparent;
  background: transparent; cursor: pointer; font-family: inherit;
  font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;
  transition: color .12s, background .12s; white-space: nowrap;
  color: var(--ink4, var(--ink4)); font-weight: 500;
  position: relative; top: 0.5px; border-radius: 6px 6px 0 0;
}
.adp-tab:hover { color: var(--ink); background: rgba(75,72,200,0.05); }
.adp-tab.on { border-bottom-color: #4B48C8; color: #4B48C8; font-weight: 700; background: rgba(75,72,200,0.07); }
.adp-tab-icon {
  display: flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; border-radius: 5px;
  background: transparent; transition: background .12s; flex-shrink: 0;
}
.adp-tab:hover .adp-tab-icon { background: rgba(75,72,200,0.08); }
.adp-tab.on .adp-tab-icon { background: rgba(75,72,200,0.14); }
.adp-tab-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 15px; height: 15px; padding: 0 4px;
  border-radius: 99px; font-size: 8px; font-weight: 700; line-height: 1;
}
.adp-tab.on .adp-tab-badge { background: #4B48C8; color: #fff; }
.adp-tab:not(.on) .adp-tab-badge { background: rgba(75,72,200,0.12); color: #4B48C8; }

/* body */
.adp-body { padding: 18px 22px; }
.adp-sect { margin-bottom: 18px; }
.adp-sect-h {
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--ink5, var(--ink5));
  margin-bottom: 9px; display: flex; align-items: center; gap: 6px;
}
.adp-sect-more {
  margin-left: auto; font-weight: 500; color: var(--ink4, var(--ink4));
  font-size: 11px; letter-spacing: 0; text-transform: none; cursor: pointer;
}
.adp-sect-more:hover { color: var(--p, #5552C9); }

/* AI brief */
.adp-ai {
  padding: 14px; border-radius: 12px;
  background: linear-gradient(180deg, var(--pu, #F4F3FC) 0%, var(--bg2, #fff) 90%);
  border: 0.5px solid var(--brd2, var(--brd2));
  display: flex; gap: 11px; align-items: flex-start;
}
.adp-ai-ic {
  width: 30px; height: 30px; border-radius: 9px;
  background: linear-gradient(135deg, #5552C9 0%, #7370E0 100%);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
.adp-ai-text { font-size: 12.5px; color: var(--ink2, var(--ink2)); line-height: 1.6; flex: 1; }
.adp-ai-text b { color: var(--ink, var(--ink)); font-weight: 600; }
.adp-ai-acts { display: flex; gap: 5px; margin-top: 10px; flex-wrap: wrap; }

/* stakeholder card */
.adp-stake {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 11px; border-radius: 10px;
  border: 0.5px solid var(--brd, var(--brd));
  background: var(--bg2, #fff); margin-bottom: 5px;
}
.adp-stake-info { flex: 1; min-width: 0; line-height: 1.25; }
.adp-stake-name { font-size: 12.5px; font-weight: 600; color: var(--ink, var(--ink)); }
.adp-stake-role { font-size: 11px; color: var(--ink4, var(--ink4)); }

/* timeline */
.adp-tl { position: relative; padding-left: 18px; margin-top: 4px; }
.adp-tl::before {
  content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px;
  width: 1.5px; background: var(--brd2, var(--brd2));
}
.adp-tl-row {
  position: relative; margin-bottom: 9px;
  font-size: 12px; color: var(--ink3, var(--ink3)); line-height: 1.5;
}
.adp-tl-row::before {
  content: ""; position: absolute; left: -16px; top: 5px;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--bg2, #fff); border: 1.5px solid var(--p, #5552C9);
}
.adp-tl-row b { color: var(--ink, var(--ink)); font-weight: 600; }
.adp-tl-time { font-family: "DM Mono", monospace; font-size: 10.5px; color: var(--ink5, var(--ink5)); margin-left: 6px; }

/* thread message */
.adp-msg {
  border-radius: 12px; margin-bottom: 8px;
  padding: 12px 14px;
}
.adp-msg-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.adp-msg-from { font-size: 12px; font-weight: 600; color: var(--ink, var(--ink)); }
.adp-msg-body { font-size: 12.5px; line-height: 1.65; }

/* thread wrap */
.adp-thread-head {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 10px 12px; background: var(--bg3, #EFEFF7);
  border-radius: 10px 10px 0 0;
  border: 0.5px solid var(--brd, var(--brd)); border-bottom: none;
}
.adp-thread-body {
  border: 0.5px solid var(--brd, var(--brd));
  border-top: none; border-radius: 0 0 10px 10px;
  padding: 12px 12px 8px; background: var(--bg, #F6F6FB);
}

/* contact card (full) */
.adp-contact-card {
  background: var(--bg2, #fff);
  border: 0.5px solid var(--brd, var(--brd));
  border-radius: 12px; padding: 14px 16px; margin-bottom: 8px;
}

/* gap card */
.adp-gap-card { border-radius: 12px; padding: 13px 15px; margin-bottom: 8px; }
.adp-gap-card-inner {
  font-size: 12px; padding: 9px 11px; border-radius: 8px;
  border: 0.5px solid var(--brd, var(--brd));
  display: flex; gap: 8px; align-items: flex-start;
}

/* chips / pills */
.adp-heat-bub {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 20px; font-size: 10.5px; font-weight: 600;
  border: 0.5px solid transparent;
}
.adp-heat-bub.hot  { background: rgba(229,86,108,0.10); color: #A02742; border-color: rgba(229,86,108,0.20); }
.adp-heat-bub.warm { background: rgba(217,119,87,0.10); color: #A04E2A; border-color: rgba(217,119,87,0.18); }
.adp-heat-bub.cool { background: rgba(63,117,220,0.08); color: #1D4ED8; border-color: rgba(63,117,220,0.18); }
.adp-heat-dot { width: 6px; height: 6px; border-radius: 50%; }
.adp-heat-dot.hot  { background: #E5566C; }
.adp-heat-dot.warm { background: #D97757; }
.adp-heat-dot.cool { background: #3F75DC; }

.adp-stage-chip {
  font-size: 10px; padding: 2px 8px; border-radius: 6px;
  font-weight: 600; font-family: "DM Mono", monospace;
  text-transform: uppercase; letter-spacing: .04em;
}
.adp-stage-chip.qual  { background: #FBF1DE; color: #7C4C12; }
.adp-stage-chip.disc  { background: #E0EAFB; color: #1D4ED8; }
.adp-stage-chip.eval  { background: #EBE3FA; color: #5B2EC8; }
.adp-stage-chip.nego  { background: #FCEFE7; color: #A04E2A; }
.adp-stage-chip.close { background: #D5F7EC; color: #0F6050; }

.adp-tag {
  font-size: 9.5px; font-family: "DM Mono", monospace; font-weight: 500;
  padding: 1px 6px; border-radius: 4px; letter-spacing: .02em;
  text-transform: uppercase; display: inline-block;
}
.adp-tag.br   { background: #EEEDF9; color: #5552C9; }
.adp-tag.ok   { background: #E6FAF1; color: #0B5E45; }
.adp-tag.wa   { background: #FBF1DE; color: #7C4C12; }
.adp-tag.mu   { background: #EFEFF7; color: var(--ink4); border: 0.5px solid var(--brd2); }
.adp-tag.amber{ background: #FCEFE7; color: #A04E2A; }

/* empty */
.adp-empty {
  padding: 40px; text-align: center;
  color: var(--ink4, var(--ink4)); font-size: 12px;
}
`,j={sole_decision_maker:"br",financial_approver:"wa",champion:"ok",influencer:"mu",economic_buyer:"amber"},C={sole_decision_maker:"Decision Maker",financial_approver:"Financial Approver",champion:"Champion",influencer:"Influencer",economic_buyer:"Economic Buyer"},_=s=>s==="hot"?"Hot":s==="warm"?"Warm":"Cool",z=({m:s})=>{const r=!!s.isDraft,o=!!s.isAction,l=s.dir==="agent",b=r?"linear-gradient(180deg,var(--pu,#F4F3FC) 0%,var(--bg2,#fff) 90%)":o?"var(--bg3,#EFEFF7)":"var(--bg2,#fff)",y=r?"0.5px solid var(--brd2,var(--brd2))":o?"0.5px dashed var(--brd2,var(--brd2))":"0.5px solid var(--brd,rgba(60,50,150,.07))",t=o?"var(--ink4,var(--ink4))":"var(--ink2,var(--ink2))",u=s.dir==="outbound"?28:0,d=s.dir==="inbound"?28:0,c=l?r?"Zotra — draft reply":o?`${s.from} — system note`:s.from:s.from;return e.jsxs("div",{className:"adp-msg",style:{background:b,border:y,marginLeft:u,marginRight:d},children:[e.jsxs("div",{className:"adp-msg-head",children:[l?e.jsx("span",{style:{width:24,height:24,borderRadius:7,background:"linear-gradient(135deg,#5552C9,#7370E0)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx(i,{name:"sparkles",size:12,color:"#fff"})}):e.jsx("span",{className:"av "+x(s.from),style:{width:24,height:24,borderRadius:7,fontSize:9,flexShrink:0},children:s.from.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase()}),e.jsx("span",{className:"adp-msg-from",children:c}),r&&e.jsx("span",{style:{fontSize:9.5,padding:"1px 7px",borderRadius:4,background:"#FCEFE7",color:"#A04E2A",fontWeight:600},children:"DRAFT"}),s.dir==="outbound"&&!r&&e.jsx("span",{style:{fontSize:9.5,padding:"1px 7px",borderRadius:4,background:"#E6FAF1",color:"#0B5E45",fontWeight:600},children:"SENT"}),e.jsx("span",{style:{marginLeft:"auto",fontFamily:"DM Mono",fontSize:10,color:"var(--ink5,var(--ink5))"},children:s.at})]}),e.jsx("div",{className:"adp-msg-body",style:{color:t},children:s.body}),r&&e.jsxs("div",{style:{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(i,{name:"send",size:12})," Send"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(i,{name:"edit-3",size:12})," Edit"]}),e.jsxs("button",{className:"btn sm ghost",children:[e.jsx(i,{name:"rotate-cw",size:12})," Rephrase"]}),e.jsxs("button",{className:"btn sm ghost",children:[e.jsx(i,{name:"x",size:12})," Dismiss"]})]})]})},T=({accountId:s,onClose:r})=>{const[o,l]=g.useState("overview"),[b,y]=g.useState(!1);g.useEffect(()=>{if(!document.getElementById("adp-styles")){const a=document.createElement("style");a.id="adp-styles",a.textContent=D,document.head.appendChild(a)}},[]),g.useEffect(()=>{s?(l("overview"),requestAnimationFrame(()=>y(!0))):y(!1)},[s]),g.useEffect(()=>{const a=n=>{n.key==="Escape"&&r()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[r]);const t=s?w.find(a=>a.id===s)||w.find(a=>a.name.toLowerCase().includes(s.toLowerCase())):null;if(!t)return e.jsx("div",{className:`acc-detail-panel${b?" open":""}`});const u=E.find(a=>a.id===t.stage),d=R[t.id]||{},c=d.contacts||[],p=d.threads||[],h=d.gaps||[],k=d.aibrief||"",S=d.readiness||"",N=p.reduce((a,n)=>a+n.messages.length,0);return e.jsxs("div",{className:`acc-detail-panel${b?" open":""}`,children:[e.jsxs("div",{className:"adp-bar",children:[e.jsx("button",{className:"adp-ic-btn close",onClick:r,title:"Close",children:e.jsx(i,{name:"x",size:13})}),e.jsx("span",{style:{fontFamily:"DM Mono",fontSize:11,color:"var(--ink4,var(--ink4))"},children:t.domain||t.id}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",gap:6},children:[e.jsxs("button",{className:"btn sm",children:[e.jsx(i,{name:"sparkles",size:12})," Ask Zotra"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(i,{name:"mail",size:12})," Email"]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(i,{name:"calendar",size:12})," Schedule"]}),e.jsx("button",{className:"adp-ic-btn",children:e.jsx(i,{name:"more-horizontal",size:13})})]})]}),e.jsxs("div",{className:"adp-scroll",children:[e.jsxs("div",{className:"adp-hero",children:[e.jsx("span",{className:"av "+x(t.name),style:{width:46,height:46,borderRadius:12,fontSize:15,flexShrink:0},children:A(t.name)}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"adp-hero-name",children:t.name}),e.jsxs("div",{className:"adp-hero-meta",children:[t.industry&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:t.industry}),e.jsx("span",{children:"·"})]}),t.size&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{children:[t.size," employees"]}),e.jsx("span",{children:"·"})]}),e.jsxs("span",{className:"adp-heat-bub "+t.heat,children:[e.jsx("span",{className:"adp-heat-dot "+t.heat}),_(t.heat)]}),e.jsx("span",{className:"adp-stage-chip "+t.stage,children:u==null?void 0:u.name}),d.phase&&e.jsx("span",{style:{fontSize:10,padding:"2px 7px",borderRadius:4,background:"var(--bg3,#EFEFF7)",color:"var(--ink4,var(--ink4))",fontFamily:"DM Mono",border:"0.5px solid var(--brd)"},children:d.phase})]})]})]}),e.jsxs("div",{className:"adp-stats",children:[e.jsxs("div",{className:"adp-stat",children:[e.jsx("div",{className:"adp-stat-l",children:"Deal value"}),e.jsx("div",{className:"adp-stat-v",children:M(t.value)})]}),e.jsxs("div",{className:"adp-stat",children:[e.jsx("div",{className:"adp-stat-l",children:"Readiness"}),e.jsxs("div",{className:"adp-stat-v",children:[S,e.jsx("span",{style:{fontSize:11,color:"var(--ink4,var(--ink4))",fontFamily:"DM Mono",marginLeft:2},children:"/100"})]})]}),e.jsxs("div",{className:"adp-stat",children:[e.jsx("div",{className:"adp-stat-l",children:"In stage"}),e.jsxs("div",{className:"adp-stat-v",children:[t.cycle,e.jsx("span",{style:{fontSize:11,color:"var(--ink4,var(--ink4))",fontFamily:"DM Mono",marginLeft:2},children:"d"})]})]}),e.jsxs("div",{className:"adp-stat",children:[e.jsx("div",{className:"adp-stat-l",children:"Signal"}),e.jsx("div",{className:"adp-stat-v",style:{fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t.intent})]})]}),e.jsx("div",{className:"adp-tabs",children:["overview","threads","contacts","gaps"].filter(a=>a!=="gaps"||h.length>0).map(a=>{const n={overview:"layout-dashboard",threads:"mail",contacts:"users",gaps:"circle-alert"},m={overview:"Overview",threads:"Emails",contacts:"Stakeholders",gaps:"Gaps"},v={overview:null,threads:N||null,contacts:c.length||null,gaps:h.length||null}[a];return e.jsxs("button",{className:"adp-tab"+(o===a?" on":""),onClick:()=>l(a),children:[e.jsx("span",{className:"adp-tab-icon",children:e.jsx(i,{name:n[a],size:12})}),m[a],v!=null&&e.jsx("span",{className:"adp-tab-badge",children:v})]},a)})}),e.jsxs("div",{className:"adp-body",children:[o==="overview"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"adp-sect",children:[e.jsxs("div",{className:"adp-sect-h",children:[e.jsx(i,{name:"sparkles",size:12})," Zotra brief"]}),e.jsxs("div",{className:"adp-ai",children:[e.jsx("div",{className:"adp-ai-ic",children:e.jsx(i,{name:"sparkles",size:14,color:"#fff"})}),e.jsxs("div",{className:"adp-ai-text",children:[k||e.jsxs("span",{children:[e.jsx("b",{children:t.name})," — run customer research to generate a brief."]}),e.jsxs("div",{className:"adp-ai-acts",children:[e.jsxs("button",{className:"btn sm pri",children:[e.jsx(i,{name:"mail",size:12})," Draft reply"]}),h.length>0&&e.jsxs("button",{className:"btn sm",onClick:()=>l("gaps"),children:[e.jsx(i,{name:"circle-alert",size:12})," ",h.length," ","gap",h.length>1?"s":""]}),e.jsxs("button",{className:"btn sm",children:[e.jsx(i,{name:"message-square",size:12})," Ask Zotra"]})]})]})]})]}),c.length>0&&e.jsxs("div",{className:"adp-sect",children:[e.jsxs("div",{className:"adp-sect-h",children:[e.jsx(i,{name:"users",size:12})," Key stakeholders",e.jsx("span",{className:"adp-sect-more",onClick:()=>l("contacts"),children:"view all"})]}),c.slice(0,3).map((a,n)=>e.jsxs("div",{className:"adp-stake",children:[e.jsx("span",{className:"av "+x(a.name),style:{width:28,height:28,borderRadius:8,fontSize:10},children:a.av}),e.jsxs("div",{className:"adp-stake-info",children:[e.jsx("div",{className:"adp-stake-name",children:a.name}),e.jsx("div",{className:"adp-stake-role",children:a.role})]}),e.jsx("span",{className:"adp-tag "+(j[a.type]||"mu"),style:{fontSize:9},children:(C[a.type]||a.type).toUpperCase()})]},n))]}),p.length>0&&e.jsxs("div",{className:"adp-sect",children:[e.jsxs("div",{className:"adp-sect-h",children:[e.jsx(i,{name:"clock",size:12})," Recent activity",e.jsx("span",{className:"adp-sect-more",onClick:()=>l("threads"),children:"view emails"})]}),e.jsx("div",{className:"adp-tl",children:p[0].messages.slice().reverse().slice(0,5).map((a,n)=>e.jsxs("div",{className:"adp-tl-row",children:[e.jsx("b",{children:a.dir==="agent"||a.dir==="inbound"?a.from:"You"}),a.isDraft&&e.jsx("span",{style:{marginLeft:4,fontSize:9,padding:"1px 5px",borderRadius:4,background:"#FCEFE7",color:"#A04E2A",fontWeight:600},children:"DRAFT"})," — ",a.body.slice(0,72),a.body.length>72?"…":"",e.jsx("span",{className:"adp-tl-time",children:a.at})]},n))})]}),e.jsxs("div",{className:"adp-sect",children:[e.jsxs("div",{className:"adp-sect-h",children:[e.jsx(i,{name:"activity",size:12})," Signals · 14d"]}),e.jsx(F,{data:t.signals,width:240,height:32,color:"var(--p,#5552C9)"})]})]}),o==="threads"&&e.jsx(e.Fragment,{children:p.length===0?e.jsx("div",{className:"adp-empty",children:"No email threads yet."}):p.map((a,n)=>e.jsxs("div",{style:{marginBottom:18},children:[e.jsxs("div",{className:"adp-thread-head",children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:13,fontWeight:600,color:"var(--ink,var(--ink))",marginBottom:2},children:a.subject}),e.jsxs("div",{style:{fontSize:10.5,color:"var(--ink5,var(--ink5))",fontFamily:"DM Mono",display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("span",{children:[a.messageCount," messages"]}),e.jsx("span",{children:"·"}),e.jsx("span",{children:a.lastAt}),e.jsx("span",{children:"·"}),e.jsx("span",{style:{color:a.status==="open"?"var(--ok,#1D9E75)":a.status==="stalled"?"var(--wa,#C17B2A)":a.status==="resolved"?"var(--ink5,var(--ink5))":"var(--ink4,var(--ink4))"},children:a.status.replace("_"," ")})]})]}),e.jsxs("button",{className:"btn sm pri",children:[e.jsx(i,{name:"mail",size:12})," Reply"]})]}),e.jsx("div",{className:"adp-thread-body",children:a.messages.map((m,f)=>e.jsx(z,{m},f))})]},n))}),o==="contacts"&&e.jsx(e.Fragment,{children:c.length===0?e.jsx("div",{className:"adp-empty",children:"No contacts mapped yet. Run customer research to populate."}):c.map((a,n)=>e.jsxs("div",{className:"adp-contact-card",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[e.jsx("span",{className:"av "+x(a.name),style:{width:38,height:38,borderRadius:10,fontSize:13},children:a.av}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:13.5,fontWeight:600,color:"var(--ink,var(--ink))"},children:a.name}),e.jsx("div",{style:{fontSize:12,color:"var(--ink4,var(--ink4))",marginTop:2},children:a.role})]}),e.jsx("span",{className:"adp-tag "+(j[a.type]||"mu"),children:(C[a.type]||a.type).toUpperCase()})]}),e.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:"var(--bg3,#EFEFF7)",color:"var(--ink4,var(--ink4))",border:"0.5px solid var(--brd)"},children:["Authority: ",a.authority]}),e.jsxs("button",{className:"btn xs",children:[e.jsx(i,{name:"mail",size:10})," Email"]}),e.jsxs("button",{className:"btn xs",children:[e.jsx(i,{name:"calendar",size:10})," Schedule"]})]})]},n))}),o==="gaps"&&e.jsx(e.Fragment,{children:h.length===0?e.jsxs("div",{className:"adp-empty",style:{color:"var(--ok,#1D9E75)"},children:[e.jsx(i,{name:"check-circle",size:28,color:"var(--ok,#1D9E75)"}),e.jsx("div",{style:{marginTop:10,fontWeight:600},children:"No open gaps — this workspace is clear."})]}):h.map((a,n)=>{const m=a.severity==="high"?"var(--ri,#D7384F)":a.severity==="medium"?"var(--wa,#C17B2A)":"var(--ink5,var(--ink5))",f=a.severity==="high"?"var(--rib,#FBE6EA)":a.severity==="medium"?"var(--wab,#FBF1DE)":"var(--bg3,#EFEFF7)",v=a.severity==="high"?"var(--rif,#891322)":a.severity==="medium"?"var(--waf,#7C4C12)":"var(--ink4,var(--ink4))";return e.jsxs("div",{className:"adp-gap-card",style:{background:"var(--bg2,#fff)",border:`0.5px solid ${m}`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6},children:[e.jsx(i,{name:"circle-alert",size:14,color:m}),e.jsx("span",{style:{fontSize:11.5,fontWeight:600,fontFamily:"DM Mono",color:"var(--ink,var(--ink))"},children:a.type}),e.jsx("span",{style:{marginLeft:"auto",fontSize:9.5,padding:"1px 7px",borderRadius:4,background:f,color:v,fontWeight:600},children:a.severity.toUpperCase()}),e.jsx("span",{style:{fontSize:10,padding:"1px 7px",borderRadius:4,background:"var(--bg3,#EFEFF7)",color:"var(--ink5,var(--ink5))"},children:a.status})]}),e.jsx("div",{style:{fontSize:12,color:"var(--ink3,var(--ink3))",marginBottom:9,lineHeight:1.55},children:a.why}),e.jsxs("div",{className:"adp-gap-card-inner",style:{background:"var(--bg3,#EFEFF7)",color:"var(--ink2,var(--ink2))"},children:[e.jsx(i,{name:"message-circle",size:13,color:"var(--p,#5552C9)"}),e.jsxs("span",{style:{fontStyle:"italic",flex:1},children:['"',a.question,'"']})]}),e.jsxs("div",{style:{display:"flex",gap:6,marginTop:9},children:[e.jsxs("button",{className:"btn xs pri",children:[e.jsx(i,{name:"mail",size:10})," Ask in reply"]}),e.jsxs("button",{className:"btn xs",children:[e.jsx(i,{name:"check",size:10})," Mark resolved"]})]})]},n)})})]})]})]})};export{T as A};
