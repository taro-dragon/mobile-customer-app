import ListItem from "@/components/registrationCar/ListItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Model } from "@/types/models/carData/model";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

type RegistrationBuyOfferSelectCarProps = {
  cars: Model[];
};

const RegistrationBuyOfferSelectCarScreen: React.FC<
  RegistrationBuyOfferSelectCarProps
> = ({ cars }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { control } = useFormContext();
  const {
    field: { onChange },
  } = useController({
    name: "model",
    control,
  });
  const handleCarSelect = useCallback(
    (modelId: string) => {
      onChange(modelId);
      setTimeout(() => {
        router.push("/registrationBuyOffer/selectYear");
      }, 50);
    },
    [onChange, router]
  );
  return (
    <FlashList
      data={cars}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.name}
          onPress={() => handleCarSelect(item.modelId)}
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

export default RegistrationBuyOfferSelectCarScreen;
