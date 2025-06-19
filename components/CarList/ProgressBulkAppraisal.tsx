import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const ProgressBulkAppraisal = () => {
  const { cars } = useStore();
  const progressBulkAppraisalCars = cars.filter(
    (car) =>
      car.status === "in_progress" ||
      car.status === "deadline" ||
      car.status === "completed"
  );
  return <CarFlashList cars={progressBulkAppraisalCars} />;
};

export default ProgressBulkAppraisal;
