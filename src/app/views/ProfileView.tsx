import React from 'react';
import PanelProfile from './PanelProfile';

const ProfileView: React.FC = () => {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--bg)' }}>
      <PanelProfile />
    </div>
  );
};

export default ProfileView;