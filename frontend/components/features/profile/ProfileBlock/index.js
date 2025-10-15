import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function ProfileBlock() {

    //imageSource = backgroundImage;
    const userName = "User";

    return (
        <TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-xl m-2" onPress={() => {router.push('/profileDetails')}}>
            <View className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                <Image source={{ uri: 'https://via.placeholder.com/100' }}/>
            </View>
            <View className="flex-1 mx-4">
                <Text className="text-xl font-bold">Cześć, {userName}!</Text>
                <Text className="text-gray-500 italic text-sm">Zarządzaj kontem</Text>
            </View>
            <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                <Text className="text-xl">&gt;</Text>
            </View>
        </TouchableOpacity>
    );
}