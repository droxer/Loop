export type ColorMode = 'light' | 'dark';

export type LoopTheme = {
  mode: ColorMode;
  colors: {
    background: string;
    surface: string;
    card: string;
    primary: string;
    primaryText: string;
    text: string;
    mutedText: string;
    border: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    title: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700';
    };
    body: {
      fontSize: number;
      lineHeight: number;
    };
    caption: {
      fontSize: number;
      letterSpacing: number;
    };
  };
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
} as const;

const radius = {
  sm: 8,
  md: 12,
  lg: 20
} as const;

const typography = {
  title: { fontSize: 24, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 12, letterSpacing: 0.5 }
};

const lightColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#E2E8F0',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  text: '#0F172A',
  mutedText: '#64748B',
  border: '#CBD5F5',
  success: '#10B981',
  warning: '#F59E0B'
};

const darkColors = {
  background: '#020617',
  surface: '#0F172A',
  card: '#1E293B',
  primary: '#60A5FA',
  primaryText: '#0F172A',
  text: '#E2E8F0',
  mutedText: '#94A3B8',
  border: '#334155',
  success: '#34D399',
  warning: '#FBBF24'
};

export const createTheme = (mode: ColorMode): LoopTheme => ({
  mode,
  colors: mode === 'dark' ? darkColors : lightColors,
  spacing,
  radius,
  typography
});
