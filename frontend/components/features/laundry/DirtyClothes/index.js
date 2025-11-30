import React from "react";
import { View, Text, FlatList } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useDirtyClothes from "../../../../lib/useDirtyClothes";
import { getColorGroup } from "../../../../assets/constants/colors/colors";


const getClothingColorCounts = (clothes) => {
  const categories = {
    białe: 0,
    jasne: 0,
    ciemne: 0,
    kolorowe: 0,
  };

  clothes.forEach((item) => {
    const group = getColorGroup(item.color);
    categories[group] += 1;
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

  const maxCount = Math.max(...chartData.datasets[0].data);
  
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
        fromNumber={ maxCount < 4 ? 4 : maxCount + (4 - maxCount%4) }
        fromZero
      />
    </View>
  );
};

export default DirtyClothes;