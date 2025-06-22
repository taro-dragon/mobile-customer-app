import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const CompletedBulkAppraisal = () => {
  const { cars, bulkAppraisalRequests } = useStore();
  const completedBulkAppraisalCars = cars.filter((car) =>
    bulkAppraisalRequests.some(
      (bulkAppraisalRequest) =>
        bulkAppraisalRequest.carId === car.id &&
        bulkAppraisalRequest.status === "completed"
    )
  );
  return <CarFlashList cars={completedBulkAppraisalCars} />;
};

export default CompletedBulkAppraisal;
