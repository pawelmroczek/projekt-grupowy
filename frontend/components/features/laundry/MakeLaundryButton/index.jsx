import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import ColorSelector from "../../wardrobe/ColorSelector";

export default function MakeLaundryButton() {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(null);

  return (
    <View className="mt-4">
      <TouchableOpacity className="bg-blue-500 p-4 rounded-lg flex items-center justify-center" onPress={() => setModalVisible(true)}>
        <Text className="text-white font-pmedium text-lg">Zrób pranie</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback>
              <View className="w-11/12 bg-white p-5 rounded-2xl items-center shadow-lg shadow-black/30">
                <ColorSelector
                  selectColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <TouchableOpacity onPress={() => router.push({
                  pathname: "/makeLaundry",
                  params: { color: selectedColor }})}
                  className="px-4 py-2 bg-primary-100 rounded-lg"
                >
                  <Text className="text-white text-xl font-pregular">
                    Dalej
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="px-4 py-2 bg-red-500 rounded-lg mt-2"
                >
                  <Text className="text-white text-lg">Anuluj</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
