import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import BulkApprisalBidItem from "@/components/staff/bulkAppraisalBid/BulkApprisalBidItem";
import { useBulkAppraisalContext } from "@/contexts/staff/BulkAppraisalContext";

const BulkAppraisalBidScreen = () => {
  const { requests } = useBulkAppraisalContext();
  return (
    <FlashList
      data={requests}
      contentContainerStyle={{
        padding: 16,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <BulkApprisalBidItem item={item} />}
    />
  );
};

export default BulkAppraisalBidScreen;
