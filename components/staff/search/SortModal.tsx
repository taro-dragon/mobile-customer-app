import { sortOptions } from "@/constants/searchOptions";
import { useTheme } from "@/contexts/ThemeContext";
import { SortOption } from "@/contexts/staff/CarSearchContext";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { Check } from "lucide-react-native";
import React, { useCallback, useRef } from "react";
import { Text } from "react-native";

type SortModalProps = {
  handleDismissModalPress: () => void;
  handleSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
};

const SortModal: React.FC<SortModalProps> = ({
  handleDismissModalPress,
  handleSortChange,
  currentSort,
  bottomSheetModalRef,
}) => {
  const { colors } = useTheme();
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleSortOptionPress = (option: {
    target: string;
    value: string;
    label: string;
  }) => {
    if (option.value === "asc" || option.value === "desc") {
      handleSortChange({
        target: option.target,
        value: option.value,
      });
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      snapPoints={["70%"]}
      enableDynamicSizing={false}
      handleIndicatorStyle={{
        backgroundColor: colors.textSecondary,
      }}
      handleStyle={{
        backgroundColor: colors.backgroundPrimary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        {sortOptions.map((option, index) => {
          const isSelected =
            currentSort.target === option.target &&
            currentSort.value === option.value;
          return (
            <TouchableOpacity
              key={index}
              style={{
                padding: 16,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => handleSortOptionPress(option)}
            >
              <Text
                style={{
                  color: isSelected ? colors.primary : colors.textPrimary,
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {option.label}
              </Text>
              {isSelected && <Check size={16} color={colors.primary} />}
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default SortModal;
