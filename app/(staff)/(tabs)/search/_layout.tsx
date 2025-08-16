import {
  StockCarsProvider,
  SortOption,
} from "@/contexts/staff/CarSearchContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { SlidersHorizontal } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { InstantSearch } from "react-instantsearch-core";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useState } from "react";

const searchClient = algoliasearch(
  process.env.EXPO_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.EXPO_PUBLIC_ALGOLIA_API_KEY as string
);

const SearchLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useForm();

  // ソート状態を管理
  const [currentSort, setCurrentSort] = useState<SortOption>({
    target: "createdAt",
    value: "desc",
  });

  // 動的インデックス名を生成
  const getIndexName = () => {
    return `stockCars_${currentSort.target}_${currentSort.value}`;
  };

  return (
    <FormProvider {...form}>
      <InstantSearch
        key={getIndexName()}
        searchClient={searchClient}
        indexName={getIndexName()}
      >
        <StockCarsProvider
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        >
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: colors.backgroundPrimary,
              },
              headerTintColor: colors.primary,
              headerStyle: {
                backgroundColor: colors.backgroundPrimary,
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "在庫検索",
                contentStyle: {
                  backgroundColor: colors.backgroundSecondary,
                },
              }}
            />
            <Stack.Screen
              name="filter"
              options={{
                title: "検索",
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="sort"
              options={{
                title: "並び替え",
                presentation: "modal",
              }}
            />
          </Stack>
        </StockCarsProvider>
      </InstantSearch>
    </FormProvider>
  );
};

export default SearchLayout;
