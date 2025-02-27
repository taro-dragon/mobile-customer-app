import { GreadSelect } from "@/components/OnBoading/GreadSelect";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const SelectGread = () => {
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();

  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      fieldName="gread"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="グレードを選択"
    >
      <GreadSelect />
    </OnBoardingLayout>
  );
};

export default SelectGread;
