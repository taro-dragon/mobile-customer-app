import { ProjectsProvider } from "@/contexts/staff/ProjectsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const ProjectsLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <ProjectsProvider>
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
          name="index"
          options={{
            title: "案件一覧",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "案件詳細",
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </ProjectsProvider>
  );
};

export default ProjectsLayout;
