import { ipAddress, ipAddressNginx } from "../ipAddress.js";

export const getClothesFriendsFiltered = async (token, season) => {
    try {
      const url = new URL(ipAddress + "/fashion/clothes/friends/filtered");
      url.searchParams.append("clean", true);
      if (season !== undefined) url.searchParams.append("season", season);

      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
  
      data.forEach((element) => {
        const parts = element.picture.split("images-server:80");
        element.picture = ipAddressNginx + parts[1];
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const getClothesHouseholdFiltered = async (token, season) => {
    try {
      const url = new URL(ipAddress + "/fashion/clothes/friends/filtered");
      url.searchParams.append("clean", true);
      if (season !== undefined) url.searchParams.append("season", season);

      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
  
      data.forEach((element) => {
        const parts = element.picture.split("images-server:80");
        element.picture = ipAddressNginx + parts[1];
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}