import AppraisalStatusTag from "@/components/appraisal/AppraisalStatusTag";
import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import ImageCarousel from "@/components/common/ImageCarousel";
import { colorOptions } from "@/components/registrationCar/form/ColorSelect";
import {
  getMileageLabel,
  getRepairStatusLabel,
  getSellTimeLabel,
} from "@/constants/registrationCarOptions";
import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import dayjs from "dayjs";
import { User } from "lucide-react-native";
import { Text, View } from "react-native";

const CarHeader = () => {
  const { typography, colors } = useTheme();
  const { bulkAppraisalBid } = useBulkAppraisalBidContext();
  const { currentStoreStaffs } = useStore();
  const carImages = Object.values(bulkAppraisalBid.car.images ?? {});
  const targetStaff = currentStoreStaffs.find(
    (staff) => staff.id === bulkAppraisalBid.staffId
  );
  console.log(JSON.stringify(bulkAppraisalBid, null, 2));
  const { car, bulkAppraisalRequests } = bulkAppraisalBid;
  const carData = transformCarData(car);
  const colorValue = colorOptions.find(
    (option) => option.color === car.color
  )?.bgColor;
  const mileageLabel = getMileageLabel(
    bulkAppraisalRequests.mileage.toString()
  );
  const repairStatusLabel = getRepairStatusLabel(
    bulkAppraisalRequests.repairStatus
  );
  const sellTimeLabel = getSellTimeLabel(bulkAppraisalRequests.sellTime);
  return (
    <View pointerEvents="box-none">
      <ImageCarousel images={carImages} />
      <View style={{ padding: 16, gap: 24 }} pointerEvents="none">
        <View style={{ alignItems: "flex-start", gap: 8 }}>
          <View style={{ gap: 2 }}>
            <Text style={{ ...typography.heading3, color: colors.primary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
          </View>
          <AppraisalStatusTag
            bulkAppraisalRequest={bulkAppraisalBid.bulkAppraisalRequests}
          />
          <View style={{ gap: 2 }}>
            <Text style={{ ...typography.body3, color: colors.textPrimary }}>
              入札者：{targetStaff?.name}
            </Text>

            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              入札日時：
              {dayjs(bulkAppraisalBid.createdAt.toDate()).format(
                "YYYY/MM/DD HH:mm:ss"
              )}
            </Text>
          </View>
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
            <CarInfoItem label="型番" value={car.modelNumber} />
            <CarInfoItem label="走行距離" value={mileageLabel || ""} />
            <CarInfoItem label="修復歴" value={repairStatusLabel || ""} />
            <CarInfoItem label="売却時期" value={sellTimeLabel || ""} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textSecondary,
                }}
              >
                車体色
              </Text>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: colorValue,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.borderPrimary,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarHeader;
