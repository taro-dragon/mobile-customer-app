import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const Divider = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.borderPrimary,
        width: "100%",
      }}
    />
  );
};

export default Divider;
