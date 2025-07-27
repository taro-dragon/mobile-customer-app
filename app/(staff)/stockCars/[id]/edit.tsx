import Loader from "@/components/common/Loader";
import { RegistrationStockFormData } from "@/constants/schemas/registrationStockSchema";
import { useStockCarContext } from "@/contexts/staff/stockCars/StockCarContext";
import StockCarEditScreen from "@/screens/staff/stockCars/id/edit";
import { FormProvider, useForm } from "react-hook-form";

const StockCarEdit = () => {
  const { stockCar, isLoading, isError, mutate } = useStockCarContext();
  const Form = useForm<RegistrationStockFormData>({
    defaultValues: {
      ...stockCar,
      mileage: String(stockCar.mileage),
      totalPayment: String(stockCar.totalPayment),
      bodyPrice: String(stockCar.bodyPrice),
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormProvider {...Form}>
      <StockCarEditScreen />
    </FormProvider>
  );
};

export default StockCarEdit;
