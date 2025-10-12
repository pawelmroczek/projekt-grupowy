import { ipAddressML } from "../ipAddress";

export const removeBackground = async (formData) => {
    try {
        const response = await fetch(ipAddressML+"/remove/bg", {
            method: "POST",
            body: formData,
        });
        console.log("Odpowiedź serwera:", response);
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }