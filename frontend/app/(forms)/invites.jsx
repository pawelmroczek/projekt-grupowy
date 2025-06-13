import React from "react";
import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator} from "react-native";
import { TokenContext } from "../TokenContext";
import { acceptInvite, getInvites, rejectInvite } from "../../lib/friends/friends";

const invites = () => {

    const [invitesArray, setInvitesArray] = useState([]);
    const { token, setToken } = useContext(TokenContext);
    const [loading, setLoading] = useState(true);
    
    const loadInvites = async () => {
    try {
      setLoading(true);
      const data = await getInvites(token);
      setInvitesArray(data);
    } catch (error) {
      console.error("Błąd ładowania zaproszeń:", error);
    } finally {
      setLoading(false);
    }
  };

    const acceptUser = async (id) => {
        const data = await acceptInvite(token, id);
        setInvitesArray((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isFriend: true } : item
            )
        );
    }
    const rejectUser = async (id) => {
        await rejectInvite(token, id);
        setInvitesArray((prevList) => prevList.filter((item) => item.id !== id));
    };

    useEffect(() => {
        loadInvites();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-4 pt-6">
                {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#888" />
                </View>
                ) : invitesArray.length > 0 ? (
                <FlatList
                    data={invitesArray}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    renderItem={({ item }) => (
                    <View className="flex-row items-center justify-between p-3 bg-white rounded-xl border border-gray-200 mb-2">
                        <View>
                        <Text className="text-base font-semibold">{item.id}</Text>
                        </View>
                        <View className="flex-row items-center space-x-2">
                        {item.isFriend ? (
                            <View className="bg-green-500 px-4 py-2 rounded-xl">
                            <Text className="text-white font-semibold">Zaakceptowano</Text>
                            </View>
                        ) : (
                            <View className="flex-row space-x-2">
                            <TouchableOpacity
                                onPress={() => acceptUser(item.id)}
                                className="bg-secondary-100 px-4 py-2 rounded-xl"
                            >
                                <Text className="text-white font-semibold">Akceptuj</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => rejectUser(item.id)}
                                className="bg-red-500 px-4 py-2 rounded-xl"
                            >
                                <Text className="text-white font-semibold">Odrzuć</Text>
                            </TouchableOpacity>
                            </View>
                        )}
                        </View>
                    </View>
                    )}
                />
                ) : (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-400">Brak zaproszeń</Text>
                </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default invites;

