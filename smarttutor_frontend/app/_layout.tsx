// app/_layout.tsx
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

function AuthGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // non loggato ma vuole andare in (app) → vai al login
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // loggato ma in (auth) → manda in area app
      router.replace("/(app)");
    }
  }, [segments, user, loading]);

  if (loading) {
    // schermata di loading globale
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se tutto ok, lascia che expo-router gestisca i layout interni
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  );
}
