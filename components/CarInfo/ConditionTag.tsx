import { useTheme } from "@/contexts/ThemeContext";
import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import Tag from "../common/Tag";

type ConditionTagProps = {
  condition: string;
};

const ConditionTag: React.FC<ConditionTagProps> = ({ condition }) => {
  const { colors } = useTheme();
  const getTagColor = useCallback(
    (condition: string): "info" | "success" | "warning" | "error" => {
      switch (condition) {
        case "S":
          return "warning";
        case "A":
          return "success";
        case "B":
          return "error";
        case "C":
          return "info";
        default:
          return "info";
      }
    },
    [colors]
  );
  const tagColor = useMemo(() => getTagColor(condition), [condition]);
  return <Tag label={condition} color={tagColor} />;
};

export default ConditionTag;
