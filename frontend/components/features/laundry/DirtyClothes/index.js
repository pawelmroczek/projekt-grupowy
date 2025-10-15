import React from "react";
import { View, Text, FlatList } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useDirtyClothes from "../../../../app/useDirtyClothes";


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
  const dirtyClothes = useDirtyClothes(); 

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