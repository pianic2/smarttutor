import { useState } from "react";
import { View, Text } from "react-native";
import STInput from "../src/ui/atoms/STInput";
import STButton from "../src/ui/atoms/STButton";
import STTitle from "../src/ui/atoms/STTitle";
import { login } from "../src/api/auth";
import { saveTokenPair } from "../src/utils/storage";
import { useAuth } from "../src/hooks/useAuth";
import { Link } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { refreshUser } = useAuth();

  async function handleLogin() {
    try {
      const tokens = await login(username, password);
      await saveTokenPair(tokens.access, tokens.refresh);
      await refreshUser();
    } catch (e: any) {
      console.log(e.response?.data || e.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Login</Text>
      <STTitle size="xl">Benvenuto in SmartTutor</STTitle>

      <STInput placeholder="Username" value={username} onChangeText={setUsername} />
      <STInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <STButton title="Accedi" onPress={handleLogin} />

      <Link href="/register">Non hai un account? Registrati</Link>
    </View>
  );
}
