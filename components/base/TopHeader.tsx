import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const TopHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors, isDark } = useTheme();
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: colors.primary,
        borderRadius: 16,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: isDark ? 0.15 : 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
};

export default TopHeader;
