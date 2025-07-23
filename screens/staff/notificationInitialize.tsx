import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { SafeAreaView, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Platform } from "react-native";

const NotificationInitializeScreen = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    try {
      setIsLoading(true);

      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === Notifications.PermissionStatus.GRANTED) {
        // Permission granted, register token and save to Firestore
        let token;

        // Set up Android notification channel if needed
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        // Get the push token
        const { data } = await Notifications.getExpoPushTokenAsync();
        token = data;

        // Save token to Firestore
        if (token) {
          const currentUser = auth().currentUser;
          if (currentUser) {
            const userId = currentUser.uid;
            await firestore()
              .collection("users")
              .doc(userId)
              .update({
                expoPushToken: token,
                pushSettings: {
                  isMessage: true,
                  isBid: true,
                  isBulkStatusChange: true,
                },
              });
          }
        }
      }
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
    } finally {
      setIsLoading(false);
      router.back();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View style={{ flex: 1, padding: 16, justifyContent: "space-between" }}>
        <View style={{ gap: 16 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading1 }}>
            通知設定
          </Text>
          <View
            style={{
              backgroundColor: colors.backgroundSecondary,
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <Bell size={24} color={colors.primary} />
          </View>
          <Text style={{ color: colors.textSecondary, ...typography.body1 }}>
            一括査定状況の通知や、加盟店とのやり取りの際に通知を受け取ることができます。許可することをお勧めします
          </Text>
        </View>
        <Button
          label="通知設定をする"
          onPress={onPress}
          color={colors.primary}
          isLoading={isLoading}
        />
      </View>
      <SafeAreaView />
    </View>
  );
};

export default NotificationInitializeScreen;
