import { useFormContext } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useTheme } from "@/contexts/ThemeContext";
import DisplaySelectItem from "../../../components/registrationCar/form/DisplaySelectItem";
import TakePhoto from "../../../components/registrationCar/form/TakePhoto";
import TextInput from "../../../components/registrationCar/form/TextInput";
import ColorSelect from "../../../components/registrationCar/form/ColorSelect";
import ModalPicker from "../../../components/registrationCar/form/ModalPicker";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import {
  mileageOptions,
  repairStatusOptions,
  sellTimeOptions,
} from "@/constants/registrationCarOptions";

const RegistrationCarForm = () => {
  const { colors, typography } = useTheme();
  const { watch, handleSubmit } = useFormContext();
  const { grade, model, year, maker } = watch();
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }}>
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
          <DisplaySelectItem label="グレード" value={carData.grade.gradeName} />
        </View>
        <View style={{ gap: 8, paddingVertical: 16 }}>
          <Text
            style={{
              color: colors.textPrimary,
              ...typography.heading3,
              paddingHorizontal: 16,
            }}
          >
            写真
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          >
            <TakePhoto name="front" isRequired label="正面" />
            <TakePhoto name="back" isRequired label="背面" />
            <TakePhoto name="left" isRequired label="左側" />
            <TakePhoto name="right" isRequired label="右側" />
            <TakePhoto name="interior" isRequired label="内装" />
            <TakePhoto name="other1" label="その他1" />
            <TakePhoto name="other2" label="その他2" />
            <TakePhoto name="other3" label="その他3" />
            <TakePhoto name="other4" label="その他4" />
            <TakePhoto name="other5" label="その他5" />
            <TakePhoto name="other6" label="その他6" />
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <TextInput label="型番" name="modelNumber" isRequired />
        </View>
        <ColorSelect />

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
        <View style={{ paddingHorizontal: 16 }}>
          <Button color={colors.primary} label="登録" onPress={onSubmit} />
        </View>
        <SafeAreaBottom />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationCarForm;
