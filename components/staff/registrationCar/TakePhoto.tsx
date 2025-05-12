import { Plus } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React, { useCallback } from "react";
import { useCameraPermission } from "react-native-vision-camera";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
};

const TakePhoto: React.FC<Props> = ({ name, label, isRequired = false }) => {
  const { colors } = useTheme();
  const { watch } = useFormContext();
  const value = watch(name);
  const { requestPermission } = useCameraPermission();
  const router = useRouter();
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
  }, [requestPermission, router]);
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
        }}
        onPress={onPress}
      >
        {value ? (
          <Image
            source={{ uri: value }}
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
      <Text style={{ color: colors.textPrimary, textAlign: "center" }}>
        {label}
      </Text>
    </View>
  );
};

export default TakePhoto;
