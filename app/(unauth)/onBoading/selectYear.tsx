import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { YearSelect } from "@/components/OnBoading/YearSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

const SelectYear = () => {
  const { colors } = useTheme();
  const form = useFormContext();
  const { watch, resetField } = form;
  const year = watch("year");
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <YearSelect />
      </View>
      <Divider />
      <View
        style={{
          backgroundColor: colors.backgroundPrimary,
          paddingHorizontal: 24,
          paddingTop: 12,
          gap: 12,
        }}
      >
        <Button
          color={colors.primary}
          label="次へ"
          onPress={() => router.push("/onBoading/selectGread")}
          fullWidth
          disabled={!year}
        />
        <Button
          color={colors.primary}
          label="前へ"
          onPress={() => {
            resetField("year");
            router.back();
          }}
          fullWidth
          notBorder
        />
        <SafeAreaBottom color={colors.backgroundPrimary} />
      </View>
    </View>
  );
};

export default SelectYear;
