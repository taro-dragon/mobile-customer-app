import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchBulkAppraisalCar from "@/hooks/staff/useFetchBulkAppraisalCar";
import BulkAppraisalCarDetailScreen from "@/screens/staff/bulkAppraisalCars/detail";
import { useLocalSearchParams, Stack } from "expo-router";

const BulkAppraisalCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalCar, isLoading, isError } = useFetchBulkAppraisalCar(id);
  if (isLoading || !bulkAppraisalCar) {
    return <ShopDetailSkeleton />;
  }
  return <BulkAppraisalCarDetailScreen car={bulkAppraisalCar} />;
};

export default BulkAppraisalCar;
