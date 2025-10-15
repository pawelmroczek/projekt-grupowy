import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import InitialBackground from "../../components/common/InitialBackground";

import logo from "../../assets/logo.png";
import FormField from "../../components/common/FormField";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { router } from "expo-router";
import { loginUser } from "../../lib/authorization/authorization";
import { CircleX } from "lucide-react-native";
import ErrorText from "../../components/common/ErrorText";
import Link from "../../components/common/Link";
import { TokenContext } from "../TokenContext";
import { getClothes } from "../../lib/clothes/clothes";

const SignIn = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "admin@gmail.com", //tymczasowe dane do logowania
    password: "admin", //tymczasowe dane do logowania
  });

  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);

  function validateForm()
  {
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
    }
    return 0;
    
  }

  const handleSubmit = async () => {
    setError(null);
    const validate = validateForm();
    if(validate == 0){
      setLoginStatus(true);
      const data = await loginUser(form.email, form.password);
      const token = data.message.token ? data.message.token : null;
      //symulacja ładowania
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoginStatus(false);
      
      if (token) {
        setToken(token);
        const clothesData = await getClothes(token);
        setClothes(clothesData);
        router.replace("/outfits");
      } else {
        console.log("❌ Błąd:",data.message.message);
        setError(data.message.message);
      }
    }
  };

  return (
    <InitialBackground image={authBackground}>
      <View className="items-start flex  justify-center w-[95%] p-5 rounded-lg ">
        <View className="flex-row items-center justify-center ">
          <Image source={logo} className="w-[55px] h-[55px] mr-2 mb-2.5" />
          <Text className="text-4xl font-pregular  ">Fashion </Text>
          <Text className="text-4xl text-primary-200  font-pblack">Buddy</Text>
        </View>
        <View className="items-start justify-start mt-4">
          <FormField
            title="Email"
            placeholder="Wprowadź swój email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
          <FormField
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            title="Hasło"
            placeholder="Wprowadź swoje hasło"
            otherStyles={"mt-4"}
          />
        </View>
        <View className="items-center mt-5 py-3.5 rounded-xl w-full flex-row justify-center bg-primary-100">
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text className="text-white text-xl font-pregular">
              {loginStatus ? "Logowanie..." : "ZALOGUJ SIĘ"}
            </Text>
          </TouchableOpacity>
        </View>
        <ErrorText icon={<CircleX color={"rgb(185 28 28)"} />} error={error} />
        <View className="items-center w-full mt-5 flex-row justify-center">
          <Text className=" text-base font-pregular mr-2 ">
            Nie masz konta?
          </Text>
          <Link href="/sign-up">Zarejestruj się</Link>
        </View>
        <View className="items-center w-full mt-5 flex-row justify-center">
          <TouchableOpacity>
            <Text className=" text-base font-pmedium underline">
              Zapomniałeś hasła?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </InitialBackground>
  );
};

export default SignIn;
