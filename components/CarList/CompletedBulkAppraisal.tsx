import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const CompletedBulkAppraisal = () => {
  const { cars } = useStore();
  const completedBulkAppraisalCars = cars.filter(
    (car) => car.status === "completed"
  );
  return <CarFlashList cars={completedBulkAppraisalCars} />;
};

export default CompletedBulkAppraisal;
