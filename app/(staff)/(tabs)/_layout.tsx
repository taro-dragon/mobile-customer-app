import { useTheme } from "@/contexts/ThemeContext";
import useStaffNotification from "@/hooks/staff/useStaffNotification";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Tabs } from "expo-router";
import { House, MessageSquare, Search, Settings } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";

export default function TabLayout() {
  useStaffNotification();
  const { colors } = useTheme();
  const form = useForm();
  return (
    <FormProvider {...form}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
              backgroundColor: colors.backgroundPrimary,
              borderTopWidth: 0,
            },
            sceneStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTitleStyle: {
              color: colors.primary,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "ホーム",
              tabBarIcon: ({ color }) => <House size={24} color={color} />,
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </FormProvider>
  );
}
