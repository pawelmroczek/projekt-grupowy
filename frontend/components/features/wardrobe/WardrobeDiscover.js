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

        setClothes((prev) => [...prev, ...data]);
        if (data.length < 10) setHasMore(false);
      } else {
        const data = await getClothesFriends(token, page - 1, 10);

        setClothes((prev) => [...prev, ...data]);
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
    if (selectedCategory === "friends") {
      setSelectedItem(item);
      console.log("Wybrano ubranie do wymiany/pożyczenia:", item);
      setModalVisible(true);
    }
  };

  const handleExchange = () => {
    console.log("Wymiana ubrania:", selectedItem);
    setModalVisible(false);
    
    // Przekazujemy dane o wybranym ubraniu do strony wymiany
    router.push({
      pathname: "/exchangeClothes",
      params: {
        targetCloth: JSON.stringify(selectedItem)
      }
    });
    
    setSelectedItem(null);
  };

  const handleBorrow = () => {
    console.log("Pożyczenie ubrania:", selectedItem);
    // Tutaj dodaj logikę dla pożyczenia
    setModalVisible(false);
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

      {/* Modal dla opcji wymiany i pożyczenia */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback>
              <View className="w-11/12 bg-white p-6 rounded-2xl items-center shadow-lg">
                {selectedItem && (
                  <>
                    <View
                      className="flex items-center justify-center bg-gray-200 rounded-full p-5 mb-2"
                    >
                      <Image
                        source={{ uri: selectedItem.picture }}
                        style={{
                          width: 150,
                          height: 150,
                         
                          
                        }}
                      />
                    </View>
                    <Text className="text-xl font-bold mb-2">
                      {selectedItem.name}
                    </Text>
                    <View className="w-full mb-4 border-b flex items-center border-gray-300 ">
                      <View>
                        <View className="flex flex-row items-center mb-4 space-x-1    w-full ">
                          <Shirt size={20} />
                          <Text className="text-base text-gray-600 ">
                            rozmiar:
                          </Text>
                          <Text className="text-base text-gray-700 font-bold ">
                            {selectedItem.size}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center mb-4   w-full ">
                          <User size={20} />
                          <Text className="text-base text-gray-600 ">
                            {selectedItem.user}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text className="text-gray-600 mb-6">
                      Co chcesz zrobić?
                    </Text>
                  </>
                )}

                <View className="w-full space-y-3">
                  <TouchableOpacity
                    onPress={handleExchange}
                    className="w-full flex flex-row space-x-2 justify-center items-center bg-primary-100 py-3 rounded-lg"
                  >
                    <ArrowLeftRight color="white" size="20" />
                    <Text className="text-white text-center text-lg pr-3  font-pmedium">
                      Wymiana
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleBorrow}
                    className="w-full flex flex-row space-x-2 justify-center items-center bg-primary-200 py-3 rounded-lg"
                  >
                    <ArrowLeftFromLine color="white" size="20" />
                    <Text className="text-white text-center text-lg font-pmedium">
                      Pożyczenie
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleCloseModal}
                    className="w-full border-secondary-300 border py-2 rounded-lg"
                  >
                    <Text className="text-secondary-300 text-center text-lg font-pmedium">
                      Anuluj
                    </Text>
                  </TouchableOpacity>
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
