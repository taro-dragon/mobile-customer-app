import useCompletedProjects from "@/hooks/staff/projects/useCompletedProjects";
import useInProgressProjects from "@/hooks/staff/projects/useInProgressProjects";
import { Project } from "@/types/firestore_schema/project";
import { createContext, useContext } from "react";

type ProjectsContextType = {
  inProgressProjects: Project[];
  completedProjects: Project[];
  isLoadingInProgressProjects: boolean;
  isLoadingCompletedProjects: boolean;
  errorInProgressProjects: Error | null;
  errorCompletedProjects: Error | null;
  isValidatingInProgressProjects: boolean;
  isValidatingCompletedProjects: boolean;
  hasMoreInProgressProjects: boolean;
  hasMoreCompletedProjects: boolean;
  loadMoreInProgressProjects: () => void;
  loadMoreCompletedProjects: () => void;
  mutateInProgressProjects: () => void;
  mutateCompletedProjects: () => void;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    projects: inProgressProjects,
    isLoading: isLoadingInProgressProjects,
    error: errorInProgressProjects,
    isValidating: isValidatingInProgressProjects,
    hasMore: hasMoreInProgressProjects,
    loadMore: loadMoreInProgressProjects,
    mutate: mutateInProgressProjects,
  } = useInProgressProjects();
  const {
    projects: completedProjects,
    isLoading: isLoadingCompletedProjects,
    error: errorCompletedProjects,
    isValidating: isValidatingCompletedProjects,
    hasMore: hasMoreCompletedProjects,
    loadMore: loadMoreCompletedProjects,
    mutate: mutateCompletedProjects,
  } = useCompletedProjects();
  return (
    <ProjectsContext.Provider
      value={{
        inProgressProjects,
        completedProjects,
        hasMoreInProgressProjects,
        hasMoreCompletedProjects,
        isLoadingInProgressProjects,
        isLoadingCompletedProjects,
        errorInProgressProjects,
        errorCompletedProjects,
        isValidatingInProgressProjects,
        isValidatingCompletedProjects,
        loadMoreInProgressProjects,
        loadMoreCompletedProjects,
        mutateInProgressProjects,
        mutateCompletedProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext<ProjectsContextType | undefined>(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
