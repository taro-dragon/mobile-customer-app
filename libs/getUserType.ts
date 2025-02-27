import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { isStaffUser } from "./isStaffUser";

export function getUserType(
  user: FirebaseAuthTypes.User
): "staff" | "customer" {
  return isStaffUser(user) ? "staff" : "customer";
}
