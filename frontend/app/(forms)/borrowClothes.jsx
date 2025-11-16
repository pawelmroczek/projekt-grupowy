import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  ArrowLeftFromLine,
  Calendar,
  CalendarDays,
  Minus,
  Plus,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendLoanRequest } from "../../lib/trades/sendLoanRequest";
import { TokenContext } from "../../lib/TokenContext";

const BorrowClothes = () => {
  const params = useLocalSearchParams();
  const { token, setToken } = useContext(TokenContext);
  
  const targetCloth = params.targetCloth
    ? JSON.parse(params.targetCloth)
    : null;

  const [borrowDays, setBorrowDays] = useState(7); // Domyślnie 7 dni
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Obliczanie daty zwrotu
  const calculateReturnDate = () => {
    const returnDate = new Date(startDate);
    returnDate.setDate(returnDate.getDate() + borrowDays);
    return returnDate;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const increaseDays = () => {
    setBorrowDays((prev) => Math.min(prev + 1, 365)); // Max 365 dni
  };

  const decreaseDays = () => {
    setBorrowDays((prev) => Math.max(prev - 1, 1)); // Min 1 dzień
  };

  const handleDaysChange = (text) => {
    const days = parseInt(text) || 1;
    setBorrowDays(Math.max(1, Math.min(days, 365)));
  };

  const handleConfirmBorrow = async () => {
    if (borrowDays < 1) {
      Alert.alert("Błąd", "Okres pożyczenia musi wynosić przynajmniej 1 dzień");
      return;
    }

    if (!targetCloth) {
      Alert.alert("Błąd", "Brak informacji o ubraniu do wypożyczenia");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Wysyłanie prośby o pożyczenie:");
      console.log("Ubranie:", targetCloth);
      console.log("Okres:", borrowDays, "dni");
      console.log("Data rozpoczęcia:", formatDate(startDate));
      console.log("Data zwrotu:", formatDate(calculateReturnDate()));

      const response = await sendLoanRequest(
        {
          toUserId: targetCloth.userId,
          clothId: targetCloth.id,
          loanFinishDate: calculateReturnDate(),
        },
        token
      );

      Alert.alert(
        "Sukces! 🎉",
        "Prośba o pożyczenie została wysłana",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("Błąd wysyłania prośby o pożyczenie:", error);
      Alert.alert(
        "Błąd",
        "Nie udało się wysłać prośby o pożyczenie. Spróbuj ponownie."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickDayOptions = () => [
    { label: "3 dni", days: 3 },
    { label: "7 dni", days: 7 },
    { label: "14 dni", days: 14 },
    { label: "30 dni", days: 30 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-2">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold flex-1">
              Pożycz ubranie
            </Text>
          </View>

          {/* Info o ubraniu do pożyczenia */}
          {targetCloth && (
            <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
              <Text className="text-sm text-gray-600 mb-3">
                Chcesz pożyczyć:
              </Text>
              <View className="flex-row items-center">
                <Image
                  source={{ uri: targetCloth.picture }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
                <View className="ml-4 flex-1">
                  <Text className="font-bold text-xl">{targetCloth.name}</Text>
                  <Text className="text-gray-600 mt-1">
                    Rozmiar: {targetCloth.size}
                  </Text>
                  <Text className="text-gray-600">Od: {targetCloth.user}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Wybór okresu - Szybkie opcje */}
          <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <CalendarDays size={20} color="#666" />
              <Text className="text-lg font-bold ml-2">Szybki wybór</Text>
            </View>
            <View className="flex-row flex-wrap justify-between">
              {getQuickDayOptions().map((option) => (
                <TouchableOpacity
                  key={option.days}
                  onPress={() => setBorrowDays(option.days)}
                  className={`w-[48%] mb-3 py-3 rounded-lg border-2 ${
                    borrowDays === option.days
                      ? "border-primary-100 bg-primary-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Text
                    className={`text-center font-pmedium ${
                      borrowDays === option.days
                        ? "text-primary-100"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ręczny wybór liczby dni */}
          <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <Calendar size={20} color="#666" />
              <Text className="text-lg font-bold ml-2">
                Wybierz dokładny okres
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={decreaseDays}
                className="bg-gray-200 p-3 rounded-lg"
              >
                <Minus size={24} color="#333" />
              </TouchableOpacity>

              <View className="flex-1 mx-4 items-center">
                <TextInput
                  value={borrowDays.toString()}
                  onChangeText={handleDaysChange}
                  keyboardType="number-pad"
                  className="text-4xl font-bold text-center text-primary-100"
                  style={{ minWidth: 80 }}
                />
                <Text className="text-gray-600 mt-1">
                  {borrowDays === 1 ? "dzień" : borrowDays < 5 ? "dni" : "dni"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={increaseDays}
                className="bg-gray-200 p-3 rounded-lg"
              >
                <Plus size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Podsumowanie dat */}
          <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-3">Podsumowanie</Text>
            
            <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
              <Text className="text-gray-600">Data rozpoczęcia:</Text>
              <Text className="font-pmedium text-lg">
                {formatDate(startDate)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2 border-b border-gray-200">
              <Text className="text-gray-600">Okres pożyczenia:</Text>
              <Text className="font-pmedium text-lg text-primary-100">
                {borrowDays} {borrowDays === 1 ? "dzień" : borrowDays < 5 ? "dni" : "dni"}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text className="text-gray-600">Data zwrotu:</Text>
              <Text className="font-bold text-lg text-secondary-300">
                {formatDate(calculateReturnDate())}
              </Text>
            </View>
          </View>

          {/* Informacja
          <View className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
            <Text className="text-sm text-blue-800">
              💡 Pamiętaj, że osoba pożyczająca musi zaakceptować Twoją propozycję.
              Po akceptacji zobowiązujesz się zwrócić ubranie w ustalonym terminie.
            </Text>
          </View> */}
        </View>
      </ScrollView>

      {/* Przycisk potwierdzenia */}
      <View className="bg-white px-4 py-4 shadow-lg pb-10 mb-[-30px]">
        <TouchableOpacity
          onPress={handleConfirmBorrow}
          disabled={isLoading}
          className="bg-primary-200 py-4 rounded-lg flex-row justify-center items-center"
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
              <ArrowLeftFromLine size={20} color="white" />
              <Text className="text-white text-lg font-pmedium ml-2">
                Wyślij prośbę o pożyczenie
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BorrowClothes;
