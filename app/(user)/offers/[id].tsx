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
import useOffer from "@/hooks/useFetchOffer";
import React from "react";

const OfferDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { offer, isLoading } = useOffer(id);
  const router = useRouter();
  const { colors, typography } = useTheme();
  useEffect(() => {
    if (!isLoading && !offer) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "オファー情報が見つかりませんでした",
      });
      router.back();
    }
  }, [offer]);
  const car = {
    maker: offer?.maker,
    model: offer?.model,
    year: offer?.year,
    grade: offer?.grade,
  };
  if (!offer) return null;
  const carData = transformCarData(car as unknown as Car);

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
          <Text style={{ ...typography.body3, color: colors.white }}>
            {carData.maker.name}
          </Text>
          <Text style={{ ...typography.heading1, color: colors.white }}>
            {carData.model.name}
          </Text>
          <Text style={{ ...typography.body3, color: colors.white }}>
            {carData?.year?.year} {carData?.grade?.gradeName}
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
                最低査定金額
              </Text>
              <Text
                style={{
                  ...typography.title1,
                  color: colors.white,
                }}
              >
                ￥{offer.minPrice.toLocaleString()}
              </Text>
            </View>
            <Text style={{ ...typography.heading2, color: colors.white }}>
              -
            </Text>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...typography.heading2, color: colors.white }}>
                最高査定金額
              </Text>
              <Text
                style={{
                  ...typography.title1,
                  color: colors.white,
                }}
              >
                ￥{offer.maxPrice.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          {offer?.description && (
            <View style={{ gap: 8 }}>
              <Alert
                title="加盟店コメント"
                type="info"
                message={offer.description}
              />
            </View>
          )}
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              買取オファー情報
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
                    買取オファー有効期限
                  </Text>
                  <Text
                    style={{ ...typography.heading2, color: colors.primary }}
                  >
                    {dayjs(offer.expiresAt.toDate()).format("YYYY/MM/DD")}
                  </Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textSecondary,
                    }}
                  >
                    買取オファー登録日時
                  </Text>
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    {dayjs(offer.createdAt.toDate()).format("YYYY/MM/DD")}
                  </Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textSecondary,
                    }}
                  >
                    買取オファー更新日時
                  </Text>
                  <Text
                    style={{ ...typography.body2, color: colors.textPrimary }}
                  >
                    {dayjs(offer.updatedAt.toDate()).format("YYYY/MM/DD")}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OfferDetail;
