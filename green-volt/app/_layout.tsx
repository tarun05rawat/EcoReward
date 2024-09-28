import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="signin">
        {/* Sign-in screen path (maps to app/signin.tsx) */}
        <Stack.Screen name="signin" options={{ headerShown: false }} />

        {/* Sign-up screen path (maps to app/signup.tsx) */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* Tabs layout (maps to app/(tabs)/_layout.tsx) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Not-found screen path (maps to app/+not-found.tsx) */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
