import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import Card from "../common/Card";
import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import Divider from "../common/Divider";
import { useLocalSearchParams, useRouter } from "expo-router";
type ShopCarOfferItemProps = {
  offer: BuyOffer;
};

const ShopCarOfferItem: React.FC<ShopCarOfferItemProps> = ({ offer }) => {
  const { colors, typography } = useTheme();
  const car = {
    maker: offer.maker,
    model: offer.model,
    year: offer.year,
    grade: offer.grade,
  };
  const carData = transformCarData(car as unknown as Car);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Card onPress={() => router.push(`/offers/${offer.id}`)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ gap: 8, flex: 1 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              {carData.maker.name}
            </Text>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              {carData.model.name}
            </Text>
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ ...typography.body3, color: colors.textSecondary }}>
              年式 : {carData.year.year}
            </Text>
            {offer.grade && (
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                グレード : {offer.grade}
              </Text>
            )}
          </View>
          <Divider />
          <View style={{ gap: 4 }}>
            <Text
              style={{
                ...typography.title2,
                color: colors.primary,
                fontWeight: "700",
              }}
            >
              ¥{offer.minPrice.toLocaleString()} - ¥
              {offer.maxPrice.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ShopCarOfferItem;
