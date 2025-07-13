import { useProjects } from "@/contexts/staff/ProjectsContext";
import ProjectsList from "./ProjectsList";

const InProgressProjects = () => {
  const {
    inProgressProjects,
    isLoadingInProgressProjects,
    hasMoreInProgressProjects,
    loadMoreInProgressProjects,
    mutateInProgressProjects,
  } = useProjects();
  return (
    <ProjectsList
      projects={inProgressProjects}
      isLoading={isLoadingInProgressProjects}
      hasMore={hasMoreInProgressProjects}
      loadMore={loadMoreInProgressProjects}
      mutate={mutateInProgressProjects}
    />
  );
};

export default InProgressProjects;
