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
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { AnswerCarCheckRequestFormData } from "@/constants/schemas/answerCarCheckRequest";
import Button from "@/components/common/Button";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useRouter } from "expo-router";
import TextInput from "@/components/registrationCar/form/TextInput";

interface AnswerCarCheckRequestScreenProps {
  onSubmit: () => void;
}

const AnswerCarCheckRequestScreen: React.FC<
  AnswerCarCheckRequestScreenProps
> = ({ onSubmit }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<AnswerCarCheckRequestFormData>();

  const [datePickerOpen, setDatePickerOpen] = useState<number | null>(null);
  const [timePickerOpen, setTimePickerOpen] = useState<number | null>(null);
  const [currentDateIndex, setCurrentDateIndex] = useState<number | null>(null);

  const preferredDates = watch("preferredDates") || [];
  const location = watch("location");

  // 日付フィールドを追加
  const addDateField = () => {
    const newDate = {
      date: new Date(),
      time: "",
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

  // 日付選択を開く
  const openDatePicker = (index: number) => {
    setCurrentDateIndex(index);
    setDatePickerOpen(index);
  };

  // 時間選択を開く
  const openTimePicker = (index: number) => {
    setCurrentDateIndex(index);
    setTimePickerOpen(index);
  };

  // 日付を確定
  const confirmDate = (date: Date) => {
    if (currentDateIndex !== null) {
      const newDates = [...preferredDates];
      newDates[currentDateIndex] = {
        ...newDates[currentDateIndex],
        date,
      };
      setValue("preferredDates", newDates);
    }
    setDatePickerOpen(null);
    setCurrentDateIndex(null);
  };

  // 時間を確定
  const confirmTime = (time: Date) => {
    if (currentDateIndex !== null) {
      const newDates = [...preferredDates];
      const timeString = time.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      newDates[currentDateIndex] = {
        ...newDates[currentDateIndex],
        time: timeString,
      };
      setValue("preferredDates", newDates);
    }
    setTimePickerOpen(null);
    setCurrentDateIndex(null);
  };

  // 位置情報選択ページに遷移
  const handleLocationSelect = () => {
    // TODO: 位置情報選択ページに遷移
    // router.push("/location-select");
    console.log("位置情報選択ページに遷移");
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

                {/* 日付選択 */}
                <TouchableOpacity
                  onPress={() => openDatePicker(index)}
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 8,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: errors.preferredDates?.[index]?.date
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
                      {dateField.date
                        ? dateField.date.toLocaleDateString("ja-JP")
                        : "日付を選択"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 時間選択 */}
                <TouchableOpacity
                  onPress={() => openTimePicker(index)}
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 8,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: errors.preferredDates?.[index]?.time
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
                    <Clock size={16} color={colors.textPrimary} />
                    <Text
                      style={{ color: colors.textPrimary, ...typography.body2 }}
                    >
                      {dateField.time || "時間を選択"}
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
                  initialRegion={{
                    latitude: location?.lat || 35.6762,
                    longitude: location?.lng || 139.6503,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                />
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
                      style={{ color: colors.textPrimary, ...typography.body2 }}
                    >
                      位置情報を選択
                    </Text>
                  </View>
                </View>
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

      {/* 日付選択モーダル */}
      <DatePicker
        modal
        open={datePickerOpen !== null}
        date={
          currentDateIndex !== null
            ? preferredDates[currentDateIndex]?.date || new Date()
            : new Date()
        }
        mode="date"
        locale="ja"
        minimumDate={new Date()}
        onConfirm={confirmDate}
        onCancel={() => {
          setDatePickerOpen(null);
          setCurrentDateIndex(null);
        }}
      />

      {/* 時間選択モーダル */}
      <DatePicker
        modal
        open={timePickerOpen !== null}
        date={currentDateIndex !== null ? new Date() : new Date()}
        mode="time"
        locale="ja"
        onConfirm={confirmTime}
        onCancel={() => {
          setTimePickerOpen(null);
          setCurrentDateIndex(null);
        }}
      />
    </>
  );
};

export default AnswerCarCheckRequestScreen;
