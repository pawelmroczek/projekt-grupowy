import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Search, Shirt, WashingMachine } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { TokenContext } from "../TokenContext";
import VerticalSelector from "../../components/common/VerticalSelector";
import { useFocusEffect } from "@react-navigation/core";
import { getClothes, toggleClean } from "../../lib/clothes/clothes";

export default function index() {
  const colors = ["wszystkie", "ciemne", "jasne", "kolorowe"];
  const typeOptions = [
    "Koszulka",
    "Koszula",
    "Spodnie",
    "Sweter",
    "Kurtka",
    "Buty",
    "Sukienka",
    "Spódnica",
  ];

  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedClothes, setSelectedClothes] = useState([]);

  const { token, setToken } = useContext(TokenContext);
  
  const handleSubmit =()=>{

    const selectedClothesIds = selectedClothes.map((item) => item.id);

    toggleClean(selectedClothesIds, token).then((response) => {
      if (response) {
        
        router.push("/laundry");
      } else {
        console.error("Error fetching clothes:", response.status);
      }
    })
  }
  
  useEffect(() => {
    getClothes(token).then((response) => {
      if (response) {
        const cleanClothes = response.filter((item) => item.clean === true);
        setClothes(cleanClothes);

      } else {
        console.error("Error fetching clothes:", response.status);
      }
    });
  }, [token]);

  useEffect(() => {
    if (selectedCategory || selectedColor) {
      const filtered = clothes.filter((item) => {
        const matchesCategory =
          selectedCategory === null || item.type === selectedCategory;
        const matchesColor =
          selectedColor === null || item.color === selectedColor;

        return matchesCategory && matchesColor;
      });
      setFilteredClothes(filtered);
    }
  }, [selectedCategory, selectedColor,clothes]);

  

  const renderItem = ({ item }) => {
    const isSelected = selectedClothes.includes(item);

    return (
      <TouchableOpacity
        style={[styles.item, styles.double, isSelected && styles.selected]}
        onPress={() => {
          if (isSelected) {
            setSelectedClothes(selectedClothes.filter((i) => i !== item));
          } else {
            setSelectedClothes([...selectedClothes, item]);
          }
        }}
      >
        <Image source={{ uri: item.picture }} style={[styles.image]} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="flex items-center justify-between h-full  ">
        <View className="flex-row w-full items-center justify-between py-2 px-4 bg-white border-b border-gray-200">
          <View className="flex-row space-x-2 items-start justify-center  ">
            <Text className="text-xl font-pbold ">Dodaj do brudów</Text>
            <WashingMachine size={25} color={"#264653"} />
          </View>
          <Search size={30} color={"#264653"} />
        </View>
        <View className="h-[85%] ">
          <View className="items-start mx-auto flex  justify-center w-full rounded-lg ">
            <Text className="text-lg font-pmedium ml-2">Kolor</Text>
            <VerticalSelector
              options={colors}
              setValue={setSelectedColor}
              value={selectedColor}
            />
            <Text className="text-lg font-pmedium ml-2">Rodzaj</Text>
            <VerticalSelector
              options={typeOptions}
              setValue={setSelectedCategory}
              value={selectedCategory}
            />
          </View>
          <FlatList
            data={filteredClothes}
            key={"double"}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          className="bg-primary-100 w-[95%] p-2 px-8 rounded-md mb-4"
        >
          <Text className="text-center   text-base text-white font-plight uppercase">
            Zapisz zmiany
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  selected: {
    shadowOpacity: 0,
    borderBlockColor: "#264653",
    borderWidth: 1,
    
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
