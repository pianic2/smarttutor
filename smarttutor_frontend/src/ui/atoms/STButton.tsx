import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import { LucideIcon } from "lucide-react-native";
import { COLOR_MAP } from "../../utils/colors";

type ButtonType = "primary" | "secondary" | "outline";

interface STButtonProps {
  title: string;
  onPress?: () => void;
  type?: ButtonType;
  loading?: boolean;
  icon?: LucideIcon;
  disabled?: boolean;

  // override colori
  bgColor?: string;
  textColor?: string;
  borderColor?: string;

  // futuro: light/dark switching
  mode?: "light" | "dark";
}

export default function STButton({
  title,
  onPress,
  type = "primary",
  loading = false,
  icon: Icon,
  disabled = false,
  bgColor,
  textColor,
  borderColor,
  mode = "light", // default per ora, in futuro userai dark mode dinamica
}: STButtonProps) {
  const palette = COLOR_MAP[mode][type];

  const finalBg = bgColor || palette.bg;
  const finalText = textColor || palette.text;
  const finalBorder = borderColor || palette.border;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={Platform.OS === "ios" ? 0.5 : 1}
      style={[
        styles.btn,
        {
          backgroundColor: finalBg,
          borderColor: finalBorder,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {Icon && !loading && (
          <Icon
            size={20}
            color={finalText}
            style={{ marginRight: 8 }}
          />
        )}

        {loading ? (
          <ActivityIndicator size="small" color={finalText} />
        ) : (
          <Text style={[styles.label, { color: finalText }]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
});
