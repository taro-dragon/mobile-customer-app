import { useTheme } from "@/contexts/ThemeContext";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react-native";
import { Text, View } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  type: "info" | "error" | "warning" | "success";
};

const Alert = ({ title, message, type }: AlertProps) => {
  const { colors, typography } = useTheme();
  const color = {
    info: {
      backgroundColor: colors.backgroundInfo,
      textColor: colors.textInfo,
      borderColor: colors.borderInfo,
    },
    error: {
      backgroundColor: colors.backgroundError,
      textColor: colors.textError,
      borderColor: colors.borderError,
    },
    warning: {
      backgroundColor: colors.backgroundWarning,
      textColor: colors.textWarning,
      borderColor: colors.borderWarning,
    },
    success: {
      backgroundColor: colors.backgroundSuccess,
      textColor: colors.textSuccess,
      borderColor: colors.borderSuccess,
    },
  };
  const icon = {
    info: <Info size={24} color={colors.iconInfo} />,
    error: <XCircle size={24} color={colors.iconError} />,
    warning: <AlertTriangle size={24} color={colors.iconWarning} />,
    success: <CheckCircle size={24} color={colors.iconSuccess} />,
  };
  return (
    <View
      style={{
        backgroundColor: color[type].backgroundColor,
        borderColor: color[type].borderColor,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
        gap: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {icon[type]}
        <Text
          style={{
            color: color[type].textColor,
            ...typography.heading2,
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>
      <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
        {message}
      </Text>
    </View>
  );
};

export default Alert;
