import { useTheme } from "@/contexts/ThemeContext";

export const useGetSourceTypeLabel = (
  sourceType: string
): {
  label: string;
  color: "info" | "success" | "warning" | "error" | "primary";
} => {
  const { colors } = useTheme();
  switch (sourceType) {
    case "bids":
      return { label: "一括査定", color: "info" };
    case "offers":
      return { label: "買取オファー", color: "success" };
    case "car_inquire":
      return { label: "問い合わせ", color: "primary" };
    default:
      return { label: "不明", color: "error" };
  }
};
