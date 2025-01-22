import { View, Text } from "react-native";
import React from "react";
import { Plus } from "lucide-react-native";

export default function AddButton() {
  return (
    <View className="absolute shadow-sm bg-secondary-300 px-2 py-2 bottom-5 right-4 rounded-full">
      <Plus size={50} color="white" />
    </View>
  );
}
