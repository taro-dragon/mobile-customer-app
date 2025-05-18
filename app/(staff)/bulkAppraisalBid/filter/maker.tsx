import MakerFilterScreen from "@/screens/staff/bulkAppraisalBid/filter/maker";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";

const MakerFilter: React.FC = () => {
  const { manufacturers } = fullCarData as FullCarData;
  return <MakerFilterScreen manufacturers={manufacturers} />;
};

export default MakerFilter;
