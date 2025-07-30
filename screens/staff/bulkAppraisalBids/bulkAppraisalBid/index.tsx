import CarHeader from "@/components/staff/bulkAppraisalBids/bulkAppraisalBid/Header";
import InfoTab from "@/components/staff/bulkAppraisalBids/bulkAppraisalBid/tabs/InfoTab";
import ListTab from "@/components/staff/bulkAppraisalBids/bulkAppraisalBid/tabs/ListTab";
import { useTheme } from "@/contexts/ThemeContext";
import { useCallback } from "react";
import { View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

const BulkAppraisalBidScreen = () => {
  const { colors, typography } = useTheme();
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
        renderHeader={() => <CarHeader />}
        headerContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { height: 0, width: 0 },
          borderBottomWidth: 1,
          borderBottomColor: colors.gray200,
        }}
        renderTabBar={renderTabBar}
        containerStyle={{
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <Tabs.Tab name="車両情報">
          <InfoTab />
        </Tabs.Tab>
        <Tabs.Tab name="入札一覧">
          <ListTab />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default BulkAppraisalBidScreen;
