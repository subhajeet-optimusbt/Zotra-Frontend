import React from 'react';
import Icon from './Icon';

interface SimpleViewProps { title: string; icon: string; blurb: string; sub?: string; }

const SimpleView: React.FC<SimpleViewProps> = ({ title, icon, blurb, sub }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
    <div style={{ padding: '18px 24px 14px', background: 'var(--bg2)', borderBottom: '0.5px solid var(--brd)' }}>
      <div className="sora fz22 fw6" >{title}</div>
      {sub && <div className="t-ink4 fz12"  style={{ marginTop: 4 }}>{sub}</div>}
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: 28, border: '0.5px dashed var(--brd2)', borderRadius: 16, background: 'var(--bg2)' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--pp)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p)', marginBottom: 10 }}>
          <Icon name={icon} size={22} />
        </div>
        <div className="sora fz16 fw6" >{title}</div>
        <div className="t-ink4 fz12"  style={{ marginTop: 6, lineHeight: 1.6 }}>{blurb}</div>
      </div>
    </div>
  </div>
);

export default SimpleView;
