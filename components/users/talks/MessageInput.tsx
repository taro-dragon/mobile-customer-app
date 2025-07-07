import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Plus, X } from "lucide-react-native";
import { TalkWithAffiliate } from "@/types/extendType/TalkWithAffiliate";
import useUserTalkPanel from "@/hooks/user/useUserTalkPanel";
import ConfirmModal from "@/components/common/ConfirmModal";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  talk: TalkWithAffiliate;
  disabled?: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
  isOpenPanel,
  setIsOpenPanel,
  talk,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const {
    panel,
    isUploading,
    uploadProgress,
    isProcessing,
    showEndTalkModal,
    handleConfirmEndTalk,
    handleCancelEndTalk,
  } = useUserTalkPanel(talk);
  const isClosed = talk.status === "closed";

  const isInputDisabled = disabled || isUploading || isProcessing || isClosed;

  return (
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
      {isProcessing && (
        <View style={{ alignItems: "center", padding: 8 }}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text
            style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4 }}
          >
            処理中...
          </Text>
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
            (isUploading || isProcessing || disabled) && { opacity: 0.5 },
          ]}
          onPress={() => {
            if (!isInputDisabled) setIsOpenPanel(!isOpenPanel);
          }}
          disabled={isInputDisabled}
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
            isInputDisabled && { opacity: 0.5 },
          ]}
          value={text}
          onChangeText={setText}
          placeholder={
            isClosed ? "この問い合わせは終了しました" : "メッセージを入力..."
          }
          multiline
          onFocus={() => setIsOpenPanel(false)}
          editable={!isInputDisabled}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colors.primary },
            (!text.trim() || sending || isInputDisabled) && {
              backgroundColor: colors.primary,
              opacity: 0.2,
            },
          ]}
          onPress={sendMessage}
          disabled={!text.trim() || sending || isInputDisabled}
        >
          {sending ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Ionicons name="send" size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
      {isOpenPanel && !isInputDisabled && (
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
                  opacity: item.disabled ? 0.5 : 1,
                }}
                onPress={item.onPress}
                disabled={item.disabled}
              >
                <item.icon
                  size={24}
                  color={
                    item.disabled
                      ? colors.textSecondary
                      : item.iconColor || colors.textPrimary
                  }
                />
                <Text
                  style={{
                    fontSize: 12,
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

      {/* 確認モーダル */}
      <ConfirmModal
        visible={showEndTalkModal}
        title="問い合わせを終了しますか？"
        message="この操作を実行すると、この問い合わせは終了し、新しいメッセージを送信できなくなります。この操作は取り消すことができません。"
        confirmText="終了する"
        cancelText="キャンセル"
        onConfirm={handleConfirmEndTalk}
        onCancel={handleCancelEndTalk}
        confirmButtonColor="#ef4444"
      />
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

export default MessageInput;
