import { useTheme } from "@/contexts/ThemeContext";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import BottomSheet from "./BottomSheet";
import { Filter } from "lucide-react-native";
import useShopSearch, {
  AffiliateStoreWithCompany,
} from "@/hooks/useShopSearch";
import ShopItem from "@/components/shop/ShopItem";

const ShopSearchTab = () => {
  const { colors, typography } = useTheme();
  const { resetField, watch } = useFormContext();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { dismissAll } = useBottomSheetModal();

  const {
    shops,
    isLoading,
    isLoadingMore,
    loadMore,
    refresh,
    applyFilters,
    resetFilters,
  } = useShopSearch();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const isFiltered = !!watch("prefecture");

  const onClear = () => {
    resetFilters();
    dismissAll();
  };

  const onSubmit = () => {
    applyFilters();
    dismissAll();
  };

  const renderShopItem = ({ item }: { item: AffiliateStoreWithCompany }) => {
    return <ShopItem item={item} />;
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.textInfo} />
      </View>
    );
  };

  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <ActivityIndicator size="large" color={colors.textInfo} />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={[typography.body1, { color: colors.textSecondary }]}>
          {isFiltered
            ? "条件に一致する店舗が見つかりませんでした"
            : "店舗情報を読み込めませんでした"}
        </Text>
      </View>
    );
  };

  return (
    <Tabs.ScrollView>
      <View style={{ padding: 16, flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            backgroundColor: colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: isFiltered ? colors.primary : "transparent",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 9999,
          }}
        >
          <Filter
            size={16}
            color={isFiltered ? colors.primary : colors.textPrimary}
          />
          <Text
            style={{
              color: isFiltered ? colors.primary : colors.textPrimary,
              ...typography.body2,
            }}
          >
            絞り込み {isFiltered ? "(適用中)" : ""}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          data={[...shops, ...shops, ...shops, ...shops, ...shops, ...shops]}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, gap: 12 }}
          renderItem={renderShopItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          onRefresh={refresh}
          refreshing={isLoading}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyList}
        />
      </View>

      <BottomSheet
        ref={bottomSheetModalRef}
        onClear={onClear}
        onSubmit={onSubmit}
      />
    </Tabs.ScrollView>
  );
};

export default ShopSearchTab;
