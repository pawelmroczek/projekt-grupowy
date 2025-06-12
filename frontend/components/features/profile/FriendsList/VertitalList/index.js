import { View, Text, ScrollView } from "react-native";
import React from "react";
import { CircleUser, UserX } from "lucide-react-native";

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
        <View className="p-4 items-center ">
          <UserX size={30}  />
          <Text className="text-lg">Brak znajomych</Text>
        </View>
      )}
    </ScrollView>
  );
}
