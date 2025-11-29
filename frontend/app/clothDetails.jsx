import React, { useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { X, Pencil, UserCircle } from "lucide-react-native";
import { clothesDeleting, getOutfitsCount } from "../lib/clothes/clothes";

import { getClothes } from "../lib/clothes/clothes";
import { TokenContext } from "../lib/TokenContext";
import {
  visibilityDescription,
  visibilityImages,
  visibilityLabel,
} from "../assets/constants/visibilty/visibilty";

const clothDetails = () => {
  const cloth = useLocalSearchParams();
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [outfitsCount, setOutfitsCount] = useState(0);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDelete = async (id) => {
    const count = await getOutfitsCount(token, id);
    if (count !== 0) {
      setOutfitsCount(count);
      setPendingDeleteId(id);
      setModalVisible(true);
      return;
    }

    await proceedDelete(id);
  };

  const proceedDelete = async (id) => {
    setModalVisible(false);
    const serverresponse = await clothesDeleting(id, token);
    const clothesData = await getClothes(token);
    setClothes(clothesData);
    router.replace("/wardrobe");
  };

  const VisibilityIcon = visibilityImages[cloth.visible];

  return (
    <>
      <View className="relative">
        <View className=" w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-14 px-6">
          {!cloth.isLoaned && (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/addClothes",
                  params: {
                    name: cloth.name,
                    picture: cloth.picture,
                    id: cloth.id,
                    type: cloth.type,
                    color: cloth.color,
                    colorHex: cloth.colorHex,
                    size: cloth.size,
                    clean: cloth.clean,
                    visible: cloth.visible,
                    category: cloth.category,
                    priority: cloth.priority,
                    pictogramIds: cloth.pictogramIds,
                    seasons: cloth.seasons,
                  },
                });
              }}
            >
              <Pencil className="text-black" size={30} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => router.back()}>
            <X className="text-black" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView className="mt-5">
          <View className="relative">
            <Image source={{ uri: cloth.picture }} style={[styles.image]} />
            {cloth.isLoaned === "true" && (
              <View
                className="absolute top-4 right-4 bg-purple-500 px-4 py-2 rounded-full"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text className="text-white font-bold text-sm">
                  Wypożyczone
                </Text>
              </View>
            )}
          </View>
          <View className="flex mt-8 ">
            {/* Zaokrąglona biała sekcja */}
            <View className="bg-white  rounded-t-3xl p-5 flex">
              <Text className="text-2xl font-bold mb-2">{cloth.name}</Text>

              {cloth.isLoaned === "true" && cloth.user && (
                <View
                  className="bg-purple-50 border-2 border-purple-200 p-3 mb-3 flex flex-row items-center space-x-3 rounded-xl"
                  style={{
                    shadowColor: "#8B5CF6",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center">
                    <UserCircle size={24} color="#FFFFFF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-purple-600 font-semibold">
                      Wypożyczone od:
                    </Text>
                    <Text className="text-base text-purple-800 font-bold">
                      {cloth.user}
                    </Text>
                  </View>
                </View>
              )}

              <Text className="text-base text-gray-600">
                Rozmiar: {cloth.size}
              </Text>
              <Text className="text-base text-gray-600">Typ: {cloth.type}</Text>
              <Text className="text-base text-gray-600">
                Kolor: {cloth.color}
              </Text>
              <View className="bg-gray-200 p-3 mt-2 flex flex-row items-center space-x-2 rounded-lg px-3">
                <VisibilityIcon size={35} color="gray" />
                <View>
                  <Text className="text-base text-gray-600 font-semibold">
                    Widoczność: {visibilityLabel[cloth.visible]}
                  </Text>
                  <Text className="text-sm text-gray-600 ">
                    {visibilityDescription[cloth.visible]}
                  </Text>
                </View>
              </View>
              <View className="items-center space-y-3   py-3.5 rounded-xl w-full flex justify-center bg-white-100 pb-40">
                {!cloth.isLoaned && (
                  <TouchableOpacity
                    onPress={() =>
                      router.replace({
                        pathname: "/addClothes",
                        params: {
                          name: cloth.name,
                          picture: cloth.picture,
                          id: cloth.id,
                          type: cloth.type,
                          color: cloth.color,
                          colorHex: cloth.colorHex,
                          size: cloth.size,
                          clean: cloth.clean,
                          visible: cloth.visible,
                          category: cloth.category,
                          priority: cloth.priority,
                          pictogramIds: cloth.pictogramIds,
                          seasons: cloth.seasons,
                        },
                      })
                    }
                    className="px-4  w-full flex items-center py-2 border text-black border-primary-100 rounded-lg"
                  >
                    <Text className="text-black text-xl font-pregular">
                      {"EDYTUJ"}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(cloth.id);
                  }}
                  className="px-4 py-2 w-full flex items-center bg-red-500 rounded-lg"
                >
                  <Text className="text-white text-xl font-pregular">
                    {"Usuń"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-2xl w-4/5 p-6 shadow-lg">
            <Text className="text-xl font-bold text-center mb-3">
              Usunąć to ubranie?
            </Text>
            <Text className="text-base text-center mb-6">
              To ubranie znajduje się w {outfitsCount} stylizacj
              {outfitsCount === 1 ? "i" : "ach"}. Usunięcie go spowoduje również
              usunięcie tych stylizacji.
            </Text>
            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-6 py-2 rounded-xl"
              >
                <Text className="text-black font-semibold">Anuluj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => proceedDelete(pendingDeleteId)}
                className="bg-red-500 px-6 py-2 rounded-xl"
              >
                <Text className="text-white font-semibold">Usuń</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default clothDetails;
