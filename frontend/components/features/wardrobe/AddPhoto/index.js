import { View, Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { useState } from "react";

import React from "react";
import { Camera, ImagePlus, Images, Trash2 } from "lucide-react-native";
import {
  captureImage,
  selectImageFromLibrary,
} from "../../../../lib/clothes/picture_logic";
import { removeBackground } from "../../../../lib/clothes/remove_background";

export default function AddPhoto({
  imageUri,
  setImageUri,
  setImageName,
  setImageType,
  setPredictedType,
  loadingImage,
  setLoadingImage,
  selectedColorHex,
  setSelectedColorHex
}) {
  const removeImageBackground = async (imageUri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    try {
      const response = await removeBackground(formData);
      setSelectedColorHex(response.dominantColor);
      return response.imageUri;
    } catch (error) {
      console.error("Błąd podczas usuwania tła:", error);
      return null;
    }
  }

  return (
    <View className="flex justify-center items-stretch flex-row space-x-4 ">
      {/* Wyświetlanie zdjęcia */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-40 h-40 rounded-full " />
      ) : (
        <View className="bg-gray-200 border border-gray-500 w-40 h-40 flex items-center justify-center rounded-xl">
          {loadingImage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ImagePlus size={80} color={"#9a9ca0"} />
          )}
        </View>
      )}
      <View className="items-center  flex justify-between  bg-white-100 ">
        {/* Przycisk "Dodaj z galerii" */}
        <TouchableOpacity
        disabled={loadingImage}
          onPress={async () => {
            let imageResult = await selectImageFromLibrary(); // Czekamy na wynik
            setLoadingImage(true);
            if(imageResult !== null) {
              imageResult.uri = await removeImageBackground(imageResult.uri);
              setImageUri(imageResult.uri);
              setImageName("ml_output.png");
              setImageType("image/png");
            }
            setLoadingImage(false);
            setPredictedType(null);
          }}
          className="px-3 py-2 rounded-lg items-center border border-secondary-300"
        >
          <Images size={24} color={"#828282"} />
        </TouchableOpacity>

        {/* Przycisk "Zrób zdjęcie" */}
        <TouchableOpacity
          disabled={loadingImage}
          onPress={async () => {
            let imageResult = await captureImage(); // Czekamy na wynik
            setLoadingImage(true);
            if(imageResult !== null) {
              imageResult.uri = await removeImageBackground(imageResult.uri);
              setImageUri(imageResult.uri);
              setImageName("image.png");
              setImageType("image/png");
            }
            setLoadingImage(false);
            setPredictedType(null);
          }}
          className="px-3 py-2 rounded-lg items-center border border-secondary-300"
        >
          <Camera size={24} color={"#828282"} />
        </TouchableOpacity>

        {/* Przycisk "Usuń zdjęcie" */}
        <TouchableOpacity
          disabled={loadingImage || !imageUri}
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
