import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import AppraisalStatusTag from "../appraisal/AppraisalStatusTag";
import CarInfoItem from "./CarInfoIten";
import ImageCarousel from "../common/ImageCarousel";
import Alert from "../common/Alert";
import { useMemo } from "react";
import { colorOptions } from "../registrationCar/form/ColorSelect";
import { useUserCarContext } from "@/contexts/users/UserCarContext";

const CarDetailHeader: React.FC = () => {
  const { bulkAppraisalRequest } = useUserCarContext();
  const { colors, typography } = useTheme();
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((car) => car.id === id);
  const imageOrder = ["front", "back", "left", "right", "interior"] as const;
  const colorValue = useMemo(() => {
    return (
      colorOptions.find((option) => option.color === car?.color)?.bgColor || ""
    );
  }, [car?.color]);
  const basicImages = imageOrder
    .map((key) => car?.images?.[key])
    .filter((url): url is string => Boolean(url));

  const additionalImages = Object.keys(car?.images ?? {})
    .filter((key) => key.startsWith("otherPhoto"))
    .sort((a, b) => {
      const aNum = parseInt(a.replace("otherPhoto", ""));
      const bNum = parseInt(b.replace("otherPhoto", ""));
      return aNum - bNum;
    })
    .map((key) => car?.images?.[key as keyof typeof car.images])
    .filter((url): url is string => Boolean(url));

  const carImages = [...basicImages, ...additionalImages];

  return (
    <View pointerEvents="box-none">
      <ImageCarousel images={carImages} />
      <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
        <View style={{ alignItems: "flex-start", gap: 4 }}>
          <Text style={{ ...typography.heading3, color: colors.primary }}>
            {car?.makerName}
          </Text>
          <Text style={{ ...typography.title1, color: colors.textPrimary }}>
            {car?.modelName}
          </Text>
          <AppraisalStatusTag bulkAppraisalRequest={bulkAppraisalRequest} />
        </View>
        <View style={{ gap: 8 }}>
          {car?.description && (
            <Alert title="備考" message={car?.description} type="info" />
          )}
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            車両情報
          </Text>
          <View
            style={{
              gap: 8,
              borderWidth: 1,
              borderColor: colors.borderPrimary,
              padding: 12,
              borderRadius: 12,
            }}
          >
            {car?.firstRegistrationYear && (
              <CarInfoItem
                label="初年度登録年"
                value={car?.firstRegistrationYear}
              />
            )}
            {car?.modelNumber && (
              <CarInfoItem label="型式" value={car?.modelNumber} />
            )}
            {car?.minorModelName && (
              <CarInfoItem label="年式" value={car?.minorModelName} />
            )}
            {car?.gradeName && (
              <CarInfoItem label="グレード" value={car?.gradeName} />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textSecondary,
                }}
              >
                車体色
              </Text>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: colorValue,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.borderPrimary,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarDetailHeader;
