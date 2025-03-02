import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import Alert from "@/components/common/Alert";
import Card from "@/components/common/Card";
import GradeOfferPriceItem from "@/components/offer/GradeOfferPriceItem";
import { useShopContext } from "@/contexts/ShopContext";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const OfferDetail = () => {
  const { offerId } = useLocalSearchParams<{ offerId: string }>();
  const { offers } = useShopContext();
  const router = useRouter();
  const { colors, typography } = useTheme();
  const offer = offers.find((offer) => offer.id === offerId);
  useEffect(() => {
    if (!offer) {
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
  const carData = transformCarData(car as unknown as Car);

  if (!offer) return null;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 40,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text style={{ ...typography.heading2, color: colors.white }}>
          {carData.maker.name} {carData.model.name}
        </Text>
        <Text style={{ ...typography.body3, color: colors.white }}>
          {carData?.year?.year} {carData?.grade?.gradeName}
        </Text>
        <Text
          style={{
            ...typography.title1,
            color: colors.white,
            fontSize: 32,
          }}
        >
          ￥{offer.price.toLocaleString()}
        </Text>
      </View>
      <View style={{ padding: 16, gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
            状態別買取価格
          </Text>
          <Card>
            <View style={{ gap: 8 }}>
              <GradeOfferPriceItem grade="S" price={offer.price} />
              <GradeOfferPriceItem grade="A" price={offer.price * 0.8} />
              <GradeOfferPriceItem grade="B" price={offer.price * 0.7} />
              <GradeOfferPriceItem grade="C" price={offer.price * 0.6} />
            </View>
          </Card>
        </View>
        <Alert
          title="この価格は買取価格を保証するものではありません"
          message="時間の経過と共に実際の査定参考価格は大きく変動する可能性があります。流通台数の少ない車種・グレード・年式の車については、実勢価格と大幅にかけ離れる場合があります。また、実際の査定参考価格は走行距離、クルマの状態(傷・ヘコみ)、事故歴や地域・市場動向によって大きく変化します。"
          type="warning"
        />
      </View>
    </ScrollView>
  );
};

export default OfferDetail;
