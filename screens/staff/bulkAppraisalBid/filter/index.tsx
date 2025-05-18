import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import FilterIndexItem from "@/components/filter/FilterIndexItem";
import { useTheme } from "@/contexts/ThemeContext";
import { FullCarData } from "@/types/models/carData/fullCarData";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";

const BulkAppraisalBidFilterScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { getValues } = useFormContext();
  const maker = getValues("maker");
  const model = getValues("model");
  const year = getValues("year");
  const grade = getValues("grade");
  const { manufacturers } = fullCarData as FullCarData;
  const makerName = manufacturers.find((m) => m.manufacturerId === maker)?.name;
  const modelName = manufacturers
    .find((m) => m.manufacturerId === maker)
    ?.carModels.find((m) => m.modelId === model)?.name;
  const yearName = manufacturers
    .find((m) => m.manufacturerId === maker)
    ?.carModels.find((m) => m.modelId === model)
    ?.years.find((m) => m.year === year)?.year;
  const gradeName = manufacturers
    .find((m) => m.manufacturerId === maker)
    ?.carModels.find((m) => m.modelId === model)
    ?.years.find((m) => m.year === year)
    ?.grades.find((m) => m.gradeName === grade)?.gradeName;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <FilterIndexItem
          label="メーカー"
          onPress={() => router.push("/bulkAppraisalBid/filter/maker")}
          defaultValue="すべて"
          value={makerName}
        />
        <FilterIndexItem
          label="自動車名"
          onPress={() => {}}
          defaultValue="すべて"
          disabled={!maker}
          value={model}
        />
        <FilterIndexItem
          label="モデル"
          onPress={() => {}}
          defaultValue="すべて"
          disabled={!model}
          value={year}
        />
        <FilterIndexItem
          label="グレード"
          onPress={() => {}}
          defaultValue="すべて"
          disabled={!year}
          value={grade}
        />
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button label="絞り込み" onPress={() => {}} color={colors.primary} />
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default BulkAppraisalBidFilterScreen;
