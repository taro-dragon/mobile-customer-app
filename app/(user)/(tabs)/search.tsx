import { useTheme } from "@/contexts/ThemeContext";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import firestore from "@react-native-firebase/firestore";
import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { InventoryItem } from "@/types/firestore_schema/inventory";
import { Car, ChevronDown } from "lucide-react-native";
import { Image } from "expo-image";
import ShopItem from "@/components/shop/ShopItem";
import ShopSearchTab from "@/components/Search/Shop/ShopSearchTab";

const PREFECTURES = [
  "全国",
  "北海道",
  "東京都",
  "神奈川県",
  "埼玉県",
  "千葉県",
  "大阪府",
  "京都府",
  "愛知県",
  "福岡県",
];

const CAR_MAKERS = [
  "全てのメーカー",
  "トヨタ",
  "ホンダ",
  "日産",
  "マツダ",
  "スバル",
  "三菱",
  "レクサス",
  "輸入車",
];

const PRICE_RANGES = [
  { label: "全ての価格", min: 0, max: 100000000 },
  { label: "～100万円", min: 0, max: 1000000 },
  { label: "100万円～300万円", min: 1000000, max: 3000000 },
  { label: "300万円～500万円", min: 3000000, max: 5000000 },
  { label: "500万円～", min: 5000000, max: 100000000 },
];

const YEAR_RANGES = [
  { label: "全ての年式", min: 0, max: 2100 },
  { label: "2020年～", min: 2020, max: 2100 },
  { label: "2015年～2019年", min: 2015, max: 2019 },
  { label: "2010年～2014年", min: 2010, max: 2014 },
  { label: "～2009年", min: 0, max: 2009 },
];

const SearchScreen: React.FC = () => {
  const { colors, typography } = useTheme();

  // フィルター状態
  const [selectedPrefecture, setSelectedPrefecture] = useState(PREFECTURES[0]);
  const [selectedMaker, setSelectedMaker] = useState(CAR_MAKERS[0]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [selectedYearRange, setSelectedYearRange] = useState(YEAR_RANGES[0]);

  // データと読み込み状態
  const [stores, setStores] = useState<AffiliateStore[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loadingStores, setLoadingStores] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);

  // フィルターメニュー表示状態
  const [showStoreFilters, setShowStoreFilters] = useState(false);
  const [showInventoryFilters, setShowInventoryFilters] = useState(false);

  // 店舗データの読み込み
  useEffect(() => {
    const fetchStores = async () => {
      setLoadingStores(true);
      try {
        let query = firestore().collection("shops").limit(20);

        // 都道府県フィルター（全国以外の場合）
        if (selectedPrefecture !== "全国") {
          query = query
            .where("address1", ">=", selectedPrefecture)
            .where("address1", "<=", selectedPrefecture + "\uf8ff");
        }

        const snapshot = await query.get();
        const storesData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as AffiliateStore)
        );

        setStores(storesData);
      } catch (error) {
        console.error("店舗データ取得エラー:", error);
      } finally {
        setLoadingStores(false);
      }
    };

    fetchStores();
  }, [selectedPrefecture]);

  // // 在庫車両データの読み込み
  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     setLoadingInventory(true);
  //     try {
  //       let query = firestore()
  //         .collection("inventory")
  //         .where("isAvailable", "==", true)
  //         .limit(20);

  //       // メーカーフィルター（全てのメーカー以外の場合）
  //       if (selectedMaker !== "全てのメーカー") {
  //         query = query.where("maker", "==", selectedMaker);
  //       }

  //       // 価格範囲フィルター
  //       query = query
  //         .where("price", ">=", selectedPriceRange.min)
  //         .where("price", "<=", selectedPriceRange.max);

  //       // 年式フィルターは取得後にJSでフィルタリング（複合クエリの制約のため）

  //       // 価格の昇順で並び替え
  //       query = query.orderBy("price", "asc");

  //       const snapshot = await query.get();
  //       let inventoryData = snapshot.docs.map(
  //         (doc) =>
  //           ({
  //             id: doc.id,
  //             ...doc.data(),
  //           } as InventoryItem)
  //       );

  //       // 年式フィルター
  //       if (selectedYearRange.label !== "全ての年式") {
  //         inventoryData = inventoryData.filter(
  //           (item) =>
  //             item.year >= selectedYearRange.min &&
  //             item.year <= selectedYearRange.max
  //         );
  //       }

  //       setInventory(inventoryData);
  //     } catch (error) {
  //       console.error("在庫データ取得エラー:", error);
  //     } finally {
  //       setLoadingInventory(false);
  //     }
  //   };

  //   fetchInventory();
  // }, [selectedMaker, selectedPriceRange, selectedYearRange]);

  // 店舗アイテムレンダリング
  const renderStoreItem = ({ item }: { item: AffiliateStore }) => (
    <ShopItem item={item} />
  );

  // 在庫車両アイテムレンダリング
  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        console.log("item", item);
      }}
    >
      <View style={styles.itemContent}>
        <View style={styles.imageContainer}>
          {item.photoUrls && item.photoUrls.length > 0 ? (
            <Image source={{ uri: item.photoUrls[0] }} style={styles.image} />
          ) : (
            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: colors.gray200 },
              ]}
            >
              <Car size={24} color={colors.gray500} />
            </View>
          )}
        </View>
        <View style={styles.itemDetails}>
          <Text
            style={[typography.heading3, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {item.maker} {item.model}
          </Text>
          <Text style={[typography.body3, { color: colors.textSecondary }]}>
            {item.year}年 • {item.mileage.toLocaleString()}km • {item.fuelType}
          </Text>
          <Text style={[typography.heading2, { color: colors.primary }]}>
            ¥{item.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // フィルターボタン
  const renderFilterButton = (
    label: string,
    isActive: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: isActive
            ? colors.primary
            : colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          typography.body3,
          { color: isActive ? colors.white : colors.textPrimary },
        ]}
      >
        {label}
      </Text>
      <ChevronDown
        size={16}
        color={isActive ? colors.white : colors.textSecondary}
      />
    </TouchableOpacity>
  );

  // フィルターオプション
  const renderFilterOptions = (
    options: string[] | { label: string; min: number; max: number }[],
    selectedOption: string | { label: string; min: number; max: number },
    onSelect: (option: any) => void
  ) => (
    <View style={styles.filterOptions}>
      {options.map((option, index) => {
        const optionLabel = typeof option === "string" ? option : option.label;
        const isSelected =
          typeof selectedOption === "string"
            ? selectedOption === option
            : selectedOption.label === optionLabel;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterOptionItem,
              {
                backgroundColor: isSelected
                  ? colors.primary
                  : colors.backgroundPrimary,
                borderColor: colors.borderPrimary,
              },
            ]}
            onPress={() => {
              onSelect(option);
              setShowStoreFilters(false);
              setShowInventoryFilters(false);
            }}
          >
            <Text
              style={[
                typography.body3,
                { color: isSelected ? colors.white : colors.textPrimary },
              ]}
            >
              {optionLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Tabs.Container
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
        <Tabs.Tab name="加盟店">
          <ShopSearchTab />
        </Tabs.Tab>
        <Tabs.Tab name="中古車">
          <Tabs.ScrollView>
            <View style={styles.tabContent}>
              {/* 在庫フィルター */}
              <View style={styles.filterContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterRow}
                >
                  {renderFilterButton(selectedMaker, false, () => {
                    setShowInventoryFilters(true);
                    setShowStoreFilters(false);
                  })}

                  {renderFilterButton(selectedPriceRange.label, false, () => {
                    setShowInventoryFilters(true);
                    setShowStoreFilters(false);
                  })}

                  {renderFilterButton(selectedYearRange.label, false, () => {
                    setShowInventoryFilters(true);
                    setShowStoreFilters(false);
                  })}
                </ScrollView>

                {showInventoryFilters && (
                  <View>
                    <Text
                      style={[
                        typography.heading3,
                        { color: colors.textPrimary, marginVertical: 8 },
                      ]}
                    >
                      メーカー
                    </Text>
                    {renderFilterOptions(
                      CAR_MAKERS,
                      selectedMaker,
                      setSelectedMaker
                    )}

                    <Text
                      style={[
                        typography.heading3,
                        { color: colors.textPrimary, marginVertical: 8 },
                      ]}
                    >
                      価格帯
                    </Text>
                    {renderFilterOptions(
                      PRICE_RANGES,
                      selectedPriceRange,
                      setSelectedPriceRange
                    )}

                    <Text
                      style={[
                        typography.heading3,
                        { color: colors.textPrimary, marginVertical: 8 },
                      ]}
                    >
                      年式
                    </Text>
                    {renderFilterOptions(
                      YEAR_RANGES,
                      selectedYearRange,
                      setSelectedYearRange
                    )}
                  </View>
                )}
              </View>

              {/* 在庫リスト */}
              {loadingInventory ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : inventory.length > 0 ? (
                <FlatList
                  data={inventory}
                  renderItem={renderInventoryItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <Text
                    style={[typography.body1, { color: colors.textSecondary }]}
                  >
                    条件に一致する車両が見つかりませんでした
                  </Text>
                </View>
              )}
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
    flex: 1,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterOptionItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    overflow: "hidden",
  },
  itemContent: {
    flexDirection: "row",
    padding: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchScreen;
