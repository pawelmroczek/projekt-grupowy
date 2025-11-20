import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";

import { getSymbolDescription } from "../../../../lib/careSymbols";
import { TokenContext } from "../../../../lib/TokenContext";
import useDirtyClothes from "../../../../lib/useDirtyClothes";

export default function DebugCareSymbols() {
  const { clothes } = useContext(TokenContext);
  const dirtyClothes = useDirtyClothes();

  if (!clothes || clothes.length === 0) {
    return (
      <View className="p-4 bg-gray-100 rounded-xl m-2">
        <Text className="font-bold text-gray-800">Debug: Brak ubrań</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-gray-100 rounded-xl m-2">
      <Text className="font-bold text-gray-800 mb-2">
        Debug: Symbole prania ({dirtyClothes.length} brudnych ubrań)
      </Text>
      <ScrollView style={{ maxHeight: 200 }}>
        {dirtyClothes.slice(0, 3).map((item, index) => (
          <View key={index} className="mb-2 p-2 bg-white rounded">
            <Text className="font-medium text-sm">{item.name} ({item.color})</Text>
            <Text className="text-xs text-gray-600">
              Symbole: {(item.careSymbols || []).map(getSymbolDescription).join(', ')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}