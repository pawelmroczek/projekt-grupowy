import { View, Text, TouchableOpacity } from "react-native";
import React, { use, useState } from "react";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";  

const FilterClothes = () => {
    const params = useLocalSearchParams(); // Pobieramy parametry z routera

    // Inicjalizujemy filters na podstawie parametrów lub domyślnych wartości
    const [filters, setFilters] = useState({
        sortBy: params.sortBy || "Newest",
        size: params.size ? params.size.split(",") : [],
        cleanliness: params.cleanliness || "all",
    });
    
    useEffect(() => {  
        console.log(filters);
    }, [filters]);

    const toggleSort = (option) => {
        setFilters(prev => ({ ...prev, sortBy: prev.sortBy === option ? null : option }));
    };

    const toggleSize = (option) => {
        setFilters(prev => {
            const newSize = prev.size.includes(option)
                ? prev.size.filter(s => s !== option)
                : [...prev.size, option];
            return { ...prev, size: newSize };
        });
    };

    const setCleanliness = (option) => {
        setFilters(prev => ({ ...prev, cleanliness: option }));
    };

    const applyFilters = () => {
        router.replace({ pathname: "/wardrobe", params: filters });
    };

    const resetFilters = () => {
        setFilters({ sortBy: "Newest", size: [], cleanliness: "all" });
        //router.replace("/wardrobe");
    };

    return (
        <View className="flex-1 bg-white p-6">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-lg font-bold">Filter Options</Text>
                <TouchableOpacity onPress={() => router.replace("/wardrobe")}> 
                    <X className="text-black" size={30} />
                </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 mb-2">Sort by:</Text>
            <View className="flex-row justify-between mb-4">
                {['Newest', 'Oldest', 'Alphabetically'].map(option => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.sortBy === option ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => toggleSort(option)}
                    >
                        <Text className={`${filters.sortBy === option ? 'text-white' : 'text-black'}`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-sm text-gray-500 mb-2">Size:</Text>
            <View className="flex-row justify-between mb-4">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL' ].map(option => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.size.includes(option) ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => toggleSize(option)}
                    >
                        <Text className={`${filters.size.includes(option) ? 'text-white' : 'text-black'}`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-sm text-gray-500 mb-2">Cleanliness:</Text>
            <View className="flex-row justify-between mb-4">
                {['all', 'clean', 'dirty'].map(option => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.cleanliness === option ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => setCleanliness(option)}
                    >
                        <Text className={`${filters.cleanliness === option ? 'text-white' : 'text-black'}`}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                onPress={applyFilters}
                className="mt-6 p-3 bg-black rounded-full"
            >
                <Text className="text-center text-white font-bold">Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={resetFilters}
                className="mt-6 p-3 bg-black rounded-full"
            >
                <Text className="text-center text-white font-bold">Reset Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FilterClothes;
