import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { sampleAppraisal } from "@/constants/SampleAppraisal";

import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import { Image } from "expo-image";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";
import { X } from "lucide-react-native";
import BidItem from "@/components/CarInfo/BidItem";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";

const CarDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars } = useStore();
  const car = cars.find((car) => car.id === id);
  const ref = React.useRef<ICarouselInstance>(null);
  const carData = transformCarData(car as Car);
  const safeAreaInsets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const carImages = Object.values(car?.images ?? {});
  const width = Dimensions.get("window").width;
  const router = useRouter();
  const guard = useRegistrationGuard();
  const onButtonPress = guard(() => {
    router.push("/registration");
  });

  return (
    <View style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
      <View
        style={{
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text style={{ ...typography.heading2, color: colors.primary }}>
          車両詳細
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 16 }}
          onPress={() => router.back()}
        >
          <X size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <Divider />
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
          <View>
            <Text style={{ ...typography.heading3, color: colors.primary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
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
              <CarInfoItem label="AI分析結果" value={car?.condition || ""} />
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

              <Text
                style={{ ...typography.body3, color: colors.primary }}
                onPress={() => {
                  console.log("さらに見る");
                }}
              >
                さらに見る
              </Text>
            </View>
            {sampleAppraisal.bids?.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View>
        <Divider />
        <View style={{ padding: 16, gap: 8, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="買取オファーを見る"
              onPress={onButtonPress}
              fullWidth
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="一括査定依頼をする"
              onPress={onButtonPress}
              isBorder
              fullWidth
            />
          </View>
        </View>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default CarDetail;
