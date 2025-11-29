import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import React from "react";
import { router } from "expo-router";
import { getUserInfo } from "../../../../lib/friends/friends";
import { TokenContext } from "../../../../lib/TokenContext";
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileBlock() {

    const [userName, setUserName] = useState("User");
    const [avatarUrl, setAvatarUrl] = useState(null);
    
    const { token, setToken } = useContext(TokenContext);

    useFocusEffect(
        React.useCallback(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInfo(token);
                setUserName(response.username);
                setAvatarUrl(response.avatar);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych:", error);
            }
        };
        fetchData();
    }, []));

    return (
        <TouchableOpacity 
            className="flex-row justify-between items-center bg-white p-4 rounded-xl m-2" 
            onPress={() => {router.push({
                        pathname: "profile/profileDetails",
                        params: { userName: userName, avatarUrl: avatarUrl}
                    })}}
        >
            <View className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                <Image 
                    source={avatarUrl ? {uri: avatarUrl} : require("../../../../assets/images/profile/profilePlaceholder.png")}
                    className="w-full h-full"
                    resizeMode="cover" 
                />
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