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

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bulkAppraisalRequest } = useFetchBulkAppraisalRequest(id);
  const { colors, typography } = useTheme();

  const renderHeader = useCallback(() => <CarDetailHeader />, []);
  const renderTabBar = useCallback(
    (props: any) => (
      <MaterialTabBar
        {...props}
        activeColor={colors.primary}
        inactiveColor={colors.textSecondary}
        indicatorStyle={{
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 3,
        }}
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
        labelStyle={typography.heading3}
      />
    ),
    [colors, typography]
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs.Container
          revealHeaderOnScroll
          renderHeader={renderHeader}
          headerContainerStyle={{
            backgroundColor: colors.backgroundPrimary,
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: { height: 0, width: 0 },
            borderBottomWidth: 1,
            borderBottomColor: colors.gray200,
          }}
          renderTabBar={renderTabBar}
          lazy={true}
          containerStyle={{
            backgroundColor: colors.backgroundPrimary,
          }}
        >
          <Tabs.Tab name="買取オファー">
            <CarDetailOfferTab />
          </Tabs.Tab>
          <Tabs.Tab name="一括査定結果">
            <CarDetailBulkAppraisalRequestsTab />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
      {!bulkAppraisalRequest?.status && (
        <>
          <Divider />
          <View
            style={{ padding: 16, backgroundColor: colors.backgroundPrimary }}
          >
            <Button
              label="一括査定を依頼する"
              onPress={() => {}}
              color={colors.primary}
            />
          </View>
          <SafeAreaBottom />
        </>
      )}
    </View>
  );
};

export default CarDetail;
