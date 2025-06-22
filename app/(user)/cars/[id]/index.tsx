import React, { useCallback, useState } from "react";

import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequest, mutate } = useFetchBulkAppraisalRequest(id);
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      mutate();
    }, [mutate])
  );
  const onButtonPress = () => {
    router.push(`/cars/${id}/requestBulkAppraisal`);
  };

  return (
    <CarDetailScreen
      bulkAppraisalRequest={bulkAppraisalRequest}
      onButtonPress={onButtonPress}
    />
  );
};

export default CarDetail;
