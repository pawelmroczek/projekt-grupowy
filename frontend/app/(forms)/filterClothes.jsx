import { View, Text, TouchableOpacity } from "react-native";
import React, { use, useState } from "react";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";  
import { SafeAreaView } from "react-native-safe-area-context";
import { CLOTHING_SIZES, SHOES_SIZES, ACCESSORY_SIZES } from "../../assets/constants/sizes/sizes";


const FilterClothes = () => {
    const params = useLocalSearchParams(); // Pobieramy parametry z routera

    // Inicjalizujemy filters na podstawie parametrów lub domyślnych wartości
    const [filters, setFilters] = useState({
        sortBy: params.sortBy || "Od najnowszych",
        category: params.category ? Number(params.category) : null,
        size: params.size ? params.size.split(",") : [],
        cleanliness: params.cleanliness || "wszystkie",
    });

    
    const [sizeOptions, setSizeOptions] = useState( filters.category === 2 ? ACCESSORY_SIZES : filters.category === 1 ? SHOES_SIZES : CLOTHING_SIZES);
    
    useEffect(() => {  
        console.log(filters);
    }, [filters]);

    useEffect(() => {
        setSizeOptions( filters.category === 2 ? ACCESSORY_SIZES : filters.category === 1 ? SHOES_SIZES : CLOTHING_SIZES);
    }, [filters.category]);

    const toggleSort = (option) => {
        setFilters(prev => ({ ...prev, sortBy: option }));
    };

    const toggleCategory = (option) => {
        if(!(filters.category === option && filters.category === 0) && !(filters.category === null && option === 0))
        {
            setFilters(prev => ({ ...prev, size: [] }));
        }
        setFilters(prev => ({ ...prev, category: prev.category === option ? null : option }));
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
        setFilters({ sortBy: "Od najnowszych", size: [], cleanliness: "wszystkie" });
        //router.replace("/wardrobe");
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-lg font-bold">Opcje filtrów</Text>
                <TouchableOpacity onPress={() => router.replace("/wardrobe")}> 
                    <X className="text-black" size={30} />
                </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500 mb-2">Sortuj:</Text>
            <View className="flex-row justify-between mb-4">
                {['Od najnowszych', 'Od najstarszych', 'Alfabetycznie'].map(option => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.sortBy === option ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => toggleSort(option)}
                    >
                        <Text className={`${filters.sortBy === option ? 'text-white' : 'text-black'}`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-sm text-gray-500 mb-2">Typ:</Text>
            <View className="flex-row justify-between mb-4">
                {['Ubrania', 'Buty', 'Akcesoria'].map((option, index) => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.category === index ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => toggleCategory(index)}
                    >
                        <Text className={`${filters.category === index ? 'text-white' : 'text-black'}`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-sm text-gray-500 mb-2">Rozmiar:</Text>
            <View className="flex-row justify-between mb-4">
                {sizeOptions.map(option => (
                    <TouchableOpacity 
                        key={option}
                        className={`p-2 rounded-full ${filters.size.includes(option) ? 'bg-black text-white' : 'bg-gray-200'}`}
                        onPress={() => toggleSize(option)}
                    >
                        <Text className={`${filters.size.includes(option) ? 'text-white' : 'text-black'}`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-sm text-gray-500 mb-2">Czystość:</Text>
            <View className="flex-row justify-between mb-4">
                {['wszystkie', 'czyste', 'brudne'].map(option => (
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
                <Text className="text-center text-white font-bold">Zastosuj</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={resetFilters}
                className="mt-6 p-3 bg-black rounded-full"
            >
                <Text className="text-center text-white font-bold">Resetuj</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default FilterClothes;
