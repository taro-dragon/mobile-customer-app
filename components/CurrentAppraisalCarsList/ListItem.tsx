import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Bid } from "@/types/firestore_schema/bids";
import { Car } from "@/types/models/Car";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type ListItemProps = {
  car: Car & { bids: Bid[] };
};

const ListItem: React.FC<ListItemProps> = ({ car }) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(car as Car);
  return (
    <View
      style={{
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 8,
        width: 144,
        overflow: "hidden",
      }}
    >
      <View style={{ width: "100%", aspectRatio: 1 }}>
        <Image
          source={car.images.front}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ padding: 8 }}>
        <Text style={{ ...typography.heading3, color: colors.primary }}>
          {carData.model.name}
        </Text>
        <Text style={{ ...typography.body3, color: colors.textSecondary }}>
          {carData.maker.name}
        </Text>

        <View>
          <Text>{car.bids.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListItem;
