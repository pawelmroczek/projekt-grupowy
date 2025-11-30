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
import HorizontalSelector from "../../../common/HorizontalSelector";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../../../assets/constants/types/types";

const SearchBarWardrobe = ({ displayMode, onDisplayPress, selectedCategory, setSelectedCategory, filters, searchText, setSearchText }) => {
  const [searchMode, setSearchMode] = useState(false);  


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
                router.replace({ pathname: "/filterClothes", params: filters })
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
            <HorizontalSelector
              options={[...clothingTypeOptions.map(item => item.label), ...shoesTypeOptions.map(item => item.label), ...accessoryTypeOptions.map(item => item.label)]}
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
