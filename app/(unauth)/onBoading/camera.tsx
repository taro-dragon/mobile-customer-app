import React, { useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CameraIcon, XIcon } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Camera, PhotoFile, useCameraDevice } from "react-native-vision-camera";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Divider from "@/components/common/Divider";

const CameraScreem = () => {
  const { name } = useLocalSearchParams();
  const camera = useRef<Camera>(null);
  const { setValue } = useFormContext();
  const router = useRouter();
  const device = useCameraDevice("back");
  const [photo, setPhoto] = useState<PhotoFile>();
  const { colors } = useTheme();
  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto(photo);
  };
  if (device == null) return <View />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
        position: "relative",
      }}
    >
      {photo ? (
        <>
          <Image
            source={{ uri: photo.path }}
            contentFit="cover"
            style={{ flex: 1 }}
          />
          <Divider />
          <View style={{ backgroundColor: colors.backgroundPrimary }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 80,
                paddingVertical: 16,
              }}
            >
              <Text
                onPress={() => setPhoto(undefined)}
                style={{ color: colors.textPrimary }}
              >
                キャンセル
              </Text>
              <Text
                onPress={() => {
                  setValue(name as string, photo.path);
                  router.back();
                }}
                style={{ color: colors.textPrimary }}
              >
                完了
              </Text>
            </View>
            <SafeAreaBottom />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
            onPress={() => router.back()}
          >
            <XIcon size={32} color={colors.white} />
          </TouchableOpacity>
          <Camera
            device={device}
            isActive={true}
            photo={true}
            style={{ flex: 1 }}
            ref={camera}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 56,
              right: "50%",
              zIndex: 10,
              left: "50%",
              transform: [{ translateX: -20 }],
            }}
            onPress={takePhoto}
          >
            <CameraIcon size={40} color={colors.white} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CameraScreem;
