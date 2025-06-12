import { View, Text, ScrollView } from "react-native";
import React from "react";
import { CircleUser } from "lucide-react-native";

export default function VerticalList({friends}) {
 
  


  return (
    <ScrollView
      className="w-full bg-white rounded-xl "
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      {friends.map((friend) => (
        <View key={friend.id} className="p-4 items-center ">
          <CircleUser size={30}  />
          <Text className="text-lg">{friend.name}</Text>
        </View>
      ))}
      {friends.length === 0 && (
        <Text className="text-center text-gray-500">Brak znajomych</Text>
      )}
    </ScrollView>
  );
}
