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

const TABS = [
  { name: 'Arquitetura', company: 'Studio Monolito', color: DISCIPLINE_COLORS.arq },
  { name: 'Interiores', company: 'Forma & Alma', color: DISCIPLINE_COLORS.int },
  { name: 'Instalações', company: 'Tech Engenharia', color: DISCIPLINE_COLORS.ins },
  { name: 'Engenharia', company: 'Strut Cálculos', color: DISCIPLINE_COLORS.eng },
  { name: 'Aprovação', company: 'Prefeitura SP', color: DISCIPLINE_COLORS.apr },
];

const getDocRows = (tabIndex: number) => {
  if (tabIndex === 1) { // Interiores
    return [
      ['Apresentação de mobiliários', 'INT_MOB_V1.pdf', '12 Out', 'Concluído'],
      ['Executivo de marcenaria', 'INT_MARC_R02.dwg', '15 Out', 'Em Progresso'],
      ['Ata de visita à obra', 'ATA_OBRA_01.pdf', '20 Out', 'Publicado'],
      ['Plantas de Gesso', '—', '—', '—'],
    ];
  }
  if (tabIndex === 2) { // Instalações
    return [
      ['Projeto AVAC', 'INST_AVAC_R01.dwg', '12 Out', 'Concluído'],
      ['Mapa de Instalações', 'INST_MAPA_V2.pdf', '15 Out', 'Publicado'],
      ['Esquema Elétrico', '—', '—', '—'],
      ['Gás e Incêndio', '—', '—', '—'],
    ];
  }
  // Default: Arquitetura
  return [
    ['Plantas Mapa', 'ARQ_PLANTA_R02.dwg', '12 Out', 'Concluído'],
    ['Cortes', 'ARQ_CORTES_R01.pdf', '15 Out', 'Em Progresso'],
    ['Fachadas', 'ARQ_FACHADA_V3.pdf', '20 Out', 'Publicado'],
    ['Memorial Descritivo', '—', '—', '—'],
  ];
};

export const FeatureDisciplinas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transitions
  const browserEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 35 });
  
  // Adjusted timings for 11s (660 frames)
  const activeTab = frame < 240 ? 0 : frame < 460 ? 1 : 2;
  const currentRows = getDocRows(activeTab);

  const captionEntrance = spring({ frame: frame - 100, fps, config: { damping: 200 }, durationInFrames: 50 });

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
      {/* Label */}
      <div style={{ ...SCENE_LABEL_STYLE, fontSize: 20, marginBottom: 40 }}>
        Disciplinas do Projeto
      </div>

      {/* Main Mockup Container - Centered */}
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
            transform: `scale(${interpolate(browserEntrance, [0, 1], [0.97, 1])})`,
            position: 'relative',
            }}
        >
            <BrowserMockup url="tijolo.com/projeto/residencia-mourato-coelho">
            <div style={{ padding: '24px 32px', fontFamily: dmSans }}>
                {/* Project header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                <div>
                    <div style={{ fontSize: 24, fontFamily: outfit, fontWeight: 500 }}>Residência Mourato Coelho</div>
                    <div style={{ fontSize: 13, color: COLORS.mid }}>Cliente: João Silva · Início: 15/02/2026</div>
                </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
                {TABS.map((tab, i) => (
                    <div
                    key={i}
                    style={{
                        width: 220, 
                        padding: '12px 0',
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: activeTab === i ? 600 : 400,
                        color: activeTab === i ? COLORS.ink : COLORS.mid,
                        borderBottom: activeTab === i ? '3px solid #111' : '3px solid transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: tab.color }} />
                            <div>{tab.name}</div>
                        </div>
                        <div style={{ fontSize: 11, color: COLORS.light, fontWeight: 400 }}>{tab.company}</div>
                    </div>
                ))}
                </div>

                {/* Doc table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                <thead>
                    <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {['Documento', 'Arquivo', 'Data', 'Status'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 12, fontWeight: 600, color: COLORS.light }}>{h}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, i) => (
                        <tr key={`${activeTab}-${i}`} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: '14px', fontWeight: 500 }}>{row[0]}</td>
                        <td style={{ padding: '14px', color: COLORS.mid, fontSize: 14 }}>{row[1]}</td>
                        <td style={{ padding: '14px', color: COLORS.mid }}>{row[2]}</td>
                        <td style={{ padding: '14px' }}>
                            {row[3] !== '—' ? (
                            <span style={{ 
                                padding: '5px 14px', 
                                borderRadius: 24, 
                                fontSize: 12, 
                                fontWeight: 700, 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                width: 'fit-content',
                                background: row[3] === 'Concluído' ? '#E8F5E9' : row[3] === 'Em Progresso' ? '#FFF9C4' : '#E3F2FD', 
                                color: row[3] === 'Concluído' ? '#2E7D32' : row[3] === 'Em Progresso' ? '#6D5100' : '#1565C0' 
                            }}>
                                {row[3]}
                            </span>
                            ) : (
                                <span style={{ color: '#ccc' }}>—</span>
                            )}
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>

                {/* "Envie um arquivo" area */}
                 <div 
                  style={{ 
                    marginTop: 24, 
                    padding: '24px', 
                    background: '#fff', 
                    border: `1.5px dashed ${COLORS.border}`, 
                    borderRadius: 12, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: COLORS.mid, 
                    fontSize: 16,
                    fontWeight: 500,
                    gap: 12
                  }}
                >
                  <FolderIcon size={20} color={COLORS.mid} /> envie um arquivo
                </div>
            </div>
            </BrowserMockup>

            {/* Cursor clicks coordinated for wider layout (Centered tabs) */}
            {frame >= 200 && frame < 320 && (
            <AnimatedCursor startX={110} startY={140} endX={330} endY={140} startFrame={200} duration={40} clickFrame={240} />
            )}
            {frame >= 400 && frame < 520 && (
            <AnimatedCursor startX={330} startY={140} endX={550} endY={140} startFrame={400} duration={40} clickFrame={460} />
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
          transform: `translateY(${interpolate(captionEntrance, [0, 1], [15, 0])}px)`,
        }}
      >
        <div style={BOTTOM_CAPTION_STYLE}>
            Envie documentos com rastreabilidade total. 
        </div>
      </div>
    </AbsoluteFill>
  );
};
