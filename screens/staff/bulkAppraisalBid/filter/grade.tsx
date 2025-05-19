import FilterListItem from "@/components/filter/FilterListItem";
import { Grade } from "@/types/models/carData/grade";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";

type GradeFilterProps = {
  grades?: Grade[];
};

const GradeFilterScreen: React.FC<GradeFilterProps> = ({ grades }) => {
  const router = useRouter();
  return (
    <FlashList
      data={grades}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <FilterListItem
          label={item.gradeName}
          name="grade"
          value={item.gradeName}
          onPressed={() => {
            router.dismissAll();
          }}
          subLabel={`型番：${item.modelNumber.replace(/[\s\u3000]/g, "")}`}
        />
      )}
    />
  );
};

export default GradeFilterScreen;
