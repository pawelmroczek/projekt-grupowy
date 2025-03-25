import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function PlanLaundryButton() {
  return (
    <TouchableOpacity className=" bg-secondary-200 p-3 rounded-xl shadow-md">
      <Text className="text-center text-base text-white font-pmedium uppercase">
        Aktualizuj stan ubrań
      </Text>
    </TouchableOpacity>
  );
}
