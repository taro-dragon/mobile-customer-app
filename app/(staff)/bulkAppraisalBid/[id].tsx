import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useFetchBulkAppraisalBid } from "@/hooks/staff/useFetchBulkAppraisalBid";
import BulkAppraisalBidDetailScreen from "@/screens/staff/bulkAppraisalBid/detail";
import BulkAppraisalBidProgressDetailScreen from "@/screens/staff/bulkAppraisalBid/progressDetail";
import { useLocalSearchParams } from "expo-router";

const BulkAppraisalBid = () => {
  const { id } = useLocalSearchParams();
  const { data, error, mutate, isLoading } = useFetchBulkAppraisalBid(
    id as string
  );
  if (isLoading || !data) {
    return <ShopDetailSkeleton />;
  }
  if (data.status === "in_progress") {
    return <BulkAppraisalBidProgressDetailScreen data={data} mutate={mutate} />;
  } else {
    return <BulkAppraisalBidDetailScreen data={data} mutate={mutate} />;
  }
};

export default BulkAppraisalBid;
