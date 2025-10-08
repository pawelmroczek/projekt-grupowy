import { View, Text, TouchableOpacity  } from "react-native";
import VerticalList from "./VertitalList";
import { getHomiesList, getFriendsList } from "../../../../lib/friends/friends";
import React, { useEffect, useState, useContext} from "react";
import { TokenContext } from "../../../../app/TokenContext";
import { useFocusEffect } from "@react-navigation/native";
import { leaveHousehold } from "../../../../lib/friends/friends";

export default function FriendsList() {


  const [friends, setFriends] = useState([]);
  const [homies, setHomies] = useState([]);
  const { token, setToken } = useContext(TokenContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFriends = async () => {
        const friendsData = await getFriendsList(token);
        setFriends(friendsData);
      };

      const fetchHomies = async () => {
        const homiesData = await getHomiesList(token);
        console.log("Homies data:", homiesData);
        setHomies(homiesData);
      };

      fetchFriends();
      fetchHomies();
    }, [token])
  );


  return (
    <View className="w-full bg-white rounded-xl  mt-4">
      <Text className="text-xl font-bold p-2">Znajomi:</Text>
      <VerticalList friends={friends} household={homies}/>
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-xl font-bold">Domownicy:</Text>
        {homies.length !== 0 && (
          <TouchableOpacity
            className="mx-4 px-4 py-2 bg-red-500 rounded-lg"
            onPress={async () => {
              await leaveHousehold(token);
              setHomies([]);
            }}
          >
            <Text className="text-white text-l font-pregular">Opuść</Text>
          </TouchableOpacity>
        )}
      </View>
      <VerticalList friends={homies} household={homies} />
    </View>
  );
}
