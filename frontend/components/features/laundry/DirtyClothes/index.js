import React from "react";
import { View, Text, FlatList } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useDirtyClothes from "../../../../app/useDirtyClothes";




const defaultClothes = [
  { name: "Koszulka", picture: "https://example.com/shirt.jpg", id: 1, type: "T-shirt", color: "Niebieski", size: "M", clean: false },
  { name: "Spodnie", picture: "https://example.com/pants.jpg", id: 2, type: "Jeans", color: "Czarny", size: "L", clean: false },
  { name: "Spodnie", picture: "https://example.com/pants.jpg", id: 2, type: "Jeans", color: "Czarny", size: "L", clean: false },
  { name: "Skarpetki", picture: "https://example.com/socks.jpg", id: 3, type: "Socks", color: "Biały", size: "One size", clean: false },
  { name: "Bluza", picture: "https://example.com/hoodie.jpg", id: 4, type: "Hoodie", color: "Szary", size: "XL", clean: false },
  { name: "Skarpetki", picture: "https://example.com/socks.jpg", id: 9, type: "Socks", color: "Biały", size: "One size", clean: false },
  { name: "Bluza", picture: "https://example.com/hoodie.jpg", id: 4, type: "Hoodie", color: "Szary", size: "XL", clean: false },
  { name: "Skarpetki", picture: "https://example.com/socks.jpg", id: 9, type: "Socks", color: "Biały", size: "One size", clean: false },
  { name: "Bluza", picture: "https://example.com/hoodie.jpg", id: 4, type: "Hoodie", color: "Szary", size: "XL", clean: false },
  { name: "Skarpetki", picture: "https://example.com/socks.jpg", id: 3, type: "Socks", color: "Biały", size: "One size", clean: false },
  { name: "Bluza", picture: "https://example.com/hoodie.jpg", id: 4, type: "Hoodie", color: "Morelowy", size: "XL", clean: false },
  { name: "Skarpetki", picture: "https://example.com/socks.jpg", id: 3, type: "Socks", color: "Owocowy", size: "One size", clean: false },
  { name: "Bluza", picture: "https://example.com/hoodie.jpg", id: 4, type: "Hoodie", color: "Szary", size: "XL", clean: false },
  { name: "Ręcznik", picture: "https://example.com/towel.jpg", id: 5, type: "Towel", color: "Zielony", size: "Duży", clean: false }
];


const getClothingColorCounts = (clothes) => {
  const categories = { Ciemne: 0, Białe: 0, Kolorowe: 0, Jasne: 0 };
  
  clothes.forEach((item) => {
    if (item.color === "Czarny" || item.color === "Szary") {
      categories.Ciemne += 1;
    } else if (item.color === "Biały") {
      categories.Białe += 1;
    } else if (item.color === "Beżowy" || item.color === "Jasnoszary") {
      categories.Jasne += 1;
    } else {
      categories.Kolorowe += 1;
    }
  });
  
  return categories;
};



const DirtyClothes = () => {
  const dirtyClothes2 = useDirtyClothes(); 
  const dirtyClothes = dirtyClothes2 && dirtyClothes2.length > 0 ? dirtyClothes2 : defaultClothes; // Sprawdzamy, czy jest coś w dirtyClothes, jeśli nie, przypisujemy defaultClothes
  const clothingColorCounts = getClothingColorCounts(dirtyClothes);
  const sortedColors = Object.entries(clothingColorCounts).sort((a, b) => b[1] - a[1]);
  const chartData = {
    labels: sortedColors.map(([color]) => color),
    datasets: [
      {
        data: sortedColors.map(([_, count]) => count)
      }
    ]
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow mt-4 mb-4">
      <Text className="text-lg font-bold mb-2 text-center">Brudne ubrania wg kolorów</Text>
      <BarChart
        data={chartData}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 10
          }
        }}
        fromZero
      />
    </View>
  );
};

export default DirtyClothes;