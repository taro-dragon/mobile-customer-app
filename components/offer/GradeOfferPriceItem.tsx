import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

type GradeOfferPriceItemProps = {
  grade: "S" | "A" | "B" | "C";
  price: number;
};

const GradeOfferPriceItem: React.FC<GradeOfferPriceItemProps> = ({
  grade,
  price,
}) => {
  const { colors, typography } = useTheme();
  const gradeColors = {
    S: {
      backgroundColor: colors.backgroundWarning,
      textColor: colors.textWarning,
    },
    A: {
      backgroundColor: colors.backgroundSuccess,
      textColor: colors.textSuccess,
    },
    B: {
      backgroundColor: colors.backgroundError,
      textColor: colors.textError,
    },
    C: {
      backgroundColor: colors.backgroundInfo,
      textColor: colors.textInfo,
    },
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: gradeColors[grade].backgroundColor,
          width: 40,
          height: 40,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...typography.heading2,
            color: gradeColors[grade].textColor,
          }}
        >
          {grade}
        </Text>
      </View>
      <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
        ￥{price.toLocaleString()}
      </Text>
    </View>
  );
};

export default GradeOfferPriceItem;
