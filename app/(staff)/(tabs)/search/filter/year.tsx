import { useFormContext } from "react-hook-form";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import { Year } from "@/types/models/carData/year";
import { useEffect, useState } from "react";
import YearFilterScreen from "@/screens/staff/tabs/search/filter/year";

const YearFilter = () => {
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

  return <YearFilterScreen years={years} />;
};

export default YearFilter;
