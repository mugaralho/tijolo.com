import React from 'react';
import { AbsoluteFill, Audio, Sequence } from 'remotion';
import { TransitionSeries, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';

import { RotatePhone } from './scenes/RotatePhone';
import { HookScene } from './scenes/HookScene';
import { BrandReveal } from './scenes/BrandReveal';
import { FeatureAcesso } from './scenes/FeatureAcesso';
import { FeatureDisciplinas } from './scenes/FeatureDisciplinas';
import { FeatureReunioes } from './scenes/FeatureReunioes';
import { FeatureHistorico } from './scenes/FeatureHistorico';
import { FeatureProgresso } from './scenes/FeatureProgresso';
import { FeatureNotificacoes } from './scenes/FeatureNotificacoes';
import { CTAScene } from './scenes/CTAScene';
import { AnimatedCursor } from './components/AnimatedCursor';
import { SCENE_FRAMES, TRANSITION_DURATION } from './styles';

export const TijoloDemo: React.FC = () => {
  const transitionTiming = springTiming({ config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: '#000' }}>


      <TransitionSeries>
        {/* 1. Intro (5s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.intro}>
          <RotatePhone />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* 2. Hook / Problem (10s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* 3. Brand Reveal (7s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.brand}>
          <BrandReveal />
          {/* Transition Cursor clicks centered "tijolo" — Precise timing for 7s scene */}
          <Sequence from={SCENE_FRAMES.brand - 90} durationInFrames={90}>
            <AbsoluteFill>
              <AnimatedCursor
                startX={1920 / 2 + 250}
                startY={1080 / 2 + 250}
                endX={1920 / 2}
                endY={1080 / 2 + 45} // Precise click on "tijolo" text
                startFrame={0}
                duration={40}
                clickFrame={45}
              />
            </AbsoluteFill>
          </Sequence>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* 4. Gerenciar Acesso (11s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.acesso}>
          <FeatureAcesso />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={transitionTiming} />

        {/* 5. Disciplinas do Projeto (11s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.disciplinas}>
          <FeatureDisciplinas />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={transitionTiming} />

        {/* 6. Agendamento / IA Reunião (12s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.reunioes}>
          <FeatureReunioes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={transitionTiming} />

        {/* 7. Histórico do Projeto (11s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.historico}>
          <FeatureHistorico />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={transitionTiming} />

        {/* 8. Progresso (9s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.progresso}>
          <FeatureProgresso />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={transitionTiming} />

        {/* 9. Notificações (8s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.notificacoes}>
          <FeatureNotificacoes />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={transitionTiming} />

        {/* 10. CTA (6s) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
