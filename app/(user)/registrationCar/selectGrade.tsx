import { useMemo } from "react";
import { FlatList } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import ListItem from "@/components/registrationCar/ListItem";

const SelectGrade = () => {
  const { watch, control } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const year = watch("year");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  const years = useMemo(() => {
    return cars?.find((c) => c.modelId === model)?.years;
  }, [cars, model]);
  const grades = useMemo(() => {
    return years?.find((y) => y.yearId === year)?.grades;
  }, [years, year]);

  const {
    field: { onChange },
  } = useController({
    name: "grade",
    control,
  });

  return (
    <FlatList
      data={grades}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.gradeName}
          onPress={() => onChange(item.gradeName)}
        />
      )}
    />
  );
};

export default SelectGrade;
