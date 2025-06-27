import { File, Image, MapPin } from "lucide-react-native";

export const staffCarInquiryTalkPanel: {
  label: string;
  icon: React.ElementType;
  onPress: () => void;
}[] = [
  {
    label: "ファイル",
    icon: File,
    onPress: () => {
      console.log("ファイル");
    },
  },
  {
    label: "画像",
    icon: Image,
    onPress: () => {
      console.log("位置情報");
    },
  },
  {
    label: "位置情報",
    icon: MapPin,
    onPress: () => {
      console.log("ファイル");
    },
  },
  {
    label: "ファイル",
    icon: File,
    onPress: () => {
      console.log("ファイル");
    },
  },
  {
    label: "画像",
    icon: Image,
    onPress: () => {
      console.log("位置情報");
    },
  },
  {
    label: "位置情報",
    icon: MapPin,
    onPress: () => {
      console.log("ファイル");
    },
  },
];
