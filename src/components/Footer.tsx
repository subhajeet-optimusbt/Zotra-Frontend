import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-sand bg-cream-200" >
      <div className="max-w-[1280px] mx-auto px-8" >
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10" >
          <div className="max-w-[300px]" >
            <Link to="/" className="flex items-center gap-3" >
              <div className="w-[32px] h-[32px] rounded-lg bg-center bg-cover"  style={{backgroundImage:"url('/logo-website.png')"}} />
              <div>
                <div className="font-serif font-semibold text-[17px] text-ink leading-none tracking-[-0.01em]" >Zotra</div>
                <div className="text-[9px] text-ink-4 font-mono tracking-[0.16em] uppercase mt-0.5" >AI commercial team</div>
              </div>
            </Link>
            <p className="mt-4 text-[12.5px] text-ink-4 leading-[1.6] font-light" >The AI commercial team that runs your day. Drafts overnight, watches every champion, hands you a five-minute morning brief.</p>
            <div className="mt-5 flex items-center gap-2" >
              <span className="font-mono text-[10px] text-ink-5 tracking-[0.06em]" >SOC 2 TYPE II</span>
              <span className="w-1 h-1 rounded-full bg-ink-6"  />
              <span className="font-mono text-[10px] text-ink-5 tracking-[0.06em]" >GDPR</span>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-4 mb-4 font-mono" >Product</h5>
            <ul className="flex flex-col gap-2.5" >
              {[['How it works', '/product'], ['Agents', '/#agents'], ['Pulse Engine', '/#pulse'], ['Constellation', '/#constellation'], ['Editions', '/#editions']].map(([label, href]) => (
                <li key={label}><Link to={href} className="text-[13px] text-ink-3 hover:text-indigo transition-colors" >{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-4 mb-4 font-mono" >Company</h5>
            <ul className="flex flex-col gap-2.5" >
              {[['Manifesto', '/#manifesto'], ['Customers', '/#icp'], ['Careers', '#'], ['Contact', '#']].map(([label, href]) => (
                <li key={label}><Link to={href} className="text-[13px] text-ink-3 hover:text-indigo transition-colors" >{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-4 mb-4 font-mono" >Account</h5>
            <ul className="flex flex-col gap-2.5" >
              {[['Start free', '/signup'], ['Sign in', '/login'], ['Security', '#'], ['Privacy', '#'], ['Status', '#']].map(([label, href]) => (
                <li key={label}><Link to={href} className="text-[13px] text-ink-3 hover:text-indigo transition-colors" >{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-sand flex justify-between items-center" >
          <div className="text-[11px] text-ink-5 font-mono tracking-[0.04em]" >© 2026 Zotra · The AI commercial team</div>
          <div className="text-[11px] text-ink-5 font-mono tracking-[0.04em]" >v4.0 · build 2611</div>
        </div>
      </div>
    </footer>
  );
}
