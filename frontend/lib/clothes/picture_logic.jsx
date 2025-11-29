import * as ImagePicker from 'expo-image-picker';

export const selectImageFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Brak dostępu do galerii", "Proszę przyznać aplikacji dostęp do galerii.");
      return;
    }
    try{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
  
    if (!result.canceled) {
      return result.assets[0];
    }
    return null;
  }
  catch(error)
  {
      alert("Error uploading image form library: " + error.message);
  }
};

// Funkcja do robienia zdjęcia za pomocą aparatu
export const captureImage = async () => {
    try{
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.5,
        });
    
        if (!result.canceled) {
            return result.assets[0];
        }
    }
    catch(error)
    {
        alert("Error uploading image form camera: " + error.message);
    }
    return null;
};