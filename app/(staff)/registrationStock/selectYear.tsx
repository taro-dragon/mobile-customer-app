import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Model } from "@/types/models/carData/model";
import { Year } from "@/types/models/carData/year";
import RegistrationStockSelectYearScreen from "@/screens/staff/registrationStock/selectYear";

const RegistrationStockSelectCar = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const { manufacturers } = fullCarData as FullCarData;
  const [years, setYears] = useState<Year[]>([]);

  useEffect(() => {
    const selectYears = () => {
      const cars =
        manufacturers.find((m) => m.manufacturerId === maker)?.carModels || [];
      const years = cars.find((c) => c.modelId === model)?.years;
      return years;
    };
    const selectedYears = selectYears();
    setYears(selectedYears || []);
  }, [maker, manufacturers, model]);
  return <RegistrationStockSelectYearScreen years={years} />;
};

export default RegistrationStockSelectCar;
