import React, { useCallback } from "react";
import { Dimensions, Text, View } from "react-native";
import { Book, CalendarOff, CarIcon, Clock, MapPin } from "lucide-react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";

import ImageCarousel from "@/components/common/ImageCarousel";
import ShopInfoTab from "@/components/shop/ShopInfoTab";
import { useTheme } from "@/contexts/ThemeContext";
import { ShopWithManagementCompany } from "@/hooks/useFetchShop";
import StockCarItem from "@/components/staff/shops/StockCarItem";
import { Stock } from "@/types/firestore_schema/stock";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import CarOfferItem from "@/components/staff/shops/CarOfferItem";
import { useHeaderHeight } from "@react-navigation/elements";

type ShopScreenProps = {
  shop: ShopWithManagementCompany;
  stockCars: Stock[];
  isStockCarLastPage: boolean;
  isStockCarLoading: boolean;
  loadMoreStockCar: () => void;
  offers: BuyOffer[];
  isOfferLastPage: boolean;
  loadMoreOffer: () => void;
  isOfferLoading: boolean;
};

type headerProps = {
  shop: ShopWithManagementCompany;
};

const ShopHeader: React.FC<headerProps> = ({ shop }) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{ backgroundColor: colors.backgroundPrimary }}
      pointerEvents="box-none"
    >
      <ImageCarousel images={shop.imageUrls ?? []} />
      <View style={{ gap: 8, padding: 16 }} pointerEvents="none">
        <Text style={{ ...typography.title1, color: colors.textPrimary }}>
          {shop.shopName}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={{ ...typography.body2, color: colors.textSecondary }}>
            {shop.address1}
            {shop.address2}
            {shop.address3}
          </Text>
        </View>
        {shop.businessHours && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {shop.businessHours}
            </Text>
          </View>
        )}
        {shop.holiday && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <CalendarOff size={16} color={colors.textSecondary} />
            <Text style={{ ...typography.body2, color: colors.textSecondary }}>
              {shop.holiday}
            </Text>
          </View>
        )}
      </View>
      <ShopInfoTab shop={shop} />
    </View>
  );
};

const ShopScreen: React.FC<ShopScreenProps> = ({
  shop,
  stockCars,
  isStockCarLastPage,
  isStockCarLoading,
  loadMoreStockCar,
  offers,
  isOfferLastPage,
  isOfferLoading,
  loadMoreOffer,
}) => {
  const headerHeight = useHeaderHeight();
  const { colors, typography } = useTheme();
  const renderTabBar = useCallback(
    (props: any) => (
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
    ),
    [colors, typography]
  );
  return (
    <Tabs.Container
      containerStyle={{
        backgroundColor: colors.backgroundPrimary,
      }}
      renderHeader={() => {
        return <ShopHeader shop={shop} />;
      }}
      renderTabBar={renderTabBar}
    >
      <Tabs.Tab name="在庫情報">
        <Tabs.FlashList
          data={stockCars}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 16 }}>
              <StockCarItem car={item} />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListFooterComponent={() => <SafeAreaBottom />}
          overrideProps={{
            contentContainerStyle: {
              flexGrow: 1,
              paddingTop: 16,
            },
          }}
          onEndReached={() => {
            if (!isStockCarLastPage) {
              loadMoreStockCar();
            }
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                height: Dimensions.get("window").height - headerHeight - 32,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <CarIcon
                  size={48}
                  color={colors.iconSecondary}
                  strokeWidth={1.5}
                />
                <Text
                  style={{ color: colors.textSecondary, ...typography.body2 }}
                >
                  在庫車両がありません
                </Text>
              </View>
            </View>
          )}
        />
      </Tabs.Tab>
      <Tabs.Tab name="オファー情報">
        <Tabs.FlashList
          data={offers}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 16 }}>
              <CarOfferItem offer={item} />
            </View>
          )}
          overrideProps={{
            contentContainerStyle: {
              flexGrow: 1,
              paddingTop: 16,
            },
          }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListFooterComponent={() => <SafeAreaBottom />}
          onEndReached={() => {
            if (!isOfferLastPage) {
              loadMoreOffer();
            }
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                height: Dimensions.get("window").height - headerHeight - 32,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Book
                  size={48}
                  color={colors.iconSecondary}
                  strokeWidth={1.5}
                />
                <Text
                  style={{ color: colors.textSecondary, ...typography.body2 }}
                >
                  オファー情報がありません
                </Text>
              </View>
            </View>
          )}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default ShopScreen;
