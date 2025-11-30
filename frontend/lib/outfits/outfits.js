import { ipAddress, ipAddressNginx } from "../ipAddress";


export const outfitsSending = async (formData, token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/outfits", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "application/json",
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
    data.forEach((outfit) => {
      outfit.clothes.forEach((element) => {
        const parts = element.picture.split("images-server:80");
        element.picture = ipAddressNginx + parts[1];
      });
    });
    return data;
  } catch (error) {
    console.error("Błąd podczas pobierania strojów:", error);
  }
}

export const outfitDeleting = async (id, token) => {
  try {
    const response = await fetch(`${ipAddress}/fashion/outfits/${id}`, {
      method: "DELETE",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    return 1;
  } catch (error) {
    console.error("Błąd podczas usuwania stroju:", error);
  }
}