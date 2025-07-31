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
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorService from "@/libs/ErrorService";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ModalProvider } from "@/contexts/ModalContext";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import { loadAsyncStorage } from "@/libs/asyncStorage";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, staff, isAppReady } = useStore();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  useAuthInitialization();

  useEffect(() => {
    ErrorService.setupGlobalHandlers();

    const customHandler = (error: Error, isFatal?: boolean) => {
      console.log(
        `Custom handler caught ${isFatal ? "fatal" : ""} error:`,
        error.message
      );
    };

    ErrorService.addErrorHandler(customHandler);

    return () => {
      ErrorService.removeErrorHandler(customHandler);
    };
  }, []);

  useEffect(() => {
    // isAppReadyがtrueで、かつ認証状態が確定している場合のみルートを決定
    if (!isAppReady) return;

    const determineRoute = async () => {
      const localStorageStoreId = await loadAsyncStorage(
        AsyncStorageKey.SELECTED_SHOP_ID
      );
      if (staff) {
        if (staff.isFirstLogin) return "/(staff)/firstPasswordSetting";
        if (staff.shops?.length !== 1 && !localStorageStoreId)
          return "/(staff)/shopSelect";
        return "/(staff)/(tabs)";
      }
      if (user) return "/(user)/(tabs)";
      return "/(unauth)";
    };

    const fetchRoute = async () => {
      const route = await determineRoute();
      setInitialRoute(route);
      setIsInitializing(false);
    };

    fetchRoute();
  }, [user, staff, isAppReady]);

  useEffect(() => {
    if (!initialRoute || isInitializing) return;

    const initialSegment = initialRoute.split("/")[1];
    const currentSegment = segments.length > 0 ? segments[0] : "";
    const needsRedirect = initialSegment !== currentSegment;

    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (needsRedirect) {
      const redirectTimer = setTimeout(() => {
        router.replace(initialRoute as Href);
        setTimeout(hideSplashScreen, 150);
      }, 50);

      return () => clearTimeout(redirectTimer);
    } else {
      setTimeout(hideSplashScreen, 150);
    }
  }, [initialRoute, segments, router, isInitializing]);

  // アプリが準備できていない間、または初期化中は何も表示しない（スプラッシュスクリーンが表示される）
  if (!isAppReady || isInitializing) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ActionSheetProvider>
              <BottomSheetModalProvider>
                <ModalProvider>
                  <Slot />
                </ModalProvider>
              </BottomSheetModalProvider>
            </ActionSheetProvider>
          </GestureHandlerRootView>
          <Toast config={ToastConfig} />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
