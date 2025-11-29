import React, { use } from "react";
import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { TokenContext } from "../../../lib/TokenContext";
import { deleteAvatar } from "../../../lib/avatar/avatar";
import { uploadAvatar } from "../../../lib/avatar/avatar";
import { selectImageFromLibrary, captureImage } from "../../../lib/clothes/picture_logic";
import { Images, Camera } from "lucide-react-native";

const profileDetails = () => {

    const user = useLocalSearchParams();

    const [userName, setUserName] = useState(user.userName);
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

    const { token, setToken } = useContext(TokenContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteAvatar(token);
            setAvatarUrl(null);
        } catch (error) {
            console.error("Błąd przy usuwaniu zdjęcia profilowego:", error);
        }
    };

    const handleSelectImage = async (fromCamera) => {
    
        let image = null;
        if (fromCamera) {
            image = await captureImage();
        } else {
            console.log("Wybieranie z galerii");
            image = await selectImageFromLibrary();
        }

        if (image) {
            const uploadedUrl = await uploadAvatar(token, image);
            if (uploadedUrl) {
                setAvatarUrl(uploadedUrl.avatarUrl);
            }
        }
        if(image)
        {
            setImageModalVisible(false);
            router.back();
        }
    };

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
            <TouchableOpacity className="flex-row justify-between w-full bg-white rounded-xl py-4 px-5 shadow-sm active:scale-95"
                onPress={() => {setImageModalVisible(true)}}
            >
                <Text className="text-base font-semibold text-gray-700"> { avatarUrl ? "Zmień" : "Dodaj" } zdjęcie profilowe</Text>
                <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl">&gt;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                className={`flex-row justify-between w-full rounded-xl py-4 px-5 shadow-sm active:scale-95 ${avatarUrl ? 'bg-white' : 'bg-gray-200'}`}
                style={{ opacity: avatarUrl ? 1 : 0.5 }}
                disabled={!avatarUrl}
                onPress={() => {setModalVisible(true)}}
            >
                <Text className="text-base font-semibold text-gray-700">Usuń zdjęcie profilowe</Text>
                <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
                    <Text className="text-xl">&gt;</Text>
                </View>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5">
                        <Text className="text-lg font-semibold text-center mb-4">
                            Czy na pewno chcesz usunąć zdjęcie profilowe?
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
                                    handleDelete();
                                }}
                            >
                                <Text className="text-white font-pregular">Tak</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent
                visible={imageModalVisible}
                animationType="fade"
                onRequestClose={() => setImageModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50 px-6">
                    <View className="bg-white p-6 rounded-2xl w-full">
                        
                        <Text className="text-xl font-bold text-center mb-4">
                            Skąd chcesz dodać zdjęcie?
                        </Text>

                        <View className="flex-row justify-around mt-4">
                            
                            <TouchableOpacity
                                onPress={() => handleSelectImage(false)}
                                className="items-center p-4 rounded-xl border border-gray-300 w-28"
                            >
                                <Images size={28} color="#4B5563" />
                                <Text className="mt-2 text-gray-700 font-medium text-sm">Galeria</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSelectImage(true)}
                                className="items-center p-4 rounded-xl border border-gray-300 w-28"
                            >
                                <Camera size={28} color="#4B5563" />
                                <Text className="mt-2 text-gray-700 font-medium text-sm">Aparat</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            className="mt-6 bg-gray-200 py-3 rounded-xl"
                            onPress={() => setImageModalVisible(false)}
                        >
                            <Text className="text-black text-center font-semibold">Anuluj</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default profileDetails;

