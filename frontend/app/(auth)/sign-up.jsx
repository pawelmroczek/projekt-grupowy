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
import React, { useState, useRef } from "react";
import InitialBackground from "../../components/common/InitialBackground";

import logo from "../../assets/logo.png";
import FormField from "../../components/common/FormField";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { router } from "expo-router";

const SignUp = () => {
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

  const handleRegister = () => {
    console.log(JSON.stringify(form));
    
    fetch("http://localhost:8080/fashion/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then((response) => response)
      .then((data) => {
        console.log("Success:", data);
        // Handle successful registration, e.g., navigate to another screen
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle registration error
      });
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
                    ZAREJESTRUJ SIĘ
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="items-center w-full mt-5 flex-row justify-center">
                <Text className=" text-base font-pregular mr-2 ">
                  Masz już konto?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/sign-in");
                  }}
                >
                  <Text className=" text-base font-pmedium underline">
                    Zaloguj się
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </InitialBackground>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
