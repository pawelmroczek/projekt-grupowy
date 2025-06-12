import React, { useEffect, useState } from "react";
import { ArrowLeft, Scroll } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OutfitSelector from "../../components/features/outfits/OutfitSelector";

export default function index() {
  const colors = ["wszystkie", "ciemne", "jasne", "kolorowe"];


  const clothes = [
    {
      clean: true,
      color: "blue",
      createdAt: "2025-06-12",
      id: 19,
      name: "jeansy",
      picture:
        "http://localhost:8888/uploads/2adaf94c-5b47-4c4b-af99-58f2a6d86c7e_IMG_0010.PNG",
      size: "M",
      type: "Spodnie",
      user: "p.m@gmail.com",
    },
    {
      clean: true,
      color: "gray",
      createdAt: "2025-06-12",
      id: 20,
      name: "",
      picture:
        "http://localhost:8888/uploads/ac556b31-7213-4e01-ab57-d5629922eb02_IMG_0008.PNG",
      size: "M",
      type: "Sweter",
      user: "p.m@gmail.com",
    },
    {
      clean: true,
      color: "blue",
      createdAt: "2025-05-16",
      id: 15,
      name: "test",
      picture:
        "http://localhost:8888/uploads/1c1d8533-f525-410a-b170-ba92b1213005_IMG_0010.PNG",
      size: "idle",
      type: "Koszula",
      user: "p.m@gmail.com",
    },
    {
      clean: true,
      color: "blue",
      createdAt: "2025-05-16",
      id: 16,
      name: "test2",
      picture:
        "http://localhost:8888/uploads/ba6078f0-8cc8-4d4d-9afd-bc83a61ca99e_IMG_0008.PNG",
      size: "idle",
      type: "Spodnie",
      user: "p.m@gmail.com",
    },
    {
      clean: true,
      color: "blue",
      createdAt: "2025-05-12",
      id: 11,
      name: "niebieska koszulka",
      picture:
        "http://localhost:8888/uploads/8fb64a0d-53f4-425d-a283-74645efd03e2_IMG_0008.PNG",
      size: "S",
      type: "Koszulka",
      user: "p.m@gmail.com",
    },
    {
      clean: true,
      color: "gray",
      createdAt: "2025-05-12",
      id: 12,
      name: "jeans",
      picture:
        "http://localhost:8888/uploads/c1c4b441-dba4-46d6-bcd2-e9c27ce70232_IMG_0010.PNG",
      size: "idle",
      type: "Spodnie",
      user: "p.m@gmail.com",
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log("Selected items:", selectedItems);
  }, [selectedItems]);

  const handleSelect = (item, type) => {
    if (item.id === 0) {
      setSelectedItems((prev) => {
        const updatedItems = prev.filter((i) => i.outfitType !== type);
        return updatedItems;
      });
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
      <View className="flex items-center flex-row ">
        <ArrowLeft size={15} color={"#909090"} />
        <Text className=""> Powrót</Text>
      </View>
      <Text className="text-2xl font-bold text-center mt-[-20px]">
        Dodaj Outfit
      </Text>
      <ScrollView>
        <OutfitSelector
          clothes={clothes}
          title="Nakrycie głowy"
          onSelect={(item) => handleSelect(item, "Nakrycie głowy")}
        />
        <OutfitSelector
          clothes={clothes}
          title="Górna część"
          onSelect={(item) => handleSelect(item, "Górna część")}
        />
        <OutfitSelector
          clothes={clothes}
          title="Dolna część"
          onSelect={(item) => handleSelect(item, "Dolna część")}
        />
        <OutfitSelector
          clothes={clothes}
          title="Buty"
          onSelect={(item) => handleSelect(item, "Buty")}
        />
        <OutfitSelector
          clothes={clothes}
          title="Dodatki"
          onSelect={(item) => handleSelect(item, "Dodatki")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
