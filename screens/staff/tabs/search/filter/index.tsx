import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import FilterIndexItem from "@/components/filter/FilterIndexItem";
import { useTheme } from "@/contexts/ThemeContext";
import { findCarData } from "@/libs/findCarData";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";

const SearchFilterScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { getValues, reset } = useFormContext();

  const maker = getValues("maker");
  const model = getValues("model");
  const year = getValues("year");
  const grade = getValues("grade");
  const prefecture = getValues("prefecture");
  const sellTime = getValues("sellTime");

  const makerName = findCarData.maker(maker)?.name;
  const modelName = findCarData.model(maker, model)?.name;
  const yearName = findCarData.year(maker, model, year)?.year;
  const gradeName = findCarData.grade(maker, model, year, grade)?.gradeName;
  const handleReset = () => {
    reset();
    router.back();
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilterIndexItem
          label="メーカー"
          onPress={() => router.push("/search/filter/maker")}
          defaultValue="すべて"
          value={makerName}
        />
        <FilterIndexItem
          label="自動車名"
          onPress={() => router.push("/search/filter/model")}
          defaultValue="すべて"
          disabled={!maker}
          value={modelName}
        />
        <FilterIndexItem
          label="モデル"
          onPress={() => router.push("/search/filter/year")}
          defaultValue="すべて"
          disabled={!model}
          value={yearName}
        />
        <FilterIndexItem
          label="グレード"
          onPress={() => router.push("/search/filter/grade")}
          defaultValue="すべて"
          disabled={!year}
          value={gradeName}
        />
        <FilterIndexItem
          label="都道府県"
          onPress={() => router.push("/search/filter/prefecture")}
          defaultValue="すべて"
          value={prefecture}
        />
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button
          label="リセット"
          onPress={handleReset}
          color={colors.primary}
          isBorder
        />
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default SearchFilterScreen;
