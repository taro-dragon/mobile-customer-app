import DisplaySelectItem from "@/components/registrationCar/form/DisplaySelectItem";
import {
  RegistrationBuyOfferFormData,
  registrationBuyOfferSchema,
} from "@/constants/schemas/registrationBuyOfferSchema";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm, useFormContext } from "react-hook-form";
import { ScrollView, Text, TextInput, View } from "react-native";

const RegistrationBuyOfferFormScreen = () => {
  const { getValues } = useFormContext();
  const { colors, typography } = useTheme();
  const { grade, model, year, maker } = getValues();
  const form = useForm<RegistrationBuyOfferFormData>({
    resolver: zodResolver(registrationBuyOfferSchema),
    defaultValues: {
      minPrice: 0,
      maxPrice: 0,
      comment: "",
    },
  });
  const {
    handleSubmit,
    control,
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
  const formCar = {
    grade,
    model,
    year,
    maker,
  };
  const carData = transformCarData(formCar as Car);
  return (
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
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
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
              value={minPrice.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setMinPrice(Number(text))}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                flex: 1,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: errors.minPrice
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
          {errors.minPrice && (
            <Text style={{ color: colors.error, ...typography.body2 }}>
              {errors.minPrice?.message as string}
            </Text>
          )}
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
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
              value={maxPrice.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setMaxPrice(Number(text))}
              style={{
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 8,
                padding: 16,
                flex: 1,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: errors.maxPrice
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
          {errors.maxPrice && (
            <Text style={{ color: colors.error, ...typography.body2 }}>
              {errors.maxPrice?.message as string}
            </Text>
          )}
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
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
                borderColor: errors.comment
                  ? colors.error
                  : colors.borderPrimary,
              }}
              multiline
              scrollEnabled={false}
            />
          </View>
          {errors.comment && (
            <Text style={{ color: colors.error, ...typography.body2 }}>
              {errors.comment?.message as string}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrationBuyOfferFormScreen;
