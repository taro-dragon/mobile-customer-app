import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { Text, View } from "react-native";
import prefectureSectionsData from "@/constants/prefectureSections.json";
import { useFormContext } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckBox from "../Uiparts/CheckBox";

// フォームデータの型定義
export type FilterFormData = {
  prefecture?: string[];
  rating?: string;
  priceDeviation?: string;
  searchText?: string;
};

type BottomSheetProps = {
  ref: React.RefObject<BottomSheetModal>;
  onClear: () => void;
  onSubmit: () => void;
};

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (props, ref) => {
    const { colors, typography } = useTheme();
    const { onSubmit, onClear } = props;
    const insets = useSafeAreaInsets();
    const { getValues } = useFormContext();

    const renderFooter = (props: BottomSheetFooterProps) => (
      <BottomSheetFooter
        {...props}
        bottomInset={24}
        style={{ backgroundColor: colors.backgroundSecondary }}
      >
        <Divider />
        <View style={{ flexDirection: "row", gap: 8, padding: 16 }}>
          <View style={{ flex: 1 }}>
            <Button
              label="リセット"
              onPress={onClear}
              color={colors.primary}
              isBorder
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              label="絞り込み"
              onPress={() => onSubmit()}
              color={colors.primary}
            />
          </View>
        </View>
      </BottomSheetFooter>
    );
    const prefectureSections = prefectureSectionsData.prefectureSections;

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing={false}
        backgroundStyle={{ backgroundColor: colors.backgroundSecondary }}
        footerComponent={renderFooter}
        snapPoints={["90%"]}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              絞り込み
            </Text>
          </View>
          <View style={{ gap: 24 }}>
            <View>
              <CheckBox
                name="prefecture"
                label="都道府県"
                sections={prefectureSections}
              />
            </View>
          </View>
        </BottomSheetScrollView>
        <View style={{ paddingBottom: insets.bottom + 56 }}></View>
      </BottomSheetModal>
    );
  }
);

export default BottomSheet;
