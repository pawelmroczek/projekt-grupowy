import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";
import { useLocalSearchParams } from "expo-router";
import { TokenContext } from "../TokenContext";
import SearchBarOutfits from "../../components/common/SearchBarOutfits";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";
import { fetchOutfits } from "../../lib/outfits/outfits";

const Home = () => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  const [outfits, setOutfits] = useState([]);
  const [filteredOutfits, setFilteredOutfits] = useState([]);

  useEffect(() => {
    fetchOutfits(token).then((data) => {
      setOutfits(data);
      console.log("Fetched outfits:", data);
      setOutfits([
        { id: 1, clothesIds: [1, 2], name: "tesr1", type: "Sportowe" },
        { id: 2, clothesIds: [1, 2], name: "tesr1", type: "Casualowe" },
      ]);
    });
  }, [token]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = outfits.filter(
        (outfit) => outfit.type === selectedCategory
      );
      setFilteredOutfits(filtered);
    } else {
      setFilteredOutfits(outfits);
    }
  }, [selectedCategory, outfits]);



  const renderItem = ({ item: outfit }) => {
    const items = outfit?.clothesIds.map((id) => {
      const item = clothes.find((cloth) => cloth.id === id);
      return item ? { ...item, outfit } : null;
    });

    return (
      <TouchableOpacity
        style={[styles.item, displayMode ? styles.single : styles.double]}
        onPress={() =>
          router.push({
            pathname: "/outfitDetails",
            params: {
              name: outfit.name,
              clothesIds: outfit.clothesIds,
              id: outfit.id,
              type: outfit.type,
            },
          })
        }
      >
        <View style={styles.imageContainer}>
          {items?.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.picture }}
              style={styles.image}
            />
          ))}
        </View>
        <View>
          <Text className="font-bold text-center">{outfit?.name}</Text>
          <Text className="text-center mt-1 uppercase text-gray-500">{outfit?.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SearchBarOutfits
        displayMode={displayMode}
        onDisplayPress={setDisplayMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
      />
      <View className="flex-1">
        <FlatList
          data={filteredOutfits}
          key={displayMode ? "single" : "double"}
          numColumns={displayMode ? 1 : 2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      </View>
      <AddButton onPress={() => router.push("/addOutfits")} />
    </>
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
    justifyContent: "space-between",
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
    width: "46%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },

  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
});

export default Home;
