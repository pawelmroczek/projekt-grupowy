
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const VerticalSelector = ({ options, value, setValue, multiSelect=false }) => {

  const handlePress = (opt) => {
    if (multiSelect) {
      if (value.includes(opt)) {
        setValue(value.filter(v => v !== opt));
      } else {
        setValue([...value, opt]);
      }
    } else {
      setValue(value === opt ? null : opt);
    }
  };

  const isSelected = (opt) => {
    return multiSelect ? value.includes(opt) : value === opt;
  };


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <View className="flex-row space-x-2 m-2">
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            className={`px-4 py-2 rounded-full border ${
              isSelected(opt)
                ? " border-secondary-300"
                : "bg-gray-200 border-gray-200 "
            }`}
            onPress={() =>
              handlePress(opt)
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
