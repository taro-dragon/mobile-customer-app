import FilterListItem from "@/components/filter/FilterListItem";
import { Model } from "@/types/models/carData/model";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";

type CarFilterProps = {
  cars: Model[];
};

const CarFilter: React.FC<CarFilterProps> = ({ cars }) => {
  const router = useRouter();
  const { resetField, setValue, getValues } = useFormContext();
  const model = getValues("model");
  return (
    <FlashList
      data={cars}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      estimatedItemSize={49}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.name}
          name="model"
          value={item.modelId}
          onPressed={() => {
            router.push("/bulkAppraisalBid/filter/year");
          }}
          checked={model === item.modelId}
        />
      )}
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="model"
          value={undefined}
          onPressed={() => {
            resetField("model");
            resetField("year");
            resetField("grade");
            setValue("modelNumber", undefined);
            router.dismissAll();
          }}
          checked={!model}
        />
      }
    />
  );
};

export default CarFilter;
