import React, { use } from "react";
import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import { Search } from "lucide-react-native";
import { getUsers, iviteSending } from "../../lib/friends/friends";
import { TokenContext } from "../TokenContext";



const findFriends = () => {

    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useContext(TokenContext);

    const handleSearch = async () => {
        setLoading(true);
        setUserList([]);
        console.log(token);
        const usersData = await getUsers(token, username);
        if (usersData) {
            const formattedUsers = usersData.map(user => ({
                id: user.id,
                username: user.username,
                isFriend: user.friends
            }));
            setUserList(formattedUsers);
            setLoading(false);
        } else {
            console.error("Błąd podczas pobierania użytkowników");
            setLoading(false);
        }
    };

    const inviteUser = async (id) => {
        console.log("Zapraszanie użytkownika o ID:", id);
        console.log("Token:", token);
        console.log("Dane do wysłania:", { toUser: id, type: "FRIENDS" });
        const response = await iviteSending(token, id, "FRIENDS");

        setUserList((prevList) =>
            prevList.map((user) =>
                user.id === id ? { ...user, isFriend: true } : user
            )
        );
    }

    return (
        <View className="p-4 space-y-4">
            <View className="flex-row items-center space-x-2">
                <View className="flex-row items-center flex-1 bg-gray-100 rounded-xl px-3 py-5">
                    <Search size={20} color="#6B7280" />
                    <TextInput
                    placeholder="Znajdź znajomego"
                    value={username}
                    onChangeText={setUsername}
                    className="ml-2 flex-1 text-base"
                    placeholderTextColor="#9CA3AF"
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSearch}
                    className="bg-primary-100 px-4 py-2 rounded-xl"
                >
                    <Text className="text-white font-semibold">Wyszukaj</Text>
                </TouchableOpacity>
            </View>

        {loading ? (
            <Text className="text-gray-500">Wyszukiwanie...</Text>
        ) : userList.length > 0 ? (
            <FlatList
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className="flex-row items-center justify-between p-3 bg-white rounded-xl border border-gray-200 mb-2">
                <View>
                    <Text className="text-base font-semibold">{item.username}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    {item.isFriend ? (
                        <View className="bg-gray-100 px-4 py-2 rounded-xl">
                            <Text className="text-black font-semibold">Zaproszono</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => inviteUser(item.id)}
                            className="bg-secondary-100 px-4 py-2 rounded-xl"
                        >
                            <Text className="text-white font-semibold">Zaproś</Text>
                        </TouchableOpacity>  
                    )}
                </View>
                </View>
            )}
            />
        ) : (
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">Brak wyników</Text>
            </View>
        )}
        </View>
    );
}

export default findFriends;

