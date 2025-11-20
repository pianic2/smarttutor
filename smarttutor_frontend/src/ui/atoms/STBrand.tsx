import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SmartTutorLogo from "../../assets/SmartTutorLogo.svg"; // il tuo svg

interface Props {
  size?: number;
  color?: string;
}

export default function STBrand({ size = 32, color = "#3A2F2A" }: Props) {
  return (
    <View style={[styles.container]}>
      {/* Logo SVG che sostituisce la S */}
      <SmartTutorLogo width={size} height={size} />

      {/* “martTutor” in testo */}
      <Text style={[styles.text, { fontSize: size * 0.90, color }]}>
        SmartTutor
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "800",
    marginLeft: 4,
    letterSpacing: 0.5,
  },
});
