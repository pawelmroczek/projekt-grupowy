import { View, Text, TouchableOpacity, Modal, ScrollView, Image } from "react-native";
import React, { useState, useContext } from "react";
import { LAUNDRY_ICONS, LAUNDRY_ICONS_NAMES } from "../../../../assets/constants/laundry_icons/laundry_icons";
import { X, ListTodo, Camera, Eraser } from "lucide-react-native";
import { captureImage } from "../../../../lib/clothes/picture_logic";
import { laundryIconsClassification } from "../../../../lib/ml";
import { TokenContext } from "../../../../app/TokenContext";

export default function LaundryIconsSelector({ selectedIcons, setSelectedIcons }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { token, setToken } = useContext(TokenContext);
    return (
        <View className="my-2">
            <View className="flex-row items-center justify-between">
                <Text className="text-base text-text-primary font-pmedium">
                    Piktogramy z metki:
                </Text>
                <View className="flex-row space-x-3">
                    <TouchableOpacity 
                        onPress={async () => {
                            const imageResult = await captureImage();
                            const formData = new FormData();
                            formData.append("file", {
                                uri: imageResult.uri,
                                name: "photo.jpg",
                                type: imageResult.type,
                            });
                            const mlResult = await laundryIconsClassification(formData, token);
                            const detectedIndexes = mlResult.detections.map(det => 
                                LAUNDRY_ICONS_NAMES.indexOf(det.class)
                            );
                            setSelectedIcons(detectedIndexes.sort((a, b) => a - b));
                        }}
                        className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center">
                        <Camera />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center"
                        onPress={() => setModalVisible(true)}
                    >
                        <ListTodo />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="w-10 h-10 bg-gray-200 rounded-lg items-center justify-center"
                        onPress={() => setSelectedIcons([])}
                        disabled={selectedIcons.length === 0}
                        style={{ opacity: selectedIcons.length === 0 ? 0.5 : 1 }}
                    >
                        <Eraser />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row flex-wrap mt-2">
                {selectedIcons && selectedIcons.length > 0 ? (
                    selectedIcons.map((icon, index) => (
                        <View
                            key={index}
                            className="w-[14%] aspect-square m-1 rounded-lg items-center justify-center border-2 border-gray-300"
                        >
                            <Image source={LAUNDRY_ICONS[icon]} className="w-8 h-8" />
                        </View>
                    ))
                ) : (
                    <View className="w-full items-center justify-center m-3 h-8">
                        <Text className="text-gray-500">Nie wybrano piktogramów</Text>
                    </View> 
                )}
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View className="flex-1 bg-white">
                    <View className="flex-row justify-end p-4 my-4">
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <X size={40}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ padding: 10 }}>
                        <View className="flex-row flex-wrap justify-between">
                            {LAUNDRY_ICONS_NAMES.map((icon, index) => {
                                const isSelected = selectedIcons.includes(index);

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        className={`w-[15%] aspect-square m-1 rounded-lg items-center justify-center border-2
                                        ${isSelected ? "border-secondary-300" : "border-gray-200"}`}
                                        onPress={() => {
                                            setSelectedIcons((prev) => {
                                                let newSelected;
                                                if (isSelected) {
                                                    newSelected = prev.filter((i) => i !== index);
                                                } else {
                                                    newSelected = [...prev, index];
                                                }
                                                return newSelected.sort((a, b) => a - b);
                                            });
                                        }}
                                    >
                                        <Image source={LAUNDRY_ICONS[index]} className="w-8 h-8" />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}
