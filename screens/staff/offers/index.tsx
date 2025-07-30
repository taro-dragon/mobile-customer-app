import ArchivedOffersTab from "@/components/staff/offers/tabs/ArchivedOffersTab";
import PublishedOffersTab from "@/components/staff/offers/tabs/PublishedOffersTab";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  published: PublishedOffersTab,
  archived: ArchivedOffersTab,
});

const routes = [
  { key: "published", title: "公開中" },
  { key: "archived", title: "公開終了" },
];
const OffersScreen = () => {
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

export default OffersScreen;
