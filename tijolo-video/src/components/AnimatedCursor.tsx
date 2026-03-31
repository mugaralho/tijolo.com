import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

type CursorProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startFrame: number;
  duration?: number;
  clickFrame?: number; // frame when click happens (relative to component)
};

export const AnimatedCursor: React.FC<CursorProps> = ({
  startX,
  startY,
  endX,
  endY,
  startFrame,
  duration = 30,
  clickFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);

  // Click animation (scale pulse)
  const isClicking = clickFrame !== undefined && frame >= clickFrame && frame < clickFrame + 8;
  const clickScale = isClicking
    ? interpolate(frame - clickFrame!, [0, 4, 8], [1, 0.85, 1], { extrapolateRight: 'clamp' })
    : 1;

  const opacity = interpolate(
    frame,
    [startFrame - 5, startFrame, startFrame + duration + 30, startFrame + duration + 40],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${clickScale})`,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3l14 8-6 2-4 6z"
          fill="rgba(0,0,0,0.85)"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
