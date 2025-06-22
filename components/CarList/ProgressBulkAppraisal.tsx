import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const ProgressBulkAppraisal = () => {
  const { cars, bulkAppraisalRequests } = useStore();
  const progressBulkAppraisalCars = cars.filter((car) =>
    bulkAppraisalRequests.some(
      (bulkAppraisalRequest) =>
        bulkAppraisalRequest.carId === car.id &&
        (bulkAppraisalRequest.status === "in_progress" ||
          bulkAppraisalRequest.status === "deadline")
    )
  );
  return <CarFlashList cars={progressBulkAppraisalCars} />;
};

export default ProgressBulkAppraisal;
