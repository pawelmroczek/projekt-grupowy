import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function EmailConfirmation({ visible, setVisible }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="w-4/5 bg-white rounded-xl p-6 items-center">
          <Text className="text-lg font-bold mb-2">Potwierdź adres e-mail</Text>
          <Text className="text-center text-gray-700 mb-4">
            Aby się zalogować, prosimy potwierdź swój adres e-mail.
          </Text>

          <Pressable
            className="bg-primary-100 px-6 py-3 rounded-lg"
            onPress={() => {
              setVisible(false);
              router.replace("/sign-in");
            }}
          >
            <Text className="text-white font-semibold">Zamknij</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
