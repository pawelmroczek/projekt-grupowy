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
    console.log(data);
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
    return data;
  } catch (error) {
    console.error("Błąd podczas pobierania strojów:", error);
  }
}