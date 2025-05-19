import ToastBase from "@/components/common/ToastBase";
import { BaseToastProps } from "react-native-toast-message";

export const ToastConfig = {
  success: (props: BaseToastProps) => <ToastBase {...props} type="success" />,
  error: (props: BaseToastProps) => <ToastBase {...props} type="error" />,
  warning: (props: BaseToastProps) => <ToastBase {...props} type="warning" />,
};
