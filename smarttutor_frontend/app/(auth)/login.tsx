// app/(auth)/login.tsx
import { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import STFadeInDown from "../../src/ui/atoms/STFadeInDown";
import STInput from "../../src/ui/atoms/STInput";
import STButton from "../../src/ui/atoms/STButton";
import STHeader from "../../src/ui/atoms/STHeader";
import { login } from "../../src/api/auth";
import { saveTokenPair } from "../../src/utils/storage";
import { useAuth } from "../../src/hooks/useAuth";
import { Link } from "expo-router";
import { COLOR_MAP } from "../../src/utils/colors";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { refreshUser } = useAuth();

  async function handleLogin() {
    if (loading) return;
    setError(null);

    if (!username || !password) {
      setError("Inserisci username e password.");
      return;
    }

    try {
      setLoading(true);

      const tokens = await login(username, password);
      await saveTokenPair(tokens.access, tokens.refresh);
      await refreshUser(); // Cambia lo user nel context → AuthGuard fa redirect
    } catch (e: any) {
      console.log("LOGIN ERROR:", e.response?.data || e.message);

      const msg =
        e.response?.data?.detail ||
        e.response?.data?.non_field_errors?.[0] ||
        e.response?.data?.error ||
        "Credenziali non valide";

      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F1",
        paddingHorizontal: 20,
      }}
    >
      <STFadeInDown duration={400} delay={0} style={{ width: "100%" }}>
        <STHeader level={2} color={COLOR_MAP.light.primary.bg}>
          Accedi al tuo account
        </STHeader>
      </STFadeInDown>

      {error && (
        <STFadeInDown duration={300} delay={200} style={{ width: "100%" }}>
          <Text
            style={{
              color: "#E16458",
              marginBottom: 10,
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            {error}
          </Text>
        </STFadeInDown>
      )}

      <STFadeInDown duration={400} delay={400} style={{ width: "100%" }}>
        <STInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </STFadeInDown>

      <STFadeInDown duration={400} delay={800} style={{ width: "100%" }}>
        <STInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </STFadeInDown>

      <STFadeInDown
        duration={400}
        delay={1200}
        style={{ width: "100%", marginBottom: 10 }}
      >
        <STButton
          title={loading ? "Attendere..." : "Accedi"}
          onPress={handleLogin}
          disabled={loading}
        />
      </STFadeInDown>

      {loading && (
        <ActivityIndicator
          size="small"
          color={COLOR_MAP.light.primary.bg}
          style={{ marginBottom: 10 }}
        />
      )}

      <STFadeInDown duration={400} delay={1600} style={{ width: "100%" }}>
        <Link href="/(auth)/register">
          Non hai un account?
          <Text style={{ color: COLOR_MAP.light.primary.bg }}> Registrati</Text>
        </Link>
      </STFadeInDown>
    </View>
  );
}
