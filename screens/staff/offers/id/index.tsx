import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Car } from "@/types/models/Car";
import dayjs from "dayjs";
import { ScrollView, Text, View } from "react-native";

type OfferDetailScreenProps = {
  offer: BuyOffer;
  handleDeleteOffer: () => void;
};

const OfferDetailScreen: React.FC<OfferDetailScreenProps> = ({
  offer,
  handleDeleteOffer,
}) => {
  const { colors, typography } = useTheme();
  const carData = transformCarData(offer as unknown as Car);
  return (
    <View style={{ flex: 1, paddingBottom: 24 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 24, paddingTop: 24 }}
      >
        <View style={{ gap: 16 }}>
          <View
            style={{
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
              <Text style={{ ...typography.title1, color: colors.textError }}>
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
              <Text style={{ ...typography.title1, color: colors.textSuccess }}>
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
        </View>
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
                <Text style={{ ...typography.heading2, color: colors.primary }}>
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
                  現在の申し込み件数
                </Text>
                <Text
                  style={{ ...typography.body2, color: colors.textPrimary }}
                >
                  {offer.contactUsers.length}件
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      {offer.status === "published" && (
        <>
          <Divider />
          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Button
                  label="掲載終了"
                  onPress={handleDeleteOffer}
                  color={colors.error}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default OfferDetailScreen;
