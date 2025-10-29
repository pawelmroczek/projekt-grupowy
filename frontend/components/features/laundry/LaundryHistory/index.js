import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AArrowDown, Frown, History } from "lucide-react-native";
import { fetchLaundries } from "../../../../lib/laundry/fetchLaundries";
import { TokenContext } from "../../../../app/TokenContext";

export default function LaundryHistory({ laundries }) {
  // Tutaj można dodać fetch do pobrania historii prania

  
  const laundriesSorted = [...laundries].reverse();
  console.log("laundriesSorted", laundriesSorted);

  return (
    <View className="mt-4">
      <View className="flex flex-row items-center mb-4">
        <History color="black" />
        <Text className="text-gray-800 font-pmedium text-lg ">
          Twoje ostatnie prania
        </Text>
      </View>
      <View className="flex items-center flex-row justify-center space-x-2">
        {laundriesSorted.length > 0 ? (
          <View className="flex-grow">
            {laundriesSorted.slice(0,15).map((laundry) => (
              <View
                key={laundry.id}
                className="p-3 border-b flex flex-row justify-between border-gray-400 w-full mb-2 shadow-xs"
              >
                <Text className="font-plight text-black">
                  Data prania: {new Date(laundry.date).toLocaleDateString()}
                </Text>
                <Text className="font-pmedium text-black">
                  Ilość ubrań: {laundry.clothes.length}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <>
            <Text className="text-lg text-gray-600">Brak historii prania </Text>
            <Frown color="black" />
          </>
        )}
      </View>
    </View>
  );
}
