import { Linking, TouchableOpacity } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { CameraIcon } from "lucide-react-native";
type PictureProps = {
  name: string;
};

const Picture = ({ name }: PictureProps) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { watch } = useFormContext();
  const source = watch(name);
  console.log(source);
  const { requestPermission } = useCameraPermission();
  const onPress = useCallback(async () => {
    const permissionGranted = await requestPermission();
    if (permissionGranted) {
      router.push({
        pathname: "/onBoading/camera",
        params: { name: name },
      });
    } else {
      await Linking.openSettings();
    }
  }, [requestPermission, router]);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.primary,
        borderStyle: source ? "solid" : "dashed",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {source ? (
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          contentFit="cover"
          source={{ uri: source }}
        />
      ) : (
        <CameraIcon size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
};

export default Picture;
