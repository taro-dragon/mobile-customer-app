import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import ColorItem from "./ColorItem";
import { useTheme } from "@/contexts/ThemeContext";
import { useFormContext } from "react-hook-form";

export const colorOptions = [
  { color: "white", label: "ホワイト系", bgColor: "#FFFFFF" },
  { color: "black", label: "ブラック系", bgColor: "#000000" },
  { color: "silver", label: "シルバー系", bgColor: "#C0C0C0" },
  { color: "red", label: "レッド系", bgColor: "#FF0000" },
  { color: "orange", label: "オレンジ系", bgColor: "#FFA500" },
  { color: "green", label: "グリーン系", bgColor: "#008000" },
  { color: "blue", label: "ブルー系", bgColor: "#0000FF" },
  { color: "brown", label: "ブラウン系", bgColor: "#8B4513" },
  { color: "yellow", label: "イエロー系", bgColor: "#FFFF00" },
  { color: "pink", label: "ピンク系", bgColor: "#FFC0CB" },
  { color: "purple", label: "パープル系", bgColor: "#800080" },
  { color: "gold", label: "ゴールド系", bgColor: "#FFD700" },
  { color: "gray", label: "グレー系", bgColor: "#808080" },
  { color: "perl", label: "パール系", bgColor: "#F5F5F5" },
  { color: "other", label: "その他", bgColor: "colors.backgroundPrimary" },
];

const ColorSelect = () => {
  const { colors, typography } = useTheme();
  const {
    formState: { errors },
  } = useFormContext();
  const currentError = errors.color;
  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: colors.textPrimary,
          ...typography.heading3,
          paddingHorizontal: 16,
        }}
      >
        車体色
        <Text style={{ color: colors.error }}>*</Text>
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
      >
        {colorOptions.map((option) => (
          <ColorItem
            key={option.color}
            color={option.color}
            label={option.label}
            bgColor={
              option.color === "other"
                ? colors.backgroundPrimary
                : option.bgColor
            }
          />
        ))}
      </ScrollView>
      {currentError && (
        <Text
          style={{
            color: colors.error,
            ...typography.body2,
            marginTop: 4,
            paddingHorizontal: 16,
          }}
        >
          {currentError?.message as string}
        </Text>
      )}
    </View>
  );
};

export default ColorSelect;
