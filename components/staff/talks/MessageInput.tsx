import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Plus, X } from "lucide-react-native";
import { TalkWithUser } from "@/types/extendType/TalkWithUser";
import useStaffTalkPanel from "@/hooks/staff/useStaffTalkPanel";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  talk: TalkWithUser;
};

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
  isOpenPanel,
  setIsOpenPanel,
  talk,
}) => {
  const { colors, typography } = useTheme();
  const isClosed = talk.status === "closed";
  const { panel, isUploading, uploadProgress, isShowModal } = useStaffTalkPanel(
    talk,
    setIsOpenPanel
  );

  return (
    <>
      <View
        style={{
          padding: 8,
          backgroundColor: colors.backgroundPrimary,
          gap: 12,
        }}
      >
        {/* アップロード進捗バー */}
        {isUploading && (
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
      <Modal visible={isShowModal} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000080",
          }}
        >
          <View
            style={{
              backgroundColor: "#00000080",
              padding: 20,
              borderRadius: 10,
              gap: 8,
            }}
          >
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
              送信中...
            </Text>
          </View>
        </View>
      </Modal>
    </>
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

export default MessageInput;
