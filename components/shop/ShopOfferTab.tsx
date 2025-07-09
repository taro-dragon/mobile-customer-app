import { ActivityIndicator, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ShopCarOfferItem from "./ShopCarOfferItem";
import { Book } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import React from "react";

type ShopOfferTabProps = {
  offers: BuyOffer[];
  hasMoreOffers: boolean;
  loadMoreOffers: () => void;
  isLoading: boolean;
};

const ShopOfferTab: React.FC<ShopOfferTabProps> = ({
  offers,
  hasMoreOffers,
  loadMoreOffers,
  isLoading,
}) => {
  const { colors, typography } = useTheme();

  return (
    <Tabs.FlatList
      data={offers}
      renderItem={({ item }) => <ShopCarOfferItem offer={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMoreOffers ? loadMoreOffers : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={
        hasMoreOffers ? <ActivityIndicator size="small" /> : null
      }
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
            gap: 16,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <>
              <Book size={48} color={colors.iconSecondary} strokeWidth={1.5} />
              <Text
                style={{
                  ...typography.heading2,
                  color: colors.textSecondary,
                }}
              >
                買取オファーがありません
              </Text>
            </>
          )}
        </View>
      }
    />
  );
};

export default ShopOfferTab;
