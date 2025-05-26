import { useController, useFormContext, UseFormReturn } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

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

interface RegistrationBuyOfferFormScreenProps {
  confirmButton: () => void;
  form: UseFormReturn<RegistrationBuyOfferFormData>;
}

const RegistrationBuyOfferFormScreen: React.FC<
  RegistrationBuyOfferFormScreenProps
> = ({ confirmButton, form }) => {
  const { getValues } = useFormContext();
  const { colors } = useTheme();
  const { grade, model, year, maker } = getValues();
  const {
    control,
    getValues: getFormValues,
    formState: { errors, isSubmitting },
  } = form;
  const {
    field: { value: minPrice, onChange: setMinPrice },
  } = useController({ control, name: "minPrice" });
  const {
    field: { value: maxPrice, onChange: setMaxPrice },
  } = useController({ control, name: "maxPrice" });
  const {
    field: { value: comment, onChange: setComment },
  } = useController({ control, name: "comment" });
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
          <UnControlTextInput
            label="最低入札額"
            name="minPrice"
            isRequired
            value={minPrice?.toString()}
            onChangeText={(text) => setMinPrice(Number(text))}
            errors={errors}
            unit="円"
            keyboardType="numeric"
          />
          <UnControlTextInput
            label="最高入札額"
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
            value={comment ?? ""}
            onChangeText={setComment}
            errors={errors}
            multiline
          />
          <Button
            label="買取オファーを登録する"
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
