import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrowserMockup } from '../components/BrowserMockup';
import { COLORS, BOTTOM_CAPTION_STYLE, SCENE_LABEL_STYLE } from '../styles';
import { FolderIcon } from '../components/Icons';

const { fontFamily: outfit } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

const PROGRESS_ITEMS = [
  { name: 'Arquitetura (Estudo Preliminar)', target: 100, color: '#16a34a' },
  { name: 'Estrutural (Projeto Executivo)', target: 60, color: '#2563eb' },
  { name: 'Interiores (Layout)', target: 85, color: '#587F76' },
  { name: 'Aprovação Prefeitura', target: 20, color: '#d97706' },
];

export const FeatureProgresso: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 35 });
  const browserScale = interpolate(browserEntrance, [0, 1], [0.97, 1]);
  const captionEntrance = spring({ frame: frame - 100, fps, config: { damping: 200 }, durationInFrames: 45 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.black,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 0',
      }}
    >
      <div style={{ ...SCENE_LABEL_STYLE, fontSize: 20, marginBottom: 40 }}>
        Progresso do Projeto
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
            style={{
            opacity: browserEntrance,
            transform: `scale(${browserScale})`,
            }}
        >
            <BrowserMockup url="tijolo.com/projeto/progresso">
            <div style={{ padding: '32px 60px', fontFamily: dmSans }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                <div style={{ fontSize: 26, fontFamily: outfit, fontWeight: 500 }}>Relatório de Progresso em Tempo Real</div>
                </div>

                {/* Progress bars - Spaced for horizontal */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 80px' }}>
              {PROGRESS_ITEMS.map((item, i) => {
                const barDelay = 60 + i * 40;
                const barProgress = interpolate(
                  frame,
                  [barDelay, barDelay + 120],
                  [0, item.target],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                const rowEntrance = spring({ frame: frame - 60 - i * 15, fps, config: { damping: 200 }, durationInFrames: 30 });
                const rowOpacity = interpolate(rowEntrance, [0, 1], [0, 1]);

                return (
                  <div key={i} style={{ marginBottom: 32, opacity: rowOpacity, display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div 
                      style={{ 
                        width: 80, 
                        height: 60, 
                        background: '#fff', 
                        border: `1.5px dashed ${COLORS.border}`, 
                        borderRadius: 10, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 2,
                        fontSize: 10,
                        fontWeight: 600,
                        color: COLORS.mid,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      <FolderIcon size={18} color={COLORS.mid} />
                      <span>Análise</span>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, marginBottom: 12 }}>
                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                        <span style={{ color: COLORS.mid, fontVariantNumeric: 'tabular-nums' }}>
                            {Math.round(barProgress)}%
                        </span>
                        </div>
                        <div
                        style={{
                            height: 14,
                            background: '#f0f0f0',
                            borderRadius: 7,
                            overflow: 'hidden',
                        }}
                        >
                        <div
                            style={{
                            width: `${barProgress}%`,
                            height: '100%',
                            background: item.color,
                            borderRadius: 7,
                            }}
                        />
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            </BrowserMockup>
        </div>
      </div>

      <div
        style={{
          flex: '0 1 120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          opacity: captionEntrance,
        }}
      >
        <div style={BOTTOM_CAPTION_STYLE}>
            Identifique o que não está funcionando no seu projeto.
        </div>
      </div>
    </AbsoluteFill>
  );
};
