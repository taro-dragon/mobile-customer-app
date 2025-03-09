import Alert from "@/components/common/Alert";
import Card from "@/components/common/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import Button from "@/components/common/Button";
import useBid from "@/hooks/useFetchBid";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import selectBid from "@/libs/firestore/selectBid";
import { useStore } from "@/hooks/useStore";

const BidDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bid, isLoading } = useBid(id);
  const { user } = useStore();

  const router = useRouter();
  const { colors, typography } = useTheme();
  useEffect(() => {
    if (!isLoading && !bid) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "入札情報が見つかりませんでした",
      });
      router.back();
    }
  }, [bid]);

  if (!bid) return null;
  const showSelectButton = !bid.isSelected;
  const handleSelectBid = async () => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "ユーザー情報が見つかりませんでした",
      });
      return;
    }
    await selectBid(bid, user.id);
    router.back();
    Toast.show({
      type: "success",
      text1: "一括査定を選択しました",
      text2: "トーク画面から加盟店とやり取りが可能です",
    });
  };
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
          <Text style={{ ...typography.heading1, color: colors.white }}>
            {bid.affiliateStore.shopName}
          </Text>
          <Text style={{ ...typography.body3, color: colors.white }}>
            {bid.affiliateStore.address1}
            {bid.affiliateStore.address2}
            {bid.affiliateStore.address3}
          </Text>
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
          {showSelectButton && (
            <View style={{ flex: 1, width: "100%", marginTop: 16 }}>
              <Button
                label="この査定を選択する"
                color={colors.white}
                isBorder
                onPress={handleSelectBid}
              />
            </View>
          )}
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

export default BidDetail;
