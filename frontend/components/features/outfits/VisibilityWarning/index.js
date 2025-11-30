import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { visibilityLabelAlert } from "../../../../assets/constants/visibilty/visibilty";

const VisibilityWarning = ({ clothes, outfitVisibility }) => {
  const clothesWithLowerVisibility = clothes.filter(
    (cloth) => cloth.visible < outfitVisibility
  );

  if (clothesWithLowerVisibility.length === 0) {
    return null;
  }

  const clothesNames = clothesWithLowerVisibility
    .map((c) => c.name)
    .join(", ");

  const getMessage = () => {
    if (outfitVisibility === 2) {
      return "Wszyscy użytkownicy będą mogli zobaczyć te ubrania w tym outficie.";
    } else if (outfitVisibility === 1) {
      return "Twoi znajomi będą mogli zobaczyć te ubrania w tym outficie.";
    }
    return "";
  };

  const getCountText = () => {
    const count = clothesWithLowerVisibility.length;
    if (count === 1) return "1 ubranie";
    if (count < 5) return `${count} ubrania`;
    return `${count} ubrań`;
  };

  return (
    <View
      className="mx-2 my-4 p-4 bg-blue-50 border-2 border-blue-400 rounded-2xl"
      
    >
      <View className="flex-row items-start">
        <View className="w-10 h-10 bg-blue-200 rounded-full items-center justify-center mr-3 mt-1">
          <AlertCircle size={24} color="#1e3a8a" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-blue-900 mb-2">
            Uwaga na widoczność!
          </Text>
          <Text className="text-sm text-blue-800 leading-5">
            Ten outfit będzie{" "}
            <Text className="font-bold">{visibilityLabelAlert[outfitVisibility]}</Text>,
            ale zawiera {getCountText()} o niższej widoczności (
            {clothesNames}).
          </Text>
          <Text className="text-sm text-blue-800 leading-5 mt-2">
            {getMessage()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VisibilityWarning;
