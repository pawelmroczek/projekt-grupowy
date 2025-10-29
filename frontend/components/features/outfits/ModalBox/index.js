import { useContext, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormField from "../../../common/FormField";
import VerticalSelector from "../../../common/VerticalSelector";
import { outfitsTypes } from "../../../../lib/outfitsTypes";
import { TokenContext } from "../../../../app/TokenContext";
import { fetchOutfits, outfitsSending } from "../../../../lib/outfits/outfits";
import {router} from "expo-router";

const ModalBox = ({ modalVisible, setModalVisible, selectedItems, visible }) => {
  const [outfitName, setOutfitName] = useState("");
  const [selectType, setSelectType] = useState("ide");
  const { token } = useContext(TokenContext);
  const { outfits, setOutfits } = useContext(TokenContext);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleSave = async () => {
    if(outfitName.trim() === "") {
      alert("Nazwa nie może być pusta");
      setSaveButtonDisabled(false);
      return;
    }
    if(selectType === "ide") {
      alert("Wybierz typ outfitu");
      setSaveButtonDisabled(false);
      return;
    }

    const dataToSend = {
      name: outfitName,
      type: selectType,
      //visible: visible,
      clothesIds: selectedItems.map((item) => item.id),
    };

    console.log("Dane do wysłania:", dataToSend);
    const dataJson =  JSON.stringify(dataToSend);
    await outfitsSending(dataJson, token);
    const outfitsData = await fetchOutfits(token);
    setOutfits(outfitsData);
    setModalVisible(false);
    router.replace("/wardrobe");
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <TouchableWithoutFeedback>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="w-11/12 bg-white p-5 rounded-2xl items-center shadow-lg shadow-black/30">
              <Text className="font-pbold mb-4">Wprowadź nazwę</Text>

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

              <View className="items-center py-3.5 rounded-xl w-full flex-row justify-center bg-white-100 space-x-4">
                <TouchableOpacity
                  disabled={saveButtonDisabled}
                  onPress={() => {
                    setSaveButtonDisabled(true);
                    handleSave(); 
                  }}
                  className="px-4 py-2 bg-primary-100 rounded-lg"
                >
                  <Text className="text-white text-sm font-pregular">
                    Zapisz
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="px-4 py-2 bg-red-500 rounded-lg"
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

export default ModalBox;
