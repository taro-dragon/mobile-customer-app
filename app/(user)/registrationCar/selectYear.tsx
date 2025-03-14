import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import ListItem from "@/components/registrationCar/ListItem";
import { Year } from "@/types/models/carData/year";
import { useRouter } from "expo-router";

const SelectYear = () => {
  const { watch, control } = useFormContext();
  const [years, setYears] = useState<Year[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const maker = watch("maker");
  const model = watch("model");
  const { manufacturers } = fullCarData as FullCarData;

  useEffect(() => {
    const selectYears = () => {
      const cars =
        manufacturers.find((m) => m.manufacturerId === maker)?.carModels || [];
      const years = cars.find((c) => c.modelId === model)?.years;
      return years;
    };
    const selectedYears = selectYears();
    setYears(selectedYears || []);
    setIsLoading(false);
  }, [maker, manufacturers, model]);

  const {
    field: { onChange },
  } = useController({
    name: "year",
    control,
  });

  const handleYearSelect = useCallback(
    (yearId: string) => {
      onChange(yearId);
      setTimeout(() => {
        router.push("/registrationCar/selectGrade");
      }, 50);
    },
    [onChange, router]
  );

  return (
    <FlatList
      data={years}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.year}
          onPress={() => handleYearSelect(item.yearId)}
        />
      )}
    />
  );
};

export default SelectYear;
