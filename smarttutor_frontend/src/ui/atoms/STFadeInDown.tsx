import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle | ViewStyle[];
}

export default function STFadeInDown({
  children,
  duration = 800,
  delay = 0,
  style,
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(duration).delay(delay)}
      style={[styles.container, style]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
