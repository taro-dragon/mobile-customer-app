import { Stack } from "expo-router";

const OnBoadingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnBoadingLayout;
