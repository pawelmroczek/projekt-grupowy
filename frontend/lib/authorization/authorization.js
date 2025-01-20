export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  console.log("logowanie");

  try {
    // !!!!!! UWAGA !!!!!!
    //tu zamiast localhost podajecie adres IP swojego komputera

    const data = await fetch("http://192.168.0.51:8080/fashion/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();
    console.log("test",response);
    return {
      status: "success",
      message: response,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      message: error,
    };
  }
};

export const registerUser = async (form) => {
  try {
    const data = await fetch("http://192.168.0.51:8080/fashion/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    console.log(response);
    const response = data.json();
    // if (response.status === "success") {
    //   return {
    //     status: "success",
    //     message: response,
    //   };
    // }
  } catch(error) {
    console.log("Error:", error);
    // return {
    //   status: "error",
    //   message: "Błąd rejestracji",
    // };
  }
};

export const clothesSending = async (FormData) => {
  try {
    console.log("Rozpoczynam wysyłanie...");
    const response = await fetch("http://192.168.0.51:8080/fashion/pictures/upload", {
        method: "POST",
        headers: {
            //"Authorization": `${token}`,
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    console.log("Odpowiedź serwera:", response.data);
    if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd:', error);
  }
}