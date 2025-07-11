import { useController, useFormContext, UseFormReturn } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/common/Button";
import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import { RegistrationBuyOfferFormData } from "@/constants/schemas/registrationBuyOfferSchema";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import UnControlTextInput from "@/components/formComponents/UnControl/TextInput";
import UnControlDatePicker from "@/components/formComponents/UnControl/DatePicker";
import UnControlModalPicker from "@/components/formComponents/UnControl/ModalPicker";
import Alert from "@/components/common/Alert";
import { useRouter } from "expo-router";
import { Staff } from "@/types/firestore_schema/staff";

interface RegistrationBuyOfferFormScreenProps {
  staffList: Staff[];
  confirmButton: () => void;
}

const RegistrationBuyOfferFormScreen: React.FC<
  RegistrationBuyOfferFormScreenProps
> = ({ confirmButton, staffList }) => {
  const router = useRouter();
  const {
    getValues,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<RegistrationBuyOfferFormData>();
  const { colors, typography } = useTheme();
  const { grade, model, year, maker } = getValues();
  const {
    field: { value: minPrice, onChange: setMinPrice },
  } = useController({ control, name: "minPrice" });
  const {
    field: { value: maxPrice, onChange: setMaxPrice },
  } = useController({ control, name: "maxPrice" });
  const {
    field: { value: description, onChange: setDescription },
  } = useController({ control, name: "description" });
  const {
    field: { value: maxContact, onChange: setMaxContact },
  } = useController({ control, name: "maxContact" });
  const {
    field: { value: maxContactCount, onChange: setMaxContactCount },
  } = useController({ control, name: "maxContactCount" });
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  const managerStaffs = watch("managerStaffs");
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
      >
        <View
          style={{
            padding: 16,
            backgroundColor: colors.backgroundSecondary,
            gap: 8,
          }}
        >
          <DisplaySelectItem label="メーカー" value={carData.maker.name} />
          <DisplaySelectItem label="車種" value={carData.model.name} />
          <DisplaySelectItem label="モデル" value={carData.year.year} />
          <DisplaySelectItem label="グレード" value={carData.grade.gradeName} />
          <DisplaySelectItem
            label="型番"
            value={carData.grade.modelNumber.replace(/[\s\u3000]/g, "")}
          />
        </View>
        <View style={{ paddingHorizontal: 16, gap: 16 }}>
          <Alert
            title="注意"
            message={`・オーナー様には最低買取金額の高い順に表示されます。\n・最低買取金額は事故歴、修復歴を隠蔽していたなどの例外がない限り、絶対に下回ることのない金額を提示してください。\n・また他にも買取の条件がある場合はトラブル防止のため加盟店コメントへの記載をお願いいたします。`}
            type="warning"
          />
          <UnControlTextInput
            label="最低買取金額"
            name="minPrice"
            isRequired
            value={minPrice?.toString()}
            onChangeText={(text) => setMinPrice(Number(text))}
            errors={errors}
            unit="円"
            keyboardType="numeric"
          />
          <UnControlTextInput
            label="最高買取金額"
            name="maxPrice"
            isRequired
            value={maxPrice?.toString()}
            onChangeText={(text) => setMaxPrice(Number(text))}
            errors={errors}
            unit="円"
            keyboardType="numeric"
          />
          <UnControlDatePicker
            label="有効期限"
            name="expiresAt"
            isRequired
            control={control}
            minimumDate={new Date()}
          />
          <UnControlModalPicker
            label="査定依頼上限"
            name="maxContact"
            required
            errors={errors}
            value={maxContact}
            onChange={setMaxContact}
            options={[
              {
                label: "あり",
                value: "limited",
              },
              {
                label: "無制限",
                value: "unlimited",
              },
            ]}
          />
          {maxContact === "limited" && (
            <UnControlTextInput
              label="査定依頼上限回数"
              name="maxContactCount"
              value={maxContactCount?.toString() ?? ""}
              onChangeText={(text) => setMaxContactCount(Number(text))}
              errors={errors}
              keyboardType="numeric"
              isRequired
            />
          )}
          <UnControlTextInput
            label="加盟店コメント"
            name="comment"
            value={description ?? ""}
            onChangeText={setDescription}
            errors={errors}
            multiline
          />
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              担当者
              <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/registrationBuyOffer/selectStaff")}
                style={{
                  backgroundColor: colors.backgroundSecondary,
                  borderRadius: 8,
                  padding: 16,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: errors.managerStaffs
                    ? colors.error
                    : colors.borderPrimary,
                }}
              >
                <Text
                  style={{
                    color:
                      managerStaffs && managerStaffs.length > 0
                        ? colors.textPrimary
                        : colors.textSecondary,
                    ...typography.body2,
                  }}
                >
                  {managerStaffs && managerStaffs.length > 0
                    ? managerStaffs
                        .map((staff) => {
                          const staffData = staffList.find(
                            (s) => s.id === staff
                          );
                          return staffData?.name;
                        })
                        .join(", ")
                    : "担当者が選択されていません"}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.managerStaffs && (
              <Text style={{ color: colors.error, ...typography.body2 }}>
                {errors.managerStaffs?.message as string}
              </Text>
            )}
          </View>
          <Button
            label="確認する"
            onPress={confirmButton}
            color={colors.primary}
            disabled={isSubmitting}
          />
        </View>
        <SafeAreaBottom />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationBuyOfferFormScreen;
