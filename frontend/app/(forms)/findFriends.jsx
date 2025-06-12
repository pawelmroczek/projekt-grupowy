import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput} from "react-native";
import { Search } from "lucide-react-native";


const findFriends = () => {

    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(!loading)
    };

    return (
        <View className="p-4 space-y-4"> {/* Ułożenie pionowe */}
            {/* Pole wyszukiwania i przycisk */}
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
                            <Text className="text-white font-semibold">Znajomy</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={inviteUser(item.id)}
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

