// /* eslint-disable react-refresh/only-export-components */
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// export function useHashScroll() {
//   const loc = useLocation();
//   useEffect(() => {
//     if (loc.hash) {
//       const id = loc.hash.slice(1);
//       let attempts = 0;
//       const tryScroll = () => {
//         const el = document.getElementById(id);
//         if (el) {
//           el.scrollIntoView({ behavior: 'smooth' });
//         } else if (attempts < 20) {
//           attempts++;
//           setTimeout(tryScroll, 50);
//         }
//       };
//       setTimeout(tryScroll, 50);
//     } else {
//       window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
//     }
//   }, [loc.pathname, loc.hash]);
// }

// function NavHashLink({ to, children }: { to: string; children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const loc = useLocation();
//   const cls = 'px-3 py-1.5 text-[13px] text-ink-3 hover:text-indigo transition-colors duration-150 cursor-pointer font-medium tracking-[0.005em]';
//   const handleClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const hashIndex = to.indexOf('#');
//     const path = to.slice(0, hashIndex);
//     const hash = to.slice(hashIndex);
//     if (loc.pathname === path) {
//       document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       navigate(path + hash);
//     }
//   };
//   return <a href={to} className={cls} onClick={handleClick}>{children}</a>;
// }

// export default function Nav() {
//   const loc = useLocation();
//   const active = (path: string) => loc.pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-sand" >
//       <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-[62px]" >
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3" >
//           <div
//             className="w-[32px] h-[32px] rounded-lg bg-center bg-cover" 
//             style={{ backgroundImage: "url('/logo-website.png')" }}
//           />
//           <div>
//             <div className="font-serif font-semibold text-[17px] text-ink leading-none tracking-[-0.01em]" >Zotra</div>
//             <div className="text-[9px] text-ink-4 font-mono tracking-[0.16em] uppercase mt-0.5" >AI commercial team</div>
//           </div>
//         </Link>

//         {/* Centre nav */}
//         <div className="flex items-center gap-0.5" >
//           {[
//             { label: 'Home', to: '/' },
//             { label: 'Product', to: '/product' },
//           ].map(({ label, to }) => (
//             <Link
//               key={to}
//               to={to}
//               className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150 ${
//                 active(to)
//                   ? 'text-indigo bg-indigo-pale'
//                   : 'text-ink-3 hover:text-indigo hover:bg-indigo-pale/50'
//               }`}
//             >
//               {label}
//             </Link>
//           ))}
//           <NavHashLink to="/#agents">Agents</NavHashLink>
//           <NavHashLink to="/#pulse">Pulse Engine</NavHashLink>
//           <NavHashLink to="/#editions">Pricing</NavHashLink>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-2.5" >
//           <Link
//             to="/login"
//             target="_blank"
//             className="px-4 h-[36px] inline-flex items-center rounded-lg border border-sand text-[13px] text-ink-2 font-medium hover:border-ink-5 hover:bg-cream-200 transition-all" 
//           >
//             Sign in
//           </Link>
//           <Link
//             to="/signup"
//             target="_blank"
//             className="px-4 h-[36px] inline-flex items-center gap-1.5 rounded-lg bg-indigo text-white text-[13px] font-medium hover:bg-indigo-light transition-all shadow-[0_2px_8px_rgba(85,82,201,0.22)]" 
//           >
//             Start free <span className="font-mono text-[11px]" >→</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }




/* eslint-disable react-refresh/only-export-components */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export function useHashScroll() {
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash) {
      const id = loc.hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryScroll, 50);
        }
      };
      setTimeout(tryScroll, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [loc.pathname, loc.hash]);
}

function NavHashLink({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  const loc = useLocation();
  const cls = 'px-3 py-1.5 text-[13px] text-ink-3 hover:text-indigo transition-colors duration-150 cursor-pointer font-medium tracking-[0.005em]';
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const hashIndex = to.indexOf('#');
    const path = to.slice(0, hashIndex);
    const hash = to.slice(hashIndex);
    if (loc.pathname === path) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path + hash);
    }
  };
  return <a href={to} className={cls} onClick={handleClick}>{children}</a>;
}

export default function Nav() {
  const loc = useLocation();
  const active = (path: string) => loc.pathname === path;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Fixed nav — always visible on every page */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: '62px',
          background: 'rgba(250, 248, 243, 0.97)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(200,185,160,0.5)',
          boxShadow: scrolled ? '0 2px 20px rgba(60,50,30,0.09)' : 'none',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-[32px] h-[32px] rounded-lg bg-center bg-cover"
              style={{ backgroundImage: "url('/logo-website.png')" }}
            />
            <div>
              <div className="font-serif font-semibold text-[17px] text-ink leading-none tracking-[-0.01em]">Zotra</div>
              <div className="text-[9px] text-ink-4 font-mono tracking-[0.16em] uppercase mt-0.5">AI commercial team</div>
            </div>
          </Link>

          {/* Centre nav */}
          <div className="flex items-center gap-0.5">
            {[
              { label: 'Home', to: '/' },
              { label: 'How it works', to: '/product' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150 ${
                  active(to)
                    ? 'text-indigo bg-indigo-pale'
                    : 'text-ink-3 hover:text-indigo hover:bg-indigo-pale/50'
                }`}
              >
                {label}
              </Link>
            ))}
            <NavHashLink to="/#agents">Agents</NavHashLink>
            <NavHashLink to="/#editions">Pricing</NavHashLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              target="_blank"
              className="px-4 h-[36px] inline-flex items-center rounded-lg border border-sand text-[13px] text-ink-2 font-medium hover:border-ink-5 hover:bg-cream-200 transition-all"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              target="_blank"
              className="px-4 h-[36px] inline-flex items-center gap-1.5 rounded-lg bg-indigo text-white text-[13px] font-medium hover:bg-indigo-light transition-all shadow-[0_2px_8px_rgba(85,82,201,0.22)]"
            >
              Start free <span className="font-mono text-[11px]">→</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer so page content starts below the fixed nav */}
      <div style={{ height: '62px' }} />
    </>
  );
}