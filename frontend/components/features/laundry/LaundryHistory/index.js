import { View, Text } from "react-native";
import React from "react";
import { Frown, History } from "lucide-react-native";

export default function LaundryHistory() {
  return (
    <View className="mt-4">
      <View className="flex flex-row items-center mb-4">
        <History color="black" />
        <Text className="text-gray-800 font-pmedium text-lg ">
          Twoje ostatnie prania
        </Text>
      </View>
      <View className="flex items-center flex-row justify-center space-x-2">
        <Text className="text-lg text-gray-600">Brak historii prania </Text>
        <Frown color="black" />
      </View>
    </View>
  );
}
