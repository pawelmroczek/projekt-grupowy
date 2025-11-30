import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { X } from "lucide-react-native";
import OutfitDetailsTile from "../../components/features/outfits/OutfitsDetails";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../assets/constants/types/types";

const publicOutfitDetails = () => {
  const outfit = useLocalSearchParams();
 
  const outfitClothes = outfit.clothes ? JSON.parse(outfit.clothes) : [];

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

  return (
    <>
      <View className="relative">
        <View className=" w-full flex-row items-center justify-between p-4 bg-white shadow-md pt-14 px-6">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/addOutfits",
                params: {                  
                  id: outfit.id,              
                },
              })
            }
          >
            {/* <Pencil className="text-black" size={30} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <X className="text-black" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView className="mt-5">
          {categorizedClothes.map((category) => (
            <OutfitDetailsTile
              key={category.category}
              category={category.category}
              clothes={category.clothes}
            />
          ))}
          <View className="flex mt-8 mb-10">
            <View className="bg-white  rounded-t-3xl p-5 flex">
              <Text className="text-2xl font-bold mb-2">{outfit.name}</Text>
              <Text className="text-base text-gray-600">
                Typ: {outfit.type}
              </Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
    </>
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

export default publicOutfitDetails;
