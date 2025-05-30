import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import FilterIndexItem from "@/components/filter/FilterIndexItem";
import { useTheme } from "@/contexts/ThemeContext";
import { findCarData } from "@/libs/findCarData";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, View, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { useCallback, useState } from "react";
import ModalPicker from "@/components/registrationCar/form/ModalPicker";
import { inspectionOptions } from "@/constants/registrationStockOptions";
import { priceOptions } from "@/constants/searchOptions";

const SearchFilterScreen = () => {
  const router = useRouter();
  const { colors, typography } = useTheme();
  const { getValues, reset, setValue } = useFormContext();

  const maker = getValues("maker");
  const model = getValues("model");
  const year = getValues("year");
  const grade = getValues("grade");
  const prefecture = getValues("prefecture");
  const sellTime = getValues("sellTime");
  const minPrice = getValues("minPrice");
  const maxPrice = getValues("maxPrice");
  const isTotalPayment = getValues("isTotalPayment");

  const makerName = findCarData.maker(maker)?.name;
  const modelName = findCarData.model(maker, model)?.name;
  const yearName = findCarData.year(maker, model, year)?.year;
  const gradeName = findCarData.grade(maker, model, year, grade)?.gradeName;
  const minPriceLabel = priceOptions.find(
    (option) => option.value === minPrice
  )?.label;
  const maxPriceLabel = priceOptions.find(
    (option) => option.value === maxPrice
  )?.label;
  const price = `${isTotalPayment ? "支払総額" : "本体価格"} ${
    minPriceLabel ? minPriceLabel : "指定なし"
  }〜${maxPriceLabel ? maxPriceLabel : "指定なし"}`;

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
          label="価格"
          onPress={() => router.push("/search/filter/price")}
          defaultValue="指定なし"
          value={price}
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
