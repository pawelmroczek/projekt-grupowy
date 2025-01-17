import React, { useState } from 'react';
import { View, Button, Image, Text, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const FormData = global.FormData;

const Wardrobe = () => {
  const [selectedImage, setselectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const userId = 1;


  // Funkcja do wyboru zdjęcia z galerii
  const selectImageFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Brak dostępu do galerii", "Proszę przyznać aplikacji dostęp do galerii.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setselectedImage(result.assets[0].uri); // Zapisujemy URI wybranego zdjęcia
    }
  };

    // Funkcja do robienia zdjęcia za pomocą aparatu
    const captureImage = async () => {
        try{
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            });
        
            if (!result.canceled) {
                setselectedImage(result.assets[0].uri); // Ustawiamy URI zdjęcia
            }
        }
        catch(error)
        {
            alert("Error uploading image form camera: " + error.message);
        }
    };

    // Funkcja do wysyłania zdjęcia na serwer
    const onFileUpload = async () => {
        if (!selectedImage) {
            Alert.alert('Wybierz zdjęcie');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', {
            uri: selectedImage,
            type: selectedImage.endsWith('.png') ? 'image/png' : 'image/jpeg', // Możesz zmienić typ pliku w zależności od wybranego formatu
            name: 'photo.png',
        });
        formData.append('userId', userId);


        try {
            //const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ2IiwiaWF0IjoxNzM3MTEwMDkwLCJleHAiOjE3MzcxMTM2OTB9.JXNreKiWbfj-lGmErL0a30PF9wSe5JU9ANA88IozIrB-NjILHA0TGHhopiHj3jYn';
            //console.log("Token:", token);
            console.log("Rozpoczynam wysyłanie...");
            const response = await fetch("http://192.168.0.51:8080/fashion/pictures/upload", {
                method: "POST",
                headers: {
                    //"Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Niektóre serwery mogą automatycznie ustawić ten nagłówek
                },
                body: formData,
            });
            console.log("Odpowiedź serwera:", response.data);
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            const data = await response.json(); // Zmienia odpowiedź na JSON
            setUploadedUrl(data.url);
            Alert.alert('Sukces', 'Zdjęcie zostało wysłane pomyślnie', uploadedUrl);
        } catch (error) {
            console.error('Błąd:', error);
            Alert.alert('Błąd', 'Wystąpił błąd podczas przesyłania zdjęcia');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Wybierz zdjęcie z galerii" onPress={selectImageFromLibrary} />
            <Button title="Zrób zdjęcie" onPress={captureImage} />

            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
            )}

            <Button title="Wyślij zdjęcie" onPress={onFileUpload} disabled={uploading} />
            
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
            
            {uploadedUrl && (
                <View>
                    <Text>Zdjęcie zostało załadowane:</Text>
                    <Image source={{ uri: uploadedUrl }} style={{ width: 200, height: 200 }} />
                </View>
            )}
        </View>
    );
};

export default Wardrobe