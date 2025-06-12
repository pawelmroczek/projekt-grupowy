import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageOff, Shirt } from "lucide-react-native";

const fallbackImage =
  "https://via.placeholder.com/100x100.png?text=Image+Error"; // lub lokalny asset

const Tile = ({ clothe, isSelected }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <View
      className={`bg-white rounded-lg pt-2 w-40 h-40 items-center justify-center m-2 ${
        isSelected ? "border-2 border-primary-500" : ""
      }`}
    >
      {clothe.picture && !imageError ? (
        <Image
          source={{ uri: clothe.picture }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : clothe.picture && imageError ? (
        <View className="p-5 items-center justify-center rounded-full bg-gray-200">
          <ImageOff color="#AFAFAF" size="50" />
        </View>
      ) : (
        <View className="p-5 items-center justify-center rounded-full bg-gray-200">
          <Shirt color="#AFAFAF" size="50" />
        </View>
      )}
      <Text className="text-sm mt-2 font-semibold text-center">
        {clothe.name}
      </Text>
    </View>
  );
};

export default function OutfitSelector({ clothes, title, onSelect }) {
  const clothesWithEmpty = [
    {
      clean: true,
      color: "blue",
      createdAt: "2025-06-12",
      id: 0,
      name: "Wybierz",
      picture: "",
      size: "M",
      type: "Spodnie",
      user: "p.m@gmail.com",
    },
    ...clothes,
  ]; // Dodaj pusty element na początku

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View>
      <Text className="uppercase mt-4 mb-2 font-bold text-center text-primary-200">
        {title}
      </Text>
      <ScrollView
       
        horizontal
        showsHorizontalScrollIndicator={false}
       
        scrollEventThrottle={16}
      
      >
        {clothesWithEmpty.map((clothe) => (
          <TouchableOpacity
            key={clothe.id}
            onPress={() => {
              setSelectedItem(clothe);
              onSelect(clothe);
            }}
          >
            <Tile clothe={clothe} isSelected={selectedItem?.id === clothe.id} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: 120,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
