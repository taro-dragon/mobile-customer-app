import React, { useCallback, useState } from "react";

import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchBuyOffers from "@/hooks/user/useFetchBuyOffers";
import { useStore } from "@/hooks/useStore";
import { Car } from "@/types/models/Car";
import { useUserCarContext } from "@/contexts/users/UserCarContext";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars } = useStore();
  const { mutateBulkAppraisalRequest, isBulkAppraisalRequestLoading } =
    useUserCarContext();
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      mutateBulkAppraisalRequest();
    }, [mutateBulkAppraisalRequest])
  );
  const onButtonPress = () => {
    router.push(`/cars/${id}/requestBulkAppraisal`);
  };

  if (isBulkAppraisalRequestLoading) {
    return <ShopDetailSkeleton />;
  }

  return <CarDetailScreen onButtonPress={onButtonPress} />;
};

export default CarDetail;
