import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import WardrobeStatus from "../../components/features/laundry/WardrobeStatus";
import PlanLaundryButton from "../../components/features/laundry/PlanLaundryButton";
import LaundryHistory from "../../components/features/laundry/LaundryHistory";
import SuggestedLaundry from "../../components/features/laundry/SuggestedLaundry";
import DirtyClothes from "../../components/features/laundry/DirtyClothes";

{/*

import DirtyClothes from "../../components/features/laundry/DirtyClothes";
import useDirtyClothes from "../../useDirtyClothes";
import { TokenContext } from "../TokenContext";

*/}

const Laundry = () => {
 {/* const { token } = useContext(TokenContext);
  const dirtyClothes = useDirtyClothes(token);
  */}

  return (
    <SafeAreaView>
      <View className="p-2">
        <SuggestedLaundry />
        <PlanLaundryButton />
        <WardrobeStatus />
        <DirtyClothes />
        <LaundryHistory />
      </View>
    </SafeAreaView>
  );
};

export default Laundry;
