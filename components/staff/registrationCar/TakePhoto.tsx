import { Plus } from "lucide-react-native";
import { useController, useFormContext } from "react-hook-form";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React, { useCallback } from "react";
import { useCameraPermission } from "react-native-vision-camera";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
};

const TakePhoto: React.FC<Props> = ({ name, label, isRequired = false }) => {
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const { field } = useController({ name });

  const { requestPermission } = useCameraPermission();
  const router = useRouter();

  // Handle camera press
  const onPress = useCallback(async () => {
    const permissionGranted = await requestPermission();
    if (permissionGranted) {
      router.push({
        pathname: "/registrationStock/camera",
        params: { name: name },
      });
    } else {
      await Linking.openSettings();
    }
  }, [requestPermission, router, name]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.assets) {
      setValue(name, result.assets[0].uri);
    }
  };

  const hasError = name in errors;

  const options = ["写真を撮る", "画像から選択する", "キャンセル"];
  const cancelButtonIndex = 2;

  const handlePress = useCallback(() => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            onPress();
            break;
          case 1:
            pickImageAsync();
            break;
          case cancelButtonIndex:
            break;
        }
      }
    );
  }, []);

  return (
    <View style={{ gap: 8 }}>
      <TouchableOpacity
        style={{
          width: 120,
          height: 120,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          borderWidth: hasError ? 1 : 0,
          borderColor: hasError ? colors.error : undefined,
        }}
        onPress={handlePress}
      >
        {field.value ? (
          <Image
            source={{ uri: field.value }}
            style={{ width: 120, height: 120, borderRadius: 12 }}
          />
        ) : (
          <>
            <Plus
              size={32}
              color={isRequired ? colors.primary : colors.textSecondary}
            />
            {isRequired && (
              <Text style={{ color: colors.textSecondary }}>必須</Text>
            )}
          </>
        )}
      </TouchableOpacity>
      <Text
        style={{
          color: hasError ? colors.error : colors.textPrimary,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default TakePhoto;
