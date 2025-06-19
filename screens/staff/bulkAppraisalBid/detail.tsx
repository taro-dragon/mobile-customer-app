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
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { BulkAppraisalBid } from "@/hooks/staff/useFetchBulkAppraisalBid";
import Bid from "@/components/staff/bulkAppraisalCarDetail/Bid";

type BulkAppraisalBidDetailScreenProps = {
  data: BulkAppraisalBid;
  mutate: () => void;
};

const BulkAppraisalBidDetailScreen: React.FC<
  BulkAppraisalBidDetailScreenProps
> = ({ data }) => {
  const { car, bids } = data;
  const { colors, typography } = useTheme();
  const carData = transformCarData(car as Car);
  const carImages = Object.values(car?.images ?? {});
  const mileageLabel = getMileageLabel(car.mileage.toString());
  const sellTimeLabel = getSellTimeLabel(car.sellTime);
  const repairStatusLabel = getRepairStatusLabel(car.repairStatus);
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
            </View>
          </View>
        </View>
      </View>
    ),
    [carData, carImages]
  );
  return (
    <FlatList
      data={bids}
      renderItem={({ item }) => {
        return <Bid bid={item} />;
      }}
      ListHeaderComponent={CarHeader}
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 32,
      }}
    />
  );
};

export default BulkAppraisalBidDetailScreen;
