import React from "react";
import InitialBackground from "../../components/common/InitialBackground";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import FormField from "../../components/common/FormField";
import SelectDropdown from "react-native-select-dropdown";
import {
  ArrowUp,
  ArrowDown,
  Images,
  Trash2,
  Camera,
  Shirt,
  CirclePlus,
} from "lucide-react-native";
import {
  selectImageFromLibrary,
  captureImage,
} from "../../lib/authorization/picture_logic";
import { clothesSending } from "../../lib/authorization/authorization";
import { router } from "expo-router";
import SelectForm from "../../components/common/SelectForm";

const FormData = global.FormData;

export default function index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });
  const typeOptions = [
    { title: "Koszulka" },
    { title: "Spodnie" },
    { title: "Bluza" },
    { title: "Koszula" },
    { title: "Sweter" },
    { title: "Inne" },
  ];

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert("Wybierz zdjęcie");
      return;
    } else if (!form.name) {
      Alert.alert("Podaj nazwe");
      return;
    } else if (!form.type) {
      Alert.alert("Podaj typ");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("file", {
      uri: imageUri,
      name: "photo.png",
    });

    const serverresponse = clothesSending(formData);
  };

  return (
    <InitialBackground image={authBackground}>
      <View className="items-start flex h-full justify-center w-[95%] p-5 rounded-lg ">
        <View className="flex-row items-center justify-center gap-2 mt-3">
          <Text className="text-xl font-pbold ">Dodaj swoje ubranie</Text>
          <Shirt size={25} color={"#264653"} />
        </View>

        <View className="flex-1 w-full p-5">
          <FormField
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            title="Nazwa ubrania"
            placeholder="np. niebieski sweter"
            otherStyles={"mt-4"}
          />
          <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
            {"Typ:"}
          </Text>
          <View className="rounded-2xl border-2 border-primary-100 focus:border-secondary-200 flex  justify-center flex-row items-center ">
            <SelectForm
              typeOptions={typeOptions}
              onSelect={(selectedItem, index) => {
                setForm({ ...form, type: selectedItem.title });
              }}
            />
          </View>
          <View className="flex justify-center items-center p-5 mt-5">
            {/* Wyświetlanie zdjęcia */}
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="w-36 h-36 rounded-lg mb-5"
              />
            ) : (
              <Shirt size={60} />
            )}
            <View className="items-center mt-5 py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4">
              {/* Przycisk "Dodaj z galerii" */}
              <TouchableOpacity
                onPress={async () => {
                  const imageUriResult = await selectImageFromLibrary(); // Czekamy na wynik
                  setImageUri(imageUriResult); // Ustawiamy URI obrazu
                }}
                className="px-3 py-2 rounded-lg items-center border-2 border-secondary-100"
              >
                <Images size={24} color={"#828282"} />
              </TouchableOpacity>

              {/* Przycisk "Zrób zdjęcie" */}
              <TouchableOpacity
                onPress={async () => {
                  const imageUriResult = await captureImage(); // Czekamy na wynik
                  setImageUri(imageUriResult); // Ustawiamy URI obrazu
                }}
                className="px-3 py-2 rounded-lg items-center border-2 border-secondary-200"
              >
                <Camera size={24} color={"#828282"} />
              </TouchableOpacity>

              {/* Przycisk "Usuń zdjęcie" */}
              <TouchableOpacity
                onPress={() => setImageUri(null)}
                className="px-3 py-2 rounded-lg items-center border-2 border-secondary-300"
              >
                <Trash2 size={24} color={"#828282"} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="items-center py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4">
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              className="px-4 py-2 bg-primary-100 rounded-lg"
            >
              <Text className="text-white text-xl font-pregular">
                {"DODAJ"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/wardrobe");
              }}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              <Text className="text-white text-xl font-pregular">
                {"ANULUJ"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </InitialBackground>
  );
}
