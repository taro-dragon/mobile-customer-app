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
  const onButtonPress = () => {
    console.log("push");
  };

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
        <View style={{ padding: 16, gap: 12 }}>
          <View>
            <Text style={{ ...typography.heading3, color: colors.primary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
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
        </View>
      </ScrollView>
      <View>
        <Divider />
        <View style={{ padding: 16, gap: 8 }}>
          <Button
            color={colors.primary}
            label="買取オファーを見る"
            onPress={onButtonPress}
            fullWidth
          />
          <Button
            color={colors.primary}
            label="一括査定依頼をする"
            onPress={onButtonPress}
            fullWidth
            isBorder
          />
        </View>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default CarDetail;
