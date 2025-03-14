import { useMemo } from "react";
import { FlatList } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import ListItem from "@/components/registrationCar/ListItem";

const SelectYear = () => {
  const { watch, control } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  const years = useMemo(() => {
    return cars?.find((c) => c.modelId === model)?.years;
  }, [cars, model]);

  const {
    field: { onChange },
  } = useController({
    name: "year",
    control,
  });

  return (
    <FlatList
      data={years}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem label={item.year} onPress={() => onChange(item.yearId)} />
      )}
    />
  );
};

export default SelectYear;
