import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { Car } from "@/types/models/Car";

import { useTheme } from "@/contexts/ThemeContext";
import ConditionTag from "./ConditionTag";
import { transformCarData } from "@/libs/transformCarData";
import { useRouter } from "expo-router";
type CarInfoItemProps = {
  car: Car;
};

const CarInfoItem: React.FC<CarInfoItemProps> = ({ car }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(car);
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/cars/${car.id}`)}
      style={{
        flexDirection: "row",
        gap: 8,
        backgroundColor: colors.backgroundSecondary,
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
      }}
    >
      <View style={{ gap: 8, alignItems: "flex-start" }}>
        <Image
          source={{ uri: car.images.front }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.borderPrimary,
          }}
          contentFit="cover"
        />
      </View>
      <View
        style={{
          flex: 1,
          gap: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ gap: 4 }}>
            <View>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading3 }}
              >
                {carData.maker.name}
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading2 }}
                numberOfLines={1}
              >
                {carData.model.name}
              </Text>
            </View>
            <View>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading4 }}
              >
                年式
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.body3 }}
                numberOfLines={1}
              >
                {carData.year.year}
              </Text>
            </View>
            <View>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading4 }}
              >
                グレード
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.body3 }}
                numberOfLines={1}
              >
                {carData.grade.gradeName}
              </Text>
            </View>
          </View>
        </View>
        <ConditionTag condition={car.condition || "解析中"} />
      </View>
    </TouchableOpacity>
  );
};

export default CarInfoItem;
