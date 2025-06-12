import { View, Text, ScrollView } from "react-native";
import React from "react";
import { CircleUser } from "lucide-react-native";

export default function VerticalList() {
  const friends = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Piotr" },
  ];

  return (
    <ScrollView
      className="w-full bg-white rounded-xl "
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      {friends.map((friend) => (
        <View key={friend.id} className="p-4 items-center ">
          <CircleUser/>
          <Text className="">{friend.name}</Text>
        </View>
      ))}
      {friends.length === 0 && (
        <Text className="text-center text-gray-500">Brak znajomych</Text>
      )}
    </ScrollView>
  );
}
