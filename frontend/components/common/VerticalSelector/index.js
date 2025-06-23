
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const VerticalSelector = ({ options, value, setValue }) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <View className="flex-row space-x-2 m-2">
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            className={`px-4 py-2 rounded-full border ${
              value === opt
                ? " border-secondary-300"
                : "bg-gray-200 border-gray-200 "
            }`}
            onPress={() =>
              setValue(value === opt ? null : opt)
            }
          >
            <Text className="text-base text-black font-plight">{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default VerticalSelector;
