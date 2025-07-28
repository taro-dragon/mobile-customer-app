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
      front: stockCar.images.front,
      back: stockCar.images.back,
      left: stockCar.images.left,
      right: stockCar.images.right,
      interior: stockCar.images.interior,
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormProvider {...Form}>
      <StockCarEditScreen stock={stockCar} />
    </FormProvider>
  );
};

export default StockCarEdit;
