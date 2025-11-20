import React, { use } from "react";
import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";

import { router } from "expo-router";
import { TokenContext } from "../../../lib/TokenContext";



const profileDetails = () => {

    const { token, setToken } = useContext(TokenContext);

    return (
        <View className="p-4 space-y-4 mt-4">
            <TouchableOpacity className="flex-row justify-between w-full bg-white rounded-xl py-4 px-5 shadow-sm active:scale-95"
                onPress={() => {router.push('profile/friendsList')}}
            >
                <Text className="text-base font-semibold text-gray-700">Zarządzaj znajomymi</Text>
                <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl">&gt;</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row justify-between w-full bg-white rounded-xl py-4 px-5 shadow-sm active:scale-95"
                onPress={() => {router.push('profile/changePasswordPage')}}
            >
                <Text className="text-base font-semibold text-gray-700">Zmień hasło</Text>
                <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl">&gt;</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default profileDetails;

