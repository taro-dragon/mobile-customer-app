import Loader from "@/components/common/Loader";
import { useStockCarContext } from "@/contexts/staff/stockCars/StockCarContext";
import StockCarDetailScreen from "@/screens/staff/stockCars/id";

const StockCarDetail = () => {
  const { stockCar, isLoading, isError } = useStockCarContext();

  if (isLoading && !stockCar) return <Loader />;

  return <StockCarDetailScreen stock={stockCar} />;
};

export default StockCarDetail;
