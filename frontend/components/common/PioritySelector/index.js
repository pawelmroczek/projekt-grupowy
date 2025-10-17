import { Text, TouchableOpacity, View, Modal} from "react-native";
import { useState } from "react";
import React from "react";
import {CircleQuestionMark, Angry, Frown, Smile, Laugh, Meh} from "lucide-react-native";

const PioritySelector = ({ value, setValue }) => {

    const piorityValue = [0, 1, 2, 3, 4]
    const [modalVisible, setModalVisible] = useState(false);

    const label = {
        0: "Niski",
        1: "Średni-Niski",
        2: "Średni",
        3: "Średni-Wysoki",
        4: "Wysoki",
    };

    const description = {
        0: "Rzadko to noszę, raczej leży w szafie.",
        1: "Zakładam od czasu do czasu, ale bez entuzjazmu.",
        2: "Lubię to, noszę co jakiś czas.",
        3: "Często po to sięgam – dobrze się w tym czuję.",
        4: "Uwielbiam to! To jeden z moich ulubionych elementów.",
    };

    return (
        <View className="my-2">
            <View className="flex-row items-center justify-between">
                <Text className="text-base text-text-primary font-pmedium">
                    Piorytet:
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="mt-2 text-text-secondary font-pregular"
                >
                    <CircleQuestionMark />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mx-1 py-4">
                <TouchableOpacity
                    onPress={() => setValue(piorityValue[0])}
                    className={`flex-1 items-center border rounded-xl p-2 mx-1 
                        ${value === piorityValue[0] ?  " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Angry
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setValue(piorityValue[1])}
                    className={`flex-1 items-center border rounded-xl p-2 mx-1 ${value === piorityValue[1] ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Frown
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setValue(piorityValue[2])}
                    className={`flex-1 items-center border rounded-xl p-2 mx-1 ${value === piorityValue[2] ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Meh
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setValue(piorityValue[3])}
                    className={`flex-1 items-center border rounded-xl p-2 mx-1 ${value === piorityValue[3] ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Smile
                        size={40}
                        color="gray"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setValue(piorityValue[4])}
                    className={`flex-1 items-center border rounded-xl p-2 mx-1 ${value === piorityValue[4] ? " border-secondary-300": "bg-gray-200 border-gray-200 "}`}
                >
                    <Laugh
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
                            <Angry size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[0]}</Text>
                                <Text className="text-gray-500 text-sm">{description[0]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Frown size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[1]}</Text>
                                <Text className="text-gray-500 text-sm">{description[1]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Meh size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[2]}</Text>
                                <Text className="text-gray-500 text-sm">{description[2]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Smile size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[3]}</Text>
                                <Text className="text-gray-500 text-sm">{description[3]}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Laugh size={28} color="#6b7280" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium">{label[4]}</Text>
                                <Text className="text-gray-500 text-sm">{description[4]}</Text>
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

export default PioritySelector;
