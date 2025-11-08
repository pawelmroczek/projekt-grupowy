import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Link = ({ children, href }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.replace(href);
      }}
    >
      <Text className=" text-base font-pmedium underline">{children}</Text>
    </TouchableOpacity>
  );
};

export default Link;
