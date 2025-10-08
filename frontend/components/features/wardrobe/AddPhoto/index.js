import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Camera, ImagePlus, Images, Trash2 } from "lucide-react-native";
import {
  captureImage,
  selectImageFromLibrary,
} from "../../../../lib/clothes/picture_logic";

export default function AddPhoto({
  imageUri,
  setImageUri,
  setImageName,
  setImageType,
  setPredictedType,
}) {
  return (
    <View className="flex justify-center items-stretch flex-row space-x-4 ">
      {/* Wyświetlanie zdjęcia */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-40 h-40 rounded-full " />
      ) : (
        <View className="bg-gray-200 border border-gray-500 w-40 h-40 flex items-center justify-center rounded-xl">
          <ImagePlus size={80} color={"#9a9ca0"} />
        </View>
      )}
      <View className="items-center  flex justify-between  bg-white-100 ">
        {/* Przycisk "Dodaj z galerii" */}
        <TouchableOpacity
          onPress={async () => {
            const imageResult = await selectImageFromLibrary(); // Czekamy na wynik
            setImageUri(imageResult.uri);
            setImageName(imageResult.fileName);
            setImageType(imageResult.type);
            setPredictedType(null);
          }}
          className="px-3 py-2 rounded-lg items-center border border-secondary-300"
        >
          <Images size={24} color={"#828282"} />
        </TouchableOpacity>

        {/* Przycisk "Zrób zdjęcie" */}
        <TouchableOpacity
          onPress={async () => {
            const imageResult = await captureImage(); // Czekamy na wynik
            setImageUri(imageResult.uri);
            setImageName("photo.jpg");
            setImageType(imageResult.type);
            setPredictedType(null);
          }}
          className="px-3 py-2 rounded-lg items-center border border-secondary-300"
        >
          <Camera size={24} color={"#828282"} />
        </TouchableOpacity>

        {/* Przycisk "Usuń zdjęcie" */}
        <TouchableOpacity
          onPress={() => {
            setImageUri(null);
            setPredictedType(null);
          }}
          className="px-3 py-2 rounded-lg items-center border border-secondary-300"
        >
          <Trash2 size={24} color={"#828282"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
