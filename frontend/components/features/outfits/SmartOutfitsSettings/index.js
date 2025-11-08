import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { WandSparkles, X } from "lucide-react-native";
import { router } from "expo-router";

export default function SmartOutfitsSettings({visible, onClose}) {

    const [isClean, setIsClean] = useState(true);
    const [minTemp, setMinTemp] = useState(10);
    const [maxTemp, setMaxTemp] = useState(20);
    const [takeFriends, setTakeFriends] = useState(false);
    const [takeHomies, setTakeHomies] = useState(false);
    const [isOutwear, setIsOutwear] = useState(false);



    useEffect(() => {
        if (takeFriends) {
            setTakeHomies(true);
        }
    }, [takeFriends]);

    useEffect(() => {
        if (!takeHomies) {
            setTakeFriends(false);
        }
    }, [takeHomies]);

    const SettingRow = ({
        title,
        description,
        value, // Będzie booleanem (true/false) dla stanu zaznaczenia
        onValueChange,
        type = "toggle", // Zmiana domyślnego typu na "toggle" dla lepszej nazwy
      }) => {
        // Funkcja obsługująca zmianę wartości
        const handleToggle = () => {
          const newValue = !value;
          onValueChange(newValue);
        };
    
        /**
         * Własny komponent przełącznika (Toggle Switch)
         * Używa warunkowych klas Native Wind do stylizacji "szyny" i przesunięcia "gałki".
         */
        const ToggleSwitch = () => (
          // Zewnętrzny TouchableOpacity pełni rolę interaktywnej "szyny" przełącznika
          <TouchableOpacity
            onPress={handleToggle}
            activeOpacity={0.8}
            // 'value' na true -> tło primary-100 (np. niebieskie/zielone), 'value' na false -> tło neutral-400 (szare)
            className={`w-12 h-8 rounded-full p-0.5 ${
              value ? "bg-primary-100" : "bg-neutral-400"
            } transition duration-300 ease-in-out`}
          >
            {/* Wewnętrzny View to "gałka" przełącznika */}
            <View
              // 'value' na true -> klasa 'translate-x-6' (przesunięcie o 24px, bo szyna ma w-12/48px), 'value' na false -> brak przesunięcia
              className={`w-7 h-7 bg-white rounded-full shadow-md ${
                value ? "translate-x-4" : "translate-x-0"
              } transition duration-300 ease-in-out`}
            />
          </TouchableOpacity>
        );
    
        return (
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-1 mr-4">
              <Text className="font-pmedium text-gray-800">{title}</Text>
              {description && (
                <Text className="text-sm text-gray-600 mt-1">{description}</Text>
              )}
            </View>
            {/* Warunkowe renderowanie: domyślnie używamy naszego Custom Switcha */}
            {type === "toggle" && <ToggleSwitch />}
    
            {/* Opcjonalnie, jeśli chcesz zachować stary, prosty "checkbox" z tekstem: */}
            {type === "checkbox" && (
              <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
                <Text
                  className={`text-2xl ${
                    value ? "text-primary-100" : "text-gray-300"
                  }`}
                >
                  {/* Wróciłem do kropki dla 'on', bo kwadrat z pytania był tylko wizualizacją */}
                  {value ? "✅" : "⬜"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      };
    

    const NumberInput = ({
        title,
        description,
        value,
        onValueChange,
        min = 1,
        max = 20,
        unit = "°C",
      }) => (
        <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <View className="flex-1 mr-4">
            <Text className="font-pmedium text-gray-800">{title}</Text>
            {description && (
                <Text className="text-sm text-gray-600 mt-1">{description}</Text>
              )}
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
              onPress={() => onValueChange(Math.max(min, value - 1))}
            >
              <Text className="font-bold text-gray-600">-</Text>
            </TouchableOpacity>
            <Text className="mx-3 font-pmedium text-gray-800 min-w-[40px] text-center">
              {value}
              {unit}
            </Text>
            <TouchableOpacity
              className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
              onPress={() => onValueChange(Math.min(max, value + 1))}
            >
              <Text className="font-bold text-gray-600">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    return(
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <View className="flex-row items-center">
                <WandSparkles size={24} color="#264653"/>
                <Text className="font-bold text-xl ml-2 text-gray-800">
                    Inteligentne tworzenie stylizacji
                </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
                <X size={24} color="#6b7280" />
            </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-4">
            <View className="mb-6">
                <Text className="font-bold text-lg text-gray-800 mb-3">
                Podstawowe ustawienia
                </Text>

                <NumberInput
                    title="Minimalna temperatura"
                    description="Najniższa przewidywana temperatura (z danych pogodowych, można zmienić ręcznie)."
                    value={minTemp}
                    onValueChange={setMinTemp}
                    min={-40}
                    max={maxTemp}
                />
                <NumberInput
                    title="Maksymalna temperatura"
                    description="Najwyższa przewidywana temperatura (z danych pogodowych, można zmienić ręcznie)."
                    value={maxTemp}
                    onValueChange={setMaxTemp}
                    min={minTemp}
                    max={60}
                />
                <SettingRow
                    title="Tylko czyste ubrania"
                    description="Uwzględniaj wyłącznie ubrania oznaczone jako czyste w garderobie."
                    value={isClean}
                    onValueChange={setIsClean}
                />
                <SettingRow
                    title="Pożyczyć od znajomych"
                    description="Uwzględnij ubrania, które mogą być dostępne u znajomych."
                    value={takeFriends}
                    onValueChange={setTakeFriends}
                />
                <SettingRow
                    title="Pożyczyć od domowników"
                    description="Uwzględnij ubrania należące do innych użytkowników w Twoim domostwie."
                    value={takeHomies}
                    onValueChange={setTakeHomies}
                />
                <SettingRow
                    title="Uwzględnij odzież wierzchnią"
                    description="Dodaj kurtki, płaszcze i inne elementy odzieży wierzchniej do propozycji outfitu."
                    value={isOutwear}
                    onValueChange={setIsOutwear}
                />
            </View>
            </ScrollView>

            {/* Footer */}
            <View className="p-4 mb-4 border-t border-gray-200">
            <View className="flex-row space-x-3">
                <TouchableOpacity
                className="flex-1 bg-gray-200 p-3 rounded-lg"
                onPress={() => {
                    onClose();
                    router.push('addOutfits');
                }}
                >
                <Text className="text-center font-pmedium text-gray-700">
                    Wykonaj ręcznie
                </Text>
                </TouchableOpacity>

                <TouchableOpacity
                className="flex-1 bg-primary-100 p-3 rounded-lg"
                onPress={console.log("zapisz")}
                >
                <Text className="text-center font-pmedium text-white">
                    Utwórz
                </Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
};

