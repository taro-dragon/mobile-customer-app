import {
  Calendar,
  Car,
  DollarSign,
  File,
  Image,
  MapPin,
} from "lucide-react-native";

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
      console.log("画像");
    },
  },
  {
    label: "位置情報",
    icon: MapPin,
    onPress: () => {
      console.log("位置情報");
    },
  },
  {
    label: "納車日調整",
    icon: Calendar,
    onPress: () => {
      console.log("納車日調整");
    },
  },
];

export const staffRequestApprovalTalkPanel: {
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
      console.log("画像");
    },
  },
  {
    label: "位置情報",
    icon: MapPin,
    onPress: () => {
      console.log("位置情報");
    },
  },
  {
    label: "現社確認依頼",
    icon: Car,
    onPress: () => {
      console.log("日程調整");
    },
  },
  {
    label: "査定金額提示",
    icon: DollarSign,
    onPress: () => {
      console.log("査定金額提示");
    },
  },
];
