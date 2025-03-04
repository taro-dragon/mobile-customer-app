import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import AppraisalStatusTag from "../appraisal/AppraisalStatusTag";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import CarInfoItem from "./CarInfoIten";

const CarDetailHeader = () => {
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const { colors, typography } = useTheme();
  const car = cars.find((car) => car.id === id);
  const carData = transformCarData(car as Car);
  const carImages = Object.values(car?.images ?? {});
  return (
    <View pointerEvents="box-none">
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
              pointerEvents="none"
            />
          </View>
        )}
      />
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarDetailHeader;
