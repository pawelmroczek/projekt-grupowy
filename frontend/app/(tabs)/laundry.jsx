import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import WardrobeStatus from "../../components/features/laundry/WardrobeStatus";
import PlanLaundryButton from "../../components/features/laundry/PlanLaundryButton";
import LaundryHistory from "../../components/features/laundry/LaundryHistory";
import DirtyClothes from "../../components/features/laundry/DirtyClothes";
import MakeLaundryButton from "../../components/features/laundry/MakeLaundryButton";
import LaundryPlan from "../../components/features/laundry/LaundryPlan";
import DebugCareSymbols from "../../components/features/laundry/DebugCareSymbols";
import { fetchLaundries } from "../../lib/laundry/fetchLaundries";
import { TokenContext } from "../TokenContext";

{
  /*

import DirtyClothes from "../../components/features/laundry/DirtyClothes";
import useDirtyClothes from "../../useDirtyClothes";
import { TokenContext } from "../TokenContext";

*/
}

const Laundry = () => {
  {
    /* const { token } = useContext(TokenContext);
  const dirtyClothes = useDirtyClothes(token);
  */
  }

  const [laundries, setLaundries] = useState([]);
  const { token } = useContext(TokenContext);

  const fetchData = async () => {
    const data = await fetchLaundries(token);
    console.log("historia prania",data);
    setLaundries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-2 pt-0">
          {/* <SuggestedLaundry /> */}
          <LaundryPlan />
          {/* <DebugCareSymbols /> */}
          <PlanLaundryButton />
          <DirtyClothes />
          <MakeLaundryButton />
          <LaundryHistory laundries={laundries} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Laundry;
