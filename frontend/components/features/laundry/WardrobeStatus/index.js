import { View, Text } from "react-native";
import React from "react";
import { Siren } from "lucide-react-native";

export default function WardrobeStatus() {
  return (
    <View className="mt-2">
      <View className=" border p-3 flex flex-row justify-center space-x-2 border-secondary-300 rounded-2xl shadow-xs">
        <Siren color={"#E76F51"} />
        <Text className=" text-base text-black font-plight">
          Twoja szafa jest brudna w{" "}
          <Text className="text-lg font-pmedium text-secondary-300 ">45%</Text>
        </Text>
      </View>
    </View>
  );
}
