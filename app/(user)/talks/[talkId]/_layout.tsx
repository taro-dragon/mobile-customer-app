import { useTheme } from "@/contexts/ThemeContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";

const TalkLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "トーク",
          headerLeft: (props) => (
            <HeaderBackButton
              onPress={() => router.back()}
              displayMode="minimal"
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="appraisalPrice"
        options={{
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="answerCarCheckRequest"
        options={{
          title: "回答する",
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: "位置情報",
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default TalkLayout;
