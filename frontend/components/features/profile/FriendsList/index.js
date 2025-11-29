import { View, Text, TouchableOpacity, Modal } from "react-native";
import VerticalList from "./VertitalList";
import { getHomiesList, getFriendsList } from "../../../../lib/friends/friends";
import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { leaveHousehold } from "../../../../lib/friends/friends";
import { TokenContext } from "../../../../lib/TokenContext";
import { HouseHeart, LogOut, Users } from "lucide-react-native";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [homies, setHomies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { token, setToken } = useContext(TokenContext);

  useFocusEffect(
    React.useCallback(() => {
      if (!token) return;
      const fetchFriends = async () => {
        const friendsData = await getFriendsList(token);
        friendsData.sort((a, b) => a.username.localeCompare(b.username));
        setFriends(friendsData);
      };

      const fetchHomies = async () => {
        const homiesData = await getHomiesList(token);
        homiesData.sort((a, b) => a.username.localeCompare(b.username));
        setHomies(homiesData);
      };

      fetchFriends();
      fetchHomies();
    }, [token])
  );

  return (
    <View className="  mx-2">
      <View className="bg-white rounded-xl">
        <View className="flex-row flex space-x-1 items-center px-3 py-3">
          <Users size={20} />
          <Text className="text-sm text-gray-500 uppercase font-bold ">
            Znajomi:
          </Text>
        </View>
        <VerticalList friends={friends} household={homies} />
      </View>

      <View className="bg-white rounded-xl mt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row flex space-x-1 items-center px-3 py-3">
            <HouseHeart size={20} />
            <Text className="text-sm text-gray-500 uppercase font-bold ">
              Domownicy:
            </Text>
          </View>
          {homies.length !== 0 && (
            <TouchableOpacity
              className="mx-4 my-2 px-4 py-2 bg-red-500 rounded-lg"
              onPress={() => setModalVisible(true)}
            >
              <LogOut size="15" color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        <VerticalList friends={homies} household={homies} isHouseHold={true} />
      </View>
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
