import { ipAddress } from "../ipAddress";

const fetchOffers = async (token) => {
  try {
    const response = await fetch(ipAddress + "/fashion/trade-offers", {
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
    console.error("Błąd:", error);
  }
};

export default fetchOffers;
