import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BeforeBulkAppraisal from "@/components/CarList/BeforeBulkAppraisal";
import CompletedBulkAppraisal from "@/components/CarList/CompletedBulkAppraisal";
import ProgressBulkAppraisal from "@/components/CarList/ProgressBulkAppraisal";
import { useTheme } from "@/contexts/ThemeContext";

const Tab = createMaterialTopTabNavigator();

const CarList = () => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.backgroundPrimary },
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarLabelStyle: {
            color: colors.textSecondary,
            ...typography.heading4,
          },
          tabBarActiveTintColor: colors.primary,
          sceneStyle: { backgroundColor: colors.backgroundPrimary },
        }}
      >
        <Tab.Screen name="一括査定依頼前" component={BeforeBulkAppraisal} />
        <Tab.Screen name="一括査定進行中" component={ProgressBulkAppraisal} />
        <Tab.Screen
          name="一括査定依頼完了"
          component={CompletedBulkAppraisal}
        />
      </Tab.Navigator>
    </View>
  );
};

export default CarList;
