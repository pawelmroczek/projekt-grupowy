import { View, Text } from "react-native";
import React from "react";
import VerticalList from "./VertitalList";

export default function FriendsList() {

  const people = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Piotr" },
  ];

  return (
    <View className="w-full bg-white rounded-xl  mt-4">
      <Text className="text-xl font-bold p-2">Znajomi:</Text>
      <VerticalList friends={people} />
      <Text className="text-xl font-bold p-2">Domownicy:</Text>
      <VerticalList friends={people} />
    </View>
  );
}
