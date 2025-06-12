import { View, Text } from "react-native";
import React, { useContext, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";
import { useLocalSearchParams } from "expo-router";
import { TokenContext } from "../TokenContext";
import SearchBarOutfits from "../../components/common/SearchBarOutfits";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";

const Home = () => {
  const rawFilters = useLocalSearchParams();
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [displayMode, setDisplayMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [clothes, setClothes] = useState([]);

  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  return (
    <>
      <SearchBarOutfits
        displayMode={displayMode}
        onDisplayPress={setDisplayMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
      />
      <AddButton onPress={() => router.push("/addOutfits")} />
    </>
  );
};

export default Home;
