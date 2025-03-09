import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

export default function ColorSelector() {
  const colors = [
    { name: "red", hex: "#FF0000" },
    { name: "black", hex: "#000000" },
    { name: "blue", hex: "#0000FF" },
    { name: "gray", hex: "#808080" },
    { name: "white", hex: "#FFFFFF" },
    { name: "green", hex: "#00FF00" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "purple", hex: "#800080" },
    { name: "orange", hex: "#FFA500" },
    { name: "brown", hex: "#A52A2A" },
    { name: "pink", hex: "#FFC0CB" },

    { name: "silver", hex: "#C0C0C0" },
    { name: "gold", hex: "#FFD700" },
    { name: "other", hex: "#FFFFFF" },
  ];
  const [selectColor, setColor] = useState(null);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <View className="flex-row space-x-3 my-2">
        {colors.map((color) => (
          <TouchableOpacity
            key={color.name}
            className={` rounded-xl p-1 border-2 ${
              selectColor === color.name
                ? " border-secondary-300"
                : "bg-white-200 border-gray-200 "
            }`}
            onPress={() =>
              setColor(selectColor === color.name ? null : color.name)
            }
          >
            <View style={{backgroundColor:color.hex}} className="h-12 w-12 rounded-lg">

            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
