import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedBid } from "@/hooks/useFetchCarBids";
import { Text, View } from "react-native";

const Bid = ({ bid }: { bid: ExtendedBid }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Card>
        <View
          style={{
            gap: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
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
            </View>
          </View>
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
                {(Number(bid.minPrice) / 10000).toFixed(1)}
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
                {(Number(bid.maxPrice) / 10000).toFixed(1)}
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
        </View>
      </Card>
    </View>
  );
};

export default Bid;
