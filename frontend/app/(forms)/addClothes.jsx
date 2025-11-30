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
import { Shirt } from "lucide-react-native";
import { clothesSending, clothesEditing } from "../../lib/clothes/clothes";
import { router, useLocalSearchParams } from "expo-router";

import AddPhoto from "../../components/features/wardrobe/AddPhoto";
import ColorSelector from "../../components/features/wardrobe/ColorSelector";
import LaundryIconsSelector from "../../components/features/wardrobe/LaundryIconsSelector";

import HorizontalSelector from "../../components/common/HorizontalSelector";
import { getClothes } from "../../lib/clothes/clothes";
import ThreeOptionSelector from "../../components/common/ThreeOptionSelector";
import {
  CLOTHING_SIZES,
  SHOES_SIZES,
  ACCESSORY_SIZES,
} from "../../assets/constants/sizes/sizes";
import {
  clothingTypeOptions,
  shoesTypeOptions,
  accessoryTypeOptions,
} from "../../assets/constants/types/types";
import { Seasons } from "../../assets/constants/seasons/seasons";
import ClassifyButton from "../../components/features/wardrobe/ClassifyButton";
import VisibiltySelector from "../../components/common/VisibiltySelector";

import { TokenContext } from "../../lib/TokenContext";
import PioritySelector from "../../components/features/wardrobe/PioritySelector";

export default function index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(0);

  const { token } = useContext(TokenContext);
  const { setClothes, fetchClothes } = useContext(TokenContext);

  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [nonValidAlert, setNonValidAlert] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorHex, setSelectedColorHex] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [predictedType, setPredictedType] = useState(null);
  const [cleanStatus, setCleanStatus] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState([]);

  const [loadingImage, setLoadingImage] = useState(false);

  const [editing, setEditing] = useState(false);

  const [visible, setVisible] = useState(2);
  const [priority, setPriority] = useState(0);

  const sizesByCategory = [CLOTHING_SIZES, SHOES_SIZES, ACCESSORY_SIZES];
  const typeOptions = [
    clothingTypeOptions?.map((item) => item.label) || [],
    shoesTypeOptions?.map((item) => item.label) || [],
    accessoryTypeOptions?.map((item) => item.label) || [],
  ];
  const seasonOptions = Seasons.map((item) => item.label);
  const params = useLocalSearchParams();
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setEditing(true);
      setForm({
        name: params.name,
        type: params.type,
      });
      setSelectedColor(params.color);
      setSelectedColorHex(params.colorHex);
      setSelectedSize(params.size);
      setSelectedType(params.type);
      setVisible(parseInt(params.visible));
      setSelectedCategory(parseInt(params.category));
      setPriority(parseInt(params.priority));
      setImageUri(params.picture);
      setImageName(".jpg");
      setImageType("image/jpeg");
      setCleanStatus(params.clean);
      setSelectedIcons(
        params.pictogramIds
          ? params.pictogramIds
              .split(",")
              .map(Number)
              .sort((a, b) => a - b)
          : []
      );

      const seasonsArray = params.seasons ? params.seasons.split(",") : [];

      const seasonLabels = Seasons.filter((season) =>
        seasonsArray.includes(season.value)
      ).map((season) => season.label);

      setSelectedSeason(seasonLabels);
    }
  }, []);

  const handleSubmit = async () => {
    const isValid =
      form.name &&
      selectedType &&
      imageUri &&
      selectedSize &&
      selectedColor &&
      selectedSeason.length > 0;

    if (!isValid) {
      setNonValidAlert("Uzupełnij wszystkie pola!");
      setAddButtonDisabled(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", selectedCategory);
    formData.append("type", selectedType);
    formData.append("file", {
      uri: imageUri,
      name: imageName,
      type: imageType,
    });
    formData.append("size", selectedSize);
    formData.append("color", selectedColor);
    formData.append("colorHex", selectedColorHex);
    formData.append("clean", cleanStatus);
    formData.append("visible", visible);
    formData.append("priority", priority);
    formData.append("pictogramIds", selectedIcons.join(", "));

    selectedSeason.forEach((label) => {
      const season = Seasons.find((s) => s.label === label);
      if (season) {
        formData.append("seasons", season.value);
      }
    });

    if (editing) {
      formData.append("id", params.id);
      const serverresponse = await clothesEditing(formData, token);
      await fetchClothes();
      router.back();
    } else {
      const serverresponse = await clothesSending(formData, token);
      await fetchClothes();
      router.back();
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
            <ThreeOptionSelector
              options={["Ubrania", "Buty", "Akcesoria"]}
              setSelectedOption={setSelectedCategory}
              selectedOption={selectedCategory}
            />
            <AddPhoto
              imageUri={imageUri}
              setImageName={setImageName}
              setImageType={setImageType}
              setImageUri={setImageUri}
              setPredictedType={setPredictedType}
              loadingImage={loadingImage}
              setLoadingImage={setLoadingImage}
              selectedColorHex={selectedColorHex}
              setSelectedColorHex={setSelectedColorHex}
            />
            {selectedCategory === 0 && imageUri ? (
              <ClassifyButton
                imageUri={imageUri}
                imageType={imageType}
                imageName={imageName}
                predictedType={predictedType}
                setPredictedType={setPredictedType}
                setSelectedType={setSelectedType}
                hex={selectedColorHex}
                setColor={setSelectedColor}
              />
            ) : null}
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
              <HorizontalSelector
                options={sizesByCategory[selectedCategory] || []}
                setValue={setSelectedSize}
                value={selectedSize}
              />
            </View>
            <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
              {"Typ:"}
            </Text>
            <View>
              <HorizontalSelector
                options={typeOptions[selectedCategory] || []}
                setValue={setSelectedType}
                value={selectedType}
              />
            </View>
            <Text className="text-base mb-1.5 mt-4 text-text-primary font-pmedium">
              {"Sezon:"}
            </Text>
            <View>
              <HorizontalSelector
                options={seasonOptions || []}
                setValue={setSelectedSeason}
                value={selectedSeason}
                multiSelect={true}
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
            {selectedCategory === 0 ? (
              <View>
                <LaundryIconsSelector
                  selectedIcons={selectedIcons}
                  setSelectedIcons={setSelectedIcons}
                />
              </View>
            ) : null}
            <VisibiltySelector value={visible} setValue={setVisible} />
            <PioritySelector value={priority} setValue={setPriority} />
            {nonValidAlert !== "" ? (
              <Text className="text-red-500 mt-2 mb-2 text-center">
                {nonValidAlert}
              </Text>
            ) : null}
            <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
              <TouchableOpacity
                disabled={addButtonDisabled}
                onPress={() => {
                  setAddButtonDisabled(true);
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
                  router.back();
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
