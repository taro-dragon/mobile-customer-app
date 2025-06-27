import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Plus, X } from "lucide-react-native";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  sending: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
  text,
  setText,
  sendMessage,
  sending,
}) => {
  const { colors } = useTheme();
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: colors.backgroundPrimary,
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
