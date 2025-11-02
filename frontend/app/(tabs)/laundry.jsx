import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { use, useContext, useEffect, useState } from "react";
import WardrobeStatus from "../../components/features/laundry/WardrobeStatus";
import PlanLaundryButton from "../../components/features/laundry/PlanLaundryButton";
import LaundryHistory from "../../components/features/laundry/LaundryHistory";
import DirtyClothes from "../../components/features/laundry/DirtyClothes";
import MakeLaundryButton from "../../components/features/laundry/MakeLaundryButton";
import LaundryPlan from "../../components/features/laundry/LaundryPlan";
import DebugCareSymbols from "../../components/features/laundry/DebugCareSymbols";
import { fetchLaundries } from "../../lib/laundry/fetchLaundries";

import planLaundry from "../../lib/laundry/planLaundry";
import { fetchLaundyPreferences } from "../../lib/laundry/fetchLaundyPreferences";
import { TokenContext } from "../../lib/TokenContext";

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

  const [laundryPlan, setLaundryPlan] = useState([]);

  const { token, clothes, outfits } = useContext(TokenContext);

  const [options, setOptions] = useState({
    minItemsPerLoad: 1,
    useTemperatureMatching: true,
    useRestrictionMatching: true,
    temperatureTolerance: 20,
    treatEmptyAsCompatible: true,
    allowHandWashWithMachine: false,
    allowDelicateWithNormal: true,
  });

   const fetchData = async () => {
    const data = await fetchLaundries(token);
    const preferences = await fetchLaundyPreferences(token);
    setOptions(preferences);
    setLaundries(data);
  };



  useEffect(() => {
    fetchData();    
  }, []);


  useEffect(() => {
    setLaundryPlan(planLaundry(clothes || [], laundries, outfits || [], options));
  }, [options, clothes, laundries, outfits]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-2 pt-0">
          {/* <SuggestedLaundry /> */}
          <LaundryPlan
            suggestLaundry={laundryPlan}
            options={options}
            setOptions={setOptions}
          />
          {/* <DebugCareSymbols /> */}
          <PlanLaundryButton />
          <DirtyClothes />
          <MakeLaundryButton suggestedLaundry={laundryPlan} />
          <LaundryHistory laundries={laundries} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Laundry;
