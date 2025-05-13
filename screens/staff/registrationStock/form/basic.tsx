import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import TextInput from "@/components/registrationCar/form/TextInput";
import TakePhoto from "@/components/staff/registrationCar/TakePhoto";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useFormContext } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Plus, X } from "lucide-react-native";
import { useState } from "react";
import ColorSelect from "@/components/registrationCar/form/ColorSelect";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import {
  inspectionOptions,
  repairStatusOptions,
  transmissionOptions,
} from "@/constants/registrationStockOptions";

const RegistrationStockBasicFormScreen = () => {
  const { watch, setValue } = useFormContext();
  const { colors, typography } = useTheme();
  const { grade, model, year, maker } = watch();
  const [additionalPhotos, setAdditionalPhotos] = useState<number[]>([]);
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);

  const addPhoto = () => {
    const newIndex = additionalPhotos.length + 1;
    if (additionalPhotos.length + 6 < 20) {
      setAdditionalPhotos([...additionalPhotos, newIndex]);
    }
  };

  const removePhoto = (index: number) => {
    setAdditionalPhotos(additionalPhotos.filter((i) => i !== index));
    setValue(`other${index}`, undefined);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
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
          <DisplaySelectItem label="モデル" value={carData.year.year} />
          <DisplaySelectItem label="グレード" value={carData.grade.gradeName} />
          <DisplaySelectItem
            label="型番"
            value={carData.grade.modelNumber.replace(/[\s\u3000]/g, "")}
          />
        </View>
        <Text
          style={{
            color: colors.textPrimary,
            ...typography.heading3,
            paddingHorizontal: 16,
          }}
        >
          写真
          <Text style={{ color: colors.error }}>*</Text>
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
          {additionalPhotos.map((index) => (
            <View key={index} style={{ position: "relative" }}>
              <TakePhoto name={`other${index}`} label={`その他${index}`} />
              <TouchableOpacity
                onPress={() => removePhoto(index)}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  borderRadius: 12,
                  padding: 4,
                }}
              >
                <X size={16} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={addPhoto}
            style={{
              width: 120,
              height: 120,
              backgroundColor: colors.backgroundSecondary,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: additionalPhotos.length + 6 >= 20 ? 0.5 : 1,
            }}
            disabled={additionalPhotos.length + 6 >= 20}
          >
            <Plus size={32} color={colors.textSecondary} />
            <Text style={{ color: colors.textSecondary }}>
              {additionalPhotos.length + 6 >= 20
                ? "最大枚数に達しました"
                : "写真を追加"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ColorSelect />
        <View style={{ paddingHorizontal: 16, gap: 16 }}>
          <TextInput
            label="走行距離"
            name="mileage"
            keyboardType="numeric"
            placeholder="例: 10000"
            isRequired
            unit="km"
          />
          <TextInput
            label="排気量"
            name="displacement"
            keyboardType="numeric"
            placeholder="例: 1800"
            isRequired
            unit="cc"
          />
          <TextInput
            label="ドア数"
            name="doorNumber"
            keyboardType="numeric"
            placeholder="例: 4"
          />
          <TextInput
            label="ガソリン種類"
            name="fuelType"
            placeholder="例: レギュラー"
          />
          <ModalPicker
            name="transmission"
            label="ミッション"
            options={transmissionOptions}
            required={true}
          />
          <ModalPicker
            name="inspection"
            label="車検"
            options={inspectionOptions}
            required={true}
          />
          <ModalPicker
            name="repairStatus"
            label="修復歴"
            options={repairStatusOptions}
            required={true}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationStockBasicFormScreen;
