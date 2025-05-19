import { useTheme } from "@/contexts/ThemeContext";
import { Check, ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Divider from "../common/Divider";
import { useController, useFormContext } from "react-hook-form";

type FilterListItemProps = {
  label: string;
  onPressed?: () => void;
  name: string;
  value: string | undefined;
  subLabel?: string;
};

const FilterListItem: React.FC<FilterListItemProps> = ({
  label,
  onPressed,
  name,
  value,
  subLabel,
}) => {
  const { colors, typography } = useTheme();
  const { getValues, control } = useFormContext();
  const filterValue = getValues(name);
  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
        onPress={() => {
          onChange(value);
          onPressed?.();
        }}
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textPrimary,
              flex: 1,
            }}
          >
            {label}
          </Text>
          {subLabel && (
            <Text
              style={{
                ...typography.heading4,
                color: colors.textSecondary,
                flex: 1,
              }}
            >
              {subLabel}
            </Text>
          )}
        </View>

        {value === filterValue && (
          <Check strokeWidth={4} size={16} color={colors.primary} />
        )}
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default FilterListItem;
