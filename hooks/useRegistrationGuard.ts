import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";

export function useRegistrationGuard() {
  const { user } = useStore();
  const router = useRouter();

  const wrapWithGuard = <T extends (...args: any[]) => any>(action: T): T => {
    return ((...args: any[]) => {
      if (user?.isAnonymous) {
        router.push("/(user)/registration");
      } else {
        return action(...args);
      }
    }) as T;
  };

  return wrapWithGuard;
}
