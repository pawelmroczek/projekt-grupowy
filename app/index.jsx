import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import backgroundImage from "../assets/backgrounds/initialBackground.png";
import logo from "../assets/logo.png";
import { router } from "expo-router";
import InitialBackground from "../components/common/InitialBackground";

export default function App() {
  return (
    <InitialBackground image={backgroundImage}>
      <View className="items-center  p-6 rounded-xl">
        <Image source={logo} className="w-[120px] h-[120px]" />
        <View className="flex-row items-center">
          <Text className="text-[45px] font-pregular  ">Fashion </Text>
          <Text className="text-[45px] text-primary-200  font-pblack">
            Buddy
          </Text>
        </View>
        <Text className="text-center mt-4 text-lg font-pextralight">
          Wykorzystaj pełen potencjał swojej szafy z Fashion Buddy!
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/sign-in")}
          className="bg-primary-100 p-2 px-8 rounded-md mt-4"
        >
          <Text className="text-white text-xl font-pregular ">ZALOGUJ SIĘ</Text>
        </TouchableOpacity>
        <View className="pt-2 flex-row gap-2">
          <Text className=" text-base font-pregular ">lub</Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className=" text-base font-pmedium underline">
              Zarejestruj się
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </InitialBackground>
  );
}
