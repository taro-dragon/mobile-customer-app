import Divider from "@/components/common/Divider";
import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopOfferTab from "@/components/shop/ShopOfferTab";
import useShop from "@/hooks/useFetchShop";
import { useFetchShopStockCar } from "@/hooks/common/shop/useFetchShopStockCar";
import { useFetchShopOffer } from "@/hooks/common/shop/useFetchShopOffer";
import ShopStockCarTab from "@/components/shop/ShopStockCarTab";

const ShopDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  const { colors, typography } = useTheme();

  const { shop, isLoading } = useShop(id);
  const {
    stockCars,
    isLoading: isStockCarLoading,
    hasMore: isStockCarLastPage,
    loadMore: loadMoreStockCar,
  } = useFetchShopStockCar(id);
  const {
    offers,
    isLoading: isOfferLoading,
    hasMore: isOfferLastPage,
    loadMore: loadMoreOffer,
  } = useFetchShopOffer(id);

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
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Container
        renderHeader={() => <ShopHeader shop={shop} />}
        headerContainerStyle={{
          backgroundColor: colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { height: 0, width: 0 },
          borderBottomWidth: 1,
          borderBottomColor: colors.gray200,
        }}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            activeColor={colors.primary}
            inactiveColor={colors.textSecondary}
            indicatorStyle={{
              backgroundColor: colors.primary,
              height: 3,
              borderRadius: 3,
            }}
            style={{
              backgroundColor: colors.backgroundPrimary,
            }}
            labelStyle={typography.heading3}
          />
        )}
      >
        <Tabs.Tab name="買取オファー">
          <ShopOfferTab
            offers={offers}
            hasMoreOffers={isOfferLastPage}
            loadMoreOffers={loadMoreOffer}
            isLoading={isOfferLoading}
          />
        </Tabs.Tab>
        <Tabs.Tab name="在庫車両">
          <ShopStockCarTab
            stockCars={stockCars}
            hasMoreStockCars={isStockCarLastPage}
            loadMoreStockCars={loadMoreStockCar}
            isLoading={isStockCarLoading}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

export default ShopDetail;
