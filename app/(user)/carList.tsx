import BeforeBulkAppraisal from "@/components/CarList/BeforeBulkAppraisal";
import CompletedBulkAppraisal from "@/components/CarList/CompletedBulkAppraisal";
import ProgressBulkAppraisal from "@/components/CarList/ProgressBulkAppraisal";
import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

const CarList = () => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Tabs.Container
        headerContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { height: 0, width: 0 },
          borderBottomWidth: 1,
          borderBottomColor: colors.gray200,
        }}
        renderTabBar={(props) => (
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
            labelStyle={typography.heading4}
          />
        )}
      >
        <Tabs.Tab name="一括査定依頼前">
          <BeforeBulkAppraisal />
        </Tabs.Tab>
        <Tabs.Tab name="一括査定進行中">
          <ProgressBulkAppraisal />
        </Tabs.Tab>
        <Tabs.Tab name="一括査定依頼完了">
          <CompletedBulkAppraisal />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default CarList;
