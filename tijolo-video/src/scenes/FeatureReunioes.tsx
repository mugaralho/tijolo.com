import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrowserMockup } from '../components/BrowserMockup';
import { AnimatedCursor } from '../components/AnimatedCursor';
import { COLORS, BOTTOM_CAPTION_STYLE, SCENE_LABEL_STYLE } from '../styles';
import { CalendarIcon, ClockIcon, PinIcon, SparkIcon } from '../components/Icons';

const { fontFamily: outfit } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

const PARTICIPANTS = ['Studio Monolito', 'Forma & Alma', 'Tech Engenharia', 'Strut Cálculos', 'Prefeitura SP'];

export const FeatureReunioes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 35 });
  const browserScale = interpolate(browserEntrance, [0, 1], [0.97, 1]);

  const showModal = frame >= 130;
  const modalEntrance = spring({ frame: frame - 130, fps, config: { damping: 200 }, durationInFrames: 35 });

  // Accelerated timings for checkboxes
  const checkFrames = [180, 205, 230, 255]; 
  
  // Integration section shown immediately with modal opening
  const integrationEntrance = modalEntrance; 

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
        Agendamento de Reunião
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
            <BrowserMockup url="tijolo.com/projeto/reuniao">
            <div style={{ padding: '24px 32px', fontFamily: dmSans, position: 'relative' }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                        <div>
                           <div style={{ fontSize: 24, fontFamily: outfit, fontWeight: 500 }}>Reunião de Alinhamento Técnico</div>
                           <div style={{ fontSize: 13, color: COLORS.mid, display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                 <CalendarIcon size={14} color={COLORS.mid} /> 15/02/2026
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                 <ClockIcon size={14} color={COLORS.mid} /> 14:00
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                 <PinIcon size={14} color={COLORS.mid} /> Google Meet
                              </div>
                           </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 20px',
                            borderRadius: 10,
                            background: '#F0F4FF',
                            color: '#2563eb',
                            fontSize: 14,
                            fontWeight: 600,
                            border: '1px solid #D0DFFF',
                            }}
                        >
                            <SparkIcon size={18} color="#2563eb" /> Gere ata com IA
                        </div>
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 24px',
                            borderRadius: 10,
                            background: COLORS.ink,
                            color: COLORS.white,
                            fontSize: 14,
                            fontWeight: 500,
                            }}
                        >
                            <CalendarIcon size={16} color="white" /> Agendar Reunião
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                <div
                    style={{
                    padding: '32px 40px', 
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 16,
                    opacity: modalEntrance,
                    transform: `scale(${interpolate(modalEntrance, [0, 1], [0.97, 1])})`,
                    maxWidth: 900,
                    margin: '0 auto',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    }}
                >
                    <div style={{ fontFamily: outfit, fontSize: 22, fontWeight: 500, marginBottom: 24 }}>
                    Novo Convite para Reunião
                    </div>

                    <div style={{ padding: '20px', border: `1px solid ${COLORS.border}`, borderRadius: 12, marginBottom: 24 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Quem você quer que participe?</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 60px' }}>
                        {PARTICIPANTS.map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
                                <span style={{ color: frame >= (checkFrames[i] || 9999) ? COLORS.ink : COLORS.mid }}>{p}</span>
                                <div style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${frame >= (checkFrames[i] || 9999) ? COLORS.ink : COLORS.border}`, background: frame >= (checkFrames[i] || 9999) ? COLORS.ink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.white }}>
                                    {frame >= (checkFrames[i] || 9999) ? '✓' : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    <div style={{ opacity: integrationEntrance }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>Adicionar Link ou Calendário</div>
                        <div style={{ fontSize: 13, color: COLORS.mid, display: 'flex', alignItems: 'center', gap: 6 }}>
                           <CalendarIcon size={14} color={COLORS.mid} /> 15/02/2026 - 12:00
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {['Google Agenda', 'Zoom', 'Meet'].map((label, i) => (
                        <div key={i} style={{ padding: '10px 20px', border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, background: COLORS.white }}>{label}</div>
                        ))}
                    </div>
                    </div>
                </div>
                )}
            </div>
            </BrowserMockup>

            {/* Adjusted Cursor Timings for faster flow */}
            {frame >= 170 && frame < 200 && (
            <AnimatedCursor startX={1300} startY={80} endX={756} endY={316} startFrame={170} duration={20} clickFrame={180} />
            )}
            {frame >= 195 && frame < 225 && (
            <AnimatedCursor startX={756} startY={316} endX={1164} endY={316} startFrame={195} duration={20} clickFrame={205} />
            )}
            {frame >= 220 && frame < 250 && (
            <AnimatedCursor startX={1164} startY={316} endX={756} endY={358} startFrame={220} duration={20} clickFrame={230} />
            )}
            {frame >= 245 && frame < 275 && (
            <AnimatedCursor startX={756} startY={358} endX={1164} endY={358} startFrame={245} duration={20} clickFrame={255} />
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
            Notifica automaticamente os seus calls.
        </div>
      </div>
    </AbsoluteFill>
  );
};
