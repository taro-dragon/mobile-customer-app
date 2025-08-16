import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Stack } from "expo-router";
import { useMemo } from "react";

const StoreLayout = () => {
  const { colors } = useTheme();
  const { staff } = useStore();
  const isOwner = useMemo(() => staff?.isOwner, [staff]);
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.primary,
        },
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "店舗管理",
        }}
      />
      <Stack.Screen
        name="shopInfo"
        options={{
          title: "店舗情報",
        }}
      />
      <Stack.Screen
        name="editShopInfo"
        options={{
          title: "店舗情報編集",
        }}
      />
      <Stack.Screen
        name="staffList"
        options={{
          title: isOwner ? "スタッフ管理" : "スタッフ一覧",
        }}
      />
      <Stack.Screen
        name="createStaff"
        options={{
          title: "スタッフ登録",
        }}
      />
    </Stack>
  );
};
export default StoreLayout;
