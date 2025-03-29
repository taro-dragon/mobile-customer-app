import { useStore } from "@/hooks/useStore";
import CarFlashList from "./CarFlashList";

const BeforeBulkAppraisal = () => {
  const { cars } = useStore();
  const beforeBulkAppraisalCars = cars.filter(
    (car) => car.status === undefined
  );
  return <CarFlashList cars={beforeBulkAppraisalCars} />;
};

export default BeforeBulkAppraisal;
