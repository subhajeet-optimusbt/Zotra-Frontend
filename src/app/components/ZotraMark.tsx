import React from 'react';

interface ZotraMarkProps { size?: number; }

const ZotraMark: React.FC<ZotraMarkProps> = ({ size = 26 }) => (
  <span style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, background: 'linear-gradient(135deg,#5552C9,#7A78E0)', color: '#fff', fontFamily: 'Sora,sans-serif', fontWeight: 700, fontSize: size * 0.5, letterSpacing: '-0.04em', boxShadow: '0 1px 2px rgba(75,72,200,0.30), inset 0 1px 0 rgba(255,255,255,0.25)' }}>z</span>
);

export default ZotraMark;
