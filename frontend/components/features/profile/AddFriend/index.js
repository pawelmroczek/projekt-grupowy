import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Bell, UserRoundPlus } from "lucide-react-native";
import { router } from "expo-router";
import { getInvites } from "../../../../lib/friends/friends";
import { useFocusEffect } from "@react-navigation/native";
import { TokenContext } from "../../../../lib/TokenContext";

export default function AddFriend() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useContext(TokenContext);

  useFocusEffect(
    React.useCallback(() => {
      if (!token) return;
      const fetchInvites = async () => {
        setLoading(true);
        const response = await getInvites(token);
        setInvites(response);
        setLoading(false);
      };

      fetchInvites();
    }, [token])
  );

  return (
    <View className=" mx-2 mb-2  flex flex-row space-x-2 items-stretch justify-between">
      <TouchableOpacity
        className="flex-grow"
        onPress={() => router.push("/findFriends")}
      >
        <View className="rounded-xl  bg-white items-center  p-4 flex flex-row  flex-grow ">
          <UserRoundPlus size={35} color="#2A9D8F" />
          <View className="ml-3">
            <Text className="text-lg">Zaproś znajomych</Text>
            <Text className="text-[11px]">Dodaj osoby do znajomych</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white  rounded-xl  flex flex-row justify-center items-center"
        onPress={() => router.push("/invites")}
      >
        <View className=" items-center p-4">
          <Bell size={35} color={"#2A9D8F"} />
          {!loading && invites?.length > 0 && (
            <Text className="bg-red-500 font-bold top-2.5 right-3 text-xs text-white p-1 px-2 rounded-full absolute">
              {invites.length}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
