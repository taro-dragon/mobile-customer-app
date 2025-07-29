import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import { transformCarData } from "@/libs/transformCarData";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

type BulkAppraisalBidsItemProps = {
  bid: ExBulkAppraisalBid;
};

const BulkAppraisalBidsItem: React.FC<BulkAppraisalBidsItemProps> = ({
  bid,
}) => {
  const carData = transformCarData(bid.car);
  const { typography, colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: colors.backgroundSecondary,
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={bid.car.images.front}
          style={{ width: 80, height: 80, borderRadius: 10 }}
        />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ ...typography.heading4, color: colors.textSecondary }}>
            {carData.maker.name}
          </Text>
          <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
            {carData.model.name}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.year.year}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...typography.body3,
              color: colors.textSecondary,
              flex: 1,
            }}
          >
            {carData.grade.gradeName}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <View
            style={{
              borderRadius: 4,
              padding: 2,
              borderWidth: 1,
              borderColor: colors.textError,
            }}
          >
            <Text
              style={{
                ...typography.heading4,
                color: colors.textError,
                textAlign: "center",
              }}
            >
              最低査定価格
            </Text>
          </View>
          <Text style={{ ...typography.title2, color: colors.textError }}>
            {(Number(bid.minPrice) / 10000).toFixed(1)}
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
              borderColor: colors.textSuccess,
            }}
          >
            <Text
              style={{
                ...typography.heading4,
                color: colors.textSuccess,
                textAlign: "center",
              }}
            >
              最高査定価格
            </Text>
          </View>
          <Text style={{ ...typography.title2, color: colors.textSuccess }}>
            {(Number(bid.maxPrice) / 10000).toFixed(1)}
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
    </TouchableOpacity>
  );
};

export default BulkAppraisalBidsItem;
