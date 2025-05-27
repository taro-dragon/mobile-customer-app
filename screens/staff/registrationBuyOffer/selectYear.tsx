import ListItem from "@/components/registrationCar/ListItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Year } from "@/types/models/carData/year";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

type RegistrationBuyOfferSelectYearProps = {
  years: Year[];
};

const RegistrationBuyOfferSelectYearScreen: React.FC<
  RegistrationBuyOfferSelectYearProps
> = ({ years }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { control } = useFormContext();
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
        router.push("/registrationBuyOffer/selectGrade");
      }, 50);
    },
    [onChange, router]
  );
  return (
    <FlashList
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
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      }
    />
  );
};

export default RegistrationBuyOfferSelectYearScreen;
