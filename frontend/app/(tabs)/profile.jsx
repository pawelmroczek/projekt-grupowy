import { Text, TouchableOpacity } from "react-native";
import { React, useContext } from "react";
import AddFriend from "../../components/features/profile/AddFriend";
import ProfileBlock from "../../components/features/profile/ProfileBlock";
import { router } from "expo-router";
import FriendsList from "../../components/features/profile/FriendsList";
import { TokenContext } from "../../lib/TokenContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);
  const { outfits, setOutfits } = useContext(TokenContext);

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ProfileBlock />
      <AddFriend />
      <FriendsList />
      <TouchableOpacity
        className="absolute bottom-6 bg-white border-2 border-secondary-300 rounded-xl pb-4 items-center w-[90%] self-center"
        onPress={() => {
          router.replace("/");
          setToken(null);
          setClothes([]);
          setOutfits([]);
        }}
      >
        <Text className="text-center text-secondary-300 text-base mt-4 font-semibold">
          Wyloguj
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
