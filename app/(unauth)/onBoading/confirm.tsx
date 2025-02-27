import { useState } from "react";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";

import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { CarForm } from "@/types/models/CarForm";
import ConfirmItem from "@/components/formItem/ConfirmItem";
import CarIcon from "@/components/icons/car";
import ConfirmImage from "@/components/formItem/ConfirmImage";
import useCreateCustomer from "@/hooks/useCreateCustomer";
import Toast from "react-native-toast-message";
import { OnBoardingLayout } from "@/components/OnBoading/OnBoardingLayout";
import { useOnBoarding } from "@/hooks/useOnBoarding";

const Confirm = () => {
  const { watch } = useFormContext<CarForm>();
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { createCustomer } = useCreateCustomer();
  const { manufacturers } = fullCarData as FullCarData;
  const { front, back, left, right, maker, model, year, gread } = watch();
  const makerData = manufacturers.find((m) => m.manufacturerId === maker);
  const modelData = makerData?.carModels.find((c) => c.modelId === model);
  const yearData = modelData?.years.find((y) => y.yearId === year);
  const greadData = yearData?.grades.find((g) => g.gradeName === gread);
  const [isLoading, setIsLoading] = useState(false);
  const { currentStepIndex } = useOnBoarding();
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await createCustomer();
      Toast.show({
        type: "success",
        text1: "登録完了",
        text2: "車両登録が完了しました",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "車両登録エラーが発生しました",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <OnBoardingLayout
      onNext={onSubmit}
      onBack={() => router.back()}
      fieldName="model"
      currentStep={currentStepIndex}
      totalSteps={6}
      title="登録する"
    >
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
      <Modal visible={isLoading} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={{ color: colors.white, ...typography.title2 }}>
            登録処理中...
          </Text>
        </View>
      </Modal>
    </OnBoardingLayout>
  );
};

export default Confirm;
