import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { ScrollView, Text } from "react-native";

const CustomerIndex = () => {
  const { cars } = useStore();
  const { colors, typography } = useTheme();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 8 }}
    ></ScrollView>
  );
};

export default CustomerIndex;
