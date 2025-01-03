import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarCenterButton({ focused }: { focused: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1200 }),
            withTiming(1, { duration: 1200 })
          ),
          -1
        ),
      },
    ],
    shadowColor: "#E1306C",
    shadowOpacity: withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    ),
    zIndex: 1000,
  }));

  return (
    <View style={styles.centerButton}>
      <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
        <LinearGradient
          colors={[
            "#405DE6",
            "#5B51D8",
            "#833AB4",
            "#C13584",
            "#E1306C",
            "#FD1D1D",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <MaterialCommunityIcons name="paw" size={32} color="#FFFFFF" />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerShown: useClientOnlyValue(false, true),
        headerRight: () => (
          <Pressable
            onPress={() => router.push("../news")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              marginRight: 12,
            })}
          >
            <FontAwesome6
              name="bell"
              size={25}
              // color={Colors[colorScheme ?? "light"].text}
              color={"black"}
            />
          </Pressable>
        ),
        headerStyle: {
          minHeight: 60,
          // backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        // これを追加することで、選択時のタブの背景が適切に表示されます
        tabBarActiveBackgroundColor:
          Colors[colorScheme ?? "light"].tabIconSelected,
        tabBarInactiveBackgroundColor: "transparent",
      }}
    >
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <View>
              <TabBarIcon name="gear" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(peek)"
        options={{
          title: "peek",
          tabBarIcon: ({ focused }) => <TabBarCenterButton focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="(dashboard)"
        options={{
          title: "Tab Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dashboard" color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="(history)"
        options={{
          title: "履歴",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 100,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
