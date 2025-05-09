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

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const { user, staff, isAppReady } = useStore();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
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
    if (!isAppReady) return;

    const determineRoute = () => {
      if (staff) {
        if (staff.isFirstLogin) return "/(staff)/firstPasswordSetting";
        if (staff.shops.length !== 1) return "/(staff)/shopSelect";
        return "/(staff)/(tabs)";
      }
      if (user) return "/(user)/(tabs)";
      return "/(unauth)";
    };

    setInitialRoute(determineRoute());
  }, [user, staff, isAppReady]);

  useEffect(() => {
    if (!initialRoute) return;

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
  }, [initialRoute, segments, router]);

  if (!isAppReady || !initialRoute) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
          </GestureHandlerRootView>
          <Toast config={ToastConfig} />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
