import { createAppraisalPriceZodSchema } from "@/app/(staff)/talks/[talkId]/appraisalPrice/create";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/registrationCar/form/TextInput";
import CreateAppraisalPriceHeader from "@/components/staff/talks/appraisalPrice/create/CreateAppraisalPriceheader";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { z } from "zod";

type CreateAppraisalPriceScreenProps = {
  talk: TalkWithUser;
  onSubmit: (data: z.infer<typeof createAppraisalPriceZodSchema>) => void;
};

const CreateAppraisalPriceScreen: React.FC<CreateAppraisalPriceScreenProps> = ({
  talk,
  onSubmit,
}) => {
  const { colors, typography } = useTheme();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    watch,
    setValue,
  } = useFormContext<z.infer<typeof createAppraisalPriceZodSchema>>();
  const expiryDate = watch("expiryDate");
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  return (
    <>
      <View style={{ flex: 1 }}>
        <CreateAppraisalPriceHeader talk={talk} />
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            padding: 16,
            gap: 16,
          }}
        >
          <TextInput
            label="査定金額"
            name="appraisalPrice"
            placeholder="査定金額"
            keyboardType="numeric"
            unit="円"
          />
          <View style={{ gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...typography.heading3,
                  color: colors.textPrimary,
                }}
              >
                有効期限
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsShowDatePicker(true)}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.expiryDate
                  ? colors.error
                  : colors.borderPrimary,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Calendar size={16} color={colors.textPrimary} />
                <Text
                  style={{ color: colors.textPrimary, ...typography.body2 }}
                >
                  {expiryDate
                    ? expiryDate.toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "日時を選択"}
                </Text>
              </View>
            </TouchableOpacity>
            {errors.expiryDate && (
              <Text style={{ color: colors.error, ...typography.body2 }}>
                {errors.expiryDate?.message as string}
              </Text>
            )}
          </View>

          <TextInput
            label="査定金額に関する備考"
            name="appraisalPriceNote"
            placeholder="査定金額に関する備考"
            multiline
          />
        </ScrollView>
        <Divider />
        <View style={{ padding: 16 }}>
          <Button
            label="送信"
            color={colors.primary}
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
          <SafeAreaBottom />
        </View>
      </View>
      <DatePicker
        mode="date"
        date={expiryDate}
        modal
        title="有効期限"
        confirmText="決定"
        cancelText="キャンセル"
        open={isShowDatePicker}
        onConfirm={(data) => {
          setValue("expiryDate", data);
          setIsShowDatePicker(false);
        }}
        minimumDate={new Date()}
        locale="ja"
        onCancel={() => setIsShowDatePicker(false)}
      />
      <Modal visible={isSubmitting} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000080",
          }}
        >
          <View
            style={{
              backgroundColor: "#00000080",
              padding: 20,
              borderRadius: 10,
              gap: 8,
            }}
          >
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
              送信中...
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateAppraisalPriceScreen;
