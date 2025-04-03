import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FormField from "../../components/common/FormField";
import {
  Shirt
} from "lucide-react-native";
import { clothesSending, clothesEditing } from "../../lib/clothes/clothes";
import { router, useLocalSearchParams} from "expo-router";

import AddPhoto from "../../components/features/wardrobe/AddPhoto";
import ColorSelector from "../../components/features/wardrobe/ColorSelector";
import { TokenContext } from "../TokenContext";
import VerticalSelector from "../../components/common/VerticalSelector";
import { getClothes } from "../../lib/clothes/clothes";

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
  const { clothes, setClothes } = useContext(TokenContext);

  const [selectedColor, setSelectedColor] = useState("idle");
  const [selectedSize, setSelectedSize] = useState("idle");
  const [selectedType, setSelectedType] = useState("idle");
  const [cleanStatus, setCleanStatus] = useState(true);
  const [editing, setEditing] = useState(false);

  const params = useLocalSearchParams();
  useEffect(() => {
    console.log(params);
    if (Object.keys(params).length > 0) {
      setEditing(true);
      setForm({
      name: params.name,
      type: params.type,
      });
      setSelectedColor(params.color);
      setSelectedSize(params.size);
      setSelectedType(params.type);
      setImageUri(params.picture);
      setImageName(".jpg");
      setImageType("image/jpeg");
      setCleanStatus(params.clean);
      //console.log("Wczytano parametry");
    }
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", selectedType);
    formData.append("file", {
      uri: imageUri,
      name: imageName,
      type: imageType,
    });
    formData.append("size", selectedSize);
    formData.append("color", selectedColor);
    formData.append("clean", cleanStatus);
    //console.log(formData);
    console.log(formData.get("file").uri);
    console.log(formData.get("file").name);
    console.log(formData.get("file").type);
    //console.log(editing);
    if(editing){
      formData.append("id", params.id);
      //console.log("Wysyłam formularz");
      const serverresponse = await clothesEditing(formData, token);
      const clothesData = await getClothes(token);
      setClothes(clothesData);
      router.push("/wardrobe");
    }
    else{
      //console.log("Wysyłam formularz");
      const serverresponse = await clothesSending(formData, token);
      const clothesData = await getClothes(token);
      setClothes(clothesData);
      router.push("/wardrobe");
    }
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
                  //console.log("submit");
                  handleSubmit();
                }}
                className="px-4 py-2 bg-primary-100 rounded-lg"
              >
                <Text className="text-white text-xl font-pregular">
                  {editing ? "ZAPISZ" : "DODAJ"}
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
