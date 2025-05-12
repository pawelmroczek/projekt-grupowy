import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams, router } from "expo-router";
import useDirtyClothes from "../useDirtyClothes";
import { toggleClean } from "../../lib/clothes/clothes";
import { TokenContext } from "../TokenContext";
import { getClothes } from "../../lib/clothes/clothes";

const makeLaundry = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const { token, setToken } = useContext(TokenContext);
  const {clothes, setClothes} = useContext(TokenContext);

  let dirtyClothes = useDirtyClothes() || [];
  const params = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setSelectedColor(params.color);
    }
  }, []);

  dirtyClothes = dirtyClothes.filter((item) => item.color === selectedColor);

  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const serverresponse = await toggleClean(selected, token);
    const clothesData = await getClothes(token);
    setClothes(clothesData);
    router.push("/laundry");
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mt-12 mb-2">Wybierz brudne ubrania</Text>
      <ScrollView 
      contentContainerStyle={{ alignItems: "center", paddingVertical: 20, paddingHorizontal: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-center">
          {dirtyClothes.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`rounded-xl p-2 border-2 m-2 ${
                selected.includes(item.id)
                  ? "border-secondary-300"
                  : "bg-white-200 border-gray-200"
              }`}
              onPress={() => handleSelect(item.id)}
            >
              <Image
                source={{ uri: item.picture }}
                style={{
                  width: screenWidth * 0.8, // 90% szerokości ekranu
                  height: screenWidth * 0.8, // Przykładowy stosunek wysokości (dostosuj według potrzeb)
                  resizeMode: "contain",
                  borderRadius: 10,
                }}
              />
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
