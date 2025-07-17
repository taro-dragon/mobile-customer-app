import Loader from "@/components/common/Loader";
import { useProject } from "@/contexts/staff/ProjectContext";
import ProjectDetailScreen from "@/screens/staff/projects/detail/ProjectDetail";
import { Text } from "react-native";

const ProjectDetail = () => {
  const { project, isLoading, isError, mutate } = useProject();
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
