import ToastBase from "@/components/common/ToastBase";
import { CheckCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const ToastConfig = {
  success: (props: BaseToastProps) => <ToastBase {...props} type="success" />,
  error: (props: BaseToastProps) => <ToastBase {...props} type="error" />,
  warning: (props: BaseToastProps) => <ToastBase {...props} type="warning" />,
};
