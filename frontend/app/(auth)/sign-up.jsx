import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useContext} from "react";
import InitialBackground from "../../components/common/InitialBackground";

import logo from "../../assets/logo.png";
import FormField from "../../components/common/FormField";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { router } from "expo-router";
import { CircleX } from "lucide-react-native";
import ErrorText from "../../components/common/ErrorText";
import { registerUser } from "../../lib/authorization/authorization";


import EmailConfirmation from "../../components/features/auth/EmailConfirmation";


const SignUp = () => {
  const [emailNotificationVisible, setEmailNotificationVisible] = useState(false);
  const [registryStatus, setRegistryStatus] = useState(false);
  const [error, setError] = useState(null);
  
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const scrollViewRef = useRef(null); // Dodajemy referencję do ScrollView

  const handleFocus = (fieldIndex) => {
    // Automatyczne przewinięcie do odpowiedniego pola
    const yOffset = fieldIndex * 80; // Wartość zależna od wysokości pól
    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  function validateForm() {
    // Walidacja username
    if (!form.username) {
      setError("Imię jest wymagane.");
      return 1;
    }

    // Walidacja e-mail
    if (!form.email) {
      setError("Adres e-mail jest wymagany.");
      return 1;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Podaj poprawny adres e-mail.");
      return 1;
    }

    // Walidacja hasła
    if (!form.password) {
      setError("Hasło jest wymagane.");
      return 1;
    } else if (form.password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.");
      return 1;
    }

    return 0;
  }

  const handleRegister = async () => {
    console.log("Próba rejestracji z danymi:", form);
    validate = validateForm();
    if (validate === 0) {
      setRegistryStatus(true)
      const response = await registerUser(form);
      const token = response.message.token ? response.message.token : null; 
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRegistryStatus(false);
      
      if (response.success) {
        console.log("✅ Sukces:");
        // setToken(token);
        // const clothesData = await getClothes(token);
        // setClothes(clothesData);
        setEmailNotificationVisible(true);

      } else {
        console.log("❌ Błąd:", response.message);
        setError(response.message); 
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <InitialBackground image={authBackground}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            ref={scrollViewRef} // Przypisanie referencji
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <View className="items-start w-full justify-center p-5 rounded-lg">
              {/* Powrót */}

              {/* Logo */}
              <View className="flex-row items-center justify-center">
                <Image
                  source={logo}
                  style={{ width: 55, height: 55, marginRight: 10 }}
                />
                <Text className="text-4xl font-pregular">Fashion</Text>
                <Text className="text-4xl text-primary-200 font-pblack">
                  Buddy
                </Text>
              </View>

              {/* Formularz */}
              <View className="items-start w-full mt-4">
                <FormField
                  title="Imię"
                  placeholder="Wprowadź swoje imię"
                  value={form.username}
                  handleChangeText={(e) => setForm({ ...form, username: e })}
                  onFocus={() => handleFocus(0)} // Dodaj obsługę focus
                />
                <FormField
                  title="Email"
                  placeholder="Wprowadź swój email"
                  value={form.email}
                  otherStyles={"mt-4"}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  onFocus={() => handleFocus(1)} // Dodaj obsługę focus
                />
                <FormField
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                  title="Hasło"
                  placeholder="Wprowadź swoje hasło"
                  otherStyles={"mt-4"}
                  onFocus={() => handleFocus(2)} // Dodaj obsługę focus
                />
              </View>

              {/* Przycisk */}
              <View className="items-center mt-5 py-3.5 rounded-xl w-full bg-primary-100">
                <TouchableOpacity
                  onPress={() => {
                    handleRegister();
                  }}
                >
                  <Text className="text-white text-xl font-pregular">
                   {registryStatus ? "Rejestracja..." : "ZAREJESTRUJ SIĘ"}
                  </Text>
                </TouchableOpacity>
              </View>
              <ErrorText
                icon={<CircleX color={"rgb(185 28 28)"} />}
                error={error}
              />
              <View className="items-center w-full mt-5 flex-row justify-center">
                <Text className=" text-base font-pregular mr-2 ">
                  Masz już konto?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.replace("/sign-in");
                  }}
                >
                  <Text className=" text-base font-pmedium underline">
                    Zaloguj się
                  </Text>
                </TouchableOpacity>
              </View>
              <EmailConfirmation visible={emailNotificationVisible} setVisible={setEmailNotificationVisible}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </InitialBackground>
      
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
