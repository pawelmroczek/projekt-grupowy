import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { CircleUser, UserX } from "lucide-react-native";
import { TokenContext } from "../../../../../app/TokenContext";
import { iviteSending } from "../../../../../lib/friends/friends";

export default function VerticalList({friends,  household}) {


  const [selectedFriend, setSelectedFriend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { token, setToken } = useContext(TokenContext);


  const householdIds = household.map((member) => member.id);


  const showModal = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  const invite = async () => {
    console.log("Zapraszanie użytkownika:", selectedFriend.id);
    const response = await iviteSending(token, selectedFriend.id, "HOUSEHOLDS");
    console.log("Zaproszenie wysłane:");
    setModalVisible(false);
    setSelectedFriend(null);
  };

  const cancel = () => {
    setModalVisible(false);
    setSelectedFriend(null);
  };

  return (
    <View>
      <ScrollView
        className="w-full bg-white rounded-xl"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {friends.map((friend) => {
          const isInHousehold = householdIds.includes(friend.id);

          const content = (
            <View className="p-4 items-center">
              <CircleUser size={30} />
              <Text className="text-lg">{friend.username}</Text>
            </View>
          );

          return isInHousehold ? (
            <View key={friend.id}>{content}</View>
          ) : (
            <TouchableOpacity key={friend.id} onPress={() => showModal(friend)}>
              {content}
            </TouchableOpacity>
          );
        })}

        {friends.length === 0 && (
          <View className="p-4 items-center">
            <UserX size={30} />
            <Text className="text-lg">Brak znajomych</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancel}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-6 w-4/5 items-center">
            <Text className="text-lg font-semibold mb-4">
              Zaprosić {selectedFriend?.username} do domostwa?
            </Text>
            <View className="flex-row gap-4">
              <Pressable
                onPress={invite}
                className="bg-green-500 rounded-xl px-4 py-2"
              >
                <Text className="text-white font-bold">Tak</Text>
              </Pressable>
              <Pressable
                onPress={cancel}
                className="bg-red-500 rounded-xl px-4 py-2"
              >
                <Text className="text-white font-bold">Nie</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
