import { MakerSelect } from "@/components/OnBoading/MakerSelect";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";
import { useNavigation } from "expo-router";

const OnBoading = () => {
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();
  const navigation = useNavigation();

  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={() => navigation.getParent()?.goBack()}
      fieldName="maker"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="メーカーを選択"
    >
      <MakerSelect />
    </OnBoardingLayout>
  );
};

export default OnBoading;
