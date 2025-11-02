import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import {React, useContext} from "react";
import AddFriend from "../../components/features/profile/AddFriend";
import ProfileBlock from "../../components/features/profile/ProfileBlock";
import { router } from "expo-router";
import FriendsList from "../../components/features/profile/FriendsList";
import { TokenContext } from "../../lib/TokenContext";



const Profile = () => {

  const { token, setToken } = useContext(TokenContext);
  const { clothes, setClothes } = useContext(TokenContext);
  const { outfits, setOutfits } = useContext(TokenContext);

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <AddFriend />
      <ProfileBlock />
      <FriendsList />
      <TouchableOpacity className="absolute bottom-6 bg-red-500 border-2 border-red-600 rounded-xl pb-4 items-center w-[80%] left-[10%]" onPress={() => { router.replace('/'); setToken(null); setClothes([]); setOutfits([]); }}>
        <Text className="text-center text-white text-base mt-4 font-semibold">Wyloguj</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
