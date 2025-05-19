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
import { sellTimeOptions } from "@/constants/registrationCarOptions";
import { BidStatus } from "@/constants/bidStatus";

const { manufacturers } = fullCarData as FullCarData;

const findCarData = {
  maker: (makerId: string) =>
    manufacturers.find((m) => m.manufacturerId === makerId),
  model: (makerId: string, modelId: string) =>
    findCarData.maker(makerId)?.carModels.find((m) => m.modelId === modelId),
  year: (makerId: string, modelId: string, yearId: string) =>
    findCarData.model(makerId, modelId)?.years.find((y) => y.yearId === yearId),
  grade: (
    makerId: string,
    modelId: string,
    yearId: string,
    gradeName: string
  ) =>
    findCarData
      .year(makerId, modelId, yearId)
      ?.grades.find((g) => g.gradeName === gradeName),
};

const BulkAppraisalBidFilterScreen = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { getValues, reset } = useFormContext();

  const maker = getValues("maker");
  const model = getValues("model");
  const year = getValues("year");
  const grade = getValues("grade");
  const prefecture = getValues("prefecture");
  const sellTime = getValues("sellTime");
  const status = getValues("status");

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
      <ScrollView style={{ flex: 1 }}>
        <FilterIndexItem
          label="ステータス"
          onPress={() => router.push("/bulkAppraisalBid/filter/status")}
          defaultValue="すべて"
          value={BidStatus.find((m) => m.value === status)?.label}
        />
        <FilterIndexItem
          label="メーカー"
          onPress={() => router.push("/bulkAppraisalBid/filter/maker")}
          defaultValue="すべて"
          value={makerName}
        />
        <FilterIndexItem
          label="自動車名"
          onPress={() => router.push("/bulkAppraisalBid/filter/model")}
          defaultValue="すべて"
          disabled={!maker}
          value={modelName}
        />
        <FilterIndexItem
          label="モデル"
          onPress={() => router.push("/bulkAppraisalBid/filter/year")}
          defaultValue="すべて"
          disabled={!model}
          value={yearName}
        />
        <FilterIndexItem
          label="グレード"
          onPress={() => router.push("/bulkAppraisalBid/filter/grade")}
          defaultValue="すべて"
          disabled={!year}
          value={gradeName}
        />
        <FilterIndexItem
          label="都道府県"
          onPress={() => router.push("/bulkAppraisalBid/filter/prefecture")}
          defaultValue="すべて"
          value={prefecture}
        />
        <FilterIndexItem
          label="売却時期"
          onPress={() => router.push("/bulkAppraisalBid/filter/sellTime")}
          defaultValue="すべて"
          value={sellTimeOptions.find((m) => m.value === sellTime)?.label}
        />
      </ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Button
            label="リセット"
            onPress={handleReset}
            color={colors.primary}
            isBorder
          />
          <View style={{ flex: 1 }}>
            <Button label="検索" onPress={() => {}} color={colors.primary} />
          </View>
        </View>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default BulkAppraisalBidFilterScreen;
