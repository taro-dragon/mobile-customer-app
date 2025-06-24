import useFetchCurrentAppraisalBids from "@/hooks/user/useFetchCurrentAppraisalBids";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";
import { FlatList, View } from "react-native";
import ListItem from "./ListItem";

type CurrentAppraisalCarsListProps = {
  currentAppraisalCars: Car[];
  currentAppraisalRequests: BulkAppraisalRequest[];
};

const CurrentAppraisalCarsList: React.FC<CurrentAppraisalCarsListProps> = ({
  currentAppraisalCars,
  currentAppraisalRequests,
}) => {
  const {
    data: bidsByRequestId,
    error,
    isLoading,
  } = useFetchCurrentAppraisalBids(currentAppraisalRequests);

  //  carlistにbidsの情報を付与する
  const carListWithBids = currentAppraisalCars.map((car) => {
    const request = currentAppraisalRequests.find(
      (req) => req.carId === car.id
    );
    const carBids = request ? bidsByRequestId[request.id] || [] : [];
    return { ...car, bids: carBids };
  });

  console.log("carListWithBids", JSON.stringify(carListWithBids, null, 2));
  return (
    <FlatList
      data={carListWithBids}
      renderItem={({ item }) => <ListItem car={item} />}
      horizontal
      contentContainerStyle={{ gap: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CurrentAppraisalCarsList;
