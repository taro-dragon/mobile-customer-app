import React from "react";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";

import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import TextInput from "@/components/registrationCar/form/TextInput";
import {
  guaranteeCountOptions,
  guaranteeExemptionOptions,
  guaranteeLimitOptions,
  guaranteeOptions,
  guaranteeRoadServiceOptions,
} from "@/constants/registrationStockOptions";

const RegistrationStockGuaranteeFormScreen = () => {
  const { watch } = useFormContext();
  const guarantee = watch("guarantee");
  const guaranteeCountSelect = watch("guaranteeCountSelect");
  const guaranteeLimitSelect = watch("guaranteeLimitSelect");
  const guaranteeExemptionSelect = watch("guaranteeExemptionSelect");
  const guaranteeRoadServiceSelect = watch("guaranteeRoadServiceSelect");
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
    >
      <View style={{ padding: 16, gap: 16 }}>
        <ModalPicker
          name="guarantee"
          label="保証有無"
          options={guaranteeOptions}
          required={true}
        />
        {guarantee === "guarantee" && (
          <>
            <TextInput
              label="保証期間"
              name="guaranteePeriod"
              placeholder="12"
              keyboardType="numeric"
              unit="ヶ月"
            />
            <TextInput
              label="保証距離"
              name="guaranteeDistance"
              placeholder="3000"
              keyboardType="numeric"
              unit="km"
            />
            <TextInput label="保証説明" name="guaranteeContent" multiline />
            <ModalPicker
              name="guaranteeCountSelect"
              label="保証回数上限"
              options={guaranteeCountOptions}
              required={true}
            />
            {guaranteeCountSelect === "limited" && (
              <TextInput
                label="保証回数上限"
                name="guaranteeCount"
                placeholder="3"
                keyboardType="numeric"
                unit="回"
              />
            )}
            <ModalPicker
              name="guaranteeLimitSelect"
              label="保証限度額の上限"
              options={guaranteeLimitOptions}
              required={true}
            />
            {guaranteeLimitSelect === "limited" && (
              <TextInput
                label="保証限度額の上限説明"
                name="guaranteeLimit"
                multiline
              />
            )}
            <ModalPicker
              name="guaranteeExemptionSelect"
              label="免責金"
              options={guaranteeExemptionOptions}
              required={true}
            />
            {guaranteeExemptionSelect === "limited" && (
              <TextInput
                label="免責金説明"
                name="guaranteeExemption"
                multiline
              />
            )}
            <ModalPicker
              name="guaranteeRoadServiceSelect"
              label="ロードサービス"
              options={guaranteeRoadServiceOptions}
              required={true}
            />
            {guaranteeRoadServiceSelect === "limited" && (
              <TextInput
                label="ロードサービス説明"
                name="guaranteeRoadService"
                multiline
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default RegistrationStockGuaranteeFormScreen;
