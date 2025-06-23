import { View, Text } from "react-native";
import React from "react";
import { CalendarCog } from "lucide-react-native";

export default function SuggestedLaundry() {
  return (
    <View className="flex flex-row space-x-1 ">
      <View className="flex-grow p-3 border border-primary-200 rounded-xl mb-2 shadow-xs">
        <Text className="font-plight text-black">Następne pranie:</Text>
        <Text className="font-pmedium text-black">Białe ubrania</Text>
        <Text className="font-plight text-black">Za 2 dni</Text>
      </View>
      <View className="w-1/5 flex items-center justify-center p-2 border border-primary-200 rounded-xl mb-2 shadow-xs">
        <CalendarCog />
      </View>
    </View>
  );
}
