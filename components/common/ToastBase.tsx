import { useTheme } from "@/contexts/ThemeContext";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

type ToastBaseProps = BaseToastProps & {
  type: "success" | "error" | "warning";
};

const ToastBase = (props: ToastBaseProps) => {
  const { colors, typography } = useTheme();

  const baseColors = {
    success: {
      text: colors.textSuccess,
      background: colors.backgroundSuccess,
      border: colors.borderSuccess,
    },
    error: {
      text: colors.textError,
      background: colors.backgroundError,
      border: colors.borderError,
    },
    warning: {
      text: colors.textWarning,
      background: colors.backgroundWarning,
      border: colors.borderWarning,
    },
  };

  const { text, background, border } = baseColors[props.type];

  const icon =
    props.type === "success" ? (
      <CheckCircle size={24} color={text} />
    ) : props.type === "error" ? (
      <XCircle size={24} color={text} />
    ) : (
      <AlertTriangle size={24} color={text} />
    );

  return (
    <View
      style={{
        padding: 8,
        width: "90%",
        backgroundColor: background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border,
      }}
    >
      <View style={{ gap: 8 }}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
        >
          {icon}
          <Text style={{ ...typography.heading2, color: text }}>
            {props.text1}
          </Text>
        </View>
        {props.text2 && (
          <Text style={{ ...typography.body2, color: colors.textPrimary }}>
            {props.text2}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ToastBase;
