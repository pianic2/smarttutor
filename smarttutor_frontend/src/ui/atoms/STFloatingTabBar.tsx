// src/components/FloatingTabBar.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Platform,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Tabs, usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";

export default function FloatingTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Animazione (0 = visibile, 1 = nascosta)
  const hideAnim = useRef(new Animated.Value(0)).current;

  // Hooks: chiamerai hideTabBar(true/false) da qualunque screen
  useEffect(() => {
    global.hideTabBar = (hidden: boolean) => {
      Animated.timing(hideAnim, {
        toValue: hidden ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  const tabs = [
    {
      name: "Home",
      route: "/(app)/",
      icon: "home-outline",
      iconActive: "home",
    },
    {
      name: "Corsi",
      route: "/(app)/courses",
      icon: "book-outline",
      iconActive: "book",
    },
    {
      name: "Profilo",
      route: "/(app)/profile",
      icon: "person-outline",
      iconActive: "person",
    },
  ];

  const translateY = hideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // scende fuori dallo schermo
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: insets.bottom + 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        paddingVertical: 12,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backdropFilter: Platform.OS === "web" ? "blur(14px)" : undefined,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 6 },
        transform: [{ translateY }],
      }}
    >
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.route);

        return (
          <TouchableOpacity
            key={tab.route}
            onPress={() => router.push(tab.route)}
            style={{ alignItems: "center" }}
          >
            <Ionicons
              name={active ? tab.iconActive : tab.icon}
              size={24}
              color={active ? "#FF8A3D" : "#8E8E93"}
            />
            <Text
              style={{
                fontSize: 11,
                marginTop: 2,
                color: active ? "#FF8A3D" : "#8E8E93",
                fontWeight: active ? "600" : "400",
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
