import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const ProgressBulkAppraisal = () => {
  const { cars } = useStore();
  const progressBulkAppraisalCars = cars.filter(
    (car) => car.status === "appraising" || car.status === "company_selection"
  );
  return <CarFlashList cars={progressBulkAppraisalCars} />;
};

export default ProgressBulkAppraisal;
