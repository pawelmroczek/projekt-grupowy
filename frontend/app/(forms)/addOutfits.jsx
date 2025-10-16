import { useContext, useEffect, useState } from "react";
import { ArrowLeft, CirclePlus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OutfitSelector from "../../components/features/outfits/OutfitSelector";
import { router, useLocalSearchParams } from "expo-router";
import { TokenContext } from "../TokenContext";
import ModalBox from "../../components/features/outfits/ModalBox";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../assets/constants/types/types";

export default function Index() {
  const { clothes, setClothes } = useContext(TokenContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log("Clothes", clothes);

  const colors = ["wszystkie", "ciemne", "jasne", "kolorowe"];
  const dictionary = {
    "Nakrycie głowy": clothingTypeOptions
      .filter(item => item.type === "HAT")
      .map(item => item.label),
    "Górna część": clothingTypeOptions
      .filter(item => item.type === "TOP" || item.type === "FULLBODY")
      .map(item => item.label), 
    "Dolna część": clothingTypeOptions
      .filter(item => item.type === "BOTTOM")
      .map(item => item.label),
    Buty: shoesTypeOptions.map(item => item.label),
    Akcesoria: accessoryTypeOptions.map(item => item.label),
  };


  const clothesFiltredByType = (type) =>
    clothes.filter((item) => dictionary[type].includes(item.type));

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleSelect = (item, type) => {
    if (item.id === 0) {
      setSelectedItems((prev) => prev.filter((i) => i.outfitType !== type));
      return;
    }

    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some((i) => i.outfitType === type);
      if (isAlreadySelected) {
        return prev.map((i) =>
          i.outfitType === type ? { id: item.id, outfitType: type } : i
        );
      } else {
        return [...prev, { id: item.id, outfitType: type }];
      }
    });
  };

  return (
    <SafeAreaView className="p-2">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex items-center flex-row z-30"
      >
        <ArrowLeft size={15} color={"#909090"} />
        <Text className=""> Powrót</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mt-[-20px]">
        Dodaj Outfit
      </Text>

      <ScrollView>
        {[
          "Nakrycie głowy",
          "Górna część",
          "Dolna część",
          "Buty",
          "Akcesoria",
        ].map((category) => (
          <OutfitSelector
            key={category}
            clothes={clothesFiltredByType(category)}
            title={category}
            onSelect={(item) => handleSelect(item, category)}
          />
        ))}

        <TouchableOpacity onPress={handleSave}>
          <View className="bg-primary-200 rounded-lg p-2 m-2 items-center justify-center flex-row space-x-2">
            <CirclePlus size={20} color={"#fff"} />
            <Text className="text-lg text-white text-center">Zapisz</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <ModalBox
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItems={selectedItems}
      />
    </SafeAreaView>
  );
}
