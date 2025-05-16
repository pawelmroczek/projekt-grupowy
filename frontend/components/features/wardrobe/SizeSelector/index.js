import { View } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";

const SizeSelector = () => {
  const sizes = [
    "Boots",
    "Sandals",
    "Pumps",
    "Flats",
    "Sneakers",
    "Loafers",
    "Oxfords",
    "Slippers",
  ];
  const [selectedSize, setSelectedCategory] = useState(null);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <View className="flex-row space-x-2 my-2">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? " border-secondary-300"
                : "bg-gray-200 border-gray-200 "
            }`}
            onPress={() =>
              setSelectedCategory(selectedCategory === cat ? null : cat)
            }
          >
            <Text className="text-base text-black font-plight">{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SizeSelector;
