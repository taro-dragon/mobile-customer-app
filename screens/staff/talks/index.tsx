import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import CustomerTalksTab from "./tabs/CustomerTalks";
import InternalTalksTab from "./tabs/InternalTalks";

const renderScene = SceneMap({
  customer: CustomerTalksTab,
  internal: InternalTalksTab,
});

const routes = [
  { key: "customer", title: "顧客トーク" },
  { key: "internal", title: "社内トーク" },
];

const TalksScreen = () => {
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

export default TalksScreen;
