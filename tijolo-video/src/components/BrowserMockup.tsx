import React from 'react';
import { COLORS } from '../styles';

type BrowserMockupProps = {
  children: React.ReactNode;
  url?: string;
};

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  children,
  url = 'tijolo.com',
}) => {
  return (
    <div
      style={{
        width: 1600,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.2)',
        background: COLORS.white,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 44,
          background: '#f6f6f6',
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 7, marginRight: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA41' }} />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 28,
            background: COLORS.white,
            borderRadius: 6,
            border: `1px solid ${COLORS.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: COLORS.mid,
            fontFamily: 'DM Sans, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: COLORS.light, marginRight: 4 }}>🔒</span>
          {url}
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content area */}
      <div
        style={{
          height: 720,
          overflow: 'hidden',
          position: 'relative',
          background: COLORS.off,
          fontSize: 14, // Increased font size for better readability
        }}
      >
        {children}
      </div>
    </div>
  );
};
