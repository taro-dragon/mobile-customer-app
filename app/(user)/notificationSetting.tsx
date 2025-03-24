import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { StyleSheet, Switch } from "react-native";
import { Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import Divider from "@/components/common/Divider";

type PushSettings = {
  isMessage: boolean;
  isBid: boolean;
  isBulkStatusChange: boolean;
};

const NotificationSetting = () => {
  const { user, editUser } = useStore();
  const { colors, typography } = useTheme();

  const [localPushSettings, setLocalPushSettings] = useState<
    PushSettings | undefined
  >(user?.pushSettings);

  useEffect(() => {
    if (user?.pushSettings) {
      setLocalPushSettings(user.pushSettings);
    }
  }, [user?.pushSettings]);

  const setPushSetting = async (value: boolean, name: keyof PushSettings) => {
    if (!user || !localPushSettings) return;

    // ローカルステートを先に更新（楽観的UI更新）
    const updatedSettings = {
      ...localPushSettings,
      [name]: value,
    };

    setLocalPushSettings(updatedSettings);

    // Zustandのストアも直接更新して即時反映
    editUser({
      ...user,
      pushSettings: updatedSettings,
    });

    // Firestoreの更新はバックグラウンドで行う
    try {
      await firestore().collection("users").doc(user.id).update({
        pushSettings: updatedSettings,
      });
    } catch (error) {
      console.error("Failed to update push settings:", error);
      setLocalPushSettings(user.pushSettings);
      editUser({
        ...user,
        pushSettings: user.pushSettings,
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    content: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.backgroundPrimary,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  if (!user?.expoPushToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          通知設定がありません
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}>
      <View style={styles.content}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          メッセージ
        </Text>
        <Switch
          value={localPushSettings?.isMessage}
          onValueChange={(value) => {
            setPushSetting(value, "isMessage");
          }}
        />
      </View>
      <Divider />

      <View style={styles.content}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          入札
        </Text>
        <Switch
          value={localPushSettings?.isBid}
          onValueChange={(value) => {
            setPushSetting(value, "isBid");
          }}
        />
      </View>
      <Divider />

      <View style={styles.content}>
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          査定ステータス更新時
        </Text>
        <Switch
          value={localPushSettings?.isBulkStatusChange}
          onValueChange={(value) => {
            setPushSetting(value, "isBulkStatusChange");
          }}
        />
      </View>
    </View>
  );
};

export default NotificationSetting;
