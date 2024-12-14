import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import backgroundImage from "../assets/backgrounds/initialBackground.png";
import logo from "../assets/logo.png";

export default function App() {
  return (
    <ImageBackground source={backgroundImage} className="h-full">
      <SafeAreaView className="h-full ">
        <ScrollView contentContainerStyle={{ height: "90%" }}>
          <View className="h-full justify-center items-center ">
            <View className="items-center  p-6 rounded-xl">
              <Image source={logo} className="w-[120px] h-[120px]"  />
              <View className="flex-row items-center">
                <Text className="text-[45px] font-pregular  ">Fashion </Text>
                <Text className="text-[45px] text-primary-200  font-pblack">
                  Buddy
                </Text>
              </View>
              <Text className="text-center mt-4 text-lg font-pextralight">
                Wykorzystaj pełen potencjał swojej szafy z Fashion Buddy!
              </Text>
              <TouchableOpacity className="bg-primary-100 p-2 px-8 rounded-md mt-4">
                <Text className="text-white text-lg font-pregular ">
                  ZALOGUJ SIĘ
                </Text>
              </TouchableOpacity>
              <View className="pt-2 flex-row gap-2">
                <Text className=" text-sm font-pregular ">lub</Text>
                <Text className=" text-sm font-pmedium underline">Zarejestruj się</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
