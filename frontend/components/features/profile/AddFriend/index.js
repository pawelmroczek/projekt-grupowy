import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Bell, UserRoundPlus } from "lucide-react-native";
import { router } from "expo-router";

export default function AddFriend() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        // Przykład fetchowania – zastąp swoim URL/emulatorem
        const response = await fetch("https://example.com/api/invites");
        const data = await response.json();
        setInvites(data); // zakładamy, że to tablica zaproszeń
      } catch (error) {
        console.error("Błąd pobierania zaproszeń:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);
  return (
    <View className=" w-[95%] mx-auto flex flex-row space-x-2 justify-stretch">
      <TouchableOpacity onPress={() => router.push("/findFriends")}>
        <View className="rounded-md border bg-white shadow-sm items-center border-primary-100  p-4 flex flex-row  flex-grow ">
          <UserRoundPlus size={35} color="#2A9D8F" />
          <View className="ml-3">
            <Text className="text-lg">Zaproś znajomych</Text>
            <Text className="text-[11px]">
              Dodaj osoby do znajomych, aby móc się dzielić
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="rounded-md border bg-white shadow-sm items-center border-primary-100  p-4 flex flex-row justify-center  ">
        <Bell size={35} color={"#2A9D8F"} />
         {!loading && invites.length > 0 && (
          <Text className="bg-red-500 font-bold top-2.5 right-3 text-xs text-white p-1 px-2 rounded-full absolute">
            {invites.length}
          </Text>
        )}
      </View>
    </View>
  );
}
