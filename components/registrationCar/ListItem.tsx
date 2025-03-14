import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Divider from "../common/Divider";
import { ChevronRight } from "lucide-react-native";

type ListItemProps = {
  label: string;
  onPress: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ label, onPress }) => {
  const { colors, typography } = useTheme();
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
        onPress={onPress}
      >
        <Text style={{ ...typography.body2, color: colors.textPrimary }}>
          {label}
        </Text>
        <ChevronRight size={24} color={colors.primary} />
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default ListItem;
