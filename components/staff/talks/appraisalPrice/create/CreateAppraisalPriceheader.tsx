import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CreateAppraisalPriceHeaderProps = {
  talk: TalkWithUser;
};

const CreateAppraisalPriceHeader: React.FC<CreateAppraisalPriceHeaderProps> = ({
  talk,
}) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(
    talk.sourceType === "car_inquiry"
      ? (talk.sourceStockCar as unknown as Car)
      : (talk.sourceCar as Car)
  );
  const router = useRouter();
  const onCarInfoPress = () => {
    if (talk.sourceType === "car_inquiry") {
      router.push(`/stockCar/${talk.sourceId}`);
    } else {
      router.push(`/bulkAppraisalCars/${talk.carId}`);
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <TouchableOpacity
        onPress={onCarInfoPress}
        style={{
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <Image
            source={{
              uri:
                talk.sourceCar?.images.front ||
                talk.sourceStockCar?.images.front,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                ...typography.title4,
                color: colors.textPrimary,
                flex: 1,
              }}
            >
              {carData.maker.name} {carData.model.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...typography.body2, color: colors.textSecondary }}
            >
              {carData.year.year}
            </Text>
          </View>
        </View>
        <ChevronRight size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

export default CreateAppraisalPriceHeader;
