import Alert from "@/components/common/Alert";
import Card from "@/components/common/Card";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { Bid } from "@/types/firestore_schema/bids";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";

type BidDetailProps = {
  bid: Bid;
};

const BidDetailScreen = ({ bid }: BidDetailProps) => {
  const { colors, typography } = useTheme();

  return (
    <View style={{ flex: 1, paddingBottom: 24 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 32,
            paddingHorizontal: 16,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...typography.heading2, color: colors.white }}>
                Min
              </Text>
              <Text
                style={{
                  ...typography.title1,
                  color: colors.white,
                }}
              >
                ￥{bid.minPrice.toLocaleString()}
              </Text>
            </View>
            <Text style={{ ...typography.heading2, color: colors.white }}>
              -
            </Text>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...typography.heading2, color: colors.white }}>
                Max
              </Text>
              <Text
                style={{
                  ...typography.title1,
                  color: colors.white,
                }}
              >
                ￥{bid.maxPrice.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 16, gap: 16 }}>
          {bid?.comment && (
            <View style={{ gap: 8 }}>
              <Alert title="加盟店コメント" type="info" message={bid.comment} />
            </View>
          )}
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              入札情報
            </Text>
            <Card>
              <View style={{ gap: 8 }}>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textSecondary,
                    }}
                  >
                    入札ステータス
                  </Text>
                  <Text
                    style={{ ...typography.heading2, color: colors.primary }}
                  >
                    {bid.isSelected ? "選択済み" : "未選択"}
                  </Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textSecondary,
                    }}
                  >
                    入札登録日時
                  </Text>
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    {dayjs(bid.createdAt.toDate()).format("YYYY/MM/DD")}
                  </Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textSecondary,
                    }}
                  >
                    入札更新日時
                  </Text>
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    {dayjs(bid.updatedAt.toDate()).format("YYYY/MM/DD")}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      <SafeAreaBottom />
    </View>
  );
};

export default BidDetailScreen;
