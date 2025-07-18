import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import {
  mileageOptions,
  repairStatusOptions,
  sellTimeOptions,
} from "@/constants/registrationCarOptions";
import { useTheme } from "@/contexts/ThemeContext";
import { CarDetails } from "@/libs/transformCarData";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";

type RequestBulkAppraisalScreenProps = {
  carData: CarDetails;
  onSubmit: () => void;
};

const RequestBulkAppraisalScreen: React.FC<RequestBulkAppraisalScreenProps> = ({
  carData,
  onSubmit,
}) => {
  const { colors, typography } = useTheme();
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          <View
            style={{
              padding: 16,
              backgroundColor: colors.backgroundSecondary,
              gap: 8,
            }}
          >
            <DisplaySelectItem label="メーカー" value={carData.maker.name} />
            <DisplaySelectItem label="車種" value={carData.model.name} />
            <DisplaySelectItem label="年式" value={carData.year.year} />
            <DisplaySelectItem
              label="グレード"
              value={carData.grade.gradeName}
            />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <ModalPicker
              name="repairStatus"
              label="修復歴"
              options={repairStatusOptions}
              required={true}
            />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <ModalPicker
              name="mileage"
              label="走行距離"
              options={mileageOptions}
              required={true}
            />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <ModalPicker
              name="sellTime"
              label="売却時期"
              options={sellTimeOptions}
              required={true}
            />
          </View>
        </ScrollView>
        <Divider />
        <View style={{ padding: 16 }}>
          <Button
            label="一括査定依頼"
            onPress={onSubmit}
            color={colors.primary}
            isLoading={isSubmitting}
          />
          <SafeAreaBottom />
        </View>
      </View>
      <Modal visible={isSubmitting} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={{ color: colors.white, ...typography.title2 }}>
            登録処理中...
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default RequestBulkAppraisalScreen;
