const ipAddress = "http://192.168.1.84:8080"

export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  console.log("logowanie");

  try {
    // !!!!!! UWAGA !!!!!!
    //tu zamiast localhost podajecie adres IP swojego komputera

    const data = await fetch(ipAddress+"/fashion/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    return {
      status: "success",
      message: response,
    };
  } catch (error) {
    // console.error("Error:", error);
    return {
      status: "error",
      message: {
        message: "Błąd logowania",
      },
    };
  }
};

export const registerUser = async (form) => {
  try {
    const data = await fetch(ipAddress+"/fashion/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    // console.log("rejestracja",response);
    // const response = data.json();
    // if (response.status === "success") {
    //   return {
    //     status: "success",
    //     message: response,
    //   };
    // }
  } catch(error) {
    // console.log("Error:", error);
    // return {
    //   status: "error",
    //   message: "Błąd rejestracji",
    // };
  }
};

export const clothesSending = async (formData) => {
  try {
    console.log("Rozpoczynam wysyłanie...");
    const response = await fetch(ipAddress+"/fashion/clothes", {
        method: "POST",
        headers: {
            // "Authorization": `${token}`,
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    console.log("Odpowiedź serwera:", response);
    if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
    }
    // const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd:', error);
  }
}