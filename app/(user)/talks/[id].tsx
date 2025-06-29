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
import { Car, ChevronLeft, File, Store } from "lucide-react-native";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Divider from "@/components/common/Divider";

const TalkDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userTalks, user } = useStore();
  const talk = userTalks.find((talk) => talk.id === id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { colors, typography } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const changeReadMessages = async () => {
      const messagesRef = await firestore()
        .collection("talks")
        .doc(id)
        .collection("messages")
        .where("read", "==", false)
        .where("senderType", "==", "staff")
        .get();
      messagesRef.forEach((doc) => {
        doc.ref.update({ read: true });
      });
    };
    changeReadMessages();
    const unsubscribe = firestore()
      .collection("talks")
      .doc(id)
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
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim() || !user || !id) return;

    setSending(true);
    try {
      const messageData: Omit<Message, "id"> = {
        talkId: id,
        senderId: user.id,
        senderType: "user",
        text: text.trim(),
        read: false,
        createdAt: firestore.Timestamp.now(),
      };

      await firestore().runTransaction(async (transaction) => {
        const messageRef = await firestore()
          .collection("talks")
          .doc(id)
          .collection("messages")
          .doc();
        const talkRef = await firestore().collection("talks").doc(id);
        await transaction.set(messageRef, messageData);
        await transaction.update(talkRef, {
          lastMessage: text.trim(),
          lastMessageAt: firestore.Timestamp.now(),
        });
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
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/shops/${talk.affiliateStoreId}`)}
          style={[
            styles.headerMenu,
            { borderRightWidth: 1, borderColor: colors.borderPrimary },
          ]}
        >
          <Store size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            店舗情報
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/cars/${talk.carId}`)}
          style={[
            styles.headerMenu,
            { borderRightWidth: 1, borderColor: colors.borderPrimary },
          ]}
        >
          <Car size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            車両情報
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push(
              talk.sourceType === "buyOffer"
                ? `/offers/${talk.sourceId}`
                : `/bids/${talk.sourceId}`
            )
          }
          style={styles.headerMenu}
        >
          <File size={24} color={colors.textPrimary} />
          <Text style={{ ...typography.title5, color: colors.textPrimary }}>
            {talk.sourceType === "buyOffer" ? "オファー情報" : "一括査定情報"}
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
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
