import { Plus } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
};

const TakePhoto: React.FC<Props> = ({ name, label, isRequired = false }) => {
  const { register } = useFormContext();
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <TouchableOpacity
        style={{
          width: 120,
          height: 120,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Plus size={32} color={colors.textSecondary} />
        {isRequired && (
          <Text style={{ color: colors.textSecondary }}>必須</Text>
        )}
      </TouchableOpacity>
      <Text style={{ color: colors.textPrimary, textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
};

export default TakePhoto;
