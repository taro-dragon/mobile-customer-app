import { useTheme } from "@/contexts/ThemeContext";
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
  onPress?: () => void;
  isSecondary?: boolean;
};

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  isSecondary,
  style,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: isSecondary ? colors.borderSecondary : colors.borderPrimary,
      padding: 12,
      borderRadius: 12,
    },
  });
  return onPress ? (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.card, style]}>{children}</View>
  );
};

export default Card;
