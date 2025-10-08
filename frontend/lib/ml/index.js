import { ipAddress } from "../ipAddress";

export const laundryIconsClassification = async (formData, token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/ml/predict", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`
          },
          body: formData,
      });
      console.log("Odpowiedź serwera:", response);
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log("Dane z serwera:", data);
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    } 
}


export const clothesClassification = async (formData) => {
    /*try {
      const response = await fetch(ipAddress+"/predict", {
          method: "POST",
          body: formData,
      });
      console.log("Odpowiedź serwera:", response);
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log("Dane z serwera:", data);
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }*/
}