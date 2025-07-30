import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import { colorOptions } from "@/components/registrationCar/form/ColorSelect";
import {
  getMileageLabel,
  getRepairStatusLabel,
  getSellTimeLabel,
} from "@/constants/registrationCarOptions";
import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const InfoTab = () => {
  const { bulkAppraisalBid } = useBulkAppraisalBidContext();
  const { typography, colors } = useTheme();
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
    <Tabs.ScrollView contentContainerStyle={{ padding: 16, paddingTop: 16 }}>
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
    </Tabs.ScrollView>
  );
};

export default InfoTab;
