import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React from "react";
import AddFriend from "../../components/features/profile/AddFriend";

import backgroundImage from "../../assets/backgrounds/initialBackground.png";
import FriendsList from "../../components/features/profile/FriendsList";

const Profile = () => {
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <AddFriend />
      <FriendsList />
    </SafeAreaView>
  );
};

export default Profile;
