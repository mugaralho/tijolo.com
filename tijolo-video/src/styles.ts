// ─── Design Tokens ───
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  off: '#FAFAFA',
  ink: '#111111',
  graphite: '#3a3a3a',
  mid: '#777777',
  light: '#bbbbbb',
  border: '#e5e5e5',
  green: '#10B981',
} as const;

export const DISCIPLINE_COLORS = {
  arq: '#C17A4A',
  int: '#587F76',
  ins: '#9A775C',
  eng: '#5D5E87',
  apr: '#8C6A5A',
} as const;

export const SIZES = {
  width: 1920,
  height: 1080,
  fps: 60,
  duration: 90,
} as const;

export const SCENE_LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: COLORS.mid,
};

export const BOTTOM_CAPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: 48, // Increased for 1920x1080 and readability
  fontWeight: 400,
  color: COLORS.white,
  textAlign: 'center',
  width: '100%',
  zIndex: 10,
};

export const LOGOS = {
  drive: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
  notion: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  monday: 'monday_logo.png', // User uploaded as monday_logo.png in public/
  whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  gmail: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
} as const;

export const SCENE_FRAMES = {
  intro: 300,        // 5s
  hook: 600,         // 10s
  brand: 420,        // 7s
  acesso: 660,       // 11s
  disciplinas: 660,  // 11s
  reunioes: 720,     // 12s
  historico: 660,    // 11s
  progresso: 540,    // 9s
  notificacoes: 480, // 8s
  cta: 360,          // 6s
} as const;

export const TRANSITION_DURATION = 15; // 0.25s at 60fps
