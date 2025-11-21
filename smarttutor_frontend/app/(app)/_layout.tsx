// app/(app)/_layout.tsx
import { Tabs } from "expo-router";
import STFloatingTabBar from "../../src/ui/atoms/STFloatingTabBar";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // disattiva tabbar di default
      }}
      tabBar={(props) => <STFloatingTabBar {...props} />}
    />
  );
}
