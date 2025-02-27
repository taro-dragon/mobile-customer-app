import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function isStaffUser(user: FirebaseAuthTypes.User): boolean {
  return user.providerData.some(
    (provider) => provider.providerId === "password"
  );
}
