import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { GreadSelect } from "@/components/OnBoading/GreadSelect";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

const SelectGread = () => {
  const { colors } = useTheme();
  const form = useFormContext();
  const { watch, resetField } = form;
  const gread = watch("gread");
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
        <GreadSelect />
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
          onPress={() => router.push("/onBoading/captureCar")}
          fullWidth
          disabled={!gread}
        />
        <Button
          color={colors.primary}
          label="前へ"
          onPress={() => {
            resetField("gread");
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

export default SelectGread;
