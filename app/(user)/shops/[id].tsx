import CarInfoItem from "@/components/CarDetail/CarInfoIten";

import Divider from "@/components/common/Divider";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useTheme } from "@/contexts/ThemeContext";
import useShop from "@/hooks/useFetchShop";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
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
import { openMapWithLatlng } from "@/libs/openMapWithLatlng";

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
          <Text style={{ ...typography.title1, color: colors.textPrimary }}>
            {shop.shopName}
          </Text>
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
              <CarInfoItem
                label="住所"
                value={`${shop.address1} ${shop.address2} ${shop.address3}`}
              />
              <CarInfoItem label="営業時間" value={shop.businessHours} />
              {shop.holiday && (
                <CarInfoItem label="定休日" value={shop.holiday} />
              )}
              {shop.client?.name && (
                <CarInfoItem label="法人名" value={shop.client.name} />
              )}
              {shop.client?.antiqueDealerLicenseNumber && (
                <CarInfoItem
                  label="古物商許可証番号"
                  value={shop.client.antiqueDealerLicenseNumber}
                />
              )}
              {/* <CarInfoItem label="営業時間" value={client.businessHours} /> */}
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ ...typography.heading3, color: colors.textPrimary }}>
              店舗地図
            </Text>
            <View
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                  latitude: shop.lat,
                  longitude: shop.lng,
                  latitudeDelta: 0.0082,
                  longitudeDelta: 0.0082,
                }}
                scrollEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: shop.lat,
                    longitude: shop.lng,
                  }}
                  onPress={() => {
                    openMapWithLatlng(
                      { latitude: shop.lat, longitude: shop.lng },
                      shop.shopName
                    );
                  }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDetail;
