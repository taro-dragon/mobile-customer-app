import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LucideIcon, Plus, X } from "lucide-react-native";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isUploading: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  isClosed: boolean;
  panel: {
    label: string;
    icon: LucideIcon;
    onPress: () => void;
    disabled: boolean;
    iconColor?: string;
  }[];
  uploadProgress?: number;
};

const MessageInputComponent: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
  isUploading,
  isOpenPanel,
  setIsOpenPanel,
  isClosed,
  panel,
  uploadProgress,
}) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: colors.backgroundPrimary,
        gap: 12,
      }}
    >
      {/* アップロード進捗バー */}
      {isUploading && uploadProgress && (
        <View
          style={{
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            padding: 8,
            gap: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.textPrimary, fontSize: 12 }}>
              送信中...
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              {Math.round(uploadProgress)}%
            </Text>
          </View>
          <View
            style={{
              height: 4,
              backgroundColor: colors.borderPrimary,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: colors.primary,
                width: `${uploadProgress}%`,
                borderRadius: 2,
              }}
            />
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              borderWidth: 1,
              borderColor: colors.borderPrimary,
            },
            isUploading && { opacity: 0.5 },
          ]}
          onPress={() => setIsOpenPanel(!isOpenPanel)}
          disabled={isUploading || isClosed}
        >
          {isOpenPanel ? (
            <X size={20} color={colors.textPrimary} />
          ) : (
            <Plus size={20} color={colors.textPrimary} />
          )}
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              backgroundColor: colors.backgroundSecondary,
            },
            isUploading && { opacity: 0.5 },
          ]}
          value={text}
          onChangeText={setText}
          placeholder={
            isClosed ? "このトークは終了しました" : "メッセージを入力..."
          }
          multiline
          onFocus={() => setIsOpenPanel(false)}
          editable={!isUploading && !isClosed}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colors.primary },
            (!text.trim() || sending || isUploading) && {
              backgroundColor: colors.primary,
              opacity: 0.2,
            },
          ]}
          onPress={sendMessage}
          disabled={!text.trim() || sending || isUploading || isClosed}
        >
          {sending ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Ionicons name="send" size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
      {isOpenPanel && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {panel.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: "23%",
                  aspectRatio: 1,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  opacity: item.disabled ? 0.3 : 1,
                }}
                onPress={item.onPress}
                disabled={item.disabled}
              >
                <item.icon
                  size={24}
                  color={item.iconColor || colors.textPrimary}
                />
                <Text
                  style={{
                    ...typography.heading5,
                    color: item.disabled
                      ? colors.textSecondary
                      : colors.textPrimary,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageInputComponent;
