import { gradeSelect } from "@/components/OnBoading/gradeSelect";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const Selectgrade = () => {
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();

  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      fieldName="grade"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="グレードを選択"
    >
      <gradeSelect />
    </OnBoardingLayout>
  );
};

export default Selectgrade;
