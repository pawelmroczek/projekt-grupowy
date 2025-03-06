import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";

const FormData = global.FormData;

const Wardrobe = () => {
  const [displayMode, setDisplayMode] = useState(false);
  
  const clothes = [
    {
      id: 1,
      title: "T-shirt",
      image: require("../../assets/image.png"),
    },
    {
      id: 2,
      title: "Jeans",
      image: require("../../assets/image.png"),
    },
    {
      id: 3,
      title: "Shirt",
      image: require("../../assets/image.png"),
    },
    {
      id: 4,
      title: "Dress",
      image: require("../../assets/image.png"),
    },
    {
      id: 5,
      title: "Sweater",
      image: require("../../assets/image.png"),
    },
    {
      id: 6,
      title: "Jacket",
      image: require("../../assets/image.png"),
    },
    {
      id: 7,
      title: "Shorts",
      image: require("../../assets/image.png"),
    },
    {
      id: 8,
      title: "Skirt",
      image: require("../../assets/image.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, displayMode ? styles.single : styles.double]}
      onPress={() => router.push(`/clothes/${item.id}`)}
    >
      <Image source={item.image} style={[styles.image]} />
      <Text style={styles.title}>{item.title}</Text>
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
    resizeMode: "resize",
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Wardrobe;
