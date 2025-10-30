import React, { useState, useContext} from "react";
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
import { getClothes } from "../lib/clothes/clothes";

const clothDetails = () => {
  const cloth = useLocalSearchParams();
  const { token, setToken } = useContext(TokenContext);
  const {clothes, setClothes} = useContext(TokenContext);

  const handleDelete = async (id) => {
    console.log("Usuwam ubranie o id:", id);
    const serverresponse = await clothesDeleting(id, token);
    const clothesData = await getClothes(token);
    setClothes(clothesData);
    router.replace("/wardrobe");
  };

  return (
    <>
      <View className="relative">
        <View className=" w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-14 px-6">
          <TouchableOpacity onPress={() =>{
                  router.push({
                  pathname: "/addClothes",
                  params: { "name": cloth.name, "picture": cloth.picture, "id": cloth.id, "type": cloth.type, "color": cloth.color, "size": cloth.size, "clean": cloth.clean, "visible": cloth.visible, "category": cloth.category, "priority": cloth.priority, "pictogramIds": cloth.pictogramIds}
                })}
                }>
            <Pencil className="text-black" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <X className="text-black" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView className="mt-5">
          <Image source={{ uri: cloth.picture }} style={[styles.image]} />
          <View className="flex mt-8 ">
            {/* Zaokrąglona biała sekcja */}
            <View className="bg-white  rounded-t-3xl p-5 flex">
              <Text className="text-2xl font-bold mb-2">{cloth.name}</Text>
              <Text className="text-base text-gray-600">
                Rozmiar: {cloth.size}
              </Text>
              <Text className="text-base text-gray-600">Typ: {cloth.type}</Text>
              <Text className="text-base text-gray-600">
                Kolor: {cloth.color}
              </Text>
              <View className="items-center space-y-3   py-3.5 rounded-xl w-full flex justify-center bg-white-100 pb-40">
                <TouchableOpacity
                  onPress={() => router.replace({
                    pathname: "/addClothes",
                    params: { "name": cloth.name, "picture": cloth.picture, "id": cloth.id, "type": cloth.type, "color": cloth.color, "size": cloth.size, "clean": cloth.clean, "visible": cloth.visible, "category": cloth.category, "priority": cloth.priority, "pictogramIds": cloth.pictogramIds}
                })}
                  className="px-4  w-full flex items-center py-2 border text-black border-primary-100 rounded-lg"
                >
                  <Text className="text-black text-xl font-pregular">
                    {"EDYTUJ"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(cloth.id);
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

export default clothDetails;
