import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLOR_MAP } from "../../utils/colors";

interface STHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "center" | "right";
  color?: string;
  mode?: "light" | "dark";
  style?: any;
}

export default function STHeading({
  children,
  level = 1,
  align = "left",
  color,
  mode = "light",
  style,
  ...props
}: STHeadingProps) {
  const palette = COLOR_MAP[mode];

  const sizes = {
    1: 42,
    2: 32,
    3: 24,
    4: 20,
    5: 18,
    6: 16,
  };

  const weights = {
    1: "700",
    2: "700",
    3: "400",
    4: "400",
    5: "400",
    6: "400",
  };

  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: sizes[level],
          lineHeight: sizes[level],
          fontWeight: weights[level] as any,
          textAlign: align,
          color: color || palette.textPrimary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
  },
});
