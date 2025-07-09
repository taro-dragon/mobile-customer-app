import React from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useUserCarContext } from "@/contexts/users/UserCarContext";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isBulkAppraisalRequestLoading } = useUserCarContext();
  const router = useRouter();

  const onButtonPress = () => {
    router.push(`/cars/${id}/requestBulkAppraisal`);
  };

  if (isBulkAppraisalRequestLoading) {
    return <ShopDetailSkeleton />;
  }

  return <CarDetailScreen onButtonPress={onButtonPress} />;
};

export default CarDetail;
