import { useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useTheme } from "@/contexts/ThemeContext";
import DisplaySelectItem from "./form/DisplaySelectItem";

const RegistrationCarForm = () => {
  const { colors, typography } = useTheme();
  const { watch } = useFormContext();
  const { grade, model, year, maker, modelNumber } = watch();
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  return (
    <ScrollView style={{ flex: 1 }}>
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
    </ScrollView>
  );
};

export default RegistrationCarForm;
