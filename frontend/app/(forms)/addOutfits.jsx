import { useContext, useState } from "react";
import { ArrowLeft, CirclePlus } from "lucide-react-native";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OutfitSelector from "../../components/features/outfits/OutfitSelector";
import { router } from "expo-router";
import FormField from "../../components/common/FormField";
import SelectForm from "../../components/common/SelectForm";
import { outfitsTypes } from "../../lib/outfitsTypes";
import VerticalSelector from "../../components/common/VerticalSelector";
import { TokenContext } from "../TokenContext";
import { outfitsSending } from "../../lib/outfits/outfits";

const ModalBox = ({ modalVisible, setModalVisible, selectedItems }) => {
  const [outfitName, setOutfitName] = useState("");
  const [selectType, setSelectType] = useState("ide");
  const { token } = useContext(TokenContext);

  const handleSave = () => {
    const dataToSend = {
      name: outfitName,
      type: selectType,
      clothesIds: selectedItems.map((item) => item.id),
    };

    console.log("Dane do wysłania:", dataToSend);
    outfitsSending(dataToSend,token)
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <TouchableWithoutFeedback>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="w-11/12 bg-white p-5 rounded-2xl items-center shadow-lg shadow-black/30">
              <Text className=" font-pbold mb-4 ">Wprowadź nazwę </Text>
              <FormField
                title="Nazwa"
                placeholder="Wprowadź nazwę"
                value={outfitName}
                onChangeText={(text) => setOutfitName(text)}
              />

              <VerticalSelector
                options={outfitsTypes}
                setValue={setSelectType}
                value={selectType}
              />

              <View className="items-center   py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4 ">
                <TouchableOpacity
                  onPress={() => handleSave()}
                  className="px-4 py-2 bg-primary-100 rounded-lg"
                >
                  <Text className="text-white text-sm font-pregular">
                    Zapisz
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  className="px-4 py-2 bg-red-500  rounded-lg"
                >
                  <Text className="text-white font-pregular text-sm">
                    Anuluj
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default function index() {
  const colors = ["wszystkie", "ciemne", "jasne", "kolorowe"];

  const dictionary = {
    "Nakrycie głowy": ["Nakrycie głowy"],
    "Górna część": ["Koszulka", "Koszula", "Sweter", "Kurtka", "Sukienka"],
    "Dolna część": ["Spodnie", "Spódnica"],
    Buty: ["Buty"],
    Akcesoria: ["Akcesoria"],
  };

  const { clothes, setClothes } = useContext(TokenContext);
  const [modalVisible, setModalVisible] = useState(false);

  const clothesFiltredByType = (type) => {
    return clothes.filter((item) => dictionary[type].includes(item.type));
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSave = () => {
    setModalVisible(true); // zamiast console.log
  };

  const handleSelect = (item, type) => {
    if (item.id === 0) {
      setSelectedItems((prev) => {
        const updatedItems = prev.filter((i) => i.outfitType !== type);
        return updatedItems;
      });
      return;
    }

    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some((i) => i.outfitType === type);
      if (isAlreadySelected) {
        return prev.map((i) =>
          i.outfitType === type ? { id: item.id, outfitType: type } : i
        );
      } else {
        return [...prev, { id: item.id, outfitType: type }];
      }
    });
  };

  return (
    <SafeAreaView className="p-2">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="flex items-center flex-row z-30"
      >
        <ArrowLeft size={15} color={"#909090"} />
        <Text className=""> Powrót</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center mt-[-20px]">
        Dodaj Outfit
      </Text>
      <ScrollView>
        <OutfitSelector
          clothes={clothesFiltredByType("Nakrycie głowy")}
          title="Nakrycie głowy"
          onSelect={(item) => handleSelect(item, "Nakrycie głowy")}
        />
        <OutfitSelector
          clothes={clothesFiltredByType("Górna część")}
          title="Górna część"
          onSelect={(item) => handleSelect(item, "Górna część")}
        />
        <OutfitSelector
          clothes={clothesFiltredByType("Dolna część")}
          title="Dolna część"
          onSelect={(item) => handleSelect(item, "Dolna część")}
        />
        <OutfitSelector
          clothes={clothesFiltredByType("Buty")}
          title="Buty"
          onSelect={(item) => handleSelect(item, "Buty")}
        />
        <OutfitSelector
          clothes={clothesFiltredByType("Akcesoria")}
          title="Dodatki"
          onSelect={(item) => handleSelect(item, "Dodatki")}
        />
        <TouchableOpacity onPress={() => handleSave()}>
          <View className="bg-primary-200 rounded-lg p-2 m-2 items-center justify-center flex-row space-x-2">
            <CirclePlus size={20} color={"#fff"} />
            <Text className="text-lg text-white  text-center">Zapisz</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <ModalBox
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItems={selectedItems}
      />
    </SafeAreaView>
  );
}
