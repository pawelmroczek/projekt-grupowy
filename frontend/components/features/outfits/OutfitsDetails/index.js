import { View, Text, Image } from "react-native";
import React from "react";

export default function OutfitDetailsTile({ clothes, category }) {

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
      <Text className="text-center uppercase font-pbold text-base mb-3 text-gray-700">
        {category}
      </Text>
      <View>
        {clothes.map((cloth) => (
          <View
            key={cloth.id}
            className="bg-gray-50 rounded-xl mb-2 p-3 flex-row items-center"
          >
            <Image
              source={{ uri: cloth.picture }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4 pr-2">
              <Text 
                className="text-lg font-psemibold text-gray-800 mb-1" 
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {cloth.name}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">{cloth.type}</Text>
              <View className="flex-row items-center">
                <View className={`px-2 py-1 rounded-full ${cloth.clean ? 'bg-green-100' : 'bg-orange-100'}`}>
                  <Text className={`text-xs font-pmedium ${cloth.clean ? 'text-green-700' : 'text-orange-700'}`}>
                    {cloth.clean ? "Czyste" : "Brudne"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
