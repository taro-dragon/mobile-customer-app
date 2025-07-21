import Loader from "@/components/common/Loader";
import { useProject } from "@/contexts/staff/ProjectContext";
import ProjectEditScreen from "@/screens/staff/projects/detail/ProjectEdit";
import { Text } from "react-native";

const ProjectEdit = () => {
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
  return <ProjectEditScreen />;
};

export default ProjectEdit;
