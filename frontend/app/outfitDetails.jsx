import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { X, Pencil } from "lucide-react-native";
import { clothesDeleting } from "../lib/clothes/clothes";
import { TokenContext } from "./TokenContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getClothes } from "../lib/clothes/clothes";
import OutfitDetailsTile from "../components/features/outfits/OutfitsDetails";

const outfitDetails = () => {
  const outfit = useLocalSearchParams();
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  // const handleDelete = async (id) => {
  //   console.log("Usuwam outfit o id:", id);
  //   const serverresponse = await clothesDeleting(id, token);
  //   const clothesData = await getClothes(token);
  //   setClothes(clothesData);
  //   router.push("/wardrobe");
  // };

  const outfitClothes = clothes.filter((cloth) =>
    outfit.clothesIds?.includes(cloth.id)
  );

  console.log("Outfit clothes:", outfitClothes);

  const dictionary = {
    "Nakrycie głowy": ["Nakrycie głowy"],
    "Górna część": ["Koszulka", "Koszula", "Sweter", "Kurtka", "Sukienka"],
    "Dolna część": ["Spodnie", "Spódnica"],
    Buty: ["Buty"],
    Akcesoria: ["Akcesoria"],
  };

  const categorizeClothes = (clothes, dictionary) => {
    const result = [];

    for (const [category, types] of Object.entries(dictionary)) {
      const filtered = clothes.filter((item) => types.includes(item.type));
      if (filtered.length > 0) {
        result.push({ category, clothes: filtered });
      }
    }

    return result;
  };

  const categorizedClothes = categorizeClothes(outfitClothes, dictionary);

  return (
    <>
      <View className="relative">
        <View className=" w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-14 px-6">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/addOutfits",
                params: {                  
                  id: outfit.id,              
                },
              })
            }
          >
            <Pencil className="text-black" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <X className="text-black" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView className="mt-5">
          {categorizedClothes.map((category) => (
            <OutfitDetailsTile
              key={category.category}
              category={category.category}
              clothes={category.clothes}
            />
          ))}
          <View className="flex mt-8 ">
            <View className="bg-white  rounded-t-3xl p-5 flex">
              <Text className="text-2xl font-bold mb-2">{outfit.name}</Text>
              <Text className="text-base text-gray-600">
                Typ: {outfit.type}
              </Text>
              <View className="items-center space-y-3   py-3.5 rounded-xl w-full flex justify-center bg-white-100 pb-40">
                <TouchableOpacity
                  onPress={() => {
                    // handleDelete(cloth.id);
                  }}
                  className="px-4 py-2 w-full flex items-center bg-red-500 rounded-lg"
                >
                  <Text className="text-white text-xl font-pregular">
                    {"Usuń"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default outfitDetails;
