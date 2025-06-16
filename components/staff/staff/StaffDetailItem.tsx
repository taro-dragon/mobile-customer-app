import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

type StaffDetailItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const StaffDetailItem: React.FC<StaffDetailItemProps> = ({
  icon,
  title,
  value,
}) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.backgroundPrimary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
          {title}
        </Text>
        <Text style={{ ...typography.body2, color: colors.textPrimary }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default StaffDetailItem;
