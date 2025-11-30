import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { TokenContext } from "../../lib/TokenContext";
import OutfitDetailsTile from "../../components/features/outfits/OutfitsDetails";
import {
  clothingTypeOptions,
  shoesTypeOptions,
  accessoryTypeOptions,
} from "../../assets/constants/types/types";
import ModalBox from "../../components/features/outfits/ModalBox";
import VisibiltySelector from "../../components/common/VisibiltySelector";
import VisibilityWarning from "../../components/features/outfits/VisibilityWarning";
import { SafeAreaView } from "react-native-safe-area-context";

const smartOutfitOffer = () => {
  const params = useLocalSearchParams();
  const outfitObj = params?.outfitIds ? JSON.parse(params.outfitIds) : null;

  const outfitIds = outfitObj?.ids ?? [];

  const { clothes, setClothes } = useContext(TokenContext);

  const [visibility, setVisibility] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  //ENDPOINT do pon=bierania ubrania o id od użytkownika o id

  const outfitClothes = clothes.filter((cloth) =>
    outfitIds?.includes(cloth.id)
  );

  const dictionary = {
    "Nakrycie głowy": clothingTypeOptions
      .filter((item) => item.type === "HAT")
      .map((item) => item.label),
    "Górna część": clothingTypeOptions
      .filter((item) => item.type === "TOP" || item.type === "FULLBODY")
      .map((item) => item.label),
    "Dolna część": clothingTypeOptions
      .filter((item) => item.type === "BOTTOM")
      .map((item) => item.label),
    "Odzież wierzchnia": clothingTypeOptions
      .filter((item) => item.type === "OUTWEAR")
      .map((item) => item.label),
    Buty: shoesTypeOptions.map((item) => item.label),
    Akcesoria: accessoryTypeOptions.map((item) => item.label),
  };

  const categorizeClothes = (clothes, dictionary) => {
    const result = [];

    for (const [category, types] of Object.entries(dictionary)) {
      const filtered = clothes.filter((item) => types.includes(item.type));
      if (filtered.length > 0) {
        result.push({ category, clothes: filtered });
      }
    }

    return result;
  };

  const categorizedClothes = categorizeClothes(outfitClothes, dictionary);

  const handleSave = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="p-2">
      <View className="relative">
        <ScrollView className="mt-5">
          {outfitClothes.length === 0 ?
            <Text className="text-center text-gray-500">
              Brak ubrań do wyświetlenia.
            </Text> : null
          }
          {categorizedClothes.map((category) => (
            <OutfitDetailsTile
              key={category.category}
              category={category.category}
              clothes={category.clothes}
            />
          ))}
          <VisibiltySelector value={visibility} setValue={setVisibility} />

          <VisibilityWarning 
            clothes={outfitClothes} 
            outfitVisibility={visibility} 
          />

          <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
            <TouchableOpacity
              onPress={() => {
                handleSave();
              }}
              disabled={outfitClothes.length === 0}
              className="px-4 py-2 bg-primary-100 rounded-lg"
            >
              <Text className="text-white text-xl font-pregular">
                {"ZAPISZ"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.replace("/wardrobe");
              }}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              <Text className="text-white text-xl font-pregular">
                {"ANULUJ"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ModalBox
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItems={outfitClothes}
        visible={visibility}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default smartOutfitOffer;
