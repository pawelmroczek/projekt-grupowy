import React from "react";
import { View, Text } from "react-native";
import { getSymbolDescription } from "../../../../lib/careSymbols";

export default function CareSymbolsDisplay({ careSymbols, compact = false }) {
  if (!careSymbols || careSymbols.length === 0) {
    return null;
  }

  if (compact) {
    // Kompaktowy widok - pokazuje tylko temperaturę
    const tempSymbol = careSymbols.find(symbol => symbol.includes('C'));
    const hasWarnings = careSymbols.some(symbol => symbol.startsWith('DN_'));
    
    return (
      <View className="flex-row items-center mt-1">
        {tempSymbol && (
          <View className="bg-blue-100 px-2 py-1 rounded-full mr-1">
            <Text className="text-xs font-pmedium text-blue-800">{tempSymbol}</Text>
          </View>
        )}
        {hasWarnings && (
          <View className="bg-amber-100 px-2 py-1 rounded-full">
            <Text className="text-xs font-pmedium text-amber-800">⚠️</Text>
          </View>
        )}
      </View>
    );
  }

  // Pełny widok
  return (
    <View className="mt-2">
      <Text className="text-xs font-pmedium text-gray-700 mb-1">Symbole prania:</Text>
      <View className="flex-row flex-wrap">
        {careSymbols.map((symbol, index) => {
          const isWarning = symbol.startsWith('DN_');
          const isTemperature = symbol.includes('C');
          
          return (
            <View 
              key={index} 
              className={`px-2 py-1 rounded-full mr-1 mb-1 ${
                isWarning ? 'bg-red-100' : 
                isTemperature ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-xs ${
                isWarning ? 'text-red-800' : 
                isTemperature ? 'text-blue-800' : 'text-gray-800'
              }`}>
                {getSymbolDescription(symbol)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}