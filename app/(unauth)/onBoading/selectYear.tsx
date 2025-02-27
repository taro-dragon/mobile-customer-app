import { YearSelect } from "@/components/OnBoading/YearSelect";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const SelectYear = () => {
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();

  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      fieldName="year"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="年式を選択"
    >
      <YearSelect />
    </OnBoardingLayout>
  );
};

export default SelectYear;
