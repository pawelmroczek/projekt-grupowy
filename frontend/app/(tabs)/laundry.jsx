import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import WardrobeStatus from "../../components/features/laundry/WardrobeStatus";
import PlanLaundryButton from "../../components/features/laundry/PlanLaundryButton";
import LaundryHistory from "../../components/features/laundry/LaundryHistory";
import SuggestedLaundry from "../../components/features/laundry/SuggestedLaundry";
import MakeLaundryButton from "../../components/features/laundry/MakeLaundryButton";

const Laundry = () => {
  return (
    <SafeAreaView>
      <View className="p-2">
        <SuggestedLaundry />
        <PlanLaundryButton />
        <WardrobeStatus />
        <LaundryHistory />
        <MakeLaundryButton />
      </View>
    </SafeAreaView>
  );
};

export default Laundry;
