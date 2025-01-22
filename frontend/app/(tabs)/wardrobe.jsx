import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import FormField from "../../components/common/FormField";
import SelectDropdown from 'react-native-select-dropdown';
import {
    ArrowUp,
    ArrowDown,
    Images,
    Trash2,
    Camera,
    Shirt
  } from "lucide-react-native";
import { selectImageFromLibrary, captureImage } from "../../lib/authorization/picture_logic";
import { clothesSending } from "../../lib/authorization/authorization";

const FormData = global.FormData;

const Wardrobe = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(false);
    const [form, setForm] = useState({
        name: "",
        type: "",
      });
      const typeOptions = [
        {title: 'Koszulka'},
        {title: 'Spodnie'},
        {title: 'Bluza'},
        {title: 'Koszula'},
        {title: 'Sweter'},
        {title: 'Inne'},
      ]

    const handleSubmit = async () => {
      if (!imageUri) {
        Alert.alert('Wybierz zdjęcie');
        return;
      }
      else if(!form.name)
      {
        Alert.alert('Podaj nazwe');
        return;
      }
      else if(!form.type)
      {
        Alert.alert('Podaj typ');
        return;
      }

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('type', form.type);
      formData.append('file', {
          uri: imageUri,
          name: 'photo.png',
      });

      const serverresponse = clothesSending(formData);
    
    }
    
    return (
        <View className="flex-1 bg-gray-100">
          {/* Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 tertiary bg-opacity-50 justify-center items-center">
              <View className="bg-white p-5 rounded-lg w-4/5 h-full ">
                <Text className="text-lg font-pbold mb-4">Formularz</Text>
                <FormField
                    title="Nazwa ubrania"
                    placeholder=""
                    value={form.name}
                    handleChangeText={(e) => setForm({ ...form, name: e })}
                />
                <Text className="text-base text-text-primary font-pmedium">{'Typ:'}</Text>
                <View className="w-full rounded-2xl border-2 border-primary-100 focus:border-secondary-200 flex flex-row items-center px-4">
                    <SelectDropdown
                        data={typeOptions}
                        onSelect={(selectedItem, index) => {
                        setForm({ ... form, type: selectedItem.title})
                        }}
                        renderButton={(selectedItem, isOpened) => {
                        return (
                            <View className="bg-white rounded-lg px-4 py-2 flex-row items-center justify-center">
                                <Text className="text-base text-text-primary font-pmedium mr-2">
                                    {(selectedItem && selectedItem.title) || 'Wybierz typ:'}
                                </Text>
                                <View className="flex-right">
                                    {isOpened ? (
                                        <ArrowUp size={20} color={"#828282"} />
                                    ) : (
                                        <ArrowDown size={20} color={"#828282"} />
                                    )}
                                </View>
                            </View>
                        );
                        }}
                        renderItem={(item, index, isSelected) => {
                        return (
                            <View className="w-full rounded-2xl flex flex-row items-center justify-center px-4 py-2">
                                <Text className="w-full flex-1 text-text-secondary font-psemibold text-base">{item.title}</Text>
                            </View>
                        );
                        }}
                        showsVerticalScrollIndicator={false}
                        buttonStyle={{ width: '100%' }}
                        dropdownStyle={{ borderRadius: 10 }}
                    />                
                </View>
                <View className="flex-1 justify-center items-center p-5">
                  {/* Wyświetlanie zdjęcia */}
                  {imageUri ? 
                    <Image
                      source={{ uri: imageUri }}
                      className="w-36 h-36 rounded-lg mb-5"/>
                    :
                    <Shirt size={60}/>
                  }
                  <View className="items-center mt-5 py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4">
                    {/* Przycisk "Dodaj z galerii" */}
                    <TouchableOpacity
                      onPress={async () => {
                        const imageUriResult = await selectImageFromLibrary(); // Czekamy na wynik
                        setImageUri(imageUriResult); // Ustawiamy URI obrazu
                      }}
                      className="px-3 py-2 rounded-lg items-center border-2 border-secondary-100"
                    >
                      <Images size={24} color={"#828282"}/>
                    </TouchableOpacity>

                    {/* Przycisk "Zrób zdjęcie" */}
                    <TouchableOpacity
                      onPress={async () => {
                        const imageUriResult = await captureImage(); // Czekamy na wynik
                        setImageUri(imageUriResult); // Ustawiamy URI obrazu
                      }}
                      className="px-3 py-2 rounded-lg items-center border-2 border-secondary-200"
                    >
                      <Camera size={24} color={"#828282"}/>
                    </TouchableOpacity>

                    {/* Przycisk "Usuń zdjęcie" */}
                    <TouchableOpacity
                      onPress={() => setImageUri(null)}
                      className="px-3 py-2 rounded-lg items-center border-2 border-secondary-300"
                    >
                      <Trash2 size={24} color={"#828282"}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="items-center mt-5 py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4">
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      className="px-4 py-2 bg-primary-100 rounded-lg"
                    >
                      <Text className="text-white text-xl font-pregular">{"DODAJ"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { setModalVisible(false); }}
                      className="px-4 py-2 bg-red-500 rounded-lg"
                    >
                      <Text className="text-white text-xl font-pregular">{"ANULUJ"}</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
    
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="absolute bottom-5 right-5 bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          >
            <Text className="text-white text-4xl pextrabold">+</Text>
          </TouchableOpacity>
        </View>
    );
};

export default Wardrobe