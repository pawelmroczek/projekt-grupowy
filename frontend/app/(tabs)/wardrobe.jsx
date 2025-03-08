import React, { useState } from "react";
import {
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import { clothesSending } from "../../lib/authorization/authorization";
import AddButton from "../../components/features/wardrobe/AddButton";
import { router } from "expo-router";
import SearchBarWardrobe from "../../components/common/SearchBarWardrobe";

const FormData = global.FormData;

const Wardrobe = () => {
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
    <>
      <SearchBarWardrobe></SearchBarWardrobe>
      <SafeAreaView>
        <View className="flex-1 bg-gray-100">
          {/* Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
          </Modal>
        </View>
      </SafeAreaView>
      <AddButton onPress={() => router.push("/addClothes")} />
    </>
  );
};

export default Wardrobe;
