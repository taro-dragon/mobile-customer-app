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
      </Card>
    </View>
  );
};

export default Bid;
