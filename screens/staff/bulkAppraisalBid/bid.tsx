import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { X } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useController, useForm } from "react-hook-form";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import Button from "@/components/common/Button";
import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import Alert from "@/components/common/Alert";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";

const BulkAppraisalBidBidScreen: React.FC = () => {
  const {
    carId,
    bulkAppraisalRequestsId,
    maker,
    model,
    year,
    grade,
    modelNumber,
  } = useLocalSearchParams();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm();
  const { currentStore, staff } = useStore();
  const router = useRouter();
  const { colors, typography } = useTheme();
  const {
    field: { value: maxBid, onChange: setMaxBid },
  } = useController({ control, name: "maxPrice" });
  const {
    field: { value: minBid, onChange: setMinBid },
  } = useController({ control, name: "minPrice" });
  const {
    field: { value: comment, onChange: setComment },
  } = useController({ control, name: "comment" });
  const onSubmit = async (data: any) => {
    try {
      await firestore()
        .collection("bids")
        .add({
          maxPrice: Number(data.maxPrice),
          minPrice: Number(data.minPrice),
          comment: data.comment,
          createdAt: firestore.Timestamp.now(),
          updatedAt: firestore.Timestamp.now(),
          carId: carId as string,
          bulkAppraisalRequestId: bulkAppraisalRequestsId as string,
          affiliateStoreId: currentStore?.id,
          staffId: staff?.id,
          isSelected: false,
          isArchived: false,
        });
      Toast.show({
        type: "success",
        text1: "入札完了",
        text2: "入札が完了しました",
      });
      router.back();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "入札に失敗しました",
      });
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: isSubmitting ? false : true,
          headerLeft: () =>
            !isSubmitting && (
              <TouchableOpacity onPress={router.back}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
        }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: colors.backgroundPrimary,
            }}
            contentContainerStyle={{
              gap: 12,
            }}
          >
            <View
              style={{
                padding: 16,
                backgroundColor: colors.backgroundSecondary,
                gap: 8,
              }}
            >
              <DisplaySelectItem label="メーカー" value={maker as string} />
              <DisplaySelectItem label="車種" value={model as string} />
              <DisplaySelectItem label="モデル" value={year as string} />
              <DisplaySelectItem label="グレード" value={grade as string} />
              <DisplaySelectItem
                label="型番"
                value={(modelNumber as string).replace(/[\s\u3000]/g, "")}
              />
            </View>
            <View style={{ padding: 16, gap: 12 }}>
              <Alert
                title="注意"
                message={`・オーナー様には最低入札額の高い順に表示されます。\n・最低入札額は事故歴、修復歴を隠蔽していたなどの例外がない限り、絶対に下回ることのない金額を提示してください。`}
                type="warning"
              />
              <View style={{ gap: 8 }}>
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  最低入札額
                  <Text style={{ color: colors.error }}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <TextInput
                    value={minBid}
                    keyboardType="numeric"
                    onChangeText={setMinBid}
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      borderRadius: 8,
                      padding: 16,
                      flex: 1,
                      color: colors.textPrimary,
                      borderWidth: 1,
                      borderColor: errors.minBid
                        ? colors.error
                        : colors.borderPrimary,
                    }}
                  />

                  <Text
                    style={{
                      color: colors.textPrimary,
                      ...typography.body2,
                      paddingBottom: 8,
                    }}
                  >
                    円
                  </Text>
                </View>
                {errors.minBid && (
                  <Text style={{ color: colors.error, ...typography.body2 }}>
                    {errors.minBid?.message as string}
                  </Text>
                )}
              </View>
              <View style={{ gap: 8 }}>
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  最高入札額
                  <Text style={{ color: colors.error }}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <TextInput
                    value={maxBid}
                    keyboardType="numeric"
                    onChangeText={setMaxBid}
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      borderRadius: 8,
                      padding: 16,
                      flex: 1,
                      color: colors.textPrimary,
                      borderWidth: 1,
                      borderColor: errors.maxBid
                        ? colors.error
                        : colors.borderPrimary,
                    }}
                  />

                  <Text
                    style={{
                      color: colors.textPrimary,
                      ...typography.body2,
                      paddingBottom: 8,
                    }}
                  >
                    円
                  </Text>
                </View>
                {errors.maxBid && (
                  <Text style={{ color: colors.error, ...typography.body2 }}>
                    {errors.maxBid?.message as string}
                  </Text>
                )}
              </View>
              <View style={{ gap: 8 }}>
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  加盟店コメント
                  <Text style={{ color: colors.error }}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <TextInput
                    value={comment}
                    onChangeText={setComment}
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      borderRadius: 8,
                      padding: 16,
                      flex: 1,
                      color: colors.textPrimary,
                      height: 120,
                      borderWidth: 1,
                      borderColor: errors.maxBid
                        ? colors.error
                        : colors.borderPrimary,
                    }}
                    multiline
                    scrollEnabled={false}
                  />
                </View>
                {errors.maxBid && (
                  <Text style={{ color: colors.error, ...typography.body2 }}>
                    {errors.maxBid?.message as string}
                  </Text>
                )}
              </View>
              <Button
                color={colors.primary}
                label="確認する"
                isLoading={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <SafeAreaBottom />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default BulkAppraisalBidBidScreen;
