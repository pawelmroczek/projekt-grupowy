import { ipAddress } from "../ipAddress";

export const saveLaundryPreferences = async (token, newOptions) => {
    try {
      const response = await fetch(ipAddress+"/fashion/user-preferences", {
          method: "PUT",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newOptions),
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
      console.log('Preferences saved successfully:', data);
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }