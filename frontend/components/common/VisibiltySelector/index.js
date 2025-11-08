import { Text, TouchableOpacity, View, Modal} from "react-native";
import { useState } from "react";
import React from "react";
import { HatGlasses, Users, Globe, CircleQuestionMark} from "lucide-react-native";

const VisibiltySelector = ({ value, setValue }) => {

    const privateValue = 0;
    const friendValue = 1;
    const publicValue = 2;

    const [modalVisible, setModalVisible] = useState(false);

    const label = {
        0: "Prywatne",
        1: "Dla znajomych",
        2: "Publiczne",
    };

    const description = {
        0: "Tylko Ty możesz zobaczyć tę rzecz.",
        1: "Twoi znajomi mogą zobaczyć tę rzecz.",
        2: "Wszyscy mogą zobaczyć tę rzecz.",
    };

    return (
        <View className="my-2">
            <View className="flex-row items-center justify-between">
                <Text className="text-base text-text-primary font-pmedium">
                    Widoczność:
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="mt-2 text-text-secondary font-pregular"
                >
                    <CircleQuestionMark />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full px-6 py-4">
                <TouchableOpacity
                    onPress={() => setValue(privateValue)}
                    className={`flex-1 items-center border rounded-xl p-2 mx-4 
                        ${value === privateValue ?  " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <HatGlasses
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setValue(friendValue)}
                    className={`flex-1 items-center border rounded-xl p-2 mx-4 ${value === friendValue ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Users
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setValue(publicValue)}
                    className={`flex-1 items-center border rounded-xl p-2 mx-4 ${value === publicValue ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Globe
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/40">
                    <View className="bg-white w-11/12 rounded-2xl p-6">
                        <Text className="text-xl font-semibold mb-4 text-center">
                            Co oznaczają symbole?
                        </Text>
                        <View className="flex-row items-center mb-3">
                            <HatGlasses size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[privateValue]}</Text>
                                <Text className="text-gray-500 text-sm">{description[privateValue]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Users size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[friendValue]}</Text>
                                <Text className="text-gray-500 text-sm">{description[friendValue]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Globe size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[publicValue]}</Text>
                                <Text className="text-gray-500 text-sm">{description[publicValue]}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="mt-4 bg-primary-100 py-3 rounded-xl"
                        >
                            <Text className="text-white text-center font-semibold">Zamknij</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VisibiltySelector;
