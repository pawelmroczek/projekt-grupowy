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

  const handleSubmit = () => {
    setModalVisible(false);
    console.log("selectedColor", selectedColor);
    router.push({
      pathname: "/makeLaundry",
      params: { color: selectedColor },
    });
    setSelectedColor(null);
  }

  return (
    <View className="mt-4">
      <TouchableOpacity className="bg-secondary-300 rounded-lg p-4 flex items-center justify-center m-2" onPress={() => setModalVisible(true)}>
        <Text className="text-white font-pmedium text-lg">Zrób pranie</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback>
              <View className="w-11/12 bg-white p-5 rounded-2xl items-center shadow-lg shadow-black/30">
                <Text className="text-2xl font-pbold mb-4">Wybierz kolor:</Text>
                <ColorSelector
                  selectColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
                  <TouchableOpacity onPress={() => handleSubmit()}
                    className="px-4 py-2 bg-primary-100 rounded-lg"
                  >
                    <Text className="text-white text-xl font-pregular">
                      Dalej
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {setModalVisible(false);
                      setSelectedColor(null);
                    }}
                    className="px-4 py-2 bg-red-500 rounded-lg"
                  >
                    <Text className="text-white text-lg">Anuluj</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
