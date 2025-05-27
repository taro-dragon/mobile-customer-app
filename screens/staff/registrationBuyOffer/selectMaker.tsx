import ListItem from "@/components/registrationCar/ListItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

type RegistrationBuyOfferSelectMakerScreenProps = {
  manufacturers: Manufacture[];
};

const RegistrationBuyOfferSelectMakerScreen: React.FC<
  RegistrationBuyOfferSelectMakerScreenProps
> = ({ manufacturers }) => {
  const { colors } = useTheme();
  const { control } = useFormContext();
  const {
    field: { onChange },
  } = useController({
    name: "maker",
    control,
  });
  const router = useRouter();

  const handleMakerSelect = useCallback(
    (manufacturerId: string) => {
      onChange(manufacturerId);
      setTimeout(() => {
        router.push("/registrationBuyOffer/selectCar");
      }, 50);
    },
    [onChange, router]
  );
  return (
    <FlashList
      data={manufacturers}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.name}
          onPress={() => handleMakerSelect(item.manufacturerId)}
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

export default RegistrationBuyOfferSelectMakerScreen;
