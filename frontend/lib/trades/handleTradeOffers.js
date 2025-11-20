import { ipAddress } from "../ipAddress";

export const acceptTradeOffer = async (token, id) => {
  try {
    const response = await fetch(
      `${ipAddress}/fashion/trade-offers/accept/${id}`,
      {
        method: "POST",
        headers: {
          Authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Błąd akceptowania oferty wymiany:", error);
    throw error;
  }
};

export const rejectTradeOffer = async (token, id) => {
  try {
    const response = await fetch(
      `${ipAddress}/fashion/trade-offers/reject/${id}`,
      {
        method: "POST",
        headers: {
          Authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Błąd odrzucania oferty wymiany:", error);
    throw error;
  }
};
