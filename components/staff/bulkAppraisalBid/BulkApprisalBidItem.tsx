import Divider from "@/components/common/Divider";
import {
  mileageOptions,
  repairStatusOptions,
  sellTimeOptions,
} from "@/constants/registrationCarOptions";
import { BulkAppraisalRequestWithCar } from "@/contexts/staff/BulkAppraisalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type BulkApprisalBidItemProps = {
  item: BulkAppraisalRequestWithCar;
};

const BulkApprisalBidItem: React.FC<BulkApprisalBidItemProps> = ({ item }) => {
  const { colors, typography } = useTheme();
  const { car, mileage, repairStatus, sellTime } = item;
  const router = useRouter();
  const { maker, model, year, grade } = transformCarData(car);
  const targetMileage = useMemo(
    () => mileageOptions.find((option) => option.value === mileage?.toString()),
    [mileage]
  );
  const targetRepairStatus = useMemo(
    () => repairStatusOptions.find((option) => option.value === repairStatus),
    [repairStatus]
  );
  const targetSellTime = useMemo(
    () => sellTimeOptions.find((option) => option.value === sellTime),
    [sellTime]
  );
  return (
    <TouchableOpacity
      onPress={() => router.push(`/bulkAppraisalBid/${item.id}`)}
      style={{
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
        paddingHorizontal: 8,
        paddingTop: 8,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          paddingBottom: 12,
        }}
      >
        <Image
          source={{ uri: car.images.front }}
          style={{ width: 80, height: 80, borderRadius: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textSecondary,
            }}
          >
            {maker.name}
          </Text>
          <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
            {model.name}
          </Text>
          <Text style={{ ...typography.body4, color: colors.textSecondary }}>
            {year.year}
          </Text>
          <Text style={{ ...typography.body4, color: colors.textSecondary }}>
            {grade.gradeName}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {item.prefecture}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
            gap: 4,
          }}
        >
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            走行距離
          </Text>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textPrimary,
            }}
          >
            {targetMileage?.label}
          </Text>
        </View>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: colors.borderPrimary,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
            gap: 4,
          }}
        >
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            修復歴
          </Text>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textPrimary,
            }}
          >
            {targetRepairStatus?.label}
          </Text>
        </View>
        <View
          style={{
            width: 1,
            height: "100%",
            backgroundColor: colors.borderPrimary,
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 8,
            gap: 4,
          }}
        >
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            売却時期
          </Text>
          <Text
            style={{
              ...typography.heading3,
              color: colors.textPrimary,
            }}
          >
            {targetSellTime?.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BulkApprisalBidItem;
