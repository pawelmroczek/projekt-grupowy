import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { House } from "lucide-react-native";


const TabIcon = ({ icon, name }) => {
  return (
    <View>
      {icon}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <House size={24} color={color} />,
            tabBarLabel: ""
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
