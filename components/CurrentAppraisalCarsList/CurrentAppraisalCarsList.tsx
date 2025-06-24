import useFetchCurrentAppraisalBids from "@/hooks/user/useFetchCurrentAppraisalBids";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";
import { View } from "react-native";

type CurrentAppraisalCarsListProps = {
  currentAppraisalCars: Car[];
  currentAppraisalRequests: BulkAppraisalRequest[];
};

const CurrentAppraisalCarsList: React.FC<CurrentAppraisalCarsListProps> = ({
  currentAppraisalCars,
  currentAppraisalRequests,
}) => {
  const {
    data: bids,
    error,
    isLoading,
  } = useFetchCurrentAppraisalBids(currentAppraisalRequests);
  console.log("bids", JSON.stringify(bids, null, 2));
  return <View></View>;
};

export default CurrentAppraisalCarsList;
