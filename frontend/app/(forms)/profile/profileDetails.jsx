import React, { use } from "react";
import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { TokenContext } from "../../../lib/TokenContext";
import { deleteAvatar } from "../../../lib/avatar/avatar";
import { uploadAvatar } from "../../../lib/avatar/avatar";
import {
  selectImageFromLibrary,
  captureImage,
} from "../../../lib/clothes/picture_logic";
import {
  Images,
  Camera,
  CircleArrowRight,
  Users,
  Lock,
  UserCircle,
  Trash2,
  ArrowLeft,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profileDetails = () => {
  const user = useLocalSearchParams();

  const [userName, setUserName] = useState(user.userName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const { token, setToken } = useContext(TokenContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAvatar(token);
      setAvatarUrl(null);
    } catch (error) {
      console.error("Błąd przy usuwaniu zdjęcia profilowego:", error);
    }
  };

  const handleSelectImage = async (fromCamera) => {
    let image = null;
    if (fromCamera) {
      image = await captureImage();
    } else {
      console.log("Wybieranie z galerii");
      image = await selectImageFromLibrary();
    }

    if (image) {
      const uploadedUrl = await uploadAvatar(token, image);
      if (uploadedUrl) {
        setAvatarUrl(uploadedUrl.avatarUrl);
      }
    }
    if (image) {
      setImageModalVisible(false);
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-5">
        <View className="mb-8 flex-row gap-2 items-center">
          <View>
            <ArrowLeft
              size={25}
              color="#264653"
              onPress={() => router.back()}
            />
            
          </View>
          <Text className="text-2xl font-bold text-gray-800 ">
            Ustawienia profilu
          </Text>
        </View>

        <View className="space-y-3">
          {/* Zarządzaj znajomymi */}
          <TouchableOpacity
            className="flex-row items-center bg-white rounded-2xl p-4 shadow-md active:scale-98"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={() => {
              router.push("profile/friendsList");
            }}
          >
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Users size={24} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                Zarządzaj znajomymi
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Dodaj lub usuń znajomych
              </Text>
            </View>
            <CircleArrowRight size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Zmień hasło */}
          <TouchableOpacity
            className="flex-row items-center bg-white rounded-2xl p-4 shadow-md active:scale-98"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={() => {
              router.push("profile/changePasswordPage");
            }}
          >
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Lock size={24} color="#8B5CF6" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                Zmień hasło
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Zaktualizuj swoje hasło
              </Text>
            </View>
            <CircleArrowRight size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Dodaj/Zmień zdjęcie */}
          <TouchableOpacity
            className="flex-row items-center bg-white rounded-2xl p-4 shadow-md active:scale-98"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={() => {
              setImageModalVisible(true);
            }}
          >
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
              <UserCircle size={24} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                {avatarUrl ? "Zmień" : "Dodaj"} zdjęcie profilowe
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Spersonalizuj swój profil
              </Text>
            </View>
            <CircleArrowRight size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Usuń zdjęcie */}
          <TouchableOpacity
            className={`flex-row items-center rounded-2xl p-4 shadow-md active:scale-98 ${
              avatarUrl ? "bg-white" : "bg-gray-100"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: avatarUrl ? 0.1 : 0.05,
              shadowRadius: 8,
              elevation: avatarUrl ? 3 : 1,
              opacity: avatarUrl ? 1 : 0.6,
            }}
            disabled={!avatarUrl}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View
              className={`w-12 h-12 ${
                avatarUrl ? "bg-red-100" : "bg-gray-200"
              } rounded-full items-center justify-center mr-4`}
            >
              <Trash2 size={24} color={avatarUrl ? "#EF4444" : "#9CA3AF"} />
            </View>
            <View className="flex-1">
              <Text
                className={`text-base font-bold ${
                  avatarUrl ? "text-gray-800" : "text-gray-400"
                }`}
              >
                Usuń zdjęcie profilowe
              </Text>
              <Text
                className={`text-sm mt-0.5 ${
                  avatarUrl ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {avatarUrl ? "Usuń obecne zdjęcie" : "Brak zdjęcia"}
              </Text>
            </View>
            <CircleArrowRight
              size={24}
              color={avatarUrl ? "#9CA3AF" : "#D1D5DB"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-white p-6 rounded-3xl w-full max-w-sm">
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-3">
                <Trash2 size={32} color="#EF4444" />
              </View>
              <Text className="text-xl font-bold text-gray-800 text-center">
                Usuń zdjęcie profilowe
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2">
                Czy na pewno chcesz usunąć swoje zdjęcie profilowe? Ta akcja
                jest nieodwracalna.
              </Text>
            </View>
            <View className="space-y-3 mt-6">
              <TouchableOpacity
                className="bg-red-500 py-4 rounded-2xl active:scale-95"
                style={{
                  shadowColor: "#EF4444",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
                onPress={async () => {
                  setModalVisible(false);
                  handleDelete();
                }}
              >
                <Text className="text-white font-bold text-center text-base">
                  Tak, usuń
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-100 py-4 rounded-2xl active:scale-95"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700 font-semibold text-center text-base">
                  Anuluj
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        visible={imageModalVisible}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-white p-6 rounded-3xl w-full max-w-sm">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
              Dodaj zdjęcie
            </Text>
            <Text className="text-sm text-gray-500 text-center mb-6">
              Wybierz źródło zdjęcia
            </Text>

            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => handleSelectImage(false)}
                className="flex-row items-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-2xl border-2 border-blue-200 active:scale-95"
                style={{
                  shadowColor: "#3B82F6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-4">
                  <Images size={24} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    Galeria
                  </Text>
                  <Text className="text-sm text-gray-600 mt-0.5">
                    Wybierz z biblioteki zdjęć
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSelectImage(true)}
                className="flex-row items-center bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-2xl border-2 border-purple-200 active:scale-95"
                style={{
                  shadowColor: "#8B5CF6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View className="w-12 h-12 bg-purple-500 rounded-full items-center justify-center mr-4">
                  <Camera size={24} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    Aparat
                  </Text>
                  <Text className="text-sm text-gray-600 mt-0.5">
                    Zrób nowe zdjęcie
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mt-6 bg-gray-100 py-4 rounded-2xl active:scale-95"
              onPress={() => setImageModalVisible(false)}
            >
              <Text className="text-gray-700 text-center font-bold text-base">
                Anuluj
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default profileDetails;
