import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { MakerSelect } from "@/components/OnBoading/MakerSelect";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useFormContext } from "react-hook-form";
import Divider from "@/components/common/Divider";

const OnBoading = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useFormContext();
  const { watch } = form;
  const maker = watch("maker");
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
        <MakerSelect />
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
          onPress={() => router.push("/onBoading/selectCar")}
          fullWidth
          disabled={!maker}
        />
        <Button
          color={colors.primary}
          label="前へ"
          onPress={() => {
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

export default OnBoading;
