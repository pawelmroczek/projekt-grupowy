import { ipAddress } from "../ipAddress";

export const sendExchangeRequest = async (exchangeRequestData, token) => {

  const dataToSend = {
    toUser: exchangeRequestData.toUserId,
    type: "TRADE",
    fromUserClothesIds: exchangeRequestData.myClothesIds, // ubrania które oferuję
    toUserClothesIds: exchangeRequestData.targetClothesIds, // ubrania które chcę otrzymać
    loanFinishDate: new Date().toISOString(), // Dodane pole loanFinishDate
  };

  try {
    const response = await fetch(ipAddress + "/fashion/trade-offers/send", {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd wysyłania propozycji wymiany:", error);
    throw error;
  }
};
