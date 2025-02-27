import { CarSelect } from "@/components/OnBoading/CarSelect";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const SelectCar = () => {
  const { goToNextStep, goToPreviousStep, currentStepIndex } = useOnBoarding();

  return (
    <OnBoardingLayout
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      fieldName="model"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="車種を選択"
    >
      <CarSelect />
    </OnBoardingLayout>
  );
};

export default SelectCar;
