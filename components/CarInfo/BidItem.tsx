import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import Divider from "../common/Divider";
import Button from "../common/Button";
import { useRouter } from "expo-router";
import Card from "../common/Card";
import { ExtendedBid } from "@/hooks/useFetchCarBids";
type BidItemProps = {
  bid: ExtendedBid;
};

const BidItem: React.FC<BidItemProps> = ({ bid }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <Card>
      <View
        style={{
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ gap: 4 }}>
              <Text style={{ ...typography.title2, color: colors.textPrimary }}>
                {bid.affiliateStore.shopName}
              </Text>
              <Text
                style={{ ...typography.body3, color: colors.textSecondary }}
              >
                {bid.affiliateStore.address1}
                {bid.affiliateStore.address2}
                {bid.affiliateStore.address3}
              </Text>
              <View>
                <Text
                  style={{
                    ...typography.title2,
                    color: colors.primary,
                    fontWeight: "700",
                  }}
                >
                  ¥{bid.minPrice.toLocaleString()} - ¥
                  {bid.maxPrice.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Divider />
        <View style={{ gap: 8, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="加盟店詳細"
              isBorder
              onPress={() => {
                router.push(`/shops/${bid.affiliateStoreId}`);
              }}
              fullWidth
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="査定情報詳細"
              onPress={() => {
                router.push(`/bids/${bid.id}`);
              }}
              fullWidth
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

export default BidItem;
