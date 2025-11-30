import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Wardrobe from "../../components/features/wardrobe";
import { SafeAreaView } from "react-native-safe-area-context";
import OutfitsPage from "../../components/features/outfits";
import { TokenContext } from "../../lib/TokenContext";


const FormData = global.FormData;

const WardrobePage = () => {
  const [selectedPage, setSelectedPage] = useState("wardrobe");

  

  // const rawFilters = useLocalSearchParams();
  // const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);


  return (
    <View className="flex-1 bg-white pb-10">
      <SafeAreaView className="absolute bottom-[-40] top-0 left-0 right-0 pb-0">
        <View className="flex-row justify-center py-4 items-center bg-white border-b border-gray-100 ">
          <TouchableOpacity
            onPress={() => setSelectedPage("wardrobe")}
            className={`mx-8 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedPage === "wardrobe" 
                ? "bg-primary-100" 
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            <Text
              className={`text-lg font-medium ${
                selectedPage === "wardrobe" 
                  ? "text-white" 
                  : "text-gray-600"
              }`}
            >
              Szafa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedPage("outfits")}
            className={`mx-8 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedPage === "outfits" 
                ? "bg-primary-100" 
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            <Text
              className={`text-lg font-medium ${
                selectedPage === "outfits" 
                  ? "text-white" 
                  : "text-gray-600"
              }`}
            >
              Stylizacje
            </Text>
          </TouchableOpacity>
        </View>
        
        {selectedPage === "wardrobe" ? <Wardrobe /> : <OutfitsPage  />}
      </SafeAreaView>
    </View>
  );
};

export default WardrobePage;
