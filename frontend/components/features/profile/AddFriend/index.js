import { View, Text } from "react-native";
import React from "react";
import { Bell, UserRoundPlus } from "lucide-react-native";
import { BlurView } from "expo-blur";

export default function AddFriend() {
  return (
    <View className=" w-[95%] mx-auto flex flex-row space-x-2 justify-stretch">
      <View className="rounded-md border bg-white shadow-sm items-center border-primary-100  p-4 flex flex-row  flex-grow ">
        <UserRoundPlus size={35} color="#2A9D8F" />
        <View className="ml-3">
          <Text className="text-lg">Zaproś znajomych</Text>
          <Text className="text-[11px]">
            Dodaj osoby do znajomych / domowników
          </Text>
        </View>
      </View>
      <View className="rounded-md border bg-white shadow-sm items-center border-primary-100  p-4 flex flex-row justify-center  ">
        <Bell size={35} color={"#2A9D8F"} />
        <Text className="bg-red-500 font-bold top-2.5 right-3 text-xs text-white p-1 px-2 rounded-full absolute">
          2
        </Text>
      </View>
    </View>
  );
}
