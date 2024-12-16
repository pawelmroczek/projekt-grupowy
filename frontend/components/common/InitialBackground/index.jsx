import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const InitialBackground = ({ image, children }) => {
  return (
    <ImageBackground source={image} className="h-full">
      <SafeAreaView className="h-full ">
        <ScrollView contentContainerStyle={{ height: "90%" }}>
          <View className="h-full justify-center items-center ">
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InitialBackground;
