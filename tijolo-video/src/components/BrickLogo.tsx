import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../styles';

export const BrickLogo: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brick1 = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const brick2 = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 30 });
  const brick3 = spring({ frame: frame - 16, fps, config: { damping: 200 }, durationInFrames: 30 });

  const b1y = interpolate(brick1, [0, 1], [-40, 0]);
  const b2y = interpolate(brick2, [0, 1], [40, 0]);
  const b3y = interpolate(brick3, [0, 1], [40, 0]);

  return (
    <svg
      width={220 * scale}
      height={220 * scale}
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.white}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="7" y="9.5" width="10" height="4" rx="1"
        fill="none"
        style={{ opacity: brick1, transform: `translateY(${b1y}px)` }}
      />
      <rect
        x="1.5" y="14.5" width="10" height="4" rx="1"
        fill="none"
        style={{ opacity: brick2, transform: `translateY(${b2y}px)` }}
      />
      <rect
        x="12.5" y="14.5" width="10" height="4" rx="1"
        fill="none"
        style={{ opacity: brick3, transform: `translateY(${b3y}px)` }}
      />
    </svg>
  );
};
