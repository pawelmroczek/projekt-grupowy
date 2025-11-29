import React, { use } from "react";
import { useState, useContext, useEffect, } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal} from "react-native";

import { getFriendsList } from "../../../lib/friends/friends";
import { deleteFriend } from "../../../lib/friends/friends";
import { TokenContext } from "../../../lib/TokenContext";



const friendsList = () => {

    
    const { token, setToken } = useContext(TokenContext);
    const [friends, setFriends] = useState([]);
    const [reload, setReload] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

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
            setIdToDelete(null);
            setReload(prev => !prev);
        } catch (error) {
            console.error("Błąd przy usuwaniu znajomego:", error);
        }
    };

    const renderItem = ({ item }) => (
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text>{item.username}</Text>
        <TouchableOpacity
            onPress={() => {
                setModalVisible(true);
                setIdToDelete(item.id);
            }}
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
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                 onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5">
                        <Text className="text-lg font-semibold text-center mb-4">
                            Czy na pewno chcesz usunąć znajomego?
                        </Text>
                
                        <View className="flex-row justify-around mt-4">
                            <TouchableOpacity
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-black font-pregular">Anuluj</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-500 px-4 py-2 rounded-lg"
                                onPress={async () => {
                                setModalVisible(false);
                                handleDelete(idToDelete);
                            }}
                            >
                                <Text className="text-white font-pregular">Tak</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default friendsList;

