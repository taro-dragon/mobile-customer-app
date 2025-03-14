import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import Logo from "@/components/common/Logo";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { User } from "@/types/firestore_schema/users";
import { useStore } from "@/hooks/useStore";
const Index = () => {
  const { colors, typography } = useTheme();
  const { setUser } = useStore();
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 12,
        }}
      >
        <Logo width={120} color={colors.white} />
      </View>
      <View
        style={{
          gap: 12,
          width: "100%",
          backgroundColor: colors.backgroundPrimary,
          padding: 16,
          paddingVertical: 24,
          borderRadius: 16,
        }}
      >
        <View
          style={{
            gap: 16,
          }}
        >
          <Text
            style={{
              ...typography.title2,
              color: colors.textPrimary,
              textAlign: "center",
            }}
          >
            サービス利用規約
          </Text>
          <View>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              kawaraを
            </Text>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              ご利用いただくには利用規約に
            </Text>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              同意していただく必要があります。
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              「初めての方はこちら」、「ログイン」
            </Text>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              を押した場合
            </Text>
            <Text
              style={{
                ...typography.body2,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              「利用規約」に同意したものとみなします。
            </Text>
          </View>
          <Button
            color={colors.textSecondary}
            label="利用規約"
            onPress={() => router.push("/(unauth)/login")}
            fullWidth
            isBorder
          />
        </View>
        <Divider />
        <View style={{ gap: 8 }}>
          <Button
            color={colors.primary}
            label="初めての方はこちら"
            onPress={() => router.push("/(unauth)/onBoading")}
            fullWidth
          />
          <Button
            color={colors.primary}
            label="デバッグよう機能"
            onPress={async () => {
              const user = await auth().signInAnonymously();
              const userId = user.user?.uid;
              await firestore().collection("users").doc(userId).set({
                id: userId,
                isAnonymous: true,
                createdAt: firestore.Timestamp.now(),
                updatedAt: firestore.Timestamp.now(),
              });
              await firestore()
                .collection("users")
                .doc(userId)
                .onSnapshot((snapshot) => {
                  const firebaseUser = snapshot.data() as User;
                  firebaseUser.id = userId;

                  setUser(firebaseUser);
                });
            }}
            fullWidth
          />
          <Button
            color={colors.primary}
            label="ログイン"
            onPress={() => router.push("/(unauth)/login")}
            fullWidth
            isBorder
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
