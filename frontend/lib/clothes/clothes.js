import { ipAddress, ipAddressNginx } from "../ipAddress.js";

export const clothesSending = async (formData, token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/clothes", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
          body: formData,
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      //const data = await response.json();
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }
  
  export const getClothes = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/clothes", {
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
  
  export const clothesEditing = async (formData, token) => {
    try {
    
      const response = await fetch(ipAddress+"/fashion/clothes", {
          method: "PUT",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
          body: formData,
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      //const data = await response.json();
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }
  
  export const clothesDeleting = async (id, token) => {
    try {

      const response = await fetch(ipAddress+"/fashion/clothes/" + id, {
          method: "DELETE",
          headers: {
              "Authentication": `Bearer ${token}`,
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      //const data = await response.json();
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }

  export const toggleClean = async (ids, token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/clothes/toggleStatus", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(ids),
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }
  export const getClothesHousehold = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/clothes/household", {
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

  export const getOutfitsCount = async (token, id) => {
    try {
      const response = await fetch(ipAddress+"/fashion/clothes/" + id + "/outfitsCount", {
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