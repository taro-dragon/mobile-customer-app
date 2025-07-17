import { useProject } from "@/contexts/staff/ProjectContext";
import CarCheckRequestScreen from "@/screens/staff/talks/carCheckRequest";
import { useRouter } from "expo-router";

const CarCheckRequest = () => {
  const { project } = useProject();
  const router = useRouter();
  if (!project || !project.preferredInfo) {
    router.back();
    return null;
  }
  return <CarCheckRequestScreen preferredInfo={project.preferredInfo} />;
};

export default CarCheckRequest;
