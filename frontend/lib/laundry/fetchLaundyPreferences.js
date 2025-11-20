import { ipAddress } from "../ipAddress";

export const fetchLaundyPreferences = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/user-preferences", {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }