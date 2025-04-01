import React, { useState, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";

import { getClothes } from "../../lib/clothes/clothes";
import { TokenContext } from "../TokenContext";

const FormData = global.FormData;

const Wardrobe = () => {
  const [displayMode, setDisplayMode] = useState(false);
  const [clothes, setClothes] = useState([]);
  
  const { token, setToken } = useContext(TokenContext);
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchClothes = async () => {
        const clothesData = await getClothes(token);
        //console.log("Pobrane dane:", clothesData);
        if (clothesData) {
          setClothes(clothesData);
        }
      };
      fetchClothes();
  
      return () => {
        // Opcjonalnie kod do czyszczenia, jeśli ekran opuścisz
        setClothes([]);
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      onPress={() => router.push({
        pathname: "/clothDetails",
        params: { "name": item.name, "picture": item.picture, "id": item.id, "type": item.type, "color": item.color, "size": item.size, "clean": item.clean}
      })
    }
    >
      <Image source={{ uri: item.picture }} style={[styles.image]} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SearchBarWardrobe displayMode={displayMode} onDisplayPress={setDisplayMode}/>
      <FlatList
        data={clothes}
        key={displayMode ? "single" : "double"}
        numColumns={displayMode ? 1 : 2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
      <AddButton onPress={() => router.push("/addClothes")} />
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
