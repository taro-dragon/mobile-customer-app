import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const BeforeBulkAppraisal = () => {
  const { cars, bulkAppraisalRequests } = useStore();

  // 一括査定依頼がまだ作成されていない車両のみをフィルタリング
  const beforeBulkAppraisalCars = cars.filter(
    (car) =>
      !bulkAppraisalRequests.some(
        (bulkAppraisalRequest) => bulkAppraisalRequest.carId === car.id
      )
  );

  return <CarFlashList cars={beforeBulkAppraisalCars} />;
};

export default BeforeBulkAppraisal;
