import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  WashingMachine,
  Thermometer,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react-native";
import planLaundry from "../../../../lib/laundry/planLaundry";
import { getSymbolDescription } from "../../../../lib/careSymbols";
import { TokenContext } from "../../../../app/TokenContext";
import LaundrySettings from "../LaundrySettings";
import { wichStrictnessIsActive } from "../../../../lib/laundry/utils";

const LaundryPlan =({suggestLaundry, options, setOptions}) =>{
  
  const [expandedLoad, setExpandedLoad] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  

  const strictnessLevel = wichStrictnessIsActive(options);

  


  suggestLaundry.map(load=>{
    console.log("washGroup",load.washGroup);
  })

  const toggleExpanded = (index) => {
    setExpandedLoad(expandedLoad === index ? null : index);
  };

  if (!suggestLaundry || suggestLaundry.length === 0) {
    return (
      <View className="p-4 bg-white rounded-xl shadow mt-4 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center mb-2">
            <WashingMachine size={20} color="#264653" />
            <Text className="text-lg font-bold ml-2 text-gray-800">
              Plan Prania
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setSettingsVisible(true)}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Settings size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-600 text-center py-4">
          Brak ubrań do prania lub wszystkie są czyste! 🎉
        </Text>

        {/* Modal ustawień */}
        <LaundrySettings
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          options={options}
          onOptionsChange={setOptions}
        />
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-xl shadow mt-4 mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <WashingMachine size={20} color="#264653" />
          <Text className="text-lg font-bold ml-2 text-gray-800">
            Plan Prania
          </Text>
          <Text className="text-sm text-gray-500 ml-2">
            ({suggestLaundry.length} ładunków)
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setSettingsVisible(true)}
          className="p-2 bg-gray-100 rounded-full"
        >
          <Settings size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {suggestLaundry.map((load, index) => (
          <View
            key={index}
            className="border border-gray-200 rounded-lg mb-3 overflow-hidden"
          >
            <TouchableOpacity
              onPress={() => toggleExpanded(index)}
              className="p-3 bg-gray-50 flex-row items-center justify-between"
            >
              <View className="flex-1">
                <View className="flex-row items-center">
                  <View
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        load.colorGroup === "białe"
                          ? "#ffffff"
                          : load.colorGroup === "ciemne"
                          ? "#374151"
                          : load.colorGroup === "jasne"
                          ? "#d1d5db"
                          : "#f59e0b",
                    }}
                  />
                  <Text className="font-pmedium text-gray-800">
                    Ładunek {index + 1}: {load.colorGroup}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Thermometer size={14} color="#6b7280" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {load.washTemperature}°C • {load.clothes.length} ubrań
                  </Text>
                </View>
              </View>
              {expandedLoad === index ? (
                <ChevronUp size={20} color="#6b7280" />
              ) : (
                <ChevronDown size={20} color="#6b7280" />
              )}
            </TouchableOpacity>

            {expandedLoad === index && (
              <View className="p-3 border-t border-gray-200">
                {/* Lista ubrań */}
                <View className="mb-3">
                  <Text className="font-pmedium text-gray-800 mb-2">
                    Ubrania w ładunku:
                  </Text>
                  {load.clothes.map((item, itemIndex) => (
                    <View
                      key={itemIndex}
                      className="flex-row items-center py-1"
                    >
                      <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                      <Text className="text-sm text-gray-700 flex-1">
                        {item.name} ({item.color})
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Instrukcje prania */}
                <View className="bg-blue-50 p-3 rounded-lg mb-3">
                  <View className="flex-row items-center mb-2">
                    <Info size={16} color="#2563eb" />
                    <Text className="font-pmedium text-blue-800 ml-1">
                      Instrukcje prania
                    </Text>
                  </View>
                 
                  <View className="flex-row items-center mb-1">
                    <Thermometer size={14} color="#2563eb" />
                    <Text className="text-sm text-blue-700 ml-1">
                      Temperatura: {load.washInstructions.temperature}°C
                    </Text>
                  </View>
                  <Text className="text-xs text-blue-600 mt-1">
                    Symbole:{" "}
                    {load.washInstructions.symbols
                      .map(getSymbolDescription)
                      .join(", ")}
                  </Text>
                </View>

                {/* Ostrzeżenia */}
                {load.washInstructions.warnings.length > 0 && (
                  <View className="bg-amber-50 p-3 rounded-lg">
                    <View className="flex-row items-center mb-2">
                      <AlertTriangle size={16} color="#f59e0b" />
                      <Text className="font-pmedium text-amber-800 ml-1">
                        Ważne uwagi
                      </Text>
                    </View>
                    {load.washInstructions.warnings.map(
                      (warning, warnIndex) => (
                        <View
                          key={warnIndex}
                          className="flex-row items-center py-1"
                        >
                          <View className="w-1 h-1 rounded-full bg-amber-600 mr-2" />
                          <Text className="text-sm text-amber-700">
                            {warning}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Podsumowanie */}
      <View className="mt-3 pt-3 border-t border-gray-200">
        <Text className="text-xs text-gray-500 text-center">
          Plan wygenerowany na podstawie ustawień:{" "}
          {strictnessLevel === "loose"
            ? "Swobodny"
            : strictnessLevel === "medium"
            ? "Zrównoważony"
            : "Restrykcyjny"}
        </Text>
        <Text className="text-xs text-gray-400 text-center mt-1">
          {options.treatEmptyAsCompatible
            ? "Ubrania bez metek jako kompatybilne"
            : "Tylko ubrania z metkami"}
        </Text>
      </View>

      {/* Modal ustawień */}
      <LaundrySettings
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        options={options}
        onOptionsChange={setOptions}
      />
    </View>
  );
}


export default LaundryPlan;