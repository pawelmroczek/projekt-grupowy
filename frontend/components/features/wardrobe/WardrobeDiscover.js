import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import SearchBarWardrobe from "../../common/SearchBarWardrobe";
import AddButton from "./AddButton";
import { TokenContext } from "../../../lib/TokenContext";
import { getClothesFriends, getClothesPublic } from "../../../lib/clothes/discovery";

const FormData = global.FormData;

const WardrobeDiscover = ({selectedCategory}) => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const [clothes, setClothes] = useState([]);

  const { token, setToken } = useContext(TokenContext);


  const fetchClothes = async (page) => {
    if (loading || !hasMore) return;
    setLoading(true);
      try {
        if (selectedCategory === "public") {
          const data = await getClothesPublic(token, page-1, 10);
          setClothes((prev) => [...prev, ...data]);
          if (data.length < 10) setHasMore(false);
        } else {
          const data = await getClothesFriends(token, page-1, 10);
          setClothes((prev) => [...prev, ...data]);
          if (data.length < 10) setHasMore(false);
        }
        setPage(page);
      } catch (error) {
        console.error("Błąd pobierania ubrań:", error);
      }
      finally
      {
        setLoading(false);
      }
    };

  useEffect(() => {
    setClothes([]);
    setPage(1);
    setHasMore(true);
    fetchClothes(1);
  }, [selectedCategory]);

  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      // onPress={() =>
      //   router.push({
      //     pathname: "/clothDetails",
      //     params: {
      //       name: item.name,
      //       picture: item.picture,
      //       id: item.id,
      //       type: item.type,
      //       color: item.color,
      //       size: item.size,
      //       clean: item.clean,
      //       visibility: item.visibility,
      //       priority: item.priority,
      //       category: item.category,
      //     },
      //   })
      // }
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
        onEndReached={() => fetchClothes(page+1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text className="text-lg text-center my-4 font-bold" >Ładowanie...</Text> : null}
      />
      
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
