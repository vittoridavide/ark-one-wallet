// Import per-weight subpaths (not the package root) so only these 7 weights
// bundle — the root index pulls in every weight + italic (~1.5MB unused).
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono/400Regular';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans/800ExtraBold';
import { useFonts } from 'expo-font';
import { DarkTheme, ThemeProvider as NavThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { darkColors, ThemeProvider } from '@/theme';

// Keep the native splash up until the brand fonts are ready, so the first frame
// never renders in the system fallback face. The object keys below become the
// registered font-family names — they must match `fontFor` in theme/tokens.ts.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Hold the first render until fonts resolve (or fail) to avoid a font swap.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Dark-only design system — always use the dark navigation theme.
  return (
    <ThemeProvider>
      <NavThemeProvider value={DarkTheme}>
        <AnimatedSplashOverlay />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: darkColors.background },
          }}
        >
          {/* Main app — the 5-tab shell (Home / Pay / Receive / History / Settings). */}
          <Stack.Screen name="(tabs)" />

          {/* Pre-wallet flow — onboarding / lock / import. */}
          <Stack.Screen name="(auth)" />

          {/* Send flow — pushed over the tabs. */}
          <Stack.Screen name="confirm" />
          <Stack.Screen
            name="success"
            options={{ presentation: 'fullScreenModal', animation: 'fade' }}
          />

          {/* Transaction detail — bottom sheet. */}
          <Stack.Screen name="transaction/[id]" options={{ presentation: 'modal' }} />

          {/* Dev-only component showcase. */}
          <Stack.Screen name="kit" />
        </Stack>
      </NavThemeProvider>
    </ThemeProvider>
  );
}
