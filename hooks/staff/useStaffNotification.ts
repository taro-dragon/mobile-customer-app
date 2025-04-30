import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

const useStaffNotification = () => {
  const router = useRouter();

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      // Check current permission status
      const { status } = await Notifications.getPermissionsAsync();
      if (status === Notifications.PermissionStatus.GRANTED) {
        // User has already granted permission, register for push token
        const token = await registerForPushNotificationsAsync();
        if (token !== undefined) {
          // Save token to Firestore
          if (token) {
            await savePushTokenToFirestore(token);
          }
        }
      } else if (status === Notifications.PermissionStatus.UNDETERMINED) {
        // Permission hasn't been asked yet, redirect to notification initialization
        router.push("/(staff)/notificationInitialize");
      }
      // If denied, do nothing (could show UI to educate user about benefits)
    } catch (error) {
      console.error("Error checking notification permissions:", error);
    }
  };

  const registerForPushNotificationsAsync = async (): Promise<
    string | null | undefined
  > => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== Notifications.PermissionStatus.GRANTED) {
        return null;
      }

      const { data } = await Notifications.getExpoPushTokenAsync();

      token = data;
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }

    return token;
  };

  const savePushTokenToFirestore = async (token: string) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        return;
      }

      const userId = currentUser.uid;

      await firestore().collection("staffs").doc(userId).update({
        expoPushToken: token,
      });
    } catch (error) {
      console.error("Error saving push token to Firestore:", error);
    }
  };
};

export default useStaffNotification;
