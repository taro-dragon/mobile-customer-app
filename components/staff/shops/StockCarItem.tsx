import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import {
  guaranteeOptions,
  inspectionOptions,
  repairStatusOptions,
} from "@/constants/registrationStockOptions";
import { useMemo } from "react";
import StockCarItemStatusPanel from "../StockCars/StockCarItemStatus";
import { Stock } from "@/types/firestore_schema/stock";

type StockCarItemProps = {
  car: Stock;
};

const StockCarItem: React.FC<StockCarItemProps> = ({ car }) => {
  const { maker, model } = transformCarData(car as unknown as Car);
  const { colors, typography } = useTheme();
  const router = useRouter();
  const repairStatusValue = useMemo(
    () =>
      repairStatusOptions.find((option) => option.value === car.repairStatus)
        ?.label,
    [car.repairStatus]
  );
  const guaranteeValue = useMemo(
    () =>
      guaranteeOptions.find((option) => option.value === car.guarantee)?.label,
    [car.repairStatus]
  );
  const inspectionValue = useMemo(
    () =>
      inspectionOptions.find((option) => option.value === car.inspection)
        ?.label,
    [car.inspection]
  );
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/stockCar/${car.id}`);
      }}
      style={{
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
        padding: 8,
        borderRadius: 8,
        gap: 8,
      }}
    >
      <View>
        <Text style={{ ...typography.heading4, color: colors.textSecondary }}>
          {maker.name}
        </Text>
        <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
          {model.name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={{ uri: car.images.front }}
          style={{ width: 104, height: 104, borderRadius: 10 }}
        />
        <View style={{ flex: 1, gap: 4 }}>
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
              <Text style={{ ...typography.title2, color: colors.primary }}>
                {(Number(car.totalPayment) / 10000).toFixed(1)}
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
              <Text style={{ ...typography.title2, color: colors.textPrimary }}>
                {(Number(car.bodyPrice) / 10000).toFixed(1)}
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
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <StockCarItemStatusPanel
                label="走行"
                value={`${car.mileage.toLocaleString()}km`}
              />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <StockCarItemStatusPanel
                label="修復歴"
                value={repairStatusValue || ""}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <StockCarItemStatusPanel
                label="保証"
                value={guaranteeValue || ""}
              />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <StockCarItemStatusPanel
                label="車検"
                value={inspectionValue || ""}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StockCarItem;
