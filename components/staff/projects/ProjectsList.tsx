import { FlatList, Text, View } from "react-native";
import { FileText } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import ProjectItem from "./ProjectItem";
import { Project } from "@/types/firestore_schema/project";

type ProjecListProps = {
  projects: Project[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  mutate: () => void;
};

const ProjectsList: React.FC<ProjecListProps> = ({
  projects,
  isLoading,
  hasMore,
  loadMore,
  mutate,
}) => {
  const { colors, typography } = useTheme();

  return (
    <FlatList
      data={projects}
      contentContainerStyle={{ padding: 16, flexGrow: 1 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <ProjectItem project={item} />}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <FileText size={48} color={colors.iconSecondary} strokeWidth={1.5} />
          <Text style={{ color: colors.textSecondary, ...typography.heading2 }}>
            対象の案件がありません
          </Text>
        </View>
      }
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      refreshing={isLoading}
      onRefresh={mutate}
    />
  );
};

export default ProjectsList;
