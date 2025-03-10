import { useStore } from "@/hooks/useStore";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import MessageItem from "@/components/talks/MessageItem";
import { ChevronLeft } from "lucide-react-native";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";

const TalkDetail = () => {
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { talks, user } = useStore();
  const talk = talks.find((talk) => talk.id === talkId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!talkId) return;
    const unsubscribe = firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(messagesData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [talkId]);

  const sendMessage = async () => {
    if (!text.trim() || !user || !talkId) return;

    setSending(true);
    try {
      const messageData: Omit<Message, "id"> = {
        talkId,
        senderId: user.id,
        senderType: "user",
        text: text.trim(),
        read: false,
        createdAt: firestore.Timestamp.now(),
      };

      await firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .add(messageData);

      await firestore().collection("talks").doc(talkId).update({
        lastMessage: text.trim(),
        lastMessageAt: firestore.Timestamp.now(),
      });

      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  if (!talk) {
    return (
      <View style={styles.centerContainer}>
        <Text>トークが見つかりません</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          ...styles.container,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <Stack.Screen
          options={{
            title: talk.affiliateStore?.shopName || "チャット",
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ChevronLeft size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} talk={talk} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />

        <View
          style={{
            ...styles.inputContainer,
            backgroundColor: colors.backgroundPrimary,
          }}
        >
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
              !text.trim() && { backgroundColor: colors.primary, opacity: 0.2 },
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
      </KeyboardAvoidingView>
      <SafeAreaBottom color={colors.backgroundPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messagesContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TalkDetail;
