import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import CarIcon from "@/components/icons/car";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Picture from "@/components/formItem/picture";
import { useFormContext } from "react-hook-form";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const CaptureCar = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { watch } = useFormContext();
  const front = watch("front");
  const back = watch("back");
  const left = watch("left");
  const right = watch("right");
  const isAllCapture = front && back && left && right;
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();
  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      fieldName="model"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="自動車を撮影"
      disabled={!isAllCapture}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <Picture name="front" />
        <View
          style={{
            flexDirection: "row",
            gap: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Picture name="left" />
          <CarIcon size={80} color={colors.primary} />
          <Picture name="right" />
        </View>
        <Picture name="back" />
      </View>
    </OnBoardingLayout>
  );
};

export default CaptureCar;
