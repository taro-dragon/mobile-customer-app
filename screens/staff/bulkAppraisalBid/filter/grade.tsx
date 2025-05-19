import FilterListItem from "@/components/filter/FilterListItem";
import { Grade } from "@/types/models/carData/grade";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { useFormContext } from "react-hook-form";

type GradeFilterProps = {
  grades?: Grade[];
};

const GradeFilterScreen: React.FC<GradeFilterProps> = ({ grades }) => {
  const router = useRouter();
  const { resetField, setValue } = useFormContext();
  const { getValues } = useFormContext();
  const grade = getValues("grade");
  const modelNumber = getValues("modelNumber");
  console.log(modelNumber);

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
            setValue(
              "modelNumber",
              item.modelNumber.replace(/[\s\u3000]/g, "")
            );
            router.dismissAll();
          }}
          checked={
            grade === item.gradeName &&
            modelNumber === item.modelNumber.replace(/[\s\u3000]/g, "")
          }
          subLabel={`型番：${item.modelNumber.replace(/[\s\u3000]/g, "")}`}
        />
      )}
      ListHeaderComponent={
        <FilterListItem
          label="すべて"
          name="grade"
          value={undefined}
          checked={!grade && !modelNumber}
          onPressed={() => {
            resetField("grade");
            setValue("modelNumber", undefined);
            router.dismissAll();
          }}
        />
      }
    />
  );
};

export default GradeFilterScreen;
