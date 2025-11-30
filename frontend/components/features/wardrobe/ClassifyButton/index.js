import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";

import { WandSparkles  } from "lucide-react-native";

import { clothesClassification } from "../../../../lib/ml/index.js";

import { simpleColorName } from "../../../../assets/constants/colors/colors.js";

const ClassifyButton = ({ imageUri, imageType, imageName, predictedType, setPredictedType, setSelectedType, hex, setColor }) => {
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        
        setColor(simpleColorName(hex));

        /*
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", {
            uri: imageUri,
            name: imageName || "photo.jpg",
            type: imageType || "image/jpeg",
            });

            const serverresponse = await clothesClassification(formData);

            if (serverresponse) {
                setPredictedType(serverresponse.category);
                setSelectedType(serverresponse.category);
            } else {
                setPredictedType({ error: "Nie udało się skategoryzować" });
            }
        } catch (error) {
            console.error("Błąd klasyfikacji:", error);
            setPredictedType({ error: "Wystąpił błąd po stronie aplikacji." });
        } finally {
            setLoading(false);
        }*/
    };
    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={handlePress}
                disabled={loading || predictedType !== null}
                className="mt-2 bg-primary-100 p-2 items-center justify-center rounded-lg flex-row gap-x-2 px-10"
            >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : predictedType ? (
                <Text className="text-white font-pregular">{predictedType}</Text>
            ) : (
                <View className="flex-row items-center gap-x-2">
                    <Text className="text-white font-pregular">Wykryj kolor </Text>
                    <WandSparkles size={14} color="#FFFFFF" />
                </View>
            )}
            </TouchableOpacity>
        </View>
    );
};

export default ClassifyButton;
