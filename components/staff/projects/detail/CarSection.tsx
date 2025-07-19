import React from "react";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedProject } from "@/hooks/staff/projects/useFetchProject";
import { CarDetails } from "@/libs/transformCarData";
import { Bid } from "@/types/firestore_schema/bids";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Stock } from "@/types/firestore_schema/stock";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import CarPriceSection from "@/hooks/staff/projects/CarPriceSection";

// 型ガード関数
const isStock = (data: any): data is Stock => {
  return data && typeof data.totalPayment === "number";
};

const isBuyOffer = (data: any): data is BuyOffer => {
  return data && typeof data.buyOffer === "object";
};

const isBid = (data: any): data is Bid => {
  return data && typeof data.bid === "object";
};

type CarSectionProps = {
  project: ExtendedProject;
  carData: CarDetails;
};

const CarSection: React.FC<CarSectionProps> = ({ project, carData }) => {
  const { colors, typography } = useTheme();
  const isCarInquiry = project.type === "car_inquiry";
  const targetCarData = isCarInquiry
    ? project.targetStockCarData
    : project.targetCarData;

  const buyOffer = project?.buyOffer;
  const bid = project?.bid;
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ ...typography.title3, color: colors.textPrimary }}>
        車両詳細
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={{ uri: targetCarData?.images.front }}
          style={{ width: 72, height: 72, borderRadius: 8 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ gap: 4 }}>
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title3, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              {carData.year.year}
            </Text>
            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              {carData.grade.gradeName}
            </Text>
          </View>
        </View>
      </View>
      {isStock(targetCarData) && (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1, gap: 4 }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 4,
                padding: 2,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
            >
              <Text
                style={{
                  ...typography.heading4,
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                支払総額
                <Text style={{ ...typography.body4, color: colors.white }}>
                  （税込）
                </Text>
              </Text>
            </View>
            <Text style={{ ...typography.title1, color: colors.primary }}>
              {(Number(targetCarData.totalPayment) / 10000).toFixed(1)}
              <Text
                style={{
                  ...typography.heading5,
                  color: colors.textSecondary,
                }}
              >
                万円
              </Text>
            </Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <View
              style={{
                borderRadius: 4,
                padding: 2,
                borderWidth: 1,
                borderColor: colors.textSecondary,
              }}
            >
              <Text
                style={{
                  ...typography.heading4,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                本体価格
                <Text
                  style={{ ...typography.body4, color: colors.textSecondary }}
                >
                  （税込）
                </Text>
              </Text>
            </View>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {(Number(targetCarData.bodyPrice) / 10000).toFixed(1)}
              <Text
                style={{
                  ...typography.heading5,
                  color: colors.textSecondary,
                }}
              >
                万円
              </Text>
            </Text>
          </View>
        </View>
      )}
      {isBuyOffer(project) && (
        <>
          <Divider />
          <Text style={{ ...typography.title3, color: colors.textPrimary }}>
            査定情報
          </Text>
          <CarPriceSection
            minPrice={buyOffer?.minPrice || 0}
            maxPrice={buyOffer?.maxPrice || 0}
            finalPrice={project.appraisal?.appraisalPrice}
          />
        </>
      )}
      {isBid(project) && (
        <>
          <Divider />
          <Text style={{ ...typography.title3, color: colors.textPrimary }}>
            査定情報
          </Text>
          <CarPriceSection
            minPrice={bid?.minPrice || 0}
            maxPrice={bid?.maxPrice || 0}
            finalPrice={project.appraisal?.appraisalPrice}
          />
        </>
      )}
    </View>
  );
};

export default CarSection;
