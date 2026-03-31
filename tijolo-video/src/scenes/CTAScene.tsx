import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { COLORS } from '../styles';

const { fontFamily: outfit } = loadFont('normal', { weights: ['300', '400', '500', '600'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['300', '400', '500'], subsets: ['latin'] });

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 50 });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [40, 0]);

  // Email form entrance
  const formEntrance = spring({ frame: frame - 80, fps, config: { damping: 200 }, durationInFrames: 45 });
  const formOpacity = interpolate(formEntrance, [0, 1], [0, 1]);
  const formY = interpolate(formEntrance, [0, 1], [30, 0]);

  // Typing animation
  const email = 'arquiteto@studio.com.br';
  const typingStart = 160;
  const charsVisible = Math.min(
    email.length,
    Math.max(0, Math.floor((frame - typingStart) / 4))
  );
  const typedText = email.substring(0, charsVisible);

  // Button highlight
  const buttonPulseFrame = typingStart + email.length * 4 + 20;
  const buttonEntrance = spring({
    frame: frame - buttonPulseFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: 30,
  });
  const buttonScale = frame >= buttonPulseFrame ? interpolate(buttonEntrance, [0, 1], [0.95, 1]) : 1;

  // Subtitle
  const subEntrance = spring({ frame: frame - 60, fps, config: { damping: 200 }, durationInFrames: 40 });
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.ink,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
      }}
    >
      {/* Title with highlighted "agora" */}
      <div
        style={{
          fontFamily: outfit,
          fontSize: 82, // Larger for horizontal
          fontWeight: 300,
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 1.15,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: 1200,
        }}
      >
        Organize seu próximo projeto <br/>
        <span style={{ fontSize: 110, fontWeight: 600, display: 'block', marginTop: 15 }}>agora.</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: dmSans,
          fontSize: 28,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          opacity: subOpacity,
          marginBottom: 30,
        }}
      >
        entre na waitlist. não fique de fora.
      </div>

      {/* Email form (Centered Horizontal) */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          opacity: formOpacity,
          transform: `translateY(${formY}px)`,
        }}
      >
        <div
          style={{
            padding: '24px 32px',
            fontSize: 20,
            fontFamily: dmSans,
            background: 'rgba(255,255,255,0.08)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 14,
            color: 'rgba(255,255,255,0.8)',
            minWidth: 500,
          }}
        >
          {typedText || 'Seu melhor e-mail'}
          {frame >= typingStart && frame < typingStart + email.length * 4 + 10 && (
            <span style={{ opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0, color: COLORS.white }}>|</span>
          )}
        </div>

        <div
          style={{
            padding: '24px 48px',
            fontSize: 20,
            fontFamily: dmSans,
            fontWeight: 600,
            background: COLORS.white,
            color: COLORS.ink,
            borderRadius: 14,
            transform: `scale(${buttonScale})`,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 30px rgba(255,255,255,0.15)',
            cursor: 'pointer',
          }}
        >
          Solicitar Acesso
        </div>
      </div>

      {/* Footer Logo with "em breve" as requested */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.2, // Subtle for footer
        }}
      >
        <div
          style={{
            fontFamily: outfit,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.white,
            letterSpacing: '4px',
          }}
        >
          tijolo
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 16,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: COLORS.white,
          }}
        >
          em breve
        </div>
      </div>
    </AbsoluteFill>
  );
};
