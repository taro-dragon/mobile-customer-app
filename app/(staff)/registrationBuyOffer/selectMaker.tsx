import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import RegistrationBuyOfferSelectMakerScreen from "@/screens/staff/registrationBuyOffer/selectMaker";

const RegistrationBuyOfferSelectMaker = () => {
  const { manufacturers } = fullCarData as FullCarData;
  return (
    <RegistrationBuyOfferSelectMakerScreen manufacturers={manufacturers} />
  );
};

export default RegistrationBuyOfferSelectMaker;
