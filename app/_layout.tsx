import React, { useEffect, useState } from "react";
import { Href, Slot, useRouter, useSegments } from "expo-router";
import { useStore } from "@/hooks/useStore";
import useAuthInitialization from "@/hooks/useAuthInitialization";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ToastConfig } from "@/constants/ToastConfig";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, staff, isAppReady } = useStore();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  useAuthInitialization();

  useEffect(() => {
    if (!isAppReady) return;

    const determineRoute = () => {
      if (user) return "/(user)/(tabs)";
      if (staff) return "/(staff)/";
      return "/(unauth)";
    };

    setInitialRoute(determineRoute());
  }, [user, staff, isAppReady]);

  // ルートリダイレクトとスプラッシュスクリーン制御
  useEffect(() => {
    if (!initialRoute) return;

    const initialSegment = initialRoute.split("/")[1];
    const currentSegment = segments.length > 0 ? segments[0] : "";
    const needsRedirect = initialSegment !== currentSegment;

    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (needsRedirect) {
      // リダイレクトが必要な場合
      const redirectTimer = setTimeout(() => {
        router.replace(initialRoute as Href);
        setTimeout(hideSplashScreen, 150);
      }, 50);

      return () => clearTimeout(redirectTimer);
    } else {
      // 現在のルートが正しい場合はスプラッシュスクリーンを非表示に
      setTimeout(hideSplashScreen, 150);
    }
  }, [initialRoute, segments, router]);

  if (!isAppReady || !initialRoute) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        <Toast config={ToastConfig} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
