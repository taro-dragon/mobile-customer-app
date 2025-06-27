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
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronLeft } from "lucide-react-native";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import MessageItem from "@/components/staff/talks/MessageItem";
import TalkHeader from "@/components/staff/talks/TalkHeader";
import MessageInput from "@/components/staff/talks/MessageInput";
import Toast from "react-native-toast-message";

const TalkDetail = () => {
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks, staff } = useStore();
  const talk = staffTalks.find((talk) => talk.id === talkId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!talkId) return;
    const changeReadMessages = async () => {
      const messagesRef = await firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .where("read", "==", false)
        .where("senderType", "==", "user")
        .get();
      messagesRef.forEach((doc) => {
        doc.ref.update({ read: true });
      });
    };
    changeReadMessages();
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
    if (!text.trim() || !staff || !talkId) return;

    setSending(true);
    try {
      const messageData: Omit<Message, "id"> = {
        talkId,
        senderId: staff.id,
        senderType: "staff",
        text: text.trim(),
        read: false,
        createdAt: firestore.Timestamp.now(),
      };

      await firestore().runTransaction(async (transaction) => {
        const messageRef = await firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .doc();
        const talkRef = await firestore().collection("talks").doc(talkId);
        await transaction.set(messageRef, messageData);
        await transaction.update(talkRef, {
          lastMessage: text.trim(),
          lastMessageAt: firestore.Timestamp.now(),
        });
      });
      setText("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "メッセージの送信に失敗しました",
      });
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
    <>
      <Stack.Screen
        options={{
          title: `${talk.user.familyName} ${talk.user.givenName}`,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <TalkHeader talk={talk} />
        <KeyboardAvoidingView
          style={{
            ...styles.container,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <MessageItem message={item} talk={talk} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContainer}
            inverted
          />

          <MessageInput
            sendMessage={sendMessage}
            sending={sending}
            text={text}
            setText={setText}
            isOpenPanel={isOpenPanel}
            setIsOpenPanel={setIsOpenPanel}
            talk={talk}
          />
        </KeyboardAvoidingView>
        <SafeAreaBottom color={colors.backgroundPrimary} />
      </View>
    </>
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
  headerMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 8,
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
