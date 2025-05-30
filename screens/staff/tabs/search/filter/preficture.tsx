import FilterListItem from "@/components/filter/FilterListItem";
import { prefectureArray } from "@/constants/prefecture";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

const PrefectureFilterScreen = () => {
  const router = useRouter();
  const { resetField, getValues } = useFormContext();
  const prefecture = getValues("prefecture");
  return (
    <FlashList
      data={prefectureArray}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      estimatedItemSize={49}
      renderItem={({ item }) => (
        <FilterListItem
          label={item}
          name="prefecture"
          value={item}
          onPressed={() => {
            router.dismissAll();
          }}
          checked={prefecture === item}
        />
      )}
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="prefecture"
          value={undefined}
          onPressed={() => {
            resetField("prefecture");
            router.dismissAll();
          }}
          checked={!prefecture}
        />
      }
    />
  );
};

export default PrefectureFilterScreen;
