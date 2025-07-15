import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnswerCarCheckRequestFormData,
  answerCarCheckRequestSchema,
} from "@/constants/schemas/answerCarCheckRequest";

const AnswerCarCheckRequestLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const form = useForm<AnswerCarCheckRequestFormData>({
    resolver: zodResolver(answerCarCheckRequestSchema),
    defaultValues: {
      preferredDates: [
        {
          date: new Date(),
          time: "",
          priority: 1,
        },
      ],
      location: {
        lat: 0,
        lng: 0,
        address: "",
      },
      comment: "",
    },
  });

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.backgroundPrimary },
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "現車確認依頼",
            animation: "slide_from_bottom",
            gestureEnabled: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default AnswerCarCheckRequestLayout;
