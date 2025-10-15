import { View, Text, TouchableOpacity, Modal  } from "react-native";
import VerticalList from "./VertitalList";
import { getHomiesList, getFriendsList } from "../../../../lib/friends/friends";
import React, { useEffect, useState, useContext} from "react";
import { TokenContext } from "../../../../app/TokenContext";
import { useFocusEffect } from "@react-navigation/native";
import { leaveHousehold } from "../../../../lib/friends/friends";

export default function FriendsList() {


  const [friends, setFriends] = useState([]);
  const [homies, setHomies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { token, setToken } = useContext(TokenContext);

  useFocusEffect(
    React.useCallback(() => {
      if(!token) return;
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
    <View className="w-full bg-white rounded-xl">
      <Text className="text-xl font-bold p-2">Znajomi:</Text>
      <VerticalList friends={friends} household={homies}/>
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-xl font-bold">Domownicy:</Text>
        {homies.length !== 0 && (
          <TouchableOpacity
            className="mx-4 px-4 py-2 bg-red-500 rounded-lg"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-l font-pregular">Opuść</Text>
          </TouchableOpacity>
        )}
      </View>
      <VerticalList friends={homies} household={homies} />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl w-4/5">
            <Text className="text-lg font-semibold text-center mb-4">
              Czy na pewno chcesz opuścić domostwo?
            </Text>

            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-black font-pregular">Anuluj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-lg"
                onPress={async () => {
                  setModalVisible(false);
                  await leaveHousehold(token);
                  setHomies([]);
                }}
              >
                <Text className="text-white font-pregular">Tak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
