import useFetchProject, {
  ExtendedProject,
} from "@/hooks/staff/projects/useFetchProject";
import { useLocalSearchParams } from "expo-router";
import { createContext, useContext } from "react";

type ProjectContextType = {
  project: ExtendedProject | undefined;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  mutate: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { project, isLoading, isError, mutate, error } = useFetchProject(id);
  return (
    <ProjectContext.Provider
      value={{ project, isLoading, error, isError, mutate }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
