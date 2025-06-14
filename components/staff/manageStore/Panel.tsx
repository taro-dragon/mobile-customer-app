import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ManageStorePanelProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const ManageStorePanel: React.FC<ManageStorePanelProps> = ({
  title,
  icon,
  onPress,
}) => {
  const { colors, typography } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flex: 3,
        gap: 8,
      }}
      onPress={onPress}
    >
      <View
        style={{
          borderRadius: 8,
          aspectRatio: 1,
          backgroundColor: colors.backgroundSecondary,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: colors.borderPrimary,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          color: colors.textPrimary,
          ...typography.heading3,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ManageStorePanel;
