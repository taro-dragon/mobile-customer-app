import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import InProgressBulkAppraisalBidsTab from "./tabs/InProgressBulkAppraisalBidsTab";
import WaitingSelectionBulkAppraisalBidsTab from "./tabs/WaitingSelectionBulkAppraisalBidsTab";
import FinishedBulkAppraisalBidsTab from "./tabs/FinishedBulkAppraisalBidsTab";

const renderScene = SceneMap({
  inProgress: InProgressBulkAppraisalBidsTab,
  waitingSelection: WaitingSelectionBulkAppraisalBidsTab,
  finished: FinishedBulkAppraisalBidsTab,
});

const routes = [
  { key: "inProgress", title: "入札中" },
  { key: "waitingSelection", title: "会社選択中" },
  { key: "finished", title: "完了" },
];

const BulkAppraisalBidsScreen = () => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const { typography, colors } = useTheme();
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

export default BulkAppraisalBidsScreen;
