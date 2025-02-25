import CarInfoItem from "@/components/CarDetail/CarInfoIten";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useTheme } from "@/contexts/ThemeContext";
import useClient from "@/hooks/useFetchClient";
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

const ShopDetail = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, typography } = useTheme();
  const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const { client, isLoading, isError } = useClient(id);

  useEffect(() => {
    if (!isLoading && !client) {
      router.back();
    }
  }, [isLoading, client]);
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
  if (!client) return null;
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
        {client.imageUrls && (
          <Carousel
            ref={ref}
            width={width}
            height={width}
            data={client?.imageUrls}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: "center",
                }}
              >
                {client.imageUrls && (
                  <Image
                    source={{ uri: client.imageUrls[index] }}
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
              {client.name}
            </Text>
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {client.address}
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
              <CarInfoItem label="電話番号" value={client.phoneNumber} />
              <CarInfoItem label="メールアドレス" value={client.email} />
              {/* <CarInfoItem label="営業時間" value={client.businessHours} /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <Divider />
        <View style={{ padding: 16, gap: 8, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="トーク"
              onPress={() => {}}
              fullWidth
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color={colors.primary}
              label="電話"
              onPress={() => {}}
              isBorder
              fullWidth
            />
          </View>
        </View>
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default ShopDetail;
