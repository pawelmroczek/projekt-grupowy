import { ipAddress } from "../ipAddress";

export const addLaundry = async (selectedClothes, token) => {
  console.log("selectedClothes w addLaundry:", selectedClothes);

  try {
    const response = await fetch(ipAddress + "/fashion/laundries", {
      method: "POST",
      headers: {
        Authentication: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedClothes),
    });
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    //const data = await response.json();
    return 1;
  } catch (error) {
    console.error("Błąd:", error);
  }
};
