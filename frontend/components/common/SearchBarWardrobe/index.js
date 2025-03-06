import { View, TextInput, TouchableOpacity, ScrollView, Text} from "react-native";
import React from "react";
import { useState } from "react";

import{
    Search,
    LayoutGrid,
    SlidersHorizontal,
    X
}
from "lucide-react-native";

const SearchBarWardrobe = ({}) => {
    const [searchMode, setSearchMode] = useState(false);
    const [displayMode, setDisplayMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const categories = ["Boots", "Sandals", "Pumps", "Flats", "Sneakers", "Loafers", "Oxfords", "Slippers"];
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
                    <LayoutGrid className="text-black" size={30}/>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => setDisplayMode(!displayMode)}>
                            <SlidersHorizontal className="text-black" size={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSearchMode(true)}>
                        <Search className="text-black" size={30}/>
                        </TouchableOpacity>
                    </View>
                    </>
                )}
            </View>
            <View className="mt-24">
                {searchMode ? (null) :(
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    >
                        <View className="flex-row gap-2">
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    className={`px-4 py-2 rounded-full ${selectedCategory === cat ? "bg-black" : "bg-gray-200"}`}
                                    onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                >
                                    <Text className={`text-base ${selectedCategory === cat ? "text-white font-extrabold" : "text-black font-semibold"}`}>
                                        {cat}
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
