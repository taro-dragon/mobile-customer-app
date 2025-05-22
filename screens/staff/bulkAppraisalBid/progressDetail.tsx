import React, { useMemo } from "react";
import AppraisalStatusTag from "@/components/appraisal/AppraisalStatusTag";
import ImageCarousel from "@/components/common/ImageCarousel";
import {
  getMileageLabel,
  getRepairStatusLabel,
  getSellTimeLabel,
} from "@/constants/registrationCarOptions";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Divider from "@/components/common/Divider";
import { BulkAppraisalBid } from "@/hooks/staff/useFetchBulkAppraisalBid";
import { useStore } from "@/hooks/useStore";
import { colorOptions } from "@/components/registrationCar/form/ColorSelect";
import { useRouter } from "expo-router";

type BulkAppraisalBidDetailScreenProps = {
  data: BulkAppraisalBid;
  mutate: () => void;
};

const BulkAppraisalBidProgressDetailScreen: React.FC<
  BulkAppraisalBidDetailScreenProps
> = ({ data, mutate }) => {
  const { car, bids } = data;
  const { currentStore } = useStore();
  const router = useRouter();
  const currentStoreId = currentStore?.id;
  const currentStoreBid = bids?.find(
    (bid) => bid.affiliateStoreId === currentStoreId
  );
  const { colors, typography } = useTheme();
  const carData = transformCarData(car as Car);
  const carImages = Object.values(car?.images ?? {});
  const mileageLabel = getMileageLabel(car.mileage.toString());
  const sellTimeLabel = getSellTimeLabel(car.sellTime);
  const repairStatusLabel = getRepairStatusLabel(car.repairStatus);
  const colorValue = colorOptions.find(
    (option) => option.color === car.color
  )?.bgColor;
  const CarHeader = useMemo(
    () => (
      <View pointerEvents="box-none">
        <ImageCarousel images={carImages} />
        <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
          <View style={{ alignItems: "flex-start", gap: 4 }}>
            <Text style={{ ...typography.heading3, color: colors.primary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
            <AppraisalStatusTag />
          </View>
          <View style={{ gap: 8 }}>
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
              <CarInfoItem label="年式" value={carData.year.year} />
              <CarInfoItem label="グレード" value={carData.grade.gradeName} />
              <CarInfoItem label="型番" value={car.modelNumber} />
              <CarInfoItem label="走行距離" value={mileageLabel || ""} />
              <CarInfoItem label="修復歴" value={repairStatusLabel || ""} />
              <CarInfoItem label="売却時期" value={sellTimeLabel || ""} />
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
    ),
    [carData, carImages]
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => mutate()} />
        }
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      >
        {CarHeader}
      </ScrollView>
      {!currentStoreBid && (
        <>
          <Divider />
          <View style={{ padding: 16 }}>
            <Button
              color={colors.primary}
              label="入札する"
              onPress={() =>
                router.push({
                  pathname: "/bulkAppraisalBid/bid",
                  params: {
                    carId: car.id,
                    bulkAppraisalRequestsId: data.id,
                    maker: carData.maker.name,
                    model: carData.model.name,
                    year: carData.year.year,
                    grade: carData.grade.gradeName,
                    modelNumber: car.modelNumber,
                  },
                })
              }
            />
            <SafeAreaBottom />
          </View>
        </>
      )}
    </View>
  );
};

export default BulkAppraisalBidProgressDetailScreen;
