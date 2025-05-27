import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Year } from "@/types/models/carData/year";
import RegistrationBuyOfferSelectYearScreen from "@/screens/staff/registrationBuyOffer/selectYear";

const RegistrationBuyOfferSelectYear = () => {
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
  return <RegistrationBuyOfferSelectYearScreen years={years} />;
};

export default RegistrationBuyOfferSelectYear;
