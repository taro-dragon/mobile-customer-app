import React from "react";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import TextInput from "@/components/registrationCar/form/TextInput";
import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type EditStaffScreenProps = {
  onSubmit: () => void;
  isOwner: boolean;
  isCurrentStaff: boolean;
};

const EditStaffScreen: React.FC<EditStaffScreenProps> = ({
  onSubmit,
  isOwner,
  isCurrentStaff,
}) => {
  const { colors, typography } = useTheme();
  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = useFormContext();
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.assets) {
      setValue("profileImageUrl", result.assets[0].uri);
    }
  };
  const profileImageUrl = watch("profileImageUrl");
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: colors.backgroundSecondary,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 32,
                gap: 8,
              }}
            >
              {profileImageUrl ? (
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    overflow: "hidden",
                  }}
                  onPress={pickImageAsync}
                  disabled={!isCurrentStaff}
                >
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    overflow: "hidden",
                    backgroundColor: colors.backgroundPrimary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={pickImageAsync}
                  disabled={!isCurrentStaff}
                >
                  <User size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ gap: 12, padding: 16 }}>
              <TextInput
                name="name"
                label="名前"
                isRequired
                editable={isCurrentStaff}
              />
              <TextInput
                name="furigana"
                label="フリガナ"
                isRequired
                editable={isCurrentStaff}
              />
              <TextInput
                name="email"
                label="メールアドレス"
                isRequired
                editable={false}
              />
              <TextInput
                name="phoneNumber"
                label="電話番号"
                editable={isOwner}
              />
              <TextInput name="position" label="役職" editable={isOwner} />
              <TextInput
                name="employeeId"
                label="社員番号"
                editable={isOwner}
              />
            </View>
          </ScrollView>
          <Divider />
          <View style={{ padding: 16 }}>
            <Button
              label="更新"
              onPress={onSubmit}
              color={colors.primary}
              isLoading={isSubmitting}
            />
          </View>
          <SafeAreaBottom />
        </View>
      </KeyboardAvoidingView>
      <Modal visible={isSubmitting} transparent animationType="slide">
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

export default EditStaffScreen;
