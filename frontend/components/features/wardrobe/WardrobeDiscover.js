import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import { router } from "expo-router";

import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import SearchBarWardrobe from "../../common/SearchBarWardrobe";
import AddButton from "./AddButton";
import { TokenContext } from "../../../lib/TokenContext";
import {
  getClothesFriends,
  getClothesPublic,
} from "../../../lib/clothes/discovery";
import {
  ArrowLeftFromLine,
  ArrowLeftRight,
  Shirt,
  User,
} from "lucide-react-native";

const FormData = global.FormData;

const WardrobeDiscover = ({ selectedCategory }) => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [clothes, setClothes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { token, setToken } = useContext(TokenContext);

  const fetchClothes = async (page) => {
    if (page != 1 && (loading || !hasMore)) return;
    setLoading(true);
    try {
      if (selectedCategory === "public") {
        const data = await getClothesPublic(token, page - 1, 10);

        const filteredData = data.filter((item) => !item.isLoaned);

        setClothes((prev) => [...prev, ...filteredData]);
        if (data.length < 10) setHasMore(false);
      } else {
        const data = await getClothesFriends(token, page - 1, 10);

        const filteredData = data.filter((item) => !item.isLoaned);

        setClothes((prev) => [...prev, ...filteredData]);
        if (data.length < 10) setHasMore(false);
      }
      setPage(page);
    } catch (error) {
      console.error("Błąd pobierania ubrań:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setClothes([]);
    setPage(1);
    setHasMore(true);
    fetchClothes(1);
  }, [selectedCategory]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleExchange = () => {
    setModalVisible(false);

    // Przekazujemy dane o wybranym ubraniu do strony wymiany
    router.push({
      pathname: "/exchangeClothes",
      params: {
        targetCloth: JSON.stringify(selectedItem),
      },
    });

    setSelectedItem(null);
  };

  const handleBorrow = () => {
    setModalVisible(false);

    // Przekazujemy dane o wybranym ubraniu do strony pożyczenia
    router.push({
      pathname: "/borrowClothes",
      params: {
        targetCloth: JSON.stringify(selectedItem),
      },
    });

    setSelectedItem(null);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.picture }} style={[styles.image]} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* <SearchBarWardrobe displayMode={displayMode} onDisplayPress={setDisplayMode} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} filters={filters}/> */}
      <FlatList
        data={clothes}
        key={displayMode ? "single" : "double"}
        numColumns={displayMode ? 1 : 2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        onEndReached={() => fetchClothes(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <Text className="text-lg text-center my-4 font-bold">
              Ładowanie...
            </Text>
          ) : null
        }
      />

      {/* Modal dla opcji wymiany/pożyczenia lub informacji o ubraniu */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View className="flex-1 justify-center items-center bg-black/60">
            <TouchableWithoutFeedback>
              <View className="w-11/12 bg-white p-6 rounded-3xl items-center shadow-lg">
                {selectedItem && (
                  <>
                    <View className="flex items-center justify-center bg-gray-100 rounded-2xl p-4 mb-4 w-full">
                      <Image
                        source={{ uri: selectedItem.picture }}
                        style={{
                          width: 180,
                          height: 180,
                          borderRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                    <Text className="text-2xl font-bold mb-2 text-gray-800">
                      {selectedItem.name}
                    </Text>

                    <View className="w-full mb-6 pb-4 border-b border-gray-200">
                      <View className="space-y-3">
                        {selectedCategory === "friends" && (
                          <View className="flex flex-row items-center space-x-2 bg-gray-50 p-3 rounded-xl">
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                              <Shirt size={20} color="#3B82F6" />
                            </View>
                            <View className="flex-1">
                              <Text className="text-xs text-gray-500">
                                Rozmiar
                              </Text>
                              <Text className="text-base text-gray-800 font-bold">
                                {selectedItem.size}
                              </Text>
                            </View>
                          </View>
                        )}

                        <View className="flex flex-row items-center space-x-2 bg-gray-50 p-3 rounded-xl">
                          <View className="w-10 h-10  rounded-full items-center justify-center">
                            <Image
                              source={
                                selectedItem.userAvatar
                                  ? { uri: selectedItem.userAvatar }
                                  : require("../../../assets/images/profile/profilePlaceholder.png")
                              }
                              className="w-full h-full"
                              resizeMode="cover"
                            />
                          </View>
                          <View className="flex-1">
                            <Text className="text-xs text-gray-500">
                              Właściciel
                            </Text>
                            <Text className="text-base text-gray-800 font-semibold">
                              {selectedItem.user}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {selectedCategory === "friends" && (
                      <Text className="text-gray-600 mb-4 text-center">
                        Co chcesz zrobić z tym ubraniem?
                      </Text>
                    )}
                  </>
                )}

                <View className="w-full flex space-y-3">
                  {selectedCategory === "friends" ? (
                    <View className="w-full space-y-2">
                      <TouchableOpacity
                        onPress={handleExchange}
                        className="w-full flex flex-row space-x-2 justify-center items-center bg-primary-100 py-2 rounded-lg active:scale-95"
                      >
                        <ArrowLeftRight color="white" size={22} />
                        <Text className="text-white text-center text-lg font-bold">
                          Wymiana
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleBorrow}
                        className="w-full flex flex-row space-x-2 justify-center items-center bg-primary-200 py-2 rounded-lg active:scale-95"
                        style={{
                          shadowColor: "#2A9D8F",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          elevation: 5,
                        }}
                      >
                        <ArrowLeftFromLine color="white" size={22} />
                        <Text className="text-white text-center text-lg font-bold">
                          Pożyczenie
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleCloseModal}
                        className="w-full shadow-xs bg-gray-100 py-2 rounded-lg active:scale-95"
                      >
                        <Text className="text-gray-700 text-center text-lg font-bold">
                          Anuluj
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={handleCloseModal}
                      className="w-full bg-blue-500 py-2 rounded-lg active:scale-95"
                      style={{
                        shadowColor: "#3B82F6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                      }}
                    >
                      <Text className="text-white text-center text-lg font-bold">
                        Zamknij
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    marginVertical: 10,
  },
  single: {
    width: "90%",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  double: {
    width: "45%",
    marginHorizontal: "2.5%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WardrobeDiscover;
