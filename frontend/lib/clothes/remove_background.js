import { ipAddressML } from "../ipAddress";
import * as FileSystem from "expo-file-system/legacy";

export const removeBackground = async (formData) => {
    try {
        const response = await fetch(ipAddressML+"/remove/bg", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }

        const dominantColor = response.headers.get("X-Dominant-Color");

        const blob = await response.blob();

        const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(new Error("FileReader failed"));
            reader.onloadend = () => {
                const result = reader.result;
                // result ma postać "data:<type>;base64,AAA..."
                const parts = result.split(",");
                resolve(parts[1]);
            };
            reader.readAsDataURL(blob);
        });

        if (!base64data) throw new Error("Konwersja blob->base64 zwróciła null/empty");

        // 5) Zapisz base64 do pliku w cache
        const outUri = `${FileSystem.cacheDirectory}ml_output.png`;
        await FileSystem.writeAsStringAsync(outUri, base64data, {
            encoding: FileSystem.EncodingType.Base64 || "base64",
        });

        return {
            imageUri: outUri,
            dominantColor: dominantColor || "#000000",
        };

    } catch (error) {
      console.error('Błąd:', error);
    }
  }