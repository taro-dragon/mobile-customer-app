import { useTheme } from "@/contexts/ThemeContext";
import { View, TouchableOpacity, StyleSheet } from "react-native";

type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  isSecondary?: boolean;
};

const Card: React.FC<CardProps> = ({ children, onPress, isSecondary }) => {
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={styles.card}>{children}</View>
  );
};

export default Card;
