import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrickLogo } from '../components/BrickLogo';
import { COLORS } from '../styles';

const { fontFamily: outfit } = loadFont('normal', { weights: ['300', '400', '500', '600'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['300', '400'], subsets: ['latin'] });

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 40 });

  // Brand name (Centered)
  const nameEntrance = spring({ frame: frame - 25, fps, config: { damping: 200 }, durationInFrames: 35 });
  const nameOpacity = interpolate(nameEntrance, [0, 1], [0, 1]);
  const nameY = interpolate(nameEntrance, [0, 1], [20, 0]);

  // Bottom phrases (Tagline and Chega de retrabalho)
  const tagEntrance = spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 40 });
  const introEntrance = spring({ frame: frame - 100, fps, config: { damping: 200 }, durationInFrames: 40 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.black,
        fontFamily: outfit,
      }}
    >
      {/* 
        Perfect Centering Layout: 
        Using absolute positioning to ensure "tijolo" is exactly at 50% height.
      */}

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 1. Logo (Top) */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '100%', 
            marginBottom: 40, // 50% Closer as requested
            transform: `scale(${logoScale})`, 
            opacity: logoScale 
          }}
        >
          <BrickLogo scale={1.2} />
        </div>

        {/* 2. "tijolo" (Exact Geographic Center) */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 600,
            color: COLORS.white,
            letterSpacing: '5px',
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          tijolo
        </div>

        {/* 3. Phrases (Bottom) */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            marginTop: 40, // Symmetrical closing
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 24 
          }}
        >
          <div
            style={{
              fontFamily: dmSans,
              fontSize: 30,
              fontWeight: 300,
              color: COLORS.mid,
              opacity: interpolate(tagEntrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(tagEntrance, [0, 1], [20, 0])}px)`,
              textAlign: 'center',
              maxWidth: 1000,
              lineHeight: 1.5,
            }}
          >
            Todos os profissionais do seu projeto,<br/>
            em um <span style={{ fontStyle: 'italic', color: COLORS.white }}>único lugar.</span>
          </div>

          <div
            style={{
              fontFamily: dmSans,
              fontSize: 38,
              fontWeight: 400,
              color: COLORS.white,
              opacity: interpolate(introEntrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(introEntrance, [0, 1], [20, 0])}px)`,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Chega de retrabalho.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
