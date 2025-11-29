import { ipAddress, ipAddressNginx } from "../ipAddress.js";

export const fetchOutfitsFriends = async (token, page, size) => {
  try {
    const url = new URL(ipAddress + "/fashion/outfits/friends");
    if (page !== undefined) url.searchParams.append("page", page);
    if (size !== undefined) url.searchParams.append("size", size);
    const response = await fetch(url, {
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

export const fetchOutfitsPublic = async (token, page, size) => {
  try {
    const url = new URL(ipAddress + "/fashion/outfits/public");
    if (page !== undefined) url.searchParams.append("page", page);
    if (size !== undefined) url.searchParams.append("size", size);
    const response = await fetch(url, {
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