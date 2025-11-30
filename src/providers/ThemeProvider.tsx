import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ColorMode, LoopTheme, createTheme } from '../theme/tokens';

type ThemeContextValue = {
  theme: LoopTheme;
  mode: ColorMode;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  theme: createTheme('light')
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme() ?? 'light';

  const value = useMemo(() => {
    const mode = systemScheme as ColorMode;
    return {
      mode,
      theme: createTheme(mode)
    };
  }, [systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
