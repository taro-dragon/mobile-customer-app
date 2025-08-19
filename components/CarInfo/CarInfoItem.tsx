import { Image } from "expo-image";
import { Text, View } from "react-native";
import { Car } from "@/types/models/Car";

import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import Divider from "../common/Divider";
import Tag from "../common/Tag";
import { Pressable } from "react-native-gesture-handler";

type CarInfoItemProps = {
  car: Car;
};

const CarInfoItem: React.FC<CarInfoItemProps> = ({ car }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/cars/${car.id}`)}
      style={({ pressed }) => ({
        flexDirection: "row",
        gap: 8,
        backgroundColor: colors.backgroundPrimary,
        padding: 8,
        borderRadius: 12,
        opacity: pressed ? 0.5 : 1,
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1,
      })}
    >
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
            alignItems: "flex-end",
            gap: 12,
          }}
        >
          <View style={{ gap: 8, flex: 1 }}>
            <View style={{ gap: 4 }}>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading2 }}
                numberOfLines={1}
              >
                {car.modelName}
              </Text>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading3 }}
              >
                {car.makerName}
              </Text>
            </View>
            <Divider />
            <View>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading3 }}
              >
                年式
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.body3 }}
                numberOfLines={1}
              >
                {car.minorModelName}
              </Text>
            </View>
            <View>
              <Text
                style={{ color: colors.textSecondary, ...typography.heading3 }}
              >
                グレード
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.body3 }}
                numberOfLines={1}
              >
                {car.gradeName}
              </Text>
            </View>
          </View>
          <View style={{ gap: 8, alignItems: "flex-end" }}>
            {car.status && (
              <Tag
                label={
                  car.status === "in_progress"
                    ? "査定中"
                    : car.status === "deadline"
                    ? "選定中"
                    : "完了"
                }
                color={
                  car.status === "in_progress"
                    ? "info"
                    : car.status === "deadline"
                    ? "success"
                    : "primary"
                }
              />
            )}
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
        </View>
      </View>
    </Pressable>
  );
};

export default CarInfoItem;
