import { View, Text, Image } from "react-native";
import React from "react";

export default function OutfitDetailsTile({ clothes, category }) {

  return (
    <View className="bg-white m-2 p-3 shadow-md">
      <Text className="text-center uppercase font-bold text-lg border-b pb-2 border-gray-300">
        {category}
      </Text>
      <View className="flex-row flex-wrap justify-center mt-2">
        {clothes.map((cloth) => (
          <View
            key={cloth.id}
            className="bg-white  rounded-lg w-full h-[200px] items-center justify-start flex-row space-x-6"
          >
            <Image
              source={{ uri: cloth.picture }}
              className="w-[200px] h-[170px] mb-2 rounded-full border-r pr-4 border-gray-300"
              resizeMode="cover"
            />
            <View className="p-3 border-l border-gray-400">
              <Text className="text-xl font-medium">{cloth.name}</Text>
              <Text className="text-gray-500">{cloth.type}</Text>
              <Text className="text-gray-500">
                stan: {cloth.clean ? "czyste" : "brudne"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
