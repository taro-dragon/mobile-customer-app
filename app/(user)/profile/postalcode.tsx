import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import z from "zod";
import firestore from "@react-native-firebase/firestore";
import Button from "@/components/common/Button";
import { searchZipcode } from "@/libs/searchZipcode";
import { searchGeocode } from "@/libs/searchGeocode";
const PostalCodeScreen = () => {
  const { colors, typography } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { postalCode: user?.postalCode || "" },
    resolver: zodResolver(
      z.object({
        postalCode: z
          .string()
          .min(1, { message: "郵便番号を入力してください" })
          .regex(/^(\d{3}-\d{4}|\d{7})$/, {
            message:
              "郵便番号の形式が正しくありません（例：123-4567または1234567）",
          })
          .refine(
            async (val) => {
              const zipCodeRes = await searchZipcode(val);
              return zipCodeRes.results.length > 0;
            },
            {
              message: "郵便番号が見つかりません",
            }
          ),
      })
    ),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const zipCodeRes = await searchZipcode(data.postalCode);
      const address = `${zipCodeRes.results[0].address1}${zipCodeRes.results[0].address2}${zipCodeRes.results[0].address3}`;
      const geocodeRes = await searchGeocode(address);
      const latitude = geocodeRes.results[0].geometry.location.lat;
      const longitude = geocodeRes.results[0].geometry.location.lng;
      await firestore().collection("users").doc(user?.id).update({
        postalCode: zipCodeRes.results[0].zipcode,
        address1: zipCodeRes.results[0].address1,
        address2: zipCodeRes.results[0].address2,
        address3: zipCodeRes.results[0].address3,
        lat: latitude,
        lng: longitude,
      });
      Toast.show({
        type: "success",
        text1: "更新しました",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "エラー",
        text2: "郵便番号の取得に失敗しました",
      });
    }
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
        padding: 16,
        gap: 24,
      }}
    >
      <View style={{ gap: 8 }}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          郵便番号
        </Text>
        <Controller
          control={control}
          name="postalCode"
          render={({ field }) => (
            <TextInput
              {...field}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: errors.postalCode ? colors.error : "transparent",
              }}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.postalCode && (
          <Text style={{ color: colors.error, ...typography.body2 }}>
            {errors.postalCode.message}
          </Text>
        )}
      </View>
      <Button
        label="更新"
        isLoading={isSubmitting}
        onPress={onSubmit}
        color={colors.primary}
      />
    </View>
  );
};

export default PostalCodeScreen;
