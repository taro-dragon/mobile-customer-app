import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  const { colors } = useTheme();
  const router = useRouter();
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
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "ホーム" }}
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
      <Stack.Screen name="shopSelect" />
    </Stack>
  );
}
