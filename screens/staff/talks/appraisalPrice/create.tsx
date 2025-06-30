import { createAppraisalPriceZodSchema } from "@/app/(staff)/talks/[talkId]/appraisalPrice/create";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/registrationCar/form/TextInput";
import CreateAppraisalPriceHeader from "@/components/staff/talks/appraisalPrice/create/CreateAppraisalPriceheader";
import { useTheme } from "@/contexts/ThemeContext";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
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
  } = useFormContext<z.infer<typeof createAppraisalPriceZodSchema>>();
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
            placeholder="査定金額提示"
            keyboardType="numeric"
          />
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
      <Modal
        visible={isSubmitting && !errors}
        transparent
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000080",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={{ color: colors.white, ...typography.title2 }}>
            登録処理中...
          </Text>
        </View>
      </Modal>
    </>
  );
};

export default CreateAppraisalPriceScreen;
