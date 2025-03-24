import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import z from "zod";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const NameScreen = () => {
  const { colors, typography } = useTheme();
  const { user } = useStore();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      familyName: user?.familyName || "",
      givenName: user?.givenName || "",
    },
    resolver: zodResolver(
      z.object({
        familyName: z
          .string()
          .min(1, { message: "姓を入力してください" })
          .regex(/^[^\s_]+$/, { message: "空白や_は使用できません" }),
        givenName: z
          .string()
          .min(1, { message: "名を入力してください" })
          .regex(/^[^\s_]+$/, { message: "空白や_は使用できません" }),
      })
    ),
  });
  const onSubmit = handleSubmit(async (data) => {
    await firestore().collection("users").doc(user?.id).update({
      familyName: data.familyName,
      givenName: data.givenName,
    });
    Toast.show({
      type: "success",
      text1: "更新しました",
    });
    router.back();
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
          姓
        </Text>
        <Controller
          control={control}
          name="familyName"
          render={({ field }) => (
            <TextInput
              {...field}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: errors.familyName ? colors.error : "transparent",
              }}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.familyName && (
          <Text style={{ color: colors.error, ...typography.body2 }}>
            {errors.familyName.message}
          </Text>
        )}
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          名
        </Text>
        <Controller
          control={control}
          name="givenName"
          render={({ field }) => (
            <TextInput
              {...field}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: errors.givenName ? colors.error : "transparent",
              }}
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.givenName && (
          <Text style={{ color: colors.error, ...typography.body2 }}>
            {errors.givenName.message}
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

export default NameScreen;
