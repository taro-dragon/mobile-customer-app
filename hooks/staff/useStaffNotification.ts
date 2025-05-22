import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
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
      if (!Device.isDevice) {
        console.log(
          "Push notifications are only supported on physical devices"
        );
        return;
      }

      // Check current permission status
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus === "granted") {
        // User has granted permission, register for push token
        const token = await registerForPushNotificationsAsync();
        if (token) {
          await savePushTokenToFirestore(token);
        }
      } else if (finalStatus === "undetermined") {
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
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (error) {
      // Handle iOS aps-environment entitlement error
      console.warn(error);
      if (
        Platform.OS === "ios" &&
        error instanceof Error &&
        error.message.includes("aps-environment")
      ) {
        console.log(
          "Push notifications are not configured for iOS. Please set up push notifications in your Apple Developer account and Xcode."
        );
        return null;
      }
      console.error("Error registering for push notifications:", error);
      return null;
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
