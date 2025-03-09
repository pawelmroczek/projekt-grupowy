import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";


import { X, Pencil } from "lucide-react-native";  


const clotheDetails = () => {
  const cloth = useLocalSearchParams();
  return (
    <>
       <View className="relative">
            <View className="absolute top-0 left-0 w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-10 px-6">
                <TouchableOpacity onPress={() =>  router.back()}>
                    <Pencil className="text-black" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  router.back()}>
                    <X className="text-black" size={30} />
                </TouchableOpacity>
            </View>
            <ScrollView className="mt-20">
            <Image source={{ uri: cloth.picture }} className="w-full" />
            <View className="flex-1">
        {/* Zaokrąglona biała sekcja */}
        <View className="bg-white -mt-8 rounded-t-3xl p-5 flex-1">
          <Text className="text-2xl font-bold mb-2">{cloth.name}</Text>
          <Text className="text-base text-gray-600">
            Opis ubrania, materiały, instrukcja prania i inne szczegóły.
          </Text>
        </View>
      </View>
            </ScrollView>
      </View>
    </>
  );
};
export default clotheDetails;
