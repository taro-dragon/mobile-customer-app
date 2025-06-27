import React, { useState } from "react";
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
import {
  staffCarInquiryTalkPanel,
  staffRequestApprovalTalkPanel,
} from "@/constants/staffTalkPanel";

type MessageInputProps = {
  sourceType: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
  isOpenPanel: boolean;
  setIsOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageInput: React.FC<MessageInputProps> = ({
  sourceType,
  text,
  setText,
  sendMessage,
  sending,
  isOpenPanel,
  setIsOpenPanel,
}) => {
  const { colors } = useTheme();
  const targetPanel =
    sourceType === "car_inquiry"
      ? staffCarInquiryTalkPanel
      : staffRequestApprovalTalkPanel;
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: colors.backgroundPrimary,
        gap: 12,
      }}
    >
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
          ]}
          onPress={() => setIsOpenPanel(!isOpenPanel)}
        >
          {isOpenPanel ? (
            <X size={20} color={colors.white} />
          ) : (
            <Plus size={20} color={colors.white} />
          )}
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              backgroundColor: colors.backgroundSecondary,
            },
          ]}
          value={text}
          onChangeText={setText}
          placeholder="メッセージを入力..."
          multiline
          onFocus={() => setIsOpenPanel(false)}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colors.primary },
            !text.trim() && {
              backgroundColor: colors.primary,
              opacity: 0.2,
            },
          ]}
          onPress={sendMessage}
          disabled={!text.trim() || sending}
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
          {targetPanel.map((item, index) => {
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
                }}
              >
                <item.icon size={24} color={colors.textPrimary} />
                <Text style={{ fontSize: 12, color: colors.textPrimary }}>
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

export default MessageInput;
