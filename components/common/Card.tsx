import { useTheme } from "@/contexts/ThemeContext";
import { View, TouchableOpacity, StyleSheet, ViewProps } from "react-native";

type CardProps = ViewProps & {
  children: React.ReactNode;
  onPress?: () => void;
};

const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 1,
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
