import React from "react";
import { Stack } from "expo-router";

const formsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="addClothes" options={{ headerShown: false }} />
      <Stack.Screen name="filterClothes" options={{ headerShown: false }} />
      <Stack.Screen name="makeLaundry" options={{ headerShown: false }} />
      <Stack.Screen name="addToLaundry" options={{ headerShown: false }} />
      <Stack.Screen name="findFriends" options={{ headerShown: false }} />
      <Stack.Screen name="invites" options={{ headerShown: false }} />
    </Stack>
  );
};

export default formsLayout;
