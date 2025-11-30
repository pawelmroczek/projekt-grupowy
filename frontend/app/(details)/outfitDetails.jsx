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
import { clothesDeleting } from "../../lib/clothes/clothes";
import { TokenContext } from "../../lib/TokenContext";
import { getClothes } from "../../lib/clothes/clothes";
import OutfitDetailsTile from "../../components/features/outfits/OutfitsDetails";
import { fetchOutfits, outfitDeleting } from "../../lib/outfits/outfits";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../assets/constants/types/types";

const outfitDetails = () => {
  const outfit = useLocalSearchParams();
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);
  const {outfits, setOutfits} = useContext(TokenContext);

  const handleDelete = async (id) => {
    const serverresponse = await outfitDeleting(id, token);
    const outfitsData = await fetchOutfits(token);
    setOutfits(outfitsData);
    router.replace("/wardrobe");
  };

  const clothesIds = typeof outfit.clothesIds === "string"
  ? outfit.clothesIds.split(",").map(Number)
  : outfit.clothesIds;

  const outfitClothes = clothes.filter((cloth) =>
    clothesIds?.includes(cloth.id)
  );

 const dictionary = {
     "Nakrycie głowy": clothingTypeOptions
       .filter(item => item.type === "HAT")
       .map(item => item.label),
     "Górna część": clothingTypeOptions
       .filter(item => item.type === "TOP" || item.type === "FULLBODY")
       .map(item => item.label), 
     "Dolna część": clothingTypeOptions
       .filter(item => item.type === "BOTTOM")
       .map(item => item.label),
     Buty: shoesTypeOptions.map(item => item.label),
     Akcesoria: accessoryTypeOptions.map(item => item.label),
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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between p-4 bg-white shadow-sm pt-14 px-6">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/addOutfits",
              params: {                  
                id: outfit.id,              
              },
            })
          }
          className="w-10 h-10 items-center justify-center"
        >
          {/* <Pencil className="text-black" size={24} /> */}
        </TouchableOpacity>
        <Text className="text-lg font-pbold" numberOfLines={1}>Szczegóły stroju</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <X className="text-black" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Outfit Name Card */}
        <View className="bg-white mx-4 mt-4 p-5 rounded-xl shadow-sm">
          <Text className="text-2xl font-pbold mb-2" numberOfLines={2}>{outfit.name}</Text>
          <View className="flex-row items-center">
            <View className="bg-primary-100 px-3 py-1.5 rounded-full">
              <Text className="text-white font-pmedium text-sm">{outfit.type}</Text>
            </View>
          </View>
        </View>

        {/* Categorized Clothes */}
        <View className="mt-4 px-4">
          {categorizedClothes.map((category) => (
            <OutfitDetailsTile
              key={category.category}
              category={category.category}
              clothes={category.clothes}
            />
          ))}
        </View>

        {/* Delete Button */}
        <View className="px-4 mt-6 mb-8">
          <TouchableOpacity
            onPress={() => handleDelete(outfit.id)}
            className="bg-red-500 py-4 rounded-xl items-center shadow-sm"
          >
            <Text className="text-white text-lg font-pmedium">
              Usuń strój
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
