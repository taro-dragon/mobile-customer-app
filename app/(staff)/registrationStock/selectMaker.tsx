import RegistrationStockIndexScreen from "@/screens/staff/registrationStock";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import RegistrationStockSelectMakerScreen from "@/screens/staff/registrationStock/selectMaker";

const RegistrationStock = () => {
  const { manufacturers } = fullCarData as FullCarData;
  return <RegistrationStockSelectMakerScreen manufacturers={manufacturers} />;
};

export default RegistrationStock;
