import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import CarIcon from "@/components/icons/car";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Picture from "@/components/formItem/picture";
import { useFormContext } from "react-hook-form";

const CaptureCar = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { watch } = useFormContext();
  const front = watch("front");
  const back = watch("back");
  const left = watch("left");
  const right = watch("right");
  const isAllCapture = front && back && left && right;
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
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <Picture name="front" />
        <View
          style={{
            flexDirection: "row",
            gap: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Picture name="left" />
          <CarIcon size={80} color={colors.primary} />
          <Picture name="right" />
        </View>
        <Picture name="back" />
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
          onPress={() => router.push("/onBoading/confirm")}
          fullWidth
          disabled={!isAllCapture}
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

export default CaptureCar;
