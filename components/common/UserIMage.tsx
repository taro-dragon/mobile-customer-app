import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { UserIcon } from "lucide-react-native";
import { View } from "react-native";

type UserImageProps = {
  imageUrl?: string;
  size?: number;
};

const UserImage: React.FC<UserImageProps> = ({ imageUrl, size = 32 }) => {
  const { colors } = useTheme();
  if (!imageUrl) {
    return (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: colors.backgroundSecondary,
          borderRadius: size / 2,
          borderWidth: 1,
          borderColor: colors.borderPrimary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserIcon size={size / 1.5} color={colors.textPrimary} />
      </View>
    );
  }
  return (
    <Image
      source={{ uri: imageUrl }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
      }}
    />
  );
};

export default UserImage;
