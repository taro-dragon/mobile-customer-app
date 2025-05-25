import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import TextInput from "@/components/registrationCar/form/TextInput";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";

const RegistrationBuyOfferFormScreen = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { colors, typography } = useTheme();
  const { grade, model, year, maker } = getValues();
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  return (
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
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <TextInput
          label="最低買取金額"
          name="minPrice"
          keyboardType="numeric"
          isRequired
          unit="円"
        />
        <TextInput
          label="最高買取金額"
          name="maxPrice"
          keyboardType="numeric"
          isRequired
          unit="円"
        />
      </View>
    </ScrollView>
  );
};

export default RegistrationBuyOfferFormScreen;
