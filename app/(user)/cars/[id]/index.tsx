import React, { useEffect, useCallback } from "react";
import { View } from "react-native";

import { useStore } from "@/hooks/useStore";
import { useTheme } from "@/contexts/ThemeContext";
import CarDetailHeader from "@/components/CarDetail/CarHeader";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import CarDetailOfferTab from "@/components/CarDetail/CarDetailOfferTab";
import CarDetailBulkAppraisalRequestsTab from "@/components/CarDetail/CarDetailBulkAppraisalRequestsTab";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";
import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import { useLocalSearchParams } from "expo-router";
import CarDetailScreen from "@/screens/users/cars/detail";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequest, isLoading } = useFetchBulkAppraisalRequest(id);

  if (isLoading || !bulkAppraisalRequest) {
    return <ShopDetailSkeleton />;
  }

  return <CarDetailScreen bulkAppraisalRequest={bulkAppraisalRequest} />;
};

export default CarDetail;
