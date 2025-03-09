import { View, TextInput, TouchableOpacity, ScrollView, Text, Modal} from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";

import{
    Search,
    LayoutGrid,
    SlidersHorizontal,
    X
}
from "lucide-react-native";

const SearchBarWardrobe = ({displayMode, onDisplayPress}) => {
    const [searchMode, setSearchMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const typeOptions = [
        { title: "Koszulka" },
        { title: "Spodnie" },
        { title: "Bluza" },
        { title: "Koszula" },
        { title: "Sweter" },
        { title: "Inne" },
      ];
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <View className="relative">
            <View className="absolute top-0 left-0 w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-10">
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
                            <X className="text-black" size={30}/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                    <TouchableOpacity onPress={() => onDisplayPress(!displayMode)}>
                    <LayoutGrid className="text-black" size={30}/>
                    </TouchableOpacity>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => router.push("/filterClothes")}>
                            <SlidersHorizontal className="text-black" size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSearchMode(true)}>
                        <Search className="text-black" size={30}/>
                        </TouchableOpacity>
                    </View>
                    </>
                )}
            </View>
            <View className="mt-24 mb-2">
                {searchMode ? (null) :(
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    >
                        <View className="flex-row gap-2">
                            {typeOptions.map((cat) => (
                                <TouchableOpacity
                                    key={cat.title}
                                    className={`px-4 py-2 rounded-full ${selectedCategory === cat.title ? "bg-black" : "bg-gray-200"}`}
                                    onPress={() => setSelectedCategory(selectedCategory === cat.title ? null : cat.title)}
                                >
                                    <Text className={`text-base ${selectedCategory === cat.title ? "text-white font-extrabold" : "text-black font-semibold"}`}>
                                        {cat.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

export default SearchBarWardrobe;
