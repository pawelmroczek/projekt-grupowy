import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, View } from "react-native";

const BackTitleBar = ({ children }) => {
  return (
    <View className="flex-row gap-2 items-center">
      <ArrowLeft size={25} color="#264653" onPress={() => router.back()} />
      <Text className="text-2xl font-bold text-gray-800 ">{children}</Text>
    </View>
  );
};

export default BackTitleBar;
