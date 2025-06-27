import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Plus } from "lucide-react-native";

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
  return (
    <View
      style={{
        ...styles.inputContainer,
        backgroundColor: colors.backgroundPrimary,
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
      >
        <Plus size={20} color={colors.white} />
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
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },
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
