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
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Message } from "@/types/firestore_schema/messages";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronLeft } from "lucide-react-native";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import MessageItem from "@/components/staff/talks/MessageItem/MessageItem";
import TalkHeader from "@/components/staff/talks/TalkHeader";
import MessageInput from "@/components/staff/talks/MessageInput";
import Toast from "react-native-toast-message";

const MESSAGES_PER_PAGE = 30; // 1ページあたりのメッセージ数

const TalkDetail = () => {
  const { talkId } = useLocalSearchParams<{ talkId: string }>();
  const { staffTalks, staff } = useStore();
  const talk = staffTalks.find((talk) => talk.id === talkId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const router = useRouter();

  // 最新のメッセージのタイムスタンプを追跡
  const [latestMessageTimestamp, setLatestMessageTimestamp] =
    useState<FirebaseFirestoreTypes.Timestamp | null>(null);

  useEffect(() => {
    if (!talkId) return;

    const loadInitialMessages = async () => {
      try {
        setLoading(true);

        // 最新のメッセージを取得
        const messagesRef = firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .orderBy("createdAt", "desc")
          .limit(MESSAGES_PER_PAGE);

        const snapshot = await messagesRef.get();
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        setMessages(messagesData);

        // 最新メッセージのタイムスタンプを保存
        if (messagesData.length > 0) {
          setLatestMessageTimestamp(messagesData[0].createdAt);
        }

        // さらに古いメッセージがあるかチェック
        if (snapshot.docs.length < MESSAGES_PER_PAGE) {
          setHasMoreMessages(false);
        }

        // 未読メッセージを既読に更新
        const unreadMessagesRef = await firestore()
          .collection("talks")
          .doc(talkId)
          .collection("messages")
          .where("read", "==", false)
          .where("senderType", "==", "user")
          .get();

        unreadMessagesRef.forEach((doc) => {
          doc.ref.update({ read: true });
        });
      } catch (error) {
        console.error("Error loading initial messages:", error);
        Toast.show({
          type: "error",
          text1: "メッセージの読み込みに失敗しました",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessages();
  }, [talkId]);

  // リアルタイムで新メッセージを監視
  useEffect(() => {
    if (!talkId || !latestMessageTimestamp) return;

    const unsubscribe = firestore()
      .collection("talks")
      .doc(talkId)
      .collection("messages")
      .where("createdAt", ">", latestMessageTimestamp)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];

        if (newMessages.length > 0) {
          setMessages((prevMessages) => {
            // 新しいメッセージを既存のメッセージに追加
            const combinedMessages = [...newMessages, ...prevMessages];
            // 重複を除去（IDで判定）
            const uniqueMessages = combinedMessages.filter(
              (message, index, self) =>
                index === self.findIndex((m) => m.id === message.id)
            );
            return uniqueMessages;
          });

          // 最新のタイムスタンプを更新
          const latestTimestamp = newMessages.reduce((latest, message) => {
            const messageTimestamp =
              message.createdAt as FirebaseFirestoreTypes.Timestamp;
            const latestTimestamp = latest as FirebaseFirestoreTypes.Timestamp;
            return messageTimestamp.toMillis() > latestTimestamp.toMillis()
              ? messageTimestamp
              : latestTimestamp;
          }, newMessages[0].createdAt as FirebaseFirestoreTypes.Timestamp);
          setLatestMessageTimestamp(latestTimestamp);
        }
      });

    return () => unsubscribe();
  }, [talkId, latestMessageTimestamp]);

  const loadMoreMessages = async () => {
    if (!talkId || loadingMore || !hasMoreMessages || messages.length === 0)
      return;

    try {
      setLoadingMore(true);

      const oldestMessage = messages[messages.length - 1];
      const messagesRef = firestore()
        .collection("talks")
        .doc(talkId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .startAfter(oldestMessage.createdAt)
        .limit(MESSAGES_PER_PAGE);

      const snapshot = await messagesRef.get();
      const olderMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      if (olderMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...olderMessages]);
      }

      // さらに古いメッセージがない場合はフラグを更新
      if (snapshot.docs.length < MESSAGES_PER_PAGE) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
      Toast.show({
        type: "error",
        text1: "メッセージの読み込みに失敗しました",
      });
    } finally {
      setLoadingMore(false);
    }
  };

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

  const renderLoadMoreButton = () => {
    if (!hasMoreMessages || loadingMore) return null;

    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={loadMoreMessages}
        disabled={loadingMore}
      >
        {loadingMore ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text style={[styles.loadMoreText, { color: colors.primary }]}>
            さらに古いメッセージを読み込む
          </Text>
        )}
      </TouchableOpacity>
    );
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
            ListFooterComponent={renderLoadMoreButton}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.1}
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
  loadMoreButton: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default TalkDetail;
