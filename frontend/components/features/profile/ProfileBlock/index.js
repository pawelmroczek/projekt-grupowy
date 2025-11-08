import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import React from "react";
import { router } from "expo-router";
import { getUserInfo } from "../../../../lib/friends/friends";
import { TokenContext } from "../../../../lib/TokenContext";



export default function ProfileBlock() {

    const [userName, setUserName] = useState("User");
    
    const { token, setToken } = useContext(TokenContext);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUserInfo(token);
            setUserName(response.username);
        } catch (error) {
            console.error("Błąd przy pobieraniu danych:", error);
        }
    };

    fetchData();
  }, []);

    return (
        <TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-xl m-2" onPress={() => {router.push('profile/profileDetails')}}>
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