import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

const clothDetails = () => {
  const cloth = useLocalSearchParams();

  console.log(cloth);
  return (
    <>
      <View className="relative">
        <View className=" w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-14 px-6">
          <TouchableOpacity onPress={() => router.back()}>
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
              <View className="items-center space-y-3   py-3.5 rounded-xl w-full flex justify-center bg-white-100  ">
                <TouchableOpacity
                  onPress={() => {
                    
                  }}
                  className="px-4  w-full flex items-center py-2 border text-black border-primary-100 rounded-lg"
                >
                  <Text className="text-black text-xl font-pregular">
                    {"EDYTUJ"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // usun
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
