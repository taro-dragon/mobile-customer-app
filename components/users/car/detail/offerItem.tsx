import React from "react";
import { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import { Text, View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";

import { useRouter } from "expo-router";

import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import Button from "@/components/common/Button";

type CarOfferItemProps = {
  offer: CarBuyOffer;
  carId: string;
};

const CarOfferItem: React.FC<CarOfferItemProps> = ({ offer, carId }) => {
  const { colors, typography } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const isAnonymous = user?.isAnonymous;
  const guard = useRegistrationGuard();
  const onShopInfoPress = guard(() => {
    router.push(`/shops/${offer.affiliateStoreId}`);
  });

  const onOfferDetailPress = guard(() => {
    router.push(`/cars/${carId}/${offer.id}`);
  });

  return (
    <Card>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1, gap: 8 }}>
            <View style={{ gap: 4 }}>
              <Text style={{ ...typography.title2, color: colors.textPrimary }}>
                {isAnonymous
                  ? "店舗名は本登録後に表示されます"
                  : offer.affiliateStore.shopName}
              </Text>
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                {offer.affiliateStore.address1}
                {offer.affiliateStore.address2}
                {!isAnonymous && offer.affiliateStore.address3}
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
        </View>
        {!isAnonymous && (
          <>
            <Divider />
            <View style={{ gap: 4 }}>
              <View style={{ gap: 8, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Button
                    color={colors.primary}
                    label="加盟店詳細"
                    isBorder
                    onPress={onShopInfoPress}
                    fullWidth
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    color={colors.primary}
                    label="買取オファー詳細"
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
