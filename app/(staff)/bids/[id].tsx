import useFetchBid from "@/hooks/staff/useBid";
import BidDetailScreen from "@/screens/staff/bids/detail";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const BidDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bid, isLoading, isError } = useFetchBid(id);
  if (isLoading || !bid) {
    return <View />;
  }
  return <BidDetailScreen bid={bid} />;
};

export default BidDetail;
