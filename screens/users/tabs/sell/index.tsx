import BeforeBulkAppraisal from "@/components/CarList/BeforeBulkAppraisal";
import CompletedBulkAppraisal from "@/components/CarList/CompletedBulkAppraisal";
import ProgressBulkAppraisal from "@/components/CarList/ProgressBulkAppraisal";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  beforeBulkAppraisal: BeforeBulkAppraisal,
  progressBulkAppraisal: ProgressBulkAppraisal,
  completedBulkAppraisal: CompletedBulkAppraisal,
});

const routes = [
  { key: "beforeBulkAppraisal", title: "一括査定依頼前" },
  { key: "progressBulkAppraisal", title: "一括査定進行中" },
  { key: "completedBulkAppraisal", title: "一括査定完了" },
];

const SellIndexScreen = () => {
  const { typography, colors } = useTheme();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
        commonOptions={{ labelStyle: { ...typography.heading4 } }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{
              backgroundColor: colors.backgroundPrimary,
              borderBottomColor: colors.borderPrimary,
              borderBottomWidth: 1,
            }}
            activeColor={colors.primary}
            inactiveColor={colors.textSecondary}
          />
        )}
      />
    </View>
  );
};

export default SellIndexScreen;
