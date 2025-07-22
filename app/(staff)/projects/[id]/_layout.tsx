import { ProjectProvider } from "@/contexts/staff/ProjectContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Pencil, X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const ProjectLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ProjectProvider>
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
            title: "案件詳細",
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="carCheckRequest"
          options={{
            title: "現車確認依頼",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: "編集",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </ProjectProvider>
  );
};

export default ProjectLayout;
