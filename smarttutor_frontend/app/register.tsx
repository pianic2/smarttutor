import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import STFadeInDown from "../src/ui/atoms/STFadeInDown";
import STInput from "../src/ui/atoms/STInput";
import STButton from "../src/ui/atoms/STButton";
import STHeader from "../src/ui/atoms/STHeader";
import { registerUser } from "../src/api/auth";
import { Link, useRouter } from "expo-router";
import { COLOR_MAP } from "../src/utils/colors";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);


  async function handleRegister() {
    try {
      await registerUser({ username, email, password });
      router.push("/login");
    } catch (e: any) {
      console.log(e.response?.data || e.message);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8F1", // warm palette
        paddingHorizontal: 20,
      }}
    >
      <STFadeInDown duration={400} delay={0} style={{ width: "100%" }}>
        <STHeader level={2}><STHeader level={2} color={COLOR_MAP["light"]["primary"]["bg"]}>Registrati</STHeader> adesso </STHeader>
      </STFadeInDown>


      <STFadeInDown duration={400} delay={400} style={{ width: "100%" }}>
        <STInput placeholder="Username" value={username} onChangeText={setUsername} />
      </STFadeInDown>

      <STFadeInDown duration={400} delay={800} style={{ width: "100%" }}>
        <STInput placeholder="email" value={email} onChangeText={setEmail} />
      </STFadeInDown>

      <STFadeInDown duration={400} delay={1200} style={{ width: "100%" }}>
        <STInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </STFadeInDown>

      {/* Accetta Termini & Condizioni */}
      <STFadeInDown duration={400} delay={1400} style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {/* Checkbox */}
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: acceptedTerms ? "#FF8A3D" : "#EADFD6",   // warm palette
              backgroundColor: acceptedTerms ? "#FF8A3D" : "transparent",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            {acceptedTerms && (
              <Text style={{ color: "white", fontWeight: "800", fontSize: 14 }}>✓</Text>
            )}
          </View>

          {/* Testo termini */}
          <Text style={{ color: "#3A2F2A", fontSize: 15 }}>
            Accetto i{" "}
            <Link href="/terms" style={{ textDecorationLine: "underline", color: COLOR_MAP["light"]["primary"]["bg"] }}>
              Termini e Condizioni
            </Link>
          </Text>

        </TouchableOpacity>
      </STFadeInDown>

      <STFadeInDown duration={400} delay={1600} style={{ width: "100%", marginBottom: 10 }}>
        <STButton title="Crea account" onPress={handleRegister} />
      </STFadeInDown>

      <STFadeInDown duration={400} delay={2000} style={{ width: "100%" }}>
        <Link href="/login">Hai già un account? <Text style={{ color: COLOR_MAP["light"]["primary"]["bg"] }}>Accedi</Text></Link>
      </STFadeInDown>

    </View>
  );
}
