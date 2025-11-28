import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { router } from "expo-router";




import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import SearchBarWardrobe from "../../common/SearchBarWardrobe";
import AddButton from "./AddButton";
import { TokenContext } from "../../../lib/TokenContext";

const FormData = global.FormData;

const Wardrobe = () => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [clothes, setClothes] = useState([]);
  
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  const filteredClothes = useMemo(() => {
    console.log("Filtering clothes...");
    let result = clothes;
    result = selectedCategory ? result.filter((item) => item.type === selectedCategory) : result;
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
    if (Object.keys(filters).length === 0) {
      return result;
    }
  
    result = filters.cleanliness === "all" 
      ? result 
      : result.filter((item) => item.clean === (filters.cleanliness === "clean"));
  
    result = filters.size.length > 0 ? result.filter((item) => filters.size.includes(item.size)) : result;
  
    if (filters.sortBy) {
      result = [...result]; // Tworzymy kopię, aby uniknąć mutacji
      if (filters.sortBy === "Newest") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filters.sortBy === "Oldest") {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filters.sortBy === "Alphabetically") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
  
    return result;
  }, [filters, clothes, selectedCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      onPress={() => {
        router.push({
        pathname: "/clothDetails",
        params: { "name": item.name, "picture": item.picture, "id": item.id, "type": item.type, "color": item.color, "colorHex": item.colorHex, "size": item.size, "clean": item.clean, "visible": item.visible, "priority": item.priority, "category": item.category, "pictogramIds": item.pictogramIds, "seasons": item.seasons }
      })}
    }
    >
      <Image source={{ uri: item.picture }} style={[styles.image]} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <SearchBarWardrobe displayMode={displayMode} onDisplayPress={setDisplayMode} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} filters={filters}/>
      <FlatList
        data={filteredClothes}
        key={displayMode ? "single" : "double"}
        numColumns={displayMode ? 1 : 2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
      <AddButton onPress={() => router.push("/addClothes")} />
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

export default Wardrobe;
