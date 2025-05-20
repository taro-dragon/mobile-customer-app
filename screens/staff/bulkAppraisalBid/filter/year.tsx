import FilterListItem from "@/components/filter/FilterListItem";
import { Year } from "@/types/models/carData/year";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";

type YearFilterProps = {
  years: Year[];
};

const YearFilterScreen: React.FC<YearFilterProps> = ({ years }) => {
  const router = useRouter();
  const { resetField, setValue, getValues } = useFormContext();
  const year = getValues("year");
  return (
    <FlashList
      data={years}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      estimatedItemSize={49}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.year}
          name="year"
          value={item.yearId}
          onPressed={() => {
            router.push("/bulkAppraisalBid/filter/grade");
          }}
          checked={year === item.yearId}
        />
      )}
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="year"
          value={undefined}
          onPressed={() => {
            resetField("year");
            resetField("grade");
            setValue("modelNumber", undefined);
            router.dismissAll();
          }}
          checked={!year}
        />
      }
    />
  );
};

export default YearFilterScreen;
