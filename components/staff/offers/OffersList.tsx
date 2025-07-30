import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { FlashList } from "@shopify/flash-list";
import { Dimensions, RefreshControl, Text, View } from "react-native";
import OffersListItem from "./OffersListItem";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@/contexts/ThemeContext";
import { Handshake } from "lucide-react-native";

type Props = {
  offers: BuyOffer[];
  isLoading: boolean;
  loadMore: () => void;
  hasMore: boolean;
  mutate: () => void;
};

const OffersList: React.FC<Props> = ({
  offers,
  isLoading,
  loadMore,
  hasMore,
  mutate,
}) => {
  const headerHeight = useHeaderHeight();
  const { colors, typography } = useTheme();
  return (
    <FlashList
      data={offers}
      renderItem={({ item }) => <OffersListItem offer={item} />}
      estimatedItemSize={126}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => {
        if (!hasMore) {
          loadMore();
        }
      }}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            mutate();
          }}
        />
      }
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get("window").height - headerHeight - 32 - 56,
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
            <Handshake
              size={48}
              color={colors.iconSecondary}
              strokeWidth={1.5}
            />
            <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
              対象の買取オファーがありません
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default OffersList;
