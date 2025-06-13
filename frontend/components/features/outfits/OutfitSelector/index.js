import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CirclePlus, ImageOff, Shirt } from "lucide-react-native";
import { router } from "expo-router";

const fallbackImage =
  "https://via.placeholder.com/100x100.png?text=Image+Error";

const Tile = ({ clothe, isSelected }) => {
  const [imageError, setImageError] = useState(false);

  const handleCustomIDS = (id) => {
    if (id === 0) {
      return (
        <View className="p-5 items-center justify-center rounded-full bg-gray-200">
          <Shirt color="#AFAFAF" size="50" />
        </View>
      );
    } else if (id === -1) {
      return (
        <View className="p-5 items-center justify-center rounded-full bg-gray-200">
          <CirclePlus color="#AFAFAF" size="50" />
        </View>
      );
    }
  };

  return (
    <View
      className={`bg-white rounded-lg pt-2 w-40 h-40 items-center justify-center m-2 ${
        isSelected ? "border-2 border-primary-500" : ""
      }`}
    >
      {clothe.picture && !imageError ? (
        <Image
          source={{ uri: clothe.picture }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : clothe.picture && imageError ? (
        <View className="p-5 items-center justify-center rounded-full bg-gray-200">
          <ImageOff color="#AFAFAF" size="50" />
        </View>
      ) : (
        handleCustomIDS(clothe.id)
      )}
      <Text className="text-sm mt-2 font-semibold text-center">
        {clothe.name}
      </Text>
    </View>
  );
};

export default function OutfitSelector({ clothes, title, onSelect }) {
  const clothesWithEmpty = [
    {
      id: 0,
      name: "Brak",
    },
    ...clothes,
    {
      id: -1,
      name: "Dodaj",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const scrollRef = useRef(null);
  const itemLayouts = useRef({});

  const scrollToCenter = (index) => {
    const screenWidth = Dimensions.get("window").width;
    const itemX = itemLayouts.current[index] ?? 0;
    const itemWidth = 160; // szerokość kafelka + marginesy (40 + marginesy = ~160)
    const offset = itemX - screenWidth / 2 + itemWidth / 2 + 20;

    scrollRef.current?.scrollTo({ x: offset, animated: true });
  };

  useEffect(() => {
    if (selectedItem) {
      const index = clothesWithEmpty.findIndex(
        (item) => item.id === selectedItem.id
      );
      if (index !== -1 && itemLayouts.current[index] !== undefined) {
        scrollToCenter(index);
      }
    }
  }, [selectedItem]);

  return (
    <View>
      <Text className="uppercase mt-4 mb-2 font-bold text-center text-primary-200">
        {title}
      </Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {clothesWithEmpty.map((clothe, index) => (
          <TouchableOpacity
            key={clothe.id}
            onPress={() => {
              if (clothe.id === -1) {
                router.push("addClothes");
              } else {
                setSelectedItem(clothe);
                onSelect(clothe);
              }
            }}
            onLayout={(event) => {
              itemLayouts.current[index] = event.nativeEvent.layout.x;
            }}
          >
            <Tile clothe={clothe} isSelected={selectedItem?.id === clothe.id} />
          </TouchableOpacity>
        ))}
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: 120,
    aspectRatio: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
