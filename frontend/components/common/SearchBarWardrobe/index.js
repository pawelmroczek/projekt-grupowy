import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";

import { Search, LayoutGrid, SlidersHorizontal, X } from "lucide-react-native";
import VerticalSelector from "../VerticalSelector";
import { typeOptions } from "../../../lib/typeOptions";

const SearchBarWardrobe = ({ displayMode, onDisplayPress, selectedCategory, setSelectedCategory, filters }) => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  


  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View className="">
        <View className="w-full flex-row items-center justify-between p-4 pt-2  ">
          {searchMode ? (
            <View className="flex-1 flex-row items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 pt-2 mt-1 pb-3">
              <TextInput
                className="flex-1 text-black"
                placeholder="Search..."
                placeholderTextColor="#828282"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchMode(false)}>
                <X className="text-black" size={30} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={() => onDisplayPress(!displayMode)}>
                <LayoutGrid className="text-black" size={30} />
              </TouchableOpacity>
              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => 
                router.push({ pathname: "/filterClothes", params: filters })
              }>
                  <SlidersHorizontal className="text-black" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSearchMode(true)}>
                  <Search className="text-black" size={30} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View className=" border-t border-[#d8d8d8] bg-gray-100">
          {searchMode ? null : (
            <VerticalSelector
              options={typeOptions}
              setValue={setSelectedCategory}
              value={selectedCategory}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchBarWardrobe;
