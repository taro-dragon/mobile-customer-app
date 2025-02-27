import { useCallback } from "react";
import { useRouter, usePathname } from "expo-router";
import { useFormContext } from "react-hook-form";
import { Href } from "expo-router";

// オンボーディングのステップを定義
const STEPS = [
  { route: "/onBoading", field: "maker" },
  { route: "/onBoading/selectCar", field: "model" },
  { route: "/onBoading/selectYear", field: "year" },
  { route: "/onBoading/selectGread", field: "gread" },
  { route: "/onBoading/captureCar", field: "photos" },
  { route: "/onBoading/confirm", field: null },
];

export const useOnBoarding = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 現在のステップインデックスを取得
  const getCurrentStepIndex = useCallback(() => {
    return STEPS.findIndex((step) => step.route === pathname);
  }, [pathname]);

  // 次のステップに進む
  const goToNextStep = useCallback(() => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < STEPS.length - 1) {
      router.push(STEPS[currentIndex + 1].route as Href);
    }
  }, [getCurrentStepIndex, router]);

  // 前のステップに戻る
  const goToPreviousStep = useCallback(() => {
    router.back();
  }, [router]);

  // 特定のステップに移動
  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < STEPS.length) {
        router.push(STEPS[index].route as Href);
      }
    },
    [router]
  );

  return {
    steps: STEPS,
    currentStepIndex: getCurrentStepIndex(),
    goToNextStep,
    goToPreviousStep,
    goToStep,
  };
};
