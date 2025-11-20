import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";

import {
  acceptInvite,
  getInvites,
  rejectInvite,
} from "../../lib/friends/friends";
import { TokenContext } from "../../lib/TokenContext";
import fetchOffers from "../../lib/trades/fetchOffers";
import {
  acceptTradeOffer,
  rejectTradeOffer,
} from "../../lib/trades/handleTradeOffers";
import { SafeAreaView } from "react-native-safe-area-context";
import { ipAddressNginx } from "../../lib/ipAddress";

const invites = () => {
  const [invitesArray, setInvitesArray] = useState([]);
  const [friendInvites, setFriendInvites] = useState([]);
  const [householdInvites, setHouseholdInvites] = useState([]);
  const [tradeOffers, setTradeOffers] = useState([]);

  const { token, setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);

  const loadInvites = async () => {
    try {
      setLoading(true);
      const data = await getInvites(token);
      setInvitesArray(data);
      const friends = data.filter((invite) => invite.type === "FRIENDS");
      const households = data.filter((invite) => invite.type === "HOUSEHOLDS");
      setFriendInvites(friends);
      setHouseholdInvites(households);

      // Pobierz oferty wymiany
      const offers = await fetchOffers(token);
      console.log("Offers fetched:", JSON.stringify(offers));
      setTradeOffers(offers || []);
    } catch (error) {
      console.error("Błąd ładowania zaproszeń:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptUser = async (id) => {
    const data = await acceptInvite(token, id);
    setInvitesArray((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFriend: true } : item
      )
    );
    setFriendInvites((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFriend: true } : item
      )
    );
    setHouseholdInvites((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFriend: true } : item
      )
    );
  };
  const rejectUser = async (id) => {
    await rejectInvite(token, id);
    setInvitesArray((prevList) => prevList.filter((item) => item.id !== id));
  };

  const acceptTrade = async (id) => {
    try {
      await acceptTradeOffer(token, id);
      setTradeOffers((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, isAccepted: true } : item
        )
      );
    } catch (error) {
      console.error("Błąd akceptowania oferty wymiany:", error);
    }
  };

  const rejectTrade = async (id) => {
    try {
      await rejectTradeOffer(token, id);
      setTradeOffers((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Błąd odrzucania oferty wymiany:", error);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const renderInviteItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-3 bg-white rounded-xl border border-gray-200 mb-2">
      <View>
        <Text className="text-base font-semibold"> {item.fromUsername}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        {item.isFriend ? (
          <View className="bg-green-500 px-4 py-2 rounded-xl">
            <Text className="text-black font-semibold">Zaakceptowano</Text>
          </View>
        ) : (
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => acceptUser(item.id)}
              className="bg-green-500 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold">Akceptuj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => rejectUser(item.id)}
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              <Text className="text-white font-semibold">Odrzuć</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const renderClothItem = (cloth) => {

    console.log("Rendering cloth:", JSON.stringify(cloth));

    const parts = cloth.picture.split("images-server:80");
    const photo = ipAddressNginx + parts[1];

    return (
    <View key={cloth.id} className="bg-gray-50 rounded-lg p-2 mr-2 mb-2">
      {cloth.picture ? (
         <Image
          source={{ uri: photo }}
          style={{ width: 80, height: 80, borderRadius: 8 }}
        />
      ) : (
        <View className="w-20 h-20 bg-gray-200 rounded-lg mb-1 items-center justify-center">
          <Text className="text-gray-400 text-xs">Brak zdjęcia</Text>
        </View>
      )}
      <Text className="text-xs font-semibold text-center" numberOfLines={1}>
        {cloth.name}
      </Text>
      <Text className="text-xs text-gray-600 text-center" numberOfLines={1}>
        {cloth.size}
      </Text>
    </View>
  )
  };

  const renderTradeOfferItem = ({ item }) => {
    const tradeTypeText = item.type === "LOAN" ? "Wypożyczenie" : "Wymiana";
    const loanDate = item.loanFinishDate
      ? new Date(item.loanFinishDate).toLocaleDateString("pl-PL")
      : null;

    return (
      <View className="bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden">
        {/* Nagłówek */}
        <View className="bg-[#2A9D8F] p-3">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-base">
                {tradeTypeText}
              </Text>
              <Text className="text-white/90 text-sm">
                od: {item.fromUserUsername}
              </Text>
            </View>
            {loanDate && (
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-semibold">
                  Do: {loanDate}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Zawartość */}
        <View className="p-3">
          {/* Ubrania od nadawcy */}
          {item.fromUserClothes && item.fromUserClothes.length > 0 && (
            <View className="mb-3">
              <Text className="font-semibold text-sm mb-2 text-gray-700">
                {item.fromUserUsername} oferuje:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {item.fromUserClothes.map((cloth) => renderClothItem(cloth))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Ubrania od odbiorcy */}
          {item.toUserClothes && item.toUserClothes.length > 0 && (
            <View className="mb-3">
              <Text className="font-semibold text-sm mb-2 text-gray-700">
                Ty oferujesz:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {item.toUserClothes.map((cloth) => renderClothItem(cloth))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Brak ubrań */}
          {(!item.fromUserClothes || item.fromUserClothes.length === 0) &&
            (!item.toUserClothes || item.toUserClothes.length === 0) && (
              <Text className="text-gray-500 text-sm text-center py-2">
                Brak szczegółów ubrań
              </Text>
            )}

          {/* Przyciski akcji */}
          <View className="flex-row mt-2 space-x-2">
            {item.isAccepted ? (
              <View className="flex-1 bg-green-500 py-3 rounded-xl items-center">
                <Text className="text-white font-bold">✓ Zaakceptowano</Text>
              </View>
            ) : (
              <View className="flex-row flex-1 space-x-2">
                <TouchableOpacity
                  onPress={() => acceptTrade(item.id)}
                  className="flex-1 bg-primary-200 py-3 rounded-xl items-center"
                >
                  <Text className="text-white font-bold">Akceptuj</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => rejectTrade(item.id)}
                  className="flex-1 bg-red-500 py-3 rounded-xl items-center"
                >
                  <Text className="text-white font-bold">Odrzuć</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        
      <View className="flex-1 p-4 pt-6">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#888" />
          </View>
        ) : invitesArray.length > 0 || tradeOffers.length > 0 ? (
          <>
            {friendInvites.length > 0 && (
              <>
                <Text className="text-lg font-bold mb-2">
                  Zaproszenia do znajomych
                </Text>
                <FlatList
                  data={friendInvites}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderInviteItem}
                  contentContainerStyle={{ paddingBottom: 16 }}
                />
              </>
            )}

            {householdInvites.length > 0 && (
              <>
                <Text className="text-lg font-bold mt-4 mb-2">
                  Zaproszenia do domowników
                </Text>
                <FlatList
                  data={householdInvites}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderInviteItem}
                  contentContainerStyle={{ paddingBottom: 16 }}
                />
              </>
            )}

            {tradeOffers.length > 0 && (
              <>
                <Text className="text-lg font-bold mt-4 mb-2">
                  Oferty wymiany
                </Text>
                <FlatList
                  data={tradeOffers}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderTradeOfferItem}
                  contentContainerStyle={{ paddingBottom: 16 }}
                />
              </>
            )}
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-400">Brak zaproszeń</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default invites;
