import React from "react";
import { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import { Text, TouchableOpacity, View } from "react-native";
import Card from "../common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import Divider from "../common/Divider";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import Button from "../common/Button";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";

type CarOfferItemProps = {
  offer: CarBuyOffer;
};

const CarOfferItem: React.FC<CarOfferItemProps> = ({ offer }) => {
  const { colors, typography } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const isAnonymous = user?.isAnonymous;
  const guard = useRegistrationGuard();
  const onShopInfoPress = guard(() => {
    router.push(`/shops/${offer.affiliateStoreId}`);
  });

  const onOfferDetailPress = guard(() => {
    router.push(`/offers/${offer.id}`);
  });

  return (
    <Card>
      <View style={{ gap: 8 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
          onPress={onShopInfoPress}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <View style={{ gap: 4 }}>
              <Text
                style={{ ...typography.heading2, color: colors.textPrimary }}
              >
                {isAnonymous
                  ? "店舗名は本登録後に表示されます"
                  : offer.affiliateStore.shopName}
              </Text>
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                {offer.affiliateStore.address1} {offer.affiliateStore.address2}
              </Text>
            </View>
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
          <ChevronRight size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        {!isAnonymous && (
          <>
            <Divider />
            <View style={{ gap: 4 }}>
              <View style={{ gap: 8, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Button
                    color={colors.primary}
                    label="買取オファー詳細を見る"
                    isBorder
                    onPress={onOfferDetailPress}
                    fullWidth
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Card>
  );
};

export default CarOfferItem;
