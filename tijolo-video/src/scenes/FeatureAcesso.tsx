import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrowserMockup } from '../components/BrowserMockup';
import { AnimatedCursor } from '../components/AnimatedCursor';
import { COLORS, DISCIPLINE_COLORS, BOTTOM_CAPTION_STYLE, SCENE_LABEL_STYLE } from '../styles';
import { FolderIcon } from '../components/Icons';

const { fontFamily: outfit } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

const DISCIPLINES = [
  { name: 'Arquitetura', owner: 'Studio Monolito', color: DISCIPLINE_COLORS.arq, status: 'Ativo' },
  { name: 'Interiores', owner: 'Forma & Alma', color: DISCIPLINE_COLORS.int, status: 'Aguardando' },
  { name: 'Instalações', owner: '-', color: DISCIPLINE_COLORS.ins, status: 'Convidar' },
  { name: 'Engenharia', owner: '-', color: DISCIPLINE_COLORS.eng, status: 'Convidar' },
];

export const FeatureAcesso: React.FC = () => {
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
        Acessos do Projeto
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
            position: 'relative',
            }}
        >
            <BrowserMockup url="tijolo.com/projeto/acessos">
            <div style={{ padding: '32px 60px', fontFamily: dmSans }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                   <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                   <div style={{ fontSize: 26, fontFamily: outfit, fontWeight: 500 }}>Acessos do Projeto</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 80px' }}>
                  {DISCIPLINES.map((d, i) => {
                    const itemEntrance = spring({ frame: frame - 40 - i * 15, fps, config: { damping: 200 }, durationInFrames: 30 });
                    return (
                        <div 
                           key={i} 
                           style={{ 
                             padding: '24px', 
                             border: `1px solid ${COLORS.border}`, 
                             borderRadius: 16, 
                             opacity: itemEntrance,
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between',
                             background: COLORS.white,
                             boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                           }}
                        >
                           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                              <div style={{ width: 12, height: 12, borderRadius: '50%', background: d.color }} />
                              <div>
                                 <div style={{ fontWeight: 600, fontSize: 16 }}>{d.name}</div>
                                 <div style={{ fontSize: 13, color: COLORS.mid }}>{d.owner || 'Não definido'}</div>
                              </div>
                           </div>
                           <div
                             style={{
                               padding: '8px 16px',
                               borderRadius: 8,
                               fontSize: 13,
                               fontWeight: 600,
                               background: d.status === 'Convidar' ? COLORS.ink : COLORS.off,
                               color: d.status === 'Convidar' ? COLORS.white : COLORS.light,
                               border: d.status === 'Convidar' ? 'none' : `1px solid ${COLORS.border}`
                             }}
                           >
                              {d.status}
                           </div>
                        </div>
                    );
                  })}
                </div>

                {/* Invite Link section */}
                <div 
                   style={{ 
                     marginTop: 60, 
                     padding: '32px', 
                     borderRadius: 20, 
                     background: COLORS.off, 
                     border: `1px dashed ${COLORS.border}`,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: 20,
                     opacity: spring({frame: frame - 420, fps, config: {damping: 200}})
                   }}
                >
                   <div style={{ fontSize: 16, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                     <FolderIcon size={20} color={COLORS.ink} /> Gere um link para convidar profissionais:
                   </div>
                   <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 700 }}>
                      <div style={{ flex: 1, padding: '14px 20px', background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.mid, fontSize: 14 }}>
                         tijolo.com/invite/882-019-arq...
                      </div>
                      <div style={{ padding: '14px 24px', background: COLORS.ink, color: COLORS.white, borderRadius: 10, fontWeight: 600 }}>Copiar Link</div>
                   </div>
                </div>
            </div>
            </BrowserMockup>

            {/* Cursor for inviting Engenharia */}
            {frame >= 200 && frame < 320 && (
            <AnimatedCursor startX={800} startY={400} endX={1450} endY={330} startFrame={200} duration={40} clickFrame={240} />
            )}
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
            Gerencie o acesso e convide sua equipe.
        </div>
      </div>
    </AbsoluteFill>
  );
};
