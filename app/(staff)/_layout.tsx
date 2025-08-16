import { useTheme } from "@/contexts/ThemeContext";
import useStaffInfoData from "@/hooks/staff/useStaffInfoData";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const { colors } = useTheme();
  useStaffInfoData();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "ホーム",
          animation: "flip",
        }}
      />
      <Stack.Screen
        name="registrationStock"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="registrationBuyOffer"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="notificationInitialize"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="firstPasswordSetting"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="talks/[talkId]"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="internalTalk/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="bulkAppraisalCars"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="customer"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="stockCar"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="shops"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="staff"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="bulkAppraisalBid"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="bids"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: "位置情報",
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="offers"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="projects"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="stockCars"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="bulkAppraisalBids"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="createTalk"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="shopSelect"
        options={{
          title: "店舗選択",
          contentStyle: {
            backgroundColor: colors.backgroundSecondary,
          },
        }}
      />
    </Stack>
  );
}
