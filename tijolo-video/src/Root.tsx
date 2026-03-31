import React from 'react';
import { Composition } from 'remotion';
import { TijoloDemo } from './TijoloDemo';
import { SIZES, SCENE_FRAMES, TRANSITION_DURATION } from './styles';

// Calculate total duration accounting for transition overlaps
const sceneValues = Object.values(SCENE_FRAMES);
const totalSceneFrames = sceneValues.reduce((a, b) => a + b, 0);
const transitionCount = sceneValues.length - 1;
const totalDuration = totalSceneFrames - transitionCount * TRANSITION_DURATION;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TijoloDemo"
      component={TijoloDemo}
      durationInFrames={totalDuration}
      fps={SIZES.fps}
      width={SIZES.width}
      height={SIZES.height}
    />
  );
};
