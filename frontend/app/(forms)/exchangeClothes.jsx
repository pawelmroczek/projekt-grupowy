import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  ArrowLeftRight,
  BrushCleaning,
  CheckCircle2,
  WashingMachine,
} from "lucide-react-native";

import { getClothes } from "../../lib/clothes/clothes";
import { TokenContext } from "../../lib/TokenContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendExchangeRequest } from "../../lib/trades/sendExchangeRequest";

const ExchangeClothes = () => {
  const params = useLocalSearchParams();
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [myClothes, setMyClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(TokenContext);

  // Parsujemy dane o ubraniu do wymiany
  const targetCloth = params.targetCloth
    ? JSON.parse(params.targetCloth)
    : null;

  useEffect(() => {
    fetchMyClothes();
  }, []);

  const fetchMyClothes = async () => {
    try {
      const data = await getClothes(token);
      setMyClothes(data || []);
    } catch (error) {
      console.error("Błąd pobierania ubrań:", error);
    }
  };

  const toggleSelection = (item) => {
    item.clean &&
      setSelectedClothes((prev) => {
        const isSelected = prev.some((cloth) => cloth.id === item.id);
        if (isSelected) {
          return prev.filter((cloth) => cloth.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
  };

  const isSelected = (item) => {
    return selectedClothes.some((cloth) => cloth.id === item.id);
  };

  const handleConfirmExchange = async () => {
    if (selectedClothes.length === 0) {
      Alert.alert(
        "Brak wyboru",
        "Wybierz przynajmniej jedno ubranie do wymiany"
      );
      return;
    }

    if (!targetCloth) {
      Alert.alert("Błąd", "Brak informacji o ubraniu do wymiany");
      return;
    }

    setIsLoading(true);

    try {
      const exchangeData = {
        toUserId: targetCloth.userId,
        myClothesIds: selectedClothes.map((cloth) => cloth.id),
        targetClothesIds: [targetCloth.id],
      };

      await sendExchangeRequest(exchangeData, token);

      Alert.alert(
        "Sukces! 🎉",
        "Propozycja wymiany została wysłana",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("Błąd wysyłania propozycji wymiany:", error);
      Alert.alert(
        "Błąd",
        "Nie udało się wysłać propozycji wymiany. Spróbuj ponownie."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const selected = isSelected(item);

    return (
      <TouchableOpacity
        style={[
          styles.item,
          selected && styles.selectedItem,
          item.clean ? {} : { opacity: 0.5 },
        ]}
        onPress={() => toggleSelection(item)}
      >
        {!item.clean && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              zIndex: 5,
            }}
          >
            <WashingMachine />
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Do prania
            </Text>
          </View>
        )}

        {selected && (
          <View style={styles.checkMark}>
            <CheckCircle2 size={30} color="#2a9d8f" />
          </View>
        )}
        <Image source={{ uri: item.picture }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.size}>Rozmiar: {item.size}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        {/* Header */}
        <View className=" px-4 py-2 shadow-sm">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold flex-1">
              Wybierz ubrania do wymiany
            </Text>
          </View>

          {/* Info o ubraniu do wymiany */}
          {targetCloth && (
            <View className="bg-primary-50 p-4 pt-3 rounded-lg mb-2 bg-white">
              <Text className="text-sm text-gray-600 mb-2">Otrzymasz:</Text>
              <View className="flex-row items-center">
                <Image
                  source={{ uri: targetCloth.picture }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
                <View className="ml-3 flex-1">
                  <Text className="font-bold text-lg">{targetCloth.name}</Text>
                  <Text className="text-gray-600">
                    Rozmiar: {targetCloth.size}
                  </Text>
                  <Text className="text-gray-600">Od: {targetCloth.user}</Text>
                </View>
              </View>
            </View>
          )}

          <View className=" p-2 rounded-lg">
            <Text className="text-sm font-pmedium  ">
              Wybrano: {selectedClothes.length}{" "}
              {selectedClothes.length === 1 ? "ubranie" : "ubrań"}
            </Text>
          </View>
        </View>

        {/* Lista moich ubrań */}
        <FlatList
          data={myClothes}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-gray-500 text-lg">
                Brak ubrań do wymiany
              </Text>
            </View>
          }
        />

        {/* Przycisk potwierdzenia */}
        {selectedClothes.length > 0 && (
          <View className="bg-white px-4 py-4 shadow-lg pb-10 mb-[-30px]">
            <TouchableOpacity
              onPress={handleConfirmExchange}
              disabled={isLoading}
              className="bg-primary-100 py-4 rounded-lg flex-row justify-center items-center"
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <>
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-pmedium ml-2">
                    Wysyłanie...
                  </Text>
                </>
              ) : (
                <>
                  <ArrowLeftRight size={20} color="white" />
                  <Text className="text-white text-lg font-pmedium ml-2">
                    Zaproponuj wymianę
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 20,
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
    width: "45%",
    marginHorizontal: "2.5%",
    position: "relative",
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: "#2a9d8f",
    shadowOpacity: 0.3,
  },
  checkMark: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 15,
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
  size: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default ExchangeClothes;
