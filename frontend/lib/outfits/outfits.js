import { ipAddress } from "../ipAddress";


export const outfitsSending = async (formData, token) => {
    try {
      console.log("Rozpoczynam wysyłanie...");
      console.log("token:",token);
      const response = await fetch(ipAddress+"/fashion/outfits", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
          body: formData,
      });
      console.log("Odpowiedź serwera:", response);
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      //const data = await response.json();
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }

export const fetchOutfits = async (token) => {
  try {
    const response = await fetch(ipAddress + "/fashion/outfits", {
      method: "GET",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd podczas pobierania strojów:", error);
  }
}