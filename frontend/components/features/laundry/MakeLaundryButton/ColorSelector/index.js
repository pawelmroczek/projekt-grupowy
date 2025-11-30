import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colorsTypes } from "../../../../../assets/constants/colors/colors";

const ColorSelector = ({selectColor, setSelectededColor}) => {

  const colors = colorsTypes;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <View className="flex-row space-x-2 my-2">
        {colors.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-4 py-2 rounded-full border ${
              selectColor === cat
                ? " border-secondary-300"
                : "bg-gray-200 border-gray-200 "
            }`}
            onPress={() =>
              setSelectededColor(selectColor === cat ? null : cat)
            }
          >
            <Text className="text-base text-black font-plight">{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ColorSelector;
