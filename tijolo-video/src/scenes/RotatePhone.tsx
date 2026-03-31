import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { COLORS } from '../styles';

const { fontFamily: outfit } = loadFont('normal', { weights: ['300', '400', '500'], subsets: ['latin'] });

export const RotatePhone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rotation animation
  const rotationProgress = interpolate(frame, [60, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  const rotation = interpolate(rotationProgress, [0, 1], [0, -90]);

  // Entrance
  const entrance = spring({ frame, fps, config: { damping: 200 } });
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: outfit,
      }}
    >
      <div
        style={{
          opacity: entrance,
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Phone SVG — All text removed per request */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <svg width="180" height="320" viewBox="0 0 120 220" fill="none">
            <rect x="5" y="5" width="110" height="210" rx="20" stroke="white" strokeWidth="6" />
            <rect x="40" y="15" width="40" height="6" rx="3" fill="white" />
            <circle cx="60" cy="195" r="8" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
