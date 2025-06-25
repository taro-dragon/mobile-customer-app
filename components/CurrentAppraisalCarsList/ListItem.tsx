import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Bid } from "@/types/firestore_schema/bids";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type ListItemProps = {
  car: Car & { bids: Bid[] };
};

const ListItem: React.FC<ListItemProps> = ({ car }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(car as Car);
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 8,
        width: 144,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.borderPrimary,
      }}
      onPress={() => router.push(`/cars/${car.id}`)}
    >
      <View style={{ width: "100%", aspectRatio: 1 }}>
        <Image
          source={car.images.front}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ padding: 8, gap: 8 }}>
        <View style={{ gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ ...typography.heading3, color: colors.primary }}
          >
            {carData.model.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...typography.body3, color: colors.textSecondary }}
          >
            {carData.maker.name}
          </Text>
        </View>

        <View>
          <Text style={{ ...typography.body3, color: colors.textPrimary }}>
            入札件数：
            <Text
              style={{
                ...typography.heading1,
                color:
                  car.bids.length > 0 ? colors.primary : colors.textSecondary,
              }}
            >
              {car.bids.length}
            </Text>
            件
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
