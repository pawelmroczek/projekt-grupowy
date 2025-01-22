import * as ImagePicker from 'expo-image-picker';

export const selectImageFromLibrary = async () => {
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
      return result.assets[0].uri; // Zapisujemy URI wybranego zdjęcia
    }
    return null;
};

// Funkcja do robienia zdjęcia za pomocą aparatu
export const captureImage = async () => {
    try{
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });
    
        if (!result.canceled) {
            return result.assets[0].uri; // Ustawiamy URI zdjęcia
        }
    }
    catch(error)
    {
        alert("Error uploading image form camera: " + error.message);
    }
    return null;
};