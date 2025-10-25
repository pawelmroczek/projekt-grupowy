import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";

import { getClothes } from "../../lib/clothes/clothes";
import { TokenContext } from "../TokenContext";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import Wardrobe from "../../components/features/wardrobe";
import { SafeAreaView } from "react-native-safe-area-context";

import OutfitsPage from "../../components/features/outfits";
import WardrobeDiscover from "../../components/features/wardrobe/WardrobeDiscover";
import { Globe, Users } from "lucide-react-native";
import OutfitsDiscover from "../../components/features/outfits/OutfitsDiscover";

const FormData = global.FormData;

const WardrobePage = () => {
  const [selectedPage, setSelectedPage] = useState("wardrobe");
  const [selectedCategory, setSelectedCategory] = useState("friends");

  // const rawFilters = useLocalSearchParams();
  // const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  return (
    <View className="flex-1 bg-white pb-10">
      <SafeAreaView className="absolute bottom-[-40] top-0 left-0 right-0 pb-0">
        <View className="flex-row justify-center py-4 items-center bg-white border-b border-gray-100 ">
          <TouchableOpacity
            onPress={() => setSelectedPage("wardrobe")}
            className={`mx-8 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedPage === "wardrobe"
                ? "bg-primary-100"
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            <Text
              className={`text-lg font-medium ${
                selectedPage === "wardrobe" ? "text-white" : "text-gray-600"
              }`}
            >
              Ubrania
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedPage("outfits")}
            className={`mx-8 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedPage === "outfits"
                ? "bg-primary-100"
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            <Text
              className={`text-lg font-medium ${
                selectedPage === "outfits" ? "text-white" : "text-gray-600"
              }`}
            >
              Stylizacje
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center py-2 items-center bg-white">
          <View className="flex-row bg-gray-100 rounded-2xl p-1">
            <TouchableOpacity
              onPress={() => setSelectedCategory("friends")}
              className={`px-8 py-3 flex-row items-center space-x-2 rounded-xl ${
                selectedCategory === "friends"
                  ? "bg-white shadow-md"
                  : "bg-transparent"
              }`}
            >
              <Users 
                size={20} 
                color={selectedCategory === "friends" ? "black" : "#9CA3AF"} 
              />
              <Text
                className={`text-sm font-bold ml-1 ${
                  selectedCategory === "friends" ? "text-black" : "text-gray-400"
                }`}
              >
                Znajomi
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setSelectedCategory("public")}
              className={`px-8 py-3 flex-row items-center space-x-2 rounded-xl ${
                selectedCategory === "public"
                  ? "bg-white shadow-md"
                  : "bg-transparent"
              }`}
            >
              <Globe 
                size={20} 
                color={selectedCategory === "public" ? "black" : "#9CA3AF"} 
              />
              <Text
                className={`text-sm font-bold ml-1 ${
                  selectedCategory === "public" ? "text-black" : "text-gray-400"
                }`}
              >
                Wszyscy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedPage === "wardrobe" ? <WardrobeDiscover /> : <OutfitsDiscover />}
      </SafeAreaView>
    </View>
  );
};

export default WardrobePage;
