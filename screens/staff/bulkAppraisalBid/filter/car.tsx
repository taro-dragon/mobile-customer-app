import FilterListItem from "@/components/filter/FilterListItem";
import { Model } from "@/types/models/carData/model";
import { FlashList } from "@shopify/flash-list";
import React from "react";

type CarFilterProps = {
  cars: Model[];
};

const CarFilter: React.FC<CarFilterProps> = ({ cars }) => {
  return (
    <FlashList
      data={cars}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <FilterListItem label={item.name} name="model" value={item.modelId} />
      )}
    />
  );
};

export default CarFilter;
