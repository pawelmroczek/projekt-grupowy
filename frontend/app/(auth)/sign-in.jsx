import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import InitialBackground from "../../components/common/InitialBackground";

import logo from "../../assets/logo.png";
import FormField from "../../components/common/FormField";
import authBackground from "../../assets/backgrounds/authBackground.png";
import { router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    console.log(JSON.stringify(form));
    
    fetch("http://localhost:8080/fashion/user/signIn", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then((response) => response)
      .then((data) => {
      console.log("Success:", data);
      // Handle successful login, e.g., navigate to another screen
      })
      .catch((error) => {
      console.error("Error:", error);
      // Handle login error
      });
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
              handleLogin();
            }}
          >
            <Text className="text-white text-xl font-pregular">
              ZALOGUJ SIĘ
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center w-full mt-5 flex-row justify-center">
          <Text className=" text-base font-pregular mr-2 ">
            Nie masz konta?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/sign-up");
            }}
          >
            <Text className=" text-base font-pmedium underline">
              Zarejestruj się
            </Text>
          </TouchableOpacity>
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
