import { useTheme } from "@/contexts/ThemeContext";
import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";

type ConditionTagProps = {
  condition: string;
};

const ConditionTag: React.FC<ConditionTagProps> = ({ condition }) => {
  const { colors, typography } = useTheme();
  const getTagColor = useCallback(
    (condition: string): { color: string; backgroundColor: string } => {
      switch (condition) {
        case "S":
          return {
            color: colors.textWarning,
            backgroundColor: colors.backgroundWarning,
          };
        case "A":
          return {
            color: colors.textSuccess,
            backgroundColor: colors.backgroundSuccess,
          };
        case "B":
          return {
            color: colors.textLink,
            backgroundColor: colors.backgroundInfo,
          };
        case "C":
          return {
            color: colors.textError,
            backgroundColor: colors.backgroundError,
          };
        default:
          return {
            color: colors.textInfo,
            backgroundColor: colors.backgroundInfo,
          };
      }
    },
    [colors]
  );
  const tagColor = useMemo(() => getTagColor(condition), [condition]);
  return (
    <View
      style={{
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: tagColor.color,
        backgroundColor: tagColor.backgroundColor,
      }}
    >
      <Text
        style={{
          color: tagColor.color,
          ...typography.body3,
          fontWeight: "bold",
        }}
      >
        {condition}
      </Text>
    </View>
  );
};

export default ConditionTag;
