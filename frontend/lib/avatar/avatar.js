import { ipAddress } from "../ipAddress.js";

export const uploadAvatar = async (token, image) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        type: image.type || "image/jpeg",
        name: image.fileName || "avatar.jpg",
      });
      const response = await fetch(ipAddress+"/fashion/users/avatar", {
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }

export const deleteAvatar = async (token) => {
  try {
    const response = await fetch(ipAddress +"/fashion/users/avatar", {
      method: "DELETE",
      headers: {
        "Authentication": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    if (!text) return []; 

    return text;
  } catch (error) {
    console.error('Błąd:', error);
    return [];
  }
}
