import { sortOptions } from "@/constants/searchOptions";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Text } from "react-native";

type SortModalProps = {
  handleDismissModalPress: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
};

const SortModal: React.FC<SortModalProps> = ({
  handleDismissModalPress,
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
        {sortOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 16,
              width: "100%",
            }}
            onPress={() => {
              handleDismissModalPress();
            }}
          >
            <Text style={{ color: colors.textPrimary }}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default SortModal;
