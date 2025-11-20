import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../../../assets/constants/colors/colors";

export default function ColorSelector({selectColor, setSelectedColor}) {

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!selectColor) return;

    const index = colors.findIndex((c) => c.name === selectColor);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * 60,
        animated: true,
      });
    }
  }, [selectColor]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      ref={scrollRef}
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
              setSelectedColor(selectColor === color.name ? null : color.name)
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
