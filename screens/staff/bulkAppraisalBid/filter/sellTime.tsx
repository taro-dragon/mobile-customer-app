import FilterListItem from "@/components/filter/FilterListItem";
import { sellTimeOptions } from "@/constants/registrationCarOptions";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

const SellTimeFilterScreen = () => {
  const router = useRouter();
  const { resetField, getValues } = useFormContext();
  const sellTime = getValues("sellTime");
  return (
    <FlashList
      data={sellTimeOptions}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      estimatedItemSize={57}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.label}
          name="sellTime"
          value={item.value}
          onPressed={() => {
            router.dismissAll();
          }}
          checked={sellTime === item.value}
        />
      )}
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="prefecture"
          value={undefined}
          onPressed={() => {
            resetField("sellTime");
            router.dismissAll();
          }}
          checked={!sellTime}
        />
      }
    />
  );
};

export default SellTimeFilterScreen;
