import { View, Text } from "react-native";
import { useState } from "react";
import STInput from "../src/ui/atoms/STInput";
import STButton from "../src/ui/atoms/STButton";
import { registerUser } from "../src/api/auth";
import { Link, useRouter } from "expo-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleRegister() {
    try {
      await registerUser({ username, email, password });
      router.push("/login");
    } catch (e: any) {
      console.log(e.response?.data || e.message);
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Registrati</Text>

      <STInput placeholder="Username" value={username} onChangeText={setUsername} />
      <STInput placeholder="Email" value={email} onChangeText={setEmail} />
      <STInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <STButton title="Crea account" onPress={handleRegister} />
      <Link href="/login">Hai già un account?</Link>
    </View>
  );
}
