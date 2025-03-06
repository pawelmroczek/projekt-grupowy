import { View, Text, TouchableOpacity} from "react-native";
import React from "react";
import { router } from "expo-router";
import { X } from "lucide-react-native";

/**
 * TODO: Sortowanie od najnowszych
 * TODO: Sortowanie od najstarszych
 * TODO: Sortowanie alfabetycznie
 * TODO: Filtracja: kolory, czy brudne czy czyste
 */

const FilterClothes = ({}) => {

    const applyFilters = () => {
        router.push("/wardrobe");
    };
    return (
        <View className="flex-1 bg-white p-6">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-lg font-bold">Filter Options</Text>
                <TouchableOpacity onPress={() =>  router.push("/wardrobe")}>
                    <X className="text-black" size={30} />
                </TouchableOpacity>
            </View>


            {/* Przycisk zastosowania filtrów */}
            <TouchableOpacity
                onPress={applyFilters}
                className="mt-6 p-3 bg-black rounded-full"
            >
                <Text className="text-center text-white font-bold">Apply Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FilterClothes;