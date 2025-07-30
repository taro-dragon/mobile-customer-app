import AppraisalStatusTag from "@/components/appraisal/AppraisalStatusTag";
import ImageCarousel from "@/components/common/ImageCarousel";
import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Text, View } from "react-native";

const CarHeader = () => {
  const { typography, colors } = useTheme();
  const { bulkAppraisalBid } = useBulkAppraisalBidContext();
  const carData = transformCarData(bulkAppraisalBid.car);
  const carImages = Object.values(bulkAppraisalBid.car.images ?? {});
  console.log(JSON.stringify(bulkAppraisalBid, null, 2));
  return (
    <View pointerEvents="box-none">
      <ImageCarousel images={carImages} />
      <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
        <View style={{ alignItems: "flex-start", gap: 4 }}>
          <Text style={{ ...typography.heading3, color: colors.primary }}>
            {carData.maker.name}
          </Text>
          <Text style={{ ...typography.title1, color: colors.textPrimary }}>
            {carData.model.name}
          </Text>
          <AppraisalStatusTag
            bulkAppraisalRequest={bulkAppraisalBid.bulkAppraisalRequests}
          />
        </View>
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
              {(Number(bulkAppraisalBid.minPrice) / 10000).toFixed(1)}
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
              {(Number(bulkAppraisalBid.maxPrice) / 10000).toFixed(1)}
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
      </View>
    </View>
  );
};

export default CarHeader;
