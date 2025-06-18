import React, { useState } from "react";
import StockCarItem from "@/components/staff/StockCars/StockCarItem";
import {
  StockHit,
  useStockCarsContext,
} from "@/contexts/staff/CarSearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { CarIcon, SortDesc } from "lucide-react-native";

import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";

type SearchScreenProps = {
  cars: StockHit[];
  showMore: () => void;
  isLastPage: boolean;
  refresh: () => void;
};

const SearchScreen: React.FC<SearchScreenProps> = ({
  cars,
  showMore,
  isLastPage,
  refresh,
}) => {
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  const { handlePresentModalPress } = useStockCarsContext();
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={handlePresentModalPress}>
              <SortDesc size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <FlashList
          data={cars}
          contentContainerStyle={{
            padding: 16,
          }}
          estimatedItemSize={126}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <StockCarItem car={item} />}
          onEndReached={() => {
            if (!isLastPage) {
              showMore();
            }
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
                  対象の車両がありません
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default SearchScreen;
