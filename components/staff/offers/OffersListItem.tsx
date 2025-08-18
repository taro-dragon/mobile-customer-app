import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Car } from "@/types/models/Car";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  offer: BuyOffer;
};

const OffersListItem: React.FC<Props> = ({ offer }) => {
  const { typography, colors } = useTheme();
  const router = useRouter();
  const carData = transformCarData(offer as unknown as Car);
  return (
    <Card
      style={{ backgroundColor: colors.backgroundPrimary, padding: 8, gap: 8 }}
      onPress={() => router.push(`/offers/${offer.id}`)}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
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
            {(Number(offer.minPrice) / 10000).toFixed(1)}
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
            {(Number(offer.maxPrice) / 10000).toFixed(1)}
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
    </Card>
  );
};

export default OffersListItem;
