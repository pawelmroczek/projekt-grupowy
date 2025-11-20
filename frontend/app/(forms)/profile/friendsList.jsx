import React, { use } from "react";
import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";

import { getFriendsList } from "../../../lib/friends/friends";
import { deleteFriend } from "../../../lib/friends/friends";
import { TokenContext } from "../../../lib/TokenContext";



const friendsList = () => {

    
    const { token, setToken } = useContext(TokenContext);
    const [friends, setFriends] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const friendsData = await getFriendsList(token);
                setFriends(friendsData);
            } catch (error) {
                console.error("Błąd przy pobieraniu listy znajomych:", error);
            }
        };

        fetchFriends();
    }, [reload]);

    const handleDelete = async (friendId) => {
        try {
            await deleteFriend(token, friendId);
            setReload(prev => !prev); // 🔹 wymusza ponowne pobranie listy
        } catch (error) {
            console.error("Błąd przy usuwaniu znajomego:", error);
        }
    };

    const renderItem = ({ item }) => (
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text>{item.username}</Text>
        <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            className="bg-red-500 px-3 py-1 rounded-full"
        >
            <Text className="text-white font-medium">Usuń</Text>
        </TouchableOpacity>
        </View>
    );

    return (
        <View className="p-4 space-y-4 mt-4">
            <Text className="text-xl font-bold mb-4 text-gray-900">Lista znajomych</Text>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

export default friendsList;

