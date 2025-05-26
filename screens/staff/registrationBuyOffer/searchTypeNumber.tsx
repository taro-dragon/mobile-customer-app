import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { CarSearchResult, searchByModelNumber } from "@/utils/carDataSearch";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useState, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchFormProps {
  typeNumber: string;
  setTypeNumber: (value: string) => void;
  handleSearch: () => void;
}

const SearchForm = React.memo(
  ({ typeNumber, setTypeNumber, handleSearch }: SearchFormProps) => {
    const { colors, typography } = useTheme();

    return (
      <View style={{ padding: 12, gap: 12 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
            型番検索
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={typeNumber}
                onChangeText={setTypeNumber}
                style={{
                  backgroundColor: colors.backgroundSecondary,
                  borderRadius: 8,
                  padding: 16,
                  color: colors.textPrimary,
                  borderWidth: 1,
                  borderColor: colors.borderPrimary,
                }}
                placeholder="XXX-XXXXXX"
              />
            </View>
            <TouchableOpacity
              onPress={handleSearch}
              style={{
                backgroundColor: colors.primary,
                aspectRatio: 1,
                borderRadius: 8,
                padding: 10,
              }}
            >
              <Search size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
);

const SearchTypeNumberScreen = () => {
  const { setValue } = useFormContext();
  const router = useRouter();
  const [typeNumber, setTypeNumber] = useState("");
  const [result, setResult] = useState<CarSearchResult[]>([]);
  const { colors, typography } = useTheme();
  const handleSearch = useCallback(() => {
    const result = searchByModelNumber(typeNumber);
    if (result) {
      setResult(result);
      Keyboard.dismiss();
    }
  }, [typeNumber]);

  const HeaderComponent = useMemo(() => {
    return (
      <SearchForm
        typeNumber={typeNumber}
        setTypeNumber={setTypeNumber}
        handleSearch={handleSearch}
      />
    );
  }, [typeNumber, handleSearch]);

  const handleItemPress = (targetCar: CarSearchResult) => {
    setValue("maker", targetCar.manufacturer.manufacturerId);
    setValue("model", targetCar.model.modelId);
    setValue("year", targetCar.year.yearId);
    setValue("grade", targetCar.grade.gradeName);
    setValue("modelNumber", targetCar.grade.modelNumber);

    router.push("/registrationBuyOffer/form");
  };

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={result}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={HeaderComponent}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ paddingHorizontal: 12, gap: 4, paddingVertical: 8 }}
            onPress={() => handleItemPress(item)}
          >
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
                {item.manufacturer.name}
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                {item.model.name}
              </Text>
            </View>
            <Text style={{ color: colors.textSecondary, ...typography.body3 }}>
              {item.year.year}
            </Text>
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              {item.grade.gradeName}
            </Text>
          </TouchableOpacity>
        )}
      />
      <SafeAreaBottom />
    </View>
  );
};

export default SearchTypeNumberScreen;
