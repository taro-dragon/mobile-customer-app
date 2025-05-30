import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import FilterIndexItem from "@/components/filter/FilterIndexItem";
import { useTheme } from "@/contexts/ThemeContext";
import { findCarData } from "@/libs/findCarData";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { mileageOptions, priceOptions } from "@/constants/searchOptions";
import { useMemo } from "react";
import createRegistrationYear from "@/libs/createRegistrationYear";

const SearchFilterScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { watch, reset } = useFormContext();
  const yearOptions = createRegistrationYear();

  const formValues = watch();
  const {
    maker,
    model,
    year,
    grade,
    prefecture,
    minMileage,
    maxMileage,
    minPrice,
    maxPrice,
    isTotalPayment,
    minRegistrationYear,
    maxRegistrationYear,
  } = formValues;

  const displayValues = useMemo(() => {
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
    const minMileageLabel = mileageOptions.find(
      (option) => option.value === minMileage
    )?.label;
    const maxMileageLabel = mileageOptions.find(
      (option) => option.value === maxMileage
    )?.label;
    const minRegistrationYearLabel = yearOptions.find(
      (option) => option.value === minRegistrationYear
    )?.label;
    const maxRegistrationYearLabel = yearOptions.find(
      (option) => option.value === maxRegistrationYear
    )?.label;

    const price = `${isTotalPayment ? "支払総額" : "本体価格"} ${
      minPriceLabel ? minPriceLabel : "指定なし"
    }〜${maxPriceLabel ? maxPriceLabel : "指定なし"}`;
    const mileage = `${minMileageLabel ? minMileageLabel : "指定なし"}〜${
      maxMileageLabel ? maxMileageLabel : "指定なし"
    }`;
    const registrationYear = `${
      minRegistrationYearLabel ? minRegistrationYearLabel : "指定なし"
    }〜${maxRegistrationYearLabel ? maxRegistrationYearLabel : "指定なし"}`;

    return {
      makerName,
      modelName,
      yearName,
      gradeName,
      price,
      mileage,
      registrationYear,
    };
  }, [
    maker,
    model,
    year,
    grade,
    minPrice,
    maxPrice,
    minMileage,
    maxMileage,
    minRegistrationYear,
    maxRegistrationYear,
    isTotalPayment,
  ]);

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
          value={displayValues.makerName}
        />
        <FilterIndexItem
          label="自動車名"
          onPress={() => router.push("/search/filter/model")}
          defaultValue="すべて"
          disabled={!maker}
          value={displayValues.modelName}
        />
        <FilterIndexItem
          label="モデル"
          onPress={() => router.push("/search/filter/year")}
          defaultValue="すべて"
          disabled={!model}
          value={displayValues.yearName}
        />
        <FilterIndexItem
          label="グレード"
          onPress={() => router.push("/search/filter/grade")}
          defaultValue="すべて"
          disabled={!year}
          value={displayValues.gradeName}
        />
        <FilterIndexItem
          label="価格"
          onPress={() => router.push("/search/filter/price")}
          defaultValue="指定なし"
          value={minPrice || maxPrice ? displayValues.price : "指定なし"}
        />
        <FilterIndexItem
          label="走行距離"
          onPress={() => router.push("/search/filter/mileage")}
          defaultValue="指定なし"
          value={minMileage || maxMileage ? displayValues.mileage : "指定なし"}
        />
        <FilterIndexItem
          label="初年度登録"
          onPress={() => router.push("/search/filter/registrationYear")}
          defaultValue="指定なし"
          value={
            minRegistrationYear || maxRegistrationYear
              ? displayValues.registrationYear
              : "指定なし"
          }
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
