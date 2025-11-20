import { Stack } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/AuthContext";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

function RootLayoutNav() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="courses/index" />
          <Stack.Screen name="courses/[id]/notes" />
        </>
      ) : (
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="terms" />
        </>
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
