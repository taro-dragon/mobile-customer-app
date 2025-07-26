import Card from "@/components/common/Card";
import UserImage from "@/components/common/UserIMage";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { transformCarData } from "@/libs/transformCarData";
import { Stock } from "@/types/firestore_schema/stock";
import { Car } from "@/types/models/Car";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type StockCarsItemProps = {
  stockCar: Stock;
};

const StockCarsItem: React.FC<StockCarsItemProps> = ({ stockCar }) => {
  const { currentStoreStaffs } = useStore();
  const carData = transformCarData(stockCar as unknown as Car);
  const router = useRouter();
  const { typography, colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/stockCars/${stockCar.id}`);
      }}
    >
      <Card>
        <View style={{ gap: 4 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ gap: 4 }}>
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                {carData.maker.name}
              </Text>
              <Text
                style={{ ...typography.heading2, color: colors.textPrimary }}
              >
                {carData.model.name}
              </Text>
            </View>
            <View>
              {stockCar.managerStaffs.map((staff, i) => {
                const staffData = currentStoreStaffs.find(
                  (s) => s.id === staff
                );
                if (!staffData) return null;
                return (
                  <UserImage
                    key={i}
                    imageUrl={staffData.profileImageUrl}
                    size={24}
                  />
                );
              })}
            </View>
          </View>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.year.year}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.grade.gradeName}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            更新日時:
            {dayjs(stockCar.updatedAt.toDate()).format("YYYY/MM/DD HH:mm:ss")}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default StockCarsItem;
