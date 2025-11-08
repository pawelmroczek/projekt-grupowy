import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import ColorSelector from "./ColorSelector";
import { ChevronDown, ChevronUp, Info, Thermometer } from "lucide-react-native";
import { getSymbolDescription } from "../../../../lib/careSymbols";

export default function MakeLaundryButton({ suggestedLaundry }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedLoad, setSelectedLoad] = useState(null);

  const selectLoad = (index) => {
    setSelectedLoad(index === selectedLoad ? null : index);
  };

  const handleSubmit = () => {
    setModalVisible(false);
    const dataToPass =
      selectedLoad !== null
        ? { laundry: JSON.stringify(suggestedLaundry[selectedLoad]) }
        : { color: selectedColor };

    router.replace({
      pathname: "/makeLaundry",
      params: dataToPass,
    });
    setSelectedColor(null);
  };

  return (
    <View className="mt-2">
      <TouchableOpacity
        className="bg-secondary-300 rounded-lg px-4 py-2 flex items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-pmedium text-lg">Zrób pranie</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback>
              <View className="w-11/12 bg-white p-5 rounded-2xl items-start shadow-lg shadow-black/30">
                <View className="w-full items-start">
                  <Text className="text-xl font-pregular mb-4">
                    Wybierz sugerowane pranie:
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="w-full"
                  >
                    {suggestedLaundry.map((load, index) => (
                      <TouchableOpacity
                        style={{
                          width: 280,
                          marginRight:
                            index === suggestedLaundry.length - 1 ? 0 : 12,
                        }}
                        onPress={() => {
                          selectLoad(index);
                          setSelectedColor(null);
                        }}
                        key={index}
                        className={`border border-gray-200 rounded-lg mb-3 overflow-hidden ${
                          selectedLoad === index ? " border-secondary-300" : ""
                        }`}
                      >
                        <View className="p-3 bg-gray-50 flex-row items-center justify-between">
                          <View className="flex-1">
                            <View className="flex-row items-center">
                              <View
                                className="w-4 h-4 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    load.colorGroup === "białe"
                                      ? "#ffffff"
                                      : load.colorGroup === "ciemne"
                                      ? "#374151"
                                      : load.colorGroup === "jasne"
                                      ? "#d1d5db"
                                      : "#f59e0b",
                                }}
                              />
                              <Text className="font-pmedium text-gray-800">
                                Ładunek {index + 1}: {load.colorGroup}
                              </Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                              <Thermometer size={14} color="#6b7280" />
                              <Text className="text-sm text-gray-600 ml-1">
                                {load.washTemperature}°C • {load.clothes.length}{" "}
                                ubrań
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View className="p-3 border-t border-gray-200">
                          {/* Lista ubrań */}
                          <View className="mb-3">
                            <Text className="font-pmedium text-gray-800 mb-2">
                              Ubrania w ładunku:
                            </Text>
                            {load.clothes.map((item, itemIndex) => (
                              <View
                                key={itemIndex}
                                className="flex-row items-center py-1"
                              >
                                <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                                <Text className="text-sm text-gray-700 flex-1">
                                  {item.name} ({item.color})
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <Text className="text-gray-400 font-psemibold mb-2 uppercase w-full">
                  lub
                </Text>
                {/* Sekcja do wyboru kolorów */}
                <View className="w-full items-start">
                  <Text className="text-xl font-pregular mb-4">
                    Wybierz kolor:
                  </Text>
                  <ColorSelector
                    selectColor={selectedColor}
                    setSelectededColor={(color) => {
                      setSelectedColor(color);
                      setSelectedLoad(null);
                    }}
                  />
                  <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="px-4 w-1/2  py-2 bg-primary-100 rounded-lg"
                    >
                      <Text className="text-white text-center text-xl font-pregular">
                        Dalej
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        setSelectedColor(null);
                      }}
                      className="px-4 py-2 w-1/2 bg-gray-400 rounded-lg"
                    >
                      <Text className="text-white text-center text-lg">
                        Anuluj
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
