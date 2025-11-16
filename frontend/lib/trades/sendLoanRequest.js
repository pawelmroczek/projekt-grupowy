import { ipAddress } from "../ipAddress";

export const sendLoanRequest = async (loanRequestData, token) => {
  console.log("loanRequestData w addLoanRequest:", loanRequestData);

  // Formatuj datę do formatu YYYY-MM-DD
  const formatDateForAPI = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const datatoSend = {
    toUser: loanRequestData.toUserId,
    type: "LOAN",
    loanFinishDate: formatDateForAPI(loanRequestData.loanFinishDate),
    fromUserClothesIds: [],
    toUserClothesIds: [loanRequestData.clothId],
  };

  console.log("Data to send:", datatoSend);

  try {
    const response = await fetch(ipAddress + "/fashion/trade-offers/send", {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datatoSend),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd wysyłania prośby o wypożyczenie:", error);
    throw error;
  }
};
