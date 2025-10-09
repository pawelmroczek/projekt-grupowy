import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams, router } from "expo-router";
import useDirtyClothes from "../useDirtyClothes";
import { toggleClean } from "../../lib/clothes/clothes";
import { TokenContext } from "../TokenContext";
import { getClothes, getClothesHousehold } from "../../lib/clothes/clothes";
import { addLaundry } from "../../lib/laundry/addLaundry";
import CareSymbolsDisplay from "../../components/features/laundry/CareSymbolsDisplay";

const makeLaundry = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  const allDirtyClothes = useDirtyClothes(); // Używamy hook z symbolami prania
  const params = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setSelectedColor(params.color);
    }
  }, []);

  // Filtruj według koloru jeśli został wybrany
  const dirtyClothes = selectedColor 
    ? allDirtyClothes.filter((item) => item.color === selectedColor)
    : allDirtyClothes;

  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const serverresponse = await toggleClean(selected, token);
    const laundryResponse = await addLaundry(selected, token);
    const clothesData = await getClothes(token);
    setClothes(clothesData);
    router.push("/laundry");
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mt-12 mb-2">
        Wybierz brudne ubrania
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-center">
          {dirtyClothes.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`rounded-xl p-2 border-2 m-2 bg-white ${
                selected.includes(item.id)
                  ? "border-secondary-300"
                  : "border-gray-200"
              }`}
              onPress={() => handleSelect(item.id)}
              style={{ width: screenWidth * 0.85 }}
            >
              <Image
                source={{ uri: item.picture }}
                style={{
                  width: screenWidth * 0.75,
                  height: screenWidth * 0.75,
                  resizeMode: "contain",
                  borderRadius: 10,
                }}
              />
              <View className="mt-2 p-2">
                <Text className="font-pmedium text-gray-800 text-center">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  {item.color} • {item.size}
                </Text>
                <CareSymbolsDisplay careSymbols={item.careSymbols} compact={true} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row justify-center space-x-4 mt-4 mb-4">
        <TouchableOpacity
          className="bg-primary-100 rounded-lg p-4"
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text className="text-white text-lg font-bold">Zrób pranie</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 rounded-lg p-4"
          onPress={() => {
            router.push("/laundry");
          }}
        >
          <Text className="text-white text-lg font-bold">Anuluj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default makeLaundry;
