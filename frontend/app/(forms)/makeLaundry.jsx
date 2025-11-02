import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Info, Thermometer, AlertTriangle, X } from "lucide-react-native";

import { toggleClean } from "../../lib/clothes/clothes";

import { getClothes, getClothesHousehold } from "../../lib/clothes/clothes";
import { addLaundry } from "../../lib/laundry/addLaundry";
import CareSymbolsDisplay from "../../components/features/laundry/CareSymbolsDisplay";
import { getColorFromGroup } from "../../lib/colors";
import { getSymbolDescription } from "../../lib/careSymbols";
import { TokenContext } from "../../lib/TokenContext";
import useDirtyClothes from "../../lib/useDirtyClothes";

const makeLaundry = () => {
  // const [selectedColor, setSelectedColor] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  const [MakeLaundryButtonDisabled, setMakeLaundryButtonDisabled] = useState(false);
  const [nonValidMessage, setNonValidMessage] = useState("");

  const allDirtyClothes = useDirtyClothes(); // Używamy hook z symbolami prania
  const params = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  const isSuggestedLaundry = params.laundry ? true : false;

  let dirtyClothes;
  let laundryData = null;

  if (Object.keys(params).length > 0) {
    if (params.color) {
      const colors = getColorFromGroup(params.color);

      dirtyClothes = colors
        ? allDirtyClothes.filter((item) => colors.includes(item.color))
        : allDirtyClothes;
    } else if (isSuggestedLaundry) {
      laundryData = JSON.parse(params.laundry);
      console.log(laundryData);
      const clothesIds = laundryData.clothes.map((item) => item.id);
      dirtyClothes = allDirtyClothes.filter((item) =>
        clothesIds.includes(item.id)
      );
    }
  }
  // setSelectedColor(params.color);

  const [selected, setSelected] = useState([]);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if(selected.length === 0){
      setNonValidMessage("Wybierz przynajmniej jedno ubranie do prania.");
      setMakeLaundryButtonDisabled(false);
      return;
    }
    const serverresponse = await toggleClean(selected, token);
    const laundryResponse = await addLaundry(selected, token);
    const clothesData = await getClothes(token);
    setClothes(clothesData);
    router.replace("/laundry");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View>
        <Text className="text-2xl font-bold mt-2 mb-2">
          Wybierz brudne ubrania
        </Text>
        <Text className="text-base font-pregular mb-2 ">
          {dirtyClothes.length === 0
            ? "Brak brudnych ubrań do prania."
            : `Zaznacz ubrania, które chcesz wyprać. (${selected.length} z ${dirtyClothes.length})`}
        </Text>
        {!isSuggestedLaundry && (
          <Text className="text-sm text-primary-200 font-pregular mb-2 ">
            Ubrania zostały posortowane według priorytetu
          </Text>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-start">
          {dirtyClothes.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`rounded-xl w-[45%] p-2 border-2 m-2 bg-white ${
                selected.includes(item.id)
                  ? "border-secondary-300"
                  : "border-gray-200"
              }`}
              onPress={() => handleSelect(item.id)}
            >
              <Image
                source={{ uri: item.picture }}
                style={{
                  resizeMode: "contain",
                  borderRadius: 10,
                }}
                className="w-full h-32"
              />
              <View className="mt-2 p-2">
                <Text className="font-pmedium text-gray-800 text-center">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  {item.color} • {item.size}
                </Text>
                <CareSymbolsDisplay
                  careSymbols={item.careSymbols}
                  compact={true}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View>
        {nonValidMessage !== "" && (
          <Text className="text-red-600 font-pmedium mb-2 text-center">
            {nonValidMessage}
          </Text>
        )}
        {/* Przycisk instrukcji prania dla sugerowanych prań */}
        {isSuggestedLaundry && laundryData && (
          <TouchableOpacity
            className="bg-blue-100 rounded-md py-2.5 px-4 mx-3.5"
            onPress={() => setInstructionsVisible(true)}
          >
            <View className="flex-row items-center justify-center">
              <Info size={16} color="#2563eb" />
              <Text className="text-blue-700 font-pmedium ml-2">
                Pokaż instrukcje prania
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View className="flex-row justify-center space-x-2 mt-4 mb-4">
          <TouchableOpacity
            className="bg-primary-100 w-[65%] rounded-md py-2 px-4"
            disabled={MakeLaundryButtonDisabled}
            onPress={() => {
              setMakeLaundryButtonDisabled(true);
              handleSubmit();
            }}
          >
            <Text className="text-white text-lg font-pregular text-center">
              Zrób pranie
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-400 rounded-md py-2 px-4"
            onPress={() => {
              router.replace("/laundry");
            }}
          >
            <Text className="text-white text-lg font-pregular ">Anuluj</Text>
          </TouchableOpacity>
        </View>

        {/* Modal z instrukcjami prania */}
        <Modal
          visible={instructionsVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setInstructionsVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center px-4">
            <View className="bg-white rounded-xl p-4 w-full max-w-md">
              {/* Nagłówek modalu */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Info size={20} color="#2563eb" />
                  <Text className="text-lg font-bold ml-2 text-gray-800">
                    Instrukcje prania
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setInstructionsVisible(false)}
                  className="p-1"
                >
                  <X size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Zawartość instrukcji */}
              {laundryData && (
                <ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
                  {/* Instrukcje prania */}
                  <View className="bg-blue-50 p-3 rounded-lg mb-3">
                    <View className="flex-row items-center mb-2">
                      <Thermometer size={16} color="#2563eb" />
                      <Text className="font-pmedium text-blue-800 ml-1">
                        Ustawienia prania
                      </Text>
                    </View>
                   
                    <View className="flex-row items-center mb-1">
                      <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                      <Text className="text-sm text-blue-700">
                        Temperatura: {laundryData.washInstructions?.temperature || laundryData.washTemperature}°C
                      </Text>
                    </View>

                  
                    
                    <View className="flex-row items-center mb-1">
                      <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                      <Text className="text-sm text-blue-700">
                        Grupa kolorów: {laundryData.colorGroup}
                      </Text>
                    </View>

                    {laundryData.washInstructions?.symbols && (
                      <Text className="text-xs text-blue-600 mt-1">
                        Symbole:{" "}
                        {laundryData.washInstructions.symbols
                          .map(getSymbolDescription)
                          .join(", ")}
                      </Text>
                    )}
                  </View>

                  {/* Ostrzeżenia */}
                  {laundryData.washInstructions?.warnings && laundryData.washInstructions.warnings.length > 0 && (
                    <View className="bg-amber-50 p-3 rounded-lg mb-3">
                      <View className="flex-row items-center mb-2">
                        <AlertTriangle size={16} color="#f59e0b" />
                        <Text className="font-pmedium text-amber-800 ml-1">
                          Ważne uwagi
                        </Text>
                      </View>
                      {laundryData.washInstructions.warnings.map(
                        (warning, warnIndex) => (
                          <View
                            key={warnIndex}
                            className="flex-row items-center py-1"
                          >
                            <View className="w-1 h-1 rounded-full bg-amber-600 mr-2" />
                            <Text className="text-sm text-amber-700">
                              {warning}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  )}

                 
                </ScrollView>
              )}

              {/* Przycisk zamknij */}
              <TouchableOpacity
                className="bg-blue-500 rounded-md py-3 px-4 mt-4"
                onPress={() => setInstructionsVisible(false)}
              >
                <Text className="text-white text-center font-pregular">
                  Zamknij
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default makeLaundry;
