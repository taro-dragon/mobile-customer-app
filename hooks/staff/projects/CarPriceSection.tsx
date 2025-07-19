import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

type CarPriceSectionProps = {
  minPrice: number;
  maxPrice: number;
  finalPrice?: number;
};

const CarPriceSection: React.FC<CarPriceSectionProps> = ({
  minPrice,
  maxPrice,
  finalPrice,
}) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            borderRadius: 4,
            padding: 2,
            borderWidth: 1,
            borderColor: colors.error,
            backgroundColor: colors.backgroundError,
          }}
        >
          <Text
            style={{
              ...typography.heading4,
              color: colors.error,
              textAlign: "center",
            }}
          >
            最低金額
          </Text>
        </View>
        <Text style={{ ...typography.title1, color: colors.textError }}>
          <Text
            style={{
              ...typography.heading5,
              color: colors.textSecondary,
            }}
          >
            ¥
          </Text>
          {minPrice?.toLocaleString()}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <View
          style={{
            borderRadius: 4,
            padding: 2,
            borderWidth: 1,
            borderColor: colors.borderSuccess,
            backgroundColor: colors.backgroundSuccess,
          }}
        >
          <Text
            style={{
              ...typography.heading4,
              color: colors.textSuccess,
              textAlign: "center",
            }}
          >
            最高金額
          </Text>
        </View>
        <Text style={{ ...typography.title1, color: colors.textSuccess }}>
          <Text
            style={{
              ...typography.heading5,
              color: colors.textSecondary,
            }}
          >
            ¥
          </Text>
          {maxPrice?.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};
export default CarPriceSection;
