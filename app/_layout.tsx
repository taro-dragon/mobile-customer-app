import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useStore } from "@/hooks/useStore";
import useAuthInitialization from "@/hooks/useAuthInitialization";

export default function Layout() {
  const router = useRouter();
  const { customer, client, isAuthLoading } = useStore();
  useAuthInitialization();

  useEffect(() => {
    if (!isAuthLoading) {
      if (!customer && !client) {
        router.replace("/login");
      } else if (customer) {
        router.replace("/(customer)");
      } else if (client) {
        router.replace("/(client)");
      }
    }
  }, [customer, client, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </SafeAreaView>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { color: "#fff", fontSize: 20 },
  content: { flex: 1 },
  footer: {
    height: 50,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: { color: "#333", fontSize: 16 },
});
