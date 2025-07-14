import Loader from "@/components/common/Loader";
import useFetchProject from "@/hooks/staff/projects/useFetchProject";
import ProjectDetailScreen from "@/screens/staff/projects/detail/ProjectDetail";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const ProjectDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { project, isLoading, isError, mutate } = useFetchProject(id);
  if (isLoading || !project) {
    return <Loader />;
  }
  if (isError) {
    return <Text>Error</Text>;
  }
  if (!project) {
    return <Text>Project not found</Text>;
  }
  return (
    <ProjectDetailScreen
      project={project}
      isLoading={isLoading}
      mutate={mutate}
    />
  );
};

export default ProjectDetail;
