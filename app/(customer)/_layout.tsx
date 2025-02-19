import useUserCarFetch from "@/hooks/useUserCarFetch";
import { Stack } from "expo-router/stack";

export default function Layout() {
  useUserCarFetch();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
