import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";

const SearchFilterScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { reset } = useFormContext();
  const handleReset = () => {
    reset();
    router.back();
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView></ScrollView>
      <Divider />
      <View style={{ padding: 16 }}>
        <Button
          label="リセット"
          onPress={handleReset}
          color={colors.primary}
          isBorder
        />
        <SafeAreaBottom />
      </View>
    </View>
  );
};

export default SearchFilterScreen;
