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

import SearchBarWardrobe from "./SearchBarWardrobe";
import AddButton from "./AddButton";
import { TokenContext } from "../../../lib/TokenContext";

const FormData = global.FormData;

const Wardrobe = () => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [clothes, setClothes] = useState([]);

  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes, fetchClothes } = useContext(TokenContext);

  useEffect(() => {
    fetchClothes();
  }, [token]);

  const filteredClothes = useMemo(() => {
    let result = clothes;
    result = selectedCategory
      ? result.filter((item) => item.type === selectedCategory)
      : result;
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (searchText) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (Object.keys(filters).length === 0) {
      return result;
    }

    result =
      filters.cleanliness === "wszystkie"
        ? result
        : result.filter(
            (item) => item.clean === (filters.cleanliness === "czyste")
          );

    result =
      filters.size.length > 0
        ? result.filter((item) => filters.size.includes(item.size))
        : result;
    result = filters.category
      ? result.filter(
          (item) => item.category.toString() === filters.category.toString()
        )
      : result;

    if (filters.sortBy) {
      result = [...result]; // Tworzymy kopię, aby uniknąć mutacji
      if (filters.sortBy === "Od najnowszych") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filters.sortBy === "Od najstarszych") {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filters.sortBy === "Alfabetycznie") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return result;
  }, [filters, clothes, selectedCategory, searchText]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      onPress={() => {
        router.push({
          pathname: "/clothDetails",
          params: {
            name: item.name,
            picture: item.picture,
            id: item.id,
            type: item.type,
            color: item.color,
            colorHex: item.colorHex,
            size: item.size,
            clean: item.clean,
            visible: item.visible,
            priority: item.priority,
            category: item.category,
            pictogramIds: item.pictogramIds,
            seasons: item.seasons,
            isLoaned: item.isLoaned,
            user: item.user,
          },
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.picture }} style={[styles.image]} />
        {item.isLoaned && (
          <View style={styles.loanedBadge}>
            <Text style={styles.loanedText}>Wypożyczone</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{item.name}</Text>
      {item.isLoaned && item.user && (
        <View style={styles.loanedInfoContainer}>
          <Text style={styles.loanedFromText}>od: {item.user}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <SearchBarWardrobe
        displayMode={displayMode}
        onDisplayPress={setDisplayMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
        searchText={searchText}
        setSearchText={setSearchText}
      />
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
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
  loanedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  loanedText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  loanedInfoContainer: {
    marginTop: 4,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "center",
  },
  loanedFromText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
    textAlign: "center",
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Wardrobe;
