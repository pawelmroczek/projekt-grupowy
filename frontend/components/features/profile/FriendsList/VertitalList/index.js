import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { CircleUser, UserX } from "lucide-react-native";

import { iviteSending } from "../../../../../lib/friends/friends";
import { TokenContext } from "../../../../../lib/TokenContext";

export default function VerticalList({
  friends = [],
  household = [],
  isHouseHold = false,
}) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { token, setToken } = useContext(TokenContext);

  const householdIds = household.map((member) => member.id);

  const showModal = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  const invite = async () => {
    const response = await iviteSending(token, selectedFriend.id, "HOUSEHOLDS");
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
            <View className="px-4 py-2 items-center">
              <View className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  source={
                    friend.avatar
                      ? { uri: friend.avatar }
                      : require("../../../../../assets/images/profile/profilePlaceholder.png")
                  }
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

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
          <View className="p-4  w-full flex items-center flex-row justify-center space-x-2">
            <UserX size={30} color="#e76f51" />
            <Text className="text-base text-secondary-300">
              {isHouseHold ? "Brak domowników" : "Brak znajomych"}
            </Text>
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
