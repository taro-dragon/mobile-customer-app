import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { CarForm } from "@/types/models/CarForm";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import ConfirmItem from "@/components/formItem/ConfirmItem";
import CarIcon from "@/components/icons/car";
import ConfirmImage from "@/components/formItem/ConfirmImage";

const Confirm = () => {
  const { watch } = useFormContext<CarForm>();
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { manufacturers } = fullCarData as FullCarData;
  const { front, back, left, right, maker, model, year, gread } = watch();
  const makerData = manufacturers.find((m) => m.manufacturerId === maker);
  const modelData = makerData?.carModels.find((c) => c.modelId === model);
  const yearData = modelData?.years.find((y) => y.yearId === year);
  const greadData = yearData?.grades.find((g) => g.gradeName === gread);
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 24,
          gap: 12,
        }}
      >
        <Text style={{ color: colors.textSecondary, ...typography.title3 }}>
          車両情報
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
            gap: 12,
          }}
        >
          <ConfirmItem label="メーカー" value={makerData?.name || ""} />
          <ConfirmItem label="モデル" value={modelData?.name || ""} />
          <ConfirmItem label="年式" value={yearData?.year || ""} />
          <ConfirmItem label="グレード" value={greadData?.gradeName || ""} />
        </View>
        <Divider />
        <Text style={{ color: colors.textSecondary, ...typography.title3 }}>
          車両写真
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <ConfirmImage source={front} />
          <View
            style={{
              flexDirection: "row",
              gap: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConfirmImage source={left} />
            <CarIcon size={80} color={colors.primary} />
            <ConfirmImage source={right} />
          </View>
          <ConfirmImage source={back} />
        </View>
      </ScrollView>
      <Divider />
      <View
        style={{
          backgroundColor: colors.backgroundPrimary,
          paddingHorizontal: 24,
          paddingTop: 12,
          gap: 12,
        }}
      >
        <Button
          color={colors.primary}
          label="登録する"
          onPress={() => router.push("/onBoading/confirm")}
          fullWidth
        />
        <Button
          color={colors.primary}
          label="前へ"
          onPress={() => {
            router.back();
          }}
          fullWidth
          notBorder
        />
        <SafeAreaBottom color={colors.backgroundPrimary} />
      </View>
    </View>
  );
};

export default Confirm;
