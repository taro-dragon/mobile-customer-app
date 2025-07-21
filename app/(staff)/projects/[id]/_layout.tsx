import { ProjectProvider } from "@/contexts/staff/ProjectContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Pencil } from "lucide-react-native";
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
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                displayMode="minimal"
                onPress={() => router.back()}
                tintColor={colors.primary}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push(`/projects/${id}/edit`)}
              >
                <Pencil size={20} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="carCheckRequest"
          options={{
            title: "現車確認依頼",
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: "編集",
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </ProjectProvider>
  );
};

export default ProjectLayout;
