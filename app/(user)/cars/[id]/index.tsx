import React, { useCallback, useState } from "react";

import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequest, mutate, isLoading } =
    useFetchBulkAppraisalRequest(id);
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      mutate();
    }, [mutate])
  );
  const onButtonPress = () => {
    router.push(`/cars/${id}/requestBulkAppraisal`);
  };

  if (isLoading) {
    return <ShopDetailSkeleton />;
  }

  return (
    <CarDetailScreen
      bulkAppraisalRequest={bulkAppraisalRequest}
      onButtonPress={onButtonPress}
    />
  );
};

export default CarDetail;
