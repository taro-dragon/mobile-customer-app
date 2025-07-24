import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Stock } from "@/types/firestore_schema/stock";
import { Car } from "@/types/models/Car";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type StockCarsItemProps = {
  stockCar: Stock;
};

const StockCarsItem: React.FC<StockCarsItemProps> = ({ stockCar }) => {
  const carData = transformCarData(stockCar as unknown as Car);
  const router = useRouter();
  const { typography, colors } = useTheme();
  console.log(JSON.stringify(stockCar, null, 2));
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/stockCars/${stockCar.id}`);
      }}
    >
      <Card>
        <View style={{ gap: 4 }}>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.maker.name}
          </Text>
          <Text style={{ ...typography.title3, color: colors.textPrimary }}>
            {carData.model.name}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.year.year}
          </Text>
          <Text style={{ ...typography.body3, color: colors.textSecondary }}>
            {carData.grade.gradeName}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default StockCarsItem;
