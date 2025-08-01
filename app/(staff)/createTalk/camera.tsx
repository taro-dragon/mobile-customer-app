import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import {
  Camera as RNVisionCamera,
  PhotoFile,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";

const Camera = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const camera = useRef<RNVisionCamera>(null);
  const { setValue } = useFormContext();
  const router = useRouter();
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    {
      photoAspectRatio: 1,
    },
  ]);
  const [photo, setPhoto] = useState<PhotoFile>();
  const { colors } = useTheme();
  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto(photo);
    setValue(name, photo?.path);
    router.back();
  };
  if (device == null) return <View />;
  return (
    <View style={{ flex: 1, backgroundColor: colors.gray600 }}>
      {photo ? (
        <Image
          source={{ uri: photo.path }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      ) : (
        <RNVisionCamera
          ref={camera}
          format={format}
          photo={true}
          device={device}
          isActive={true}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      )}
      <View style={{ padding: 16, alignItems: "center", paddingTop: 48 }}>
        <TouchableOpacity
          disabled={!!photo}
          onPress={takePhoto}
          style={{
            width: 72,
            height: 72,
            borderRadius: 60,
            borderWidth: 8,
            borderColor: colors.white,
          }}
        />
      </View>
    </View>
  );
};

export default Camera;
