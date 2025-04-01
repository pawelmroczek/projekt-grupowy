import { View, Text, TouchableOpacity} from "react-native";
import React from "react";
import { router } from "expo-router";


const makeLaundry = ({}) => {

    const [selectColor, setSelectColor] = React.useState(null);
    const params = useLocalSearchParams();
      useEffect(() => {
        //console.log(params);
        if (Object.keys(params).length > 0) {
          setSelectColor(params.color);
        }
      }, []);

    return (
        <View className="flex-1 bg-white p-6">
            
        </View>
    );
};

export default makeLaundry;