import { View, Text } from "react-native";
import { Link } from "expo-router";
import STFadeInDown from "../src/ui/atoms/STFadeInDown";
import STButton from "../src/ui/atoms/STButton";
import STBrand from "../src/ui/atoms/STBrand";
export default function Index() {
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
      <STFadeInDown duration={400} style={{ marginBottom: 30 }}>
        {/* Brand Logo + Name */}
        <STBrand size={40} />

        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            opacity: 0.7,
            textAlign: "center",
            color: "#6D5E56",
          }}
        >
          Il tuo assistente di studio personalizzato
        </Text>
      </STFadeInDown>

      <STFadeInDown duration={400} delay={400} style={{ width: "100%", marginBottom: 10 }}>
        <Link href="/login" asChild>
          <STButton
            title="Vai al Login"
            type="primary"
          />
        </Link>
      </STFadeInDown>

      <STFadeInDown duration={400} delay={800} style={{ width: "100%", marginBottom: 10 }}>
       <Link href="/register" asChild>
          <STButton
            title="Registrati"
            type="outline"
          />
        </Link>
      </STFadeInDown>
    </View>
  );
}
