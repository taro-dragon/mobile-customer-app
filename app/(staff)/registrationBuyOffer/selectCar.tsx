import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Model } from "@/types/models/carData/model";
import RegistrationBuyOfferSelectCarScreen from "@/screens/staff/registrationBuyOffer/selectCar";

const RegistrationBuyOfferSelectCar = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
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
  return <RegistrationBuyOfferSelectCarScreen cars={cars} />;
};

export default RegistrationBuyOfferSelectCar;
