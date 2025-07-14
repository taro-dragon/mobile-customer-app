export const getProjectsStatusLabel = (
  status: string
): {
  label: string;
  color: "warning" | "error" | "success" | "info" | "primary";
} => {
  switch (status) {
    case "in_progress":
      return { label: "進行中", color: "warning" };
    case "completed":
      return { label: "完了", color: "success" };
    default:
      return { label: "不明", color: "error" };
  }
};
