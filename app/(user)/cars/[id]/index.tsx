import React, { useEffect, useCallback } from "react";
import { View } from "react-native";

import { useStore } from "@/hooks/useStore";
import { useTheme } from "@/contexts/ThemeContext";
import CarDetailHeader from "@/components/CarDetail/CarHeader";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import CarDetailOfferTab from "@/components/CarDetail/CarDetailOfferTab";
import CarDetailBulkAppraisalRequestsTab from "@/components/CarDetail/CarDetailBulkAppraisalRequestsTab";

const CarDetail = () => {
  const { fetchBulkAppraisalRequests, user } = useStore();
  const { colors, typography } = useTheme();

  useEffect(() => {
    if (user?.id) {
      fetchBulkAppraisalRequests(user.id);
    }
  }, [user?.id]);

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
  );
};

export default CarDetail;
