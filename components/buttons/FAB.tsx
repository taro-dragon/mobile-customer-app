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
        padding: 8,
        opacity,
        backgroundColor: color || colors.primary,
      }}
      onPress={onPress}
    >
      <IconComponent size={32} color={colors.white} />
    </TouchableOpacity>
  );
};

export default FAB;
