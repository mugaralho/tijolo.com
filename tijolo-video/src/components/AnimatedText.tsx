import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

type AnimatedTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
  italic?: boolean;
  maxWidth?: number;
  textAlign?: 'left' | 'center' | 'right';
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  fontWeight = 300,
  color = '#fff',
  fontFamily = 'Outfit, sans-serif',
  italic = false,
  maxWidth,
  textAlign = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(entrance, [0, 1], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        fontWeight,
        color,
        fontFamily,
        fontStyle: italic ? 'italic' : 'normal',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textAlign,
        maxWidth: maxWidth || 'none',
      }}
    >
      {text}
    </div>
  );
};
