import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { ThemeProvider } from '@/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider>
      <NavThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </NavThemeProvider>
    </ThemeProvider>
  );
}
