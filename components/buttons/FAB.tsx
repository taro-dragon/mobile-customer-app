import { TouchableOpacity } from "react-native";
import * as LucideIcons from "lucide-react-native";

import { useTheme } from "@/contexts/ThemeContext";

type FABProps = {
  onPress: () => void;
  icon: keyof typeof LucideIcons;
  opacity?: number;
  color?: string;
};

const FAB: React.FC<FABProps> = ({ onPress, icon, opacity = 1, color }) => {
  const { colors } = useTheme();
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ComponentType<any>;
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        zIndex: 1000,
        borderRadius: 100,
        padding: 12,
        opacity,
        backgroundColor: color || colors.primary,
        elevation: 8,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={onPress}
    >
      <IconComponent size={28} color={colors.white} />
    </TouchableOpacity>
  );
};

export default FAB;
