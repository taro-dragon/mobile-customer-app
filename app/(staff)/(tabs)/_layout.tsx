import { useTheme } from "@/contexts/ThemeContext";
import useStaffInfoData from "@/hooks/staff/useStaffInfoData";
import useStaffNotification from "@/hooks/staff/useStaffNotification";
import { useStore } from "@/hooks/useStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Tabs } from "expo-router";
import {
  House,
  MessageSquare,
  Search,
  SettingsIcon,
  StoreIcon,
} from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";

export default function TabLayout() {
  useStaffNotification();
  useStaffInfoData();
  const { staff } = useStore();
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
            headerTintColor: colors.primary,
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
          <Tabs.Screen
            name="talk"
            options={{
              title: "トーク",
              tabBarIcon: ({ color }) => (
                <MessageSquare size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="search"
            options={{
              title: "検索",
              tabBarIcon: ({ color }) => <Search size={24} color={color} />,
            }}
          />
          {staff?.isOwner && (
            <Tabs.Screen
              name="store"
              options={{
                title: "店舗管理",
                tabBarIcon: ({ color }) => (
                  <StoreIcon size={24} color={color} />
                ),
              }}
            />
          )}
          <Tabs.Screen
            name="settings"
            options={{
              title: "設定",
              tabBarIcon: ({ color }) => (
                <SettingsIcon size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </FormProvider>
  );
}
