import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { loadFont as loadDM } from '@remotion/google-fonts/DMSans';
import { BrowserMockup } from '../components/BrowserMockup';
import { COLORS, DISCIPLINE_COLORS, BOTTOM_CAPTION_STYLE, SCENE_LABEL_STYLE } from '../styles';
import { FolderIcon, SearchIcon } from '../components/Icons';

const { fontFamily: outfit } = loadFont('normal', { weights: ['400', '500'], subsets: ['latin'] });
const { fontFamily: dmSans } = loadDM('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });

const FOLDERS = [
  { name: 'Arquitetura', color: DISCIPLINE_COLORS.arq, files: 12 },
  { name: 'Interiores', color: DISCIPLINE_COLORS.int, files: 8 },
  { name: 'Instalações', color: DISCIPLINE_COLORS.ins, files: 4 },
  { name: 'Engenharia', color: DISCIPLINE_COLORS.eng, files: 6 },
  { name: 'Aprovação Legal', color: DISCIPLINE_COLORS.apr, files: 3 },
  { name: 'Documentos Cliente', color: COLORS.mid, files: 5 },
];

export const FeatureHistorico: React.FC = () => {
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
        Informações Centralizadas
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
            <BrowserMockup url="tijolo.com/projeto/arquivos">
            <div style={{ padding: '32px 60px', fontFamily: dmSans }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: COLORS.ink }} />
                <div style={{ fontSize: 26, fontFamily: outfit, fontWeight: 500 }}>Arquivos do Projeto</div>
                </div>

                {/* Folder Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                  {FOLDERS.map((folder, i) => {
                    const folderEntrance = spring({ frame: frame - 60 - i * 15, fps, config: { damping: 200 }, durationInFrames: 30 });
                    return (
                        <div 
                           key={i} 
                           style={{ 
                             padding: '24px', 
                             border: `1px solid ${COLORS.border}`, 
                             borderRadius: 16, 
                             opacity: folderEntrance,
                             display: 'flex',
                             flexDirection: 'column',
                             gap: 16,
                             background: COLORS.white,
                             cursor: 'pointer'
                           }}
                        >
                           <FolderIcon size={32} color={folder.color} />
                           <div>
                              <div style={{ fontWeight: 600, fontSize: 18, color: COLORS.ink }}>{folder.name}</div>
                              <div style={{ fontSize: 14, color: COLORS.mid }}>{folder.files} arquivos</div>
                           </div>
                           <div style={{ height: 4, width: '100%', background: folder.color, borderRadius: 2 }} />
                        </div>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div style={{ marginTop: 60, display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1, padding: '14px 24px', background: COLORS.off, border: `1px solid ${COLORS.border}`, borderRadius: 12, color: COLORS.light, fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <SearchIcon size={16} color={COLORS.light} /> Buscar por nome, data ou profissional...
                    </div>
                    <div style={{ padding: '14px 24px', background: COLORS.ink, color: COLORS.white, borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
                        Filtros Avançados
                    </div>
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
            Rastreabilidade e precisão para você não se perder.
        </div>
      </div>
    </AbsoluteFill>
  );
};
