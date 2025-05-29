import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { useEffect, useState } from "react";
import { Model } from "@/types/models/carData/model";
import CarFilter from "@/screens/staff/tabs/search/filter/car";

const ModelFilter = () => {
  const { getValues } = useFormContext();
  const maker = getValues("maker");
  const { manufacturers } = fullCarData as FullCarData;
  const [cars, setCars] = useState<Model[]>([]);

  useEffect(() => {
    const selectCars = () => {
      return (
        manufacturers.find((m) => m.manufacturerId === maker)?.carModels || []
      );
    };
    const selectedCars = selectCars();
    setCars(selectedCars);
  }, [maker, manufacturers]);
  return <CarFilter cars={cars} />;
};

export default ModelFilter;
