import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useTheme } from "@/contexts/ThemeContext";
import useShop from "@/hooks/useFetchShop";
import useClient from "@/hooks/useFetchShop";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ShopDetail = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, typography } = useTheme();
  const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const { shop, isLoading } = useShop(id);

  useEffect(() => {
    if (!isLoading && !shop) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "店舗情報が見つかりませんでした",
      });
      router.back();
    }
  }, [isLoading, shop]);
  if (isLoading)
    return (
      <View style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
        <View
          style={{
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Text style={{ ...typography.heading2, color: colors.primary }}>
            店舗詳細
          </Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 16 }}
            onPress={() => router.back()}
          >
            <X size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Divider />
        <ShopDetailSkeleton />
      </View>
    );
  if (!shop) return null;
  return (
    <View style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
      <View
        style={{
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text style={{ ...typography.heading2, color: colors.primary }}>
          店舗詳細
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 16 }}
          onPress={() => router.back()}
        >
          <X size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <Divider />
      <ScrollView style={{ flex: 1 }}>
        {shop.imageUrls && (
          <Carousel
            ref={ref}
            width={width}
            height={width}
            data={shop?.imageUrls}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: "center",
                }}
              >
                {shop.imageUrls && (
                  <Image
                    source={{ uri: shop.imageUrls[index] }}
                    style={{ width: width, height: width }}
                    contentFit="cover"
                  />
                )}
              </View>
            )}
          />
        )}
        <View style={{ padding: 16, gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.title1, color: colors.textPrimary }}>
              {shop.shopName}
            </Text>
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {shop.address1}
              {shop.address2}
              {shop.address3}
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
              店舗情報
            </Text>
            <View
              style={{
                gap: 8,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                padding: 12,
                borderRadius: 12,
              }}
            >
              <CarInfoItem label="営業時間" value={shop.businessHours} />
              {shop.holiday && (
                <CarInfoItem label="定休日" value={shop.holiday} />
              )}
              {shop.client?.name && (
                <CarInfoItem label="法人名" value={shop.client.name} />
              )}
              {/* <CarInfoItem label="営業時間" value={client.businessHours} /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDetail;
