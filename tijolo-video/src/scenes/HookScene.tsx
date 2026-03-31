import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { COLORS, LOGOS } from '../styles';

const { fontFamily: outfit } = loadFont('normal', { weights: ['300', '400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500'], subsets: ['latin'] });

// Cloud of logos: spread further away from center for 90s version
const BRAND_ICONS = [
  { src: LOGOS.gmail, label: 'E-mail', x: 200, y: 300, size: 100 },
  { src: LOGOS.notion, label: 'Notion', x: 1650, y: 250, size: 90 },
  { src: LOGOS.drive, label: 'Drive', x: 300, y: 750, size: 100 },
  { src: staticFile(LOGOS.monday), label: 'Monday', x: 1550, y: 800, size: 100 },
  { src: LOGOS.whatsapp, label: 'WhatsApp', x: 960, y: 150, size: 100 },
];

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for icons
  const entrance = spring({ frame: frame - 10, fps, config: { damping: 200 }, durationInFrames: 60 });

  // Question text entrance 
  const titleEntrance = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 50 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [40, 0]);

  // Fade out — complete by frame 580 (leaving gap for transition)
  const fadeOut = interpolate(frame, [520, 580], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Faster and more fluid floating movement
  const floatX = (i: number) => Math.sin(frame * 0.06 + i) * 12; // Increased frequency and amplitude
  const floatY = (i: number) => Math.cos(frame * 0.05 + i) * 18;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.black,
        fontFamily: outfit,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Logos in a cloud — Space out further from center */}
      {BRAND_ICONS.map((icon, i) => {
        const iconSpring = spring({ frame: frame - i * 15, fps, config: { damping: 200 }, durationInFrames: 45 });
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: icon.x + floatX(i),
              top: icon.y + floatY(i),
              opacity: iconSpring * fadeOut,
              transform: `scale(${iconSpring})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              zIndex: 5,
            }}
          >
             <div style={{ width: icon.size, height: icon.size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Img src={icon.src} style={{ width: '100%', height: 'auto', maxHeight: '100%' }} />
             </div>
            <div
              style={{
                fontSize: 18,
                fontFamily: dmSans,
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {icon.label}
            </div>
          </div>
        );
      })}

      {/* Main Question - Centered */}
      <div
        style={{
          opacity: titleOpacity * fadeOut,
          transform: `translateY(${titleY}px)`,
          fontSize: 72,
          fontWeight: 300,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.25,
          maxWidth: 1400,
          zIndex: 10,
        }}
      >
        Seus projetos estão espalhados em <br/>
        <span style={{ fontWeight: 500, fontStyle: 'italic' }}>5 ferramentas</span> diferentes?
      </div>
    </AbsoluteFill>
  );
};
