import React from "react";
import InitialBackground from "../../components/common/InitialBackground";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
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
  ImagePlus,
} from "lucide-react-native";
import {
  selectImageFromLibrary,
  captureImage,
} from "../../lib/authorization/picture_logic";
import { clothesSending } from "../../lib/authorization/authorization";
import { router } from "expo-router";
import SelectForm from "../../components/common/SelectForm";

import AddPhoto from "../../components/features/wardrobe/AddPhoto";
import CategorySelector from "../../components/common/CategorySelector";
import ColorSelector from "../../components/features/wardrobe/ColorSelector";
import { TokenContext } from "../TokenContext";
import VerticalSelector from "../../components/common/VerticalSelector";

export default function index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [imageName, setImageName] = useState(false);
  const [imageType, setImageType] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const typeOptions = [
    "Koszulka",
    "Koszula",
    "Spodnie",
    "Sweter",
    "Kurtka",
    "Buty",
    "Sukienka",
    "Spódnica",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const { token, setToken } = useContext(TokenContext);

  const [selectedColor, setSelectedColor] = useState("idle");
  const [selectedSize, setSelectedSize] = useState("idle");
  const [selectedType, setSelectedType] = useState("idle");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", "type");
    formData.append("file", {
      uri: imageUri,
      name: imageName,
      type: imageType,
    });
    formData.append("size", selectedSize);
    formData.append("color", selectedColor);
    formData.append("clean", "true");
    console.log(formData);
    const serverresponse = await clothesSending(formData, token);
    router.push("/wardrobe");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-start mx-auto flex h-full justify-center w-[95%] p-2 rounded-lg ">
          <View className="flex-row items-center justify-center gap-2 pt-3">
            <Text className="text-xl font-pbold ">Dodaj swoje ubranie</Text>
            <Shirt size={25} color={"#264653"} />
          </View>

          <View className="flex-1 w-full pt-5">
            <AddPhoto
              imageUri={imageUri}
              setImageName={setImageName}
              setImageType={setImageType}
              setImageUri={setImageUri}
            />
            <FormField
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              title="Nazwa ubrania"
              borderColor={"secondary"}
              placeholder="np. niebieski sweter"
              otherStyles={"mt-6"}
            />
            <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
              {"Rozmiar:"}
            </Text>
            <View>
              <VerticalSelector
                options={sizes}
                setValue={setSelectedSize}
                value={selectedSize}
              />
            </View>
            <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
              {"Typ:"}
            </Text>
            <View>
              <VerticalSelector
                options={typeOptions}
                setValue={setSelectedType}
                value={selectedType}
              />
            </View>
            <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
              {"Kolor:"}
            </Text>
            <View>
              <ColorSelector
                selectColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </View>

            <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
              <TouchableOpacity
                onPress={() => {
                  console.log("submit");
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
      </ScrollView>
    </SafeAreaView>
  );
}
