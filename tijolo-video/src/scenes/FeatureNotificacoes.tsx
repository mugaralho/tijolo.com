import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrowserMockup } from '../components/BrowserMockup';
import { COLORS, BOTTOM_CAPTION_STYLE, SCENE_LABEL_STYLE } from '../styles';

const { fontFamily: outfit } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

const NOTIFICATIONS = [
  {
    section: 'Engenharia Estrutural',
    items: [
      { title: 'Novo arquivo publicado', desc: 'Carlos publicou estrutural_rev02.dwg', time: 'Há 2 horas', dotActive: true },
      { title: 'Comentário adicionado', desc: 'Felipe comentou em memoria_calculo_v1.pdf', time: 'Há 5 horas', dotActive: false },
    ],
  },
  {
    section: 'Arquitetura',
    items: [
      { title: 'Revisão aprovada', desc: 'Cliente aprovou ARQ_PLANTA_BAIXA_R02.pdf', time: 'Ontem às 15:30', dotActive: false },
       { title: 'Novo comentário', desc: 'Arquiteta Bia comentou no projeto executivo', time: 'Há 10 min', dotActive: true },
    ],
  },
];

export const FeatureNotificacoes: React.FC = () => {
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
        Notificações em Tempo Real
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
            <BrowserMockup url="tijolo.com/notificacoes">
            <div style={{ padding: '40px 80px', fontFamily: dmSans }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                <div style={{ fontSize: 32, fontFamily: outfit, fontWeight: 500 }}>Central de Notificações</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 100px' }}>
                {NOTIFICATIONS.map((section, si) => {
                    const sectionDelay = si * 80;
                    const sectionEntrance = spring({ frame: frame - 60 - sectionDelay, fps, config: { damping: 200 }, durationInFrames: 35 });

                    return (
                    <div key={si} style={{ opacity: sectionEntrance }}>
                        <div style={{ 
                           fontSize: 16, 
                           fontWeight: 700, 
                           textTransform: 'uppercase', 
                           letterSpacing: '1px', 
                           color: COLORS.light, 
                           marginBottom: 24 
                        }}>
                        {section.section}
                        </div>

                        <div style={{ borderLeft: `2.5px solid ${COLORS.border}`, paddingLeft: 32 }}>
                        {section.items.map((item, ii) => {
                            const itemDelay = sectionDelay + ii * 30;
                            const itemEntrance = spring({ frame: frame - 100 - itemDelay, fps, config: { damping: 200 }, durationInFrames: 30 });

                            return (
                            <div key={ii} style={{ 
                                marginBottom: 40, 
                                position: 'relative', 
                                opacity: itemEntrance, 
                                transform: `translateX(${interpolate(itemEntrance, [0, 1], [0, 1], {extrapolateRight: 'clamp'})}px)` 
                             }}>
                                <div style={{ 
                                    position: 'absolute', 
                                    left: -38, 
                                    top: 4, 
                                    width: 12, 
                                    height: 12, 
                                    background: item.dotActive ? COLORS.ink : '#e0e0e0', 
                                    borderRadius: '50%', 
                                    border: '4px solid #fff' 
                                }} />
                                <div style={{ fontSize: 20, fontWeight: 600 }}>{item.title}</div>
                                <div style={{ fontSize: 16, color: COLORS.mid, marginTop: 6, lineHeight: 1.4 }}>
                                {item.desc.split(/(estrutural_rev02\.dwg|memoria_calculo_v1\.pdf|ARQ_PLANTA_BAIXA_R02\.pdf)/g).map((part, pi) =>
                                    pi % 2 === 1 ? <strong key={pi} style={{ color: COLORS.ink }}>{part}</strong> : part
                                )}
                                </div>
                                <div style={{ fontSize: 14, color: '#999', marginTop: 6 }}>{item.time}</div>
                            </div>
                            );
                        })}
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
            Não fique por fora - Nunca.
        </div>
      </div>
    </AbsoluteFill>
  );
};
