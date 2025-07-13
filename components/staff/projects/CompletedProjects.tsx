import { useProjects } from "@/contexts/staff/ProjectsContext";
import ProjectsList from "./ProjectsList";

const CompletedProjects = () => {
  const {
    completedProjects,
    isLoadingCompletedProjects,
    hasMoreCompletedProjects,
    loadMoreCompletedProjects,
    mutateCompletedProjects,
  } = useProjects();
  return (
    <ProjectsList
      projects={completedProjects}
      isLoading={isLoadingCompletedProjects}
      hasMore={hasMoreCompletedProjects}
      loadMore={loadMoreCompletedProjects}
      mutate={mutateCompletedProjects}
    />
  );
};

export default CompletedProjects;
