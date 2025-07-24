import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import PublishedStockCarTab from "./tabs/PublishedStockCarTab";
import ArchivedStockCarTab from "./tabs/ArchivedStockCarTab";

const renderScene = SceneMap({
  published: PublishedStockCarTab,
  archived: ArchivedStockCarTab,
});

const routes = [
  { key: "published", title: "公開中" },
  { key: "archived", title: "非公開" },
];

const StockCarsScreen = () => {
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

export default StockCarsScreen;
