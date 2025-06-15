import { View, Text } from "react-native";
import VerticalList from "./VertitalList";
import { getHomiesList, getFriendsList } from "../../../../lib/friends/friends";
import React, { useEffect, useState, useContext} from "react";
import { TokenContext } from "../../../../app/TokenContext";
import { useFocusEffect } from "@react-navigation/native";


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
        setHomies(homiesData);
      };

      fetchFriends();
      fetchHomies();
    }, [token])
  );


  return (
    <View className="w-full bg-white rounded-xl  mt-4">
      <Text className="text-xl font-bold p-2">Znajomi:</Text>
      <VerticalList friends={friends}/>
      <Text className="text-xl font-bold p-2">Domownicy:</Text>
      <VerticalList friends={homies} />
    </View>
  );
}
