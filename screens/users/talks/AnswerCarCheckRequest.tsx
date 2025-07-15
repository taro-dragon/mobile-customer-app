import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@/contexts/ThemeContext";
import { Plus, X, Calendar, Clock, MapPin } from "lucide-react-native";
import DatePicker from "react-native-date-picker";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { AnswerCarCheckRequestFormData } from "@/constants/schemas/answerCarCheckRequest";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useLocalSearchParams, useRouter } from "expo-router";
import TextInput from "@/components/registrationCar/form/TextInput";

const LATITUDE = 35.1709;
const LONGITUDE = 136.8816;

interface AnswerCarCheckRequestScreenProps {
  onSubmit: () => void;
}

const AnswerCarCheckRequestScreen: React.FC<
  AnswerCarCheckRequestScreenProps
> = ({ onSubmit }) => {
  const { colors, typography } = useTheme();
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const router = useRouter();
  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<AnswerCarCheckRequestFormData>();

  const [dateTimePickerOpen, setDateTimePickerOpen] = useState<number | null>(
    null
  );
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  const preferredDates = watch("preferredDates") || [];
  const location = watch("location");

  // 日付フィールドを追加
  const addDateField = () => {
    const newDate = {
      datetime: new Date(),
      priority: preferredDates.length + 1,
    };
    setValue("preferredDates", [...preferredDates, newDate]);
  };

  // 日付フィールドを削除
  const removeDateField = (index: number) => {
    const newDates = preferredDates.filter((_, i) => i !== index);
    // 優先順位を再調整
    const adjustedDates = newDates.map((date, i) => ({
      ...date,
      priority: i + 1,
    }));
    setValue("preferredDates", adjustedDates);
  };

  // 日時選択を開く
  const openDateTimePicker = (index: number) => {
    setCurrentDateIndex(index);
    setDateTimePickerOpen(index);
  };

  // 日時を確定
  const confirmDateTime = (datetime: Date) => {
    if (currentDateIndex !== null) {
      const newDates = [...preferredDates];
      newDates[currentDateIndex] = {
        ...newDates[currentDateIndex],
        datetime,
      };
      setValue("preferredDates", newDates);
    }
    setDateTimePickerOpen(null);
    setCurrentDateIndex(null);
  };

  // 位置情報選択ページに遷移
  const handleLocationSelect = () => {
    router.push(`/talks/${talkId}/answerCarCheckRequest/map`);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, padding: 16 }}
        >
          {/* 希望日時セクション */}
          <View style={{ gap: 12 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...typography.heading2, color: colors.textPrimary }}
              >
                希望日時
              </Text>
              <TouchableOpacity
                onPress={addDateField}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: colors.primary,
                  borderRadius: 6,
                }}
              >
                <Plus size={16} color="white" />
                <Text style={{ color: "white", fontSize: 12 }}>追加</Text>
              </TouchableOpacity>
            </View>

            {preferredDates.map((dateField, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: colors.borderPrimary,
                  borderRadius: 8,
                  padding: 12,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 24,
                  }}
                >
                  <Text
                    style={{
                      ...typography.heading3,
                      color: colors.textPrimary,
                    }}
                  >
                    第{dateField.priority}希望
                  </Text>
                  {preferredDates.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeDateField(index)}
                      style={{
                        padding: 4,
                        backgroundColor: colors.error,
                        borderRadius: 4,
                      }}
                    >
                      <X size={16} color="white" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* 日時選択 */}
                <TouchableOpacity
                  onPress={() => openDateTimePicker(index)}
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 8,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: errors.preferredDates?.[index]?.datetime
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
                      {dateField.datetime
                        ? dateField.datetime.toLocaleString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "日時を選択"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {errors.preferredDates?.[index] && (
                  <Text style={{ color: colors.error, ...typography.body2 }}>
                    {errors.preferredDates[index]?.message as string}
                  </Text>
                )}
              </View>
            ))}

            {errors.preferredDates && !Array.isArray(errors.preferredDates) && (
              <Text style={{ color: colors.error, ...typography.body2 }}>
                {errors.preferredDates?.message as string}
              </Text>
            )}
          </View>

          {/* 位置情報セクション */}
          <View style={{ gap: 12 }}>
            <Text style={{ ...typography.heading2, color: colors.textPrimary }}>
              位置情報
            </Text>

            <TouchableOpacity
              onPress={handleLocationSelect}
              style={{
                borderWidth: 1,
                borderColor: errors.location
                  ? colors.error
                  : colors.borderPrimary,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <View style={{ height: 200 }}>
                <MapView
                  style={{ flex: 1 }}
                  provider={PROVIDER_DEFAULT}
                  region={{
                    latitude: location?.lat || LATITUDE,
                    longitude: location?.lng || LONGITUDE,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: location?.lat || LATITUDE,
                      longitude: location?.lng || LONGITUDE,
                    }}
                  />
                </MapView>
                {!location?.address && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        backgroundColor: colors.backgroundPrimary,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                      }}
                    >
                      <MapPin size={16} color={colors.textPrimary} />
                      <Text
                        style={{
                          color: colors.textPrimary,
                          ...typography.body2,
                        }}
                      >
                        位置情報を選択
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {errors.location && (
              <Text style={{ color: colors.error, ...typography.body2 }}>
                {errors.location?.message as string}
              </Text>
            )}
          </View>

          {/* コメントセクション */}
          <View style={{ gap: 8 }}>
            <TextInput
              label="コメント"
              name="comment"
              multiline
              placeholder="コメントを入力してください"
            />
          </View>
        </ScrollView>

        <View style={{ padding: 16 }}>
          <Button
            label="回答を送信"
            onPress={onSubmit}
            color={colors.primary}
            isLoading={isSubmitting}
          />
          <SafeAreaBottom />
        </View>
      </KeyboardAvoidingView>

      {/* 日時選択モーダル */}
      <DatePicker
        modal
        open={dateTimePickerOpen !== null}
        date={
          currentDateIndex !== null
            ? preferredDates[currentDateIndex]?.datetime || new Date()
            : new Date()
        }
        minimumDate={new Date()}
        locale="ja"
        onConfirm={confirmDateTime}
        onCancel={() => {
          setDateTimePickerOpen(null);
          setCurrentDateIndex(null);
        }}
      />
    </>
  );
};

export default AnswerCarCheckRequestScreen;
