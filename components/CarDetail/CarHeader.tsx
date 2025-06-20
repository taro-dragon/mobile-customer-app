import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import AppraisalStatusTag from "../appraisal/AppraisalStatusTag";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import CarInfoItem from "./CarInfoIten";
import ImageCarousel from "../common/ImageCarousel";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";

type CarDetailHeaderProps = {
  bulkAppraisalRequest?: BulkAppraisalRequest;
};

const CarDetailHeader: React.FC<CarDetailHeaderProps> = ({
  bulkAppraisalRequest,
}) => {
  const { colors, typography } = useTheme();
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((car) => car.id === id);
  const carData = transformCarData(car as Car);
  const carImages = Object.values(car?.images ?? {});

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
          <AppraisalStatusTag bulkAppraisalRequest={bulkAppraisalRequest} />
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
