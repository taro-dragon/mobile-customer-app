import CompletedProjects from "@/components/staff/projects/CompletedProjects";
import InProgressProjects from "@/components/staff/projects/InProgressProjects";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  inProgress: InProgressProjects,
  completed: CompletedProjects,
});

const routes = [
  { key: "inProgress", title: "進行中" },
  { key: "completed", title: "終了" },
];

const ProjectsScreen = () => {
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

export default ProjectsScreen;
