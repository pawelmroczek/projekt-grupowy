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
import { fetchOutfits } from "../../../lib/outfits/outfits";
import { TokenContext } from "../../../lib/TokenContext";
import { fetchOutfitsFriends, fetchOutfitsPublic } from "../../../lib/clothes/discovery"; 



const OutfitsDiscover = ({selectedCategory}) => {
  
  const { token, setToken } = useContext(TokenContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [displayMode, setDisplayMode] = useState(false);

  const [outfits, setOutfits] = useState([]);


  const fetchOutfits = async (page) => {
    if (loading || !hasMore) return;
    setLoading(true);
      try {
        if (selectedCategory === "public") {
          const data = await fetchOutfitsPublic(token, page-1, 10);
          setOutfits((prev) => [...prev, ...data]);
          if (data.length < 10) setHasMore(false);
        } else {
          const data = await fetchOutfitsFriends(token, page-1, 10);
          setOutfits((prev) => [...prev, ...data]);
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
    setOutfits([]);
    setPage(1);
    setHasMore(true);
    fetchOutfits(1);
    console.log(outfits);
  }, [selectedCategory]);


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
          <Text className="text-center mt-1 uppercase text-gray-500">
            {outfit?.type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1">
          <FlatList
            data={outfits}
            key={displayMode ? "single" : "double"}
            numColumns={displayMode ? 1 : 2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            onEndReached={() => fetchOutfits(page+1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Text className="text-lg text-center my-4 font-bold" >Ładowanie...</Text> : null}
          />
      </View>
     
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

export default OutfitsDiscover;

