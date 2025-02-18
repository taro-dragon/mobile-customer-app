import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type ConfirmImageProps = {
  source: string;
  onPress?: () => void;
};

const ConfirmImage: React.FC<ConfirmImageProps> = ({ source, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.primary,
        borderStyle: source ? "solid" : "dashed",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        source={{ uri: source }}
      />
    </TouchableOpacity>
  );
};

export default ConfirmImage;
