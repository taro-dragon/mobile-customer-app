import CarDetailBulkAppraisalRequestsTab from "@/components/CarDetail/CarDetailBulkAppraisalRequestsTab";
import CarDetailOfferTab from "@/components/CarDetail/CarDetailOfferTab";
import CarDetailHeader from "@/components/CarDetail/CarHeader";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { useUserCarContext } from "@/contexts/users/UserCarContext";
import React, { useCallback } from "react";
import { View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

const CarDetailScreen: React.FC<{ onButtonPress: () => void }> = ({
  onButtonPress,
}) => {
  const { colors, typography } = useTheme();
  const { bulkAppraisalRequest } = useUserCarContext();

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
            <CarDetailBulkAppraisalRequestsTab
              handleRequestBulkAppraisal={onButtonPress}
            />
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
              onPress={onButtonPress}
              color={colors.primary}
            />
          </View>
          <SafeAreaBottom color={colors.backgroundPrimary} />
        </>
      )}
    </View>
  );
};

export default CarDetailScreen;
