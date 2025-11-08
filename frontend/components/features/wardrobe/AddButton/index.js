import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Plus } from "lucide-react-native";

export default function AddButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} className="absolute shadow-sm bg-secondary-300 px-3 py-3 bottom-12 right-4 rounded-full">
      <Plus size={35} color="white" />
    </TouchableOpacity>
  );
}
