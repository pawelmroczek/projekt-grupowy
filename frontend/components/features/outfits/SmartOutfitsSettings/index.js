import { View, Text, TouchableOpacity, Modal, ScrollView, FlatList, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { WandSparkles, X, Palette } from "lucide-react-native";
import { router } from "expo-router";
import { getClothes } from "../../../../lib/clothes/clothes";
import { TokenContext } from "../../../../lib/TokenContext";
import { planOutfit } from "../../../../lib/outfits/planOutfit";
import { clothingTypeOptions, shoesTypeOptions, accessoryTypeOptions } from "../../../../assets/constants/types/types";
import HorizontalSelector from "../../../common/HorizontalSelector";
import ColorPalettes from "../ColorPalettes"

export default function SmartOutfitsSettings({visible, onClose}) {

    const [isClean, setIsClean] = useState(true);
    const [minTemp, setMinTemp] = useState(10);
    const [maxTemp, setMaxTemp] = useState(20);
    const [takeFriends, setTakeFriends] = useState(false);
    const [takeHomies, setTakeHomies] = useState(false);
    const [isOutwear, setIsOutwear] = useState(false);
    const [isHat, setIsHat] = useState(true);

    const [pickedClothes, setPickedClothes] = useState(null);


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pickModalVisible, setPickModalVisible] = useState(false);
    const [filteredClothes, setFilteredClothes] = useState([]);

    const { token } = useContext(TokenContext);
    const {clothes, setClothes} = useContext(TokenContext);

    const [colorPalettes, setColorPalettes] = useState([]);

    const [paletteModalVisible, setPaletteModalVisible] = useState(false);


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

    useEffect(() => {
      if (clothes) {
        let filtered = clothes;
        if(isClean) {
          filtered = clothes.filter((item) => item.clean);
        }
        if (selectedCategory) {
          filtered = filtered.filter((item) => item.type === selectedCategory);
        }
    
        setFilteredClothes(filtered);
        }
      }, [selectedCategory, clothes]);

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

    const createOutfit = async () => {
      const cleanedPalettes = colorPalettes.filter(palette => palette.length > 0);
      setColorPalettes(cleanedPalettes);
      const result = await planOutfit(clothes, pickedClothes, minTemp, maxTemp, false, false, isHat, isClean, isOutwear, cleanedPalettes, token);
      router.replace({ pathname: "/smartOutfitOffer", params: { outfitIds: JSON.stringify(result) }});
    }

    const renderItem = ({ item }) => {
      const isSelected = pickedClothes ? pickedClothes.id === item.id : false;

      return (
        <TouchableOpacity
          style={[styles.item, styles.double, isSelected && styles.selected]}
          onPress={() => {
            if (isSelected) {
              setPickedClothes(null);
              setPickModalVisible(false);
            } else {
              setPickedClothes(item);
              setPickModalVisible(false);
            }
          }}
        >
          <Image source={{ uri: item.picture }} style={[styles.image]} />
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    

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

                <View className="flex-row items-center justify-between py-3 border-b border-gray-100 h-24">
                  <View className="flex-1 mr-4">
                    <Text className="font-pmedium text-gray-800">Wybierz podstawowe ubranie</Text>
                    <Text className="text-sm text-gray-600 mt-1">Wybierz element garderoby jako punkt wyjścia dla stylizacji</Text>
                  </View>
                  <View className="flex-row items-center">
                  <TouchableOpacity
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                    onPress={() => setPickModalVisible(true)}
                  >
                    {pickedClothes && pickedClothes.picture ? (
                      <Image
                        source={{ uri: pickedClothes.picture }}
                        className="w-24 h-24 rounded-full ml-3"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-16 h-16 rounded-full bg-gray-200 mx-4 items-center justify-center ml-3">
                        <Text className="text-gray-500 text-sm">?</Text>
                      </View>
                    )}
                  </TouchableOpacity>

            
                  </View>
                    </View>
                <Modal visible={pickModalVisible} animationType="slide" presentationStyle="pageSheet">
                  <View className="flex-1 bg-white">
                    <View className="flex-row justify-between p-4 border-b border-gray-200">
                      <Text className="font-bold text-lg">Wybierz ubranie</Text>
                      <TouchableOpacity onPress={() => setPickModalVisible(false)}>
                        <X size={24} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                    <View className="items-start mx-auto flex  justify-center w-full rounded-lg ">
                      <Text className="text-lg font-pmedium ml-2">Rodzaj</Text>
                      <HorizontalSelector
                        options={[...clothingTypeOptions.map(item => item.label), ...shoesTypeOptions.map(item => item.label), ...accessoryTypeOptions.map(item => item.label)]}
                        setValue={setSelectedCategory}
                        value={selectedCategory}
                      />
                    </View>
                    <FlatList
                      data={filteredClothes}
                      key={"double"}
                      numColumns={2}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id.toString()}
                      contentContainerStyle={styles.list}
                      showsVerticalScrollIndicator={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                </Modal>

                <View className="flex-row items-center justify-between py-3 border-b border-gray-100 h-24">
                  <View className="flex-1">
                    <Text className="font-pmedium text-gray-800">Wybierz kolor</Text>
                    <Text className="text-sm text-gray-600 mt-1">
                      Dodaj lub wybierz zestawy kolorów dla stylizacji.
                    </Text>
                  </View>

                  <TouchableOpacity
                    className="flex-row items-center justify-center"
                    onPress={() => setPaletteModalVisible(true)}
                  >
                    <Palette size={32} />
                  </TouchableOpacity>
                </View>

                <ColorPalettes
                  paletteModalVisible={paletteModalVisible}
                  setPaletteModalVisible={setPaletteModalVisible}
                  colorPalettes={colorPalettes}
                  setColorPalettes={setColorPalettes}
                  pickedHex={pickedClothes ? pickedClothes.colorHex : null}
                ></ColorPalettes>

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
                {/*<SettingRow
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
                />*/}
                <SettingRow
                    title="Uwzględnij nakrycie głowy"
                    description="Dodaj nakrycie głowy do propozycji outfitu."
                    value={isHat}
                    onValueChange={setIsHat}
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
                onPress={createOutfit}
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

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  selected: {
    shadowOpacity: 0,
    borderBlockColor: "#264653",
    borderWidth: 1,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
    marginVertical: 10,
  },
  double: {
    width: "45%",
    marginHorizontal: "2.5%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});