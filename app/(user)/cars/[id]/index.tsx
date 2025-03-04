import React, { useEffect } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import { useBulkAppraisal } from "@/hooks/useBulkAppraisal";
import AppraisalSection from "@/components/CarInfo/AppraisalSection";
import AppraisalStatusTag from "@/components/appraisal/AppraisalStatusTag";
import OfferSection from "@/components/CarInfo/OfferSection";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars, fetchBulkAppraisalRequests, user } = useStore();
  const {
    isRequesting,
    onRequestAppraisalPress,
    hasActiveRequest,
    isDeadlineRequest,
  } = useBulkAppraisal();
  const car = cars.find((car) => car.id === id);
  const ref = React.useRef<ICarouselInstance>(null);
  const carData = transformCarData(car as Car);
  const { colors, typography } = useTheme();
  const carImages = Object.values(car?.images ?? {});
  const width = Dimensions.get("window").width;
  const guard = useRegistrationGuard();
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      fetchBulkAppraisalRequests(user.id);
    }
  }, [user?.id]);

  const onViewOffersPress = guard(() => {
    router.push(`/cars/${id}/offers`);
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          width={width}
          height={width}
          data={carImages}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: carImages[index] }}
                style={{ width: width, height: width }}
                contentFit="cover"
              />
            </View>
          )}
        />
        <View style={{ padding: 16, gap: 24 }}>
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
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                一括査定情報
              </Text>

              {isDeadlineRequest && (
                <Text
                  style={{ ...typography.body3, color: colors.primary }}
                  onPress={() => {
                    console.log("さらに見る");
                  }}
                >
                  さらに見る
                </Text>
              )}
            </View>
            <AppraisalSection />
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                買取オファー
              </Text>

              <Text
                style={{ ...typography.body3, color: colors.primary }}
                onPress={() => {
                  console.log("さらに見る");
                }}
              >
                さらに見る
              </Text>
            </View>
            <OfferSection />
          </View>
        </View>
        <SafeAreaBottom />
      </ScrollView>
    </View>
  );
};

export default CarDetail;
