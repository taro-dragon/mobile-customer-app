import MakerFilterScreen from "@/screens/users/tabs/search/filter/maker";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";

const MakerFilter = () => {
  const { manufacturers } = fullCarData as FullCarData;
  return <MakerFilterScreen manufacturers={manufacturers} />;
};

export default MakerFilter;
