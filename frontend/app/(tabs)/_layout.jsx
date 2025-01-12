import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import {
  CircleUserRound,
  House,
  Shirt,
  WashingMachine,
} from "lucide-react-native";

const TabIcon = ({ icon, name, focused }) => {
  return (
    <View className="gap-1 items-center justify-center w-20">
      {icon}
      <Text className={`text-xs ${focused ? "font-pmedium text-secondary-300 " : " text-text-tertiary"}`}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#F4A261",
          tabBarInactiveTintColor: "#828282",
          tabBarShowLabel: false,
          tabBarStyle: {
            // // borderTopColor: "#c8c8c8",
            borderTopWidth: 0.75,
            height:90,
            paddingTop: 15,
          },
        
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              TabIcon({icon: <House size={24} color={color} />, name: "Home",focused})
            ),
            tabBarLabel: "",
          }}
        />
        <Tabs.Screen
          name="wardrobe"
          options={{
            title: "Wardrobe",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              TabIcon({icon: <Shirt size={24} color={color} />, name: "Wardrobe", focused})
            ),
            tabBarLabel: "",
          }}
        />
        <Tabs.Screen
          name="laundry"
          options={{
            title: "Laundry",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              TabIcon({icon: <WashingMachine size={24} color={color} />, name: "Laundry",focused})
            ),
            tabBarLabel: "",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              TabIcon({icon: <CircleUserRound size={24} color={color} />, name: "Profile", focused})
            ),
            tabBarLabel: "",
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
