import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppThemeProvider } from '../src/providers/ThemeProvider';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* splash already hidden */
});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {
      /* noop */
    });
  }, []);

  return (
    <AppThemeProvider>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </AppThemeProvider>
  );
}
