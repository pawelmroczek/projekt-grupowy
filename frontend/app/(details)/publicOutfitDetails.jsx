import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { X } from "lucide-react-native";
import OutfitDetailsTile from "../../components/features/outfits/OutfitsDetails";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../assets/constants/types/types";
import { ipAddressNginx } from "../../lib/ipAddress";

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
      "Odzież wierzchnia": clothingTypeOptions
        .filter(item => item.type === "OUTWEAR")
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

  const parts = outfitClothes[0]?.userAvatar?.split("images-server:80") || [];
  const userAvatar = ipAddressNginx + parts[1];
  

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between p-4 bg-white shadow-sm pt-14 px-6">
        <View className="w-10 h-10" />
        <Text className="text-lg font-pbold" numberOfLines={1}>Szczegóły stroju</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <X className="text-black" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Outfit Name Card */}
        <View className="bg-white mx-4 mt-4 p-5 rounded-xl shadow-sm">
          <Text className="text-2xl font-pbold mb-2" numberOfLines={2}>{outfit.name}</Text>
          <View className="flex-row items-center">
            <View className="bg-primary-100 px-3 py-1.5 rounded-full">
              <Text className="text-white font-pmedium text-sm">{outfit.type}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center space-x-2 bg-gray-50 p-3 rounded-xl">
          <View className="w-10 h-10  rounded-full items-center justify-center">
            <Image
              source={
                userAvatar
                  ? { uri: userAvatar }
                  : require("../../assets/images/profile/profilePlaceholder.png")
              }
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-500">
              Właściciel
            </Text>
            <Text className="text-base text-gray-800 font-semibold">
              {outfitClothes[0]?.user}
            </Text>
          </View>
        </View>

        {/* Categorized Clothes */}
        <View className="mt-4 px-4 mb-6">
          {categorizedClothes.map((category) => (
            <OutfitDetailsTile
              key={category.category}
              category={category.category}
              clothes={category.clothes}
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
