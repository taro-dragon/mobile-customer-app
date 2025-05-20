import FilterListItem from "@/components/filter/FilterListItem";
import { BidStatus } from "@/constants/bidStatus";

import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

const StatusFilterScreen = () => {
  const router = useRouter();
  const { getValues } = useFormContext();
  const status = getValues("status");
  return (
    <FlashList
      data={BidStatus}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      estimatedItemSize={57}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.label}
          name="status"
          value={item.value}
          onPressed={() => {
            router.dismissAll();
          }}
          checked={status === item.value}
        />
      )}
    />
  );
};

export default StatusFilterScreen;
