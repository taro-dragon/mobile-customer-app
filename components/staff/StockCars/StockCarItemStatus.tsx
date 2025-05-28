import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

type StockCarItemStatusPanelProps = {
  label: string | number;
  value: string;
};

const StockCarItemStatusPanel = ({
  label,
  value,
}: StockCarItemStatusPanelProps) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: colors.backgroundTertiary,
          padding: 2,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: colors.borderPrimary,
        }}
      >
        <Text style={{ ...typography.heading5, color: colors.textSecondary }}>
          {label}
        </Text>
      </View>
      <Text style={{ ...typography.body4, color: colors.textPrimary }}>
        {value}
      </Text>
    </View>
  );
};

export default StockCarItemStatusPanel;
