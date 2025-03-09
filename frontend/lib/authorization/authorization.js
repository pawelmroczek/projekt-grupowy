const ipAddress = "http://192.168.0.15:8080"

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

    if (response.token){
      return {
        status: "success",
        message: response,
      };
    }else{
      if (response.message == "Bad credentials"){
        information = "Błędne hasło"
      }
      else{
        information = "Nie istnieje użytkownik o podanym adresie email"
      }
      return {
        status: "error",
        message: {
           message: information,
        },
      };
    }
  } catch (error) {

    return {
      status: "error",
      message: {
        message: "Błąd połączenia z serwerem. Spróbuj ponownie później.",
      },
    };
  }
};

export const registerUser = async (form) => {
  try {
    const response = await fetch(ipAddress + "/fashion/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json(); 

    if (response.ok) {
      return {
        success: true,
        message: "Rejestracja zakończona sukcesem!",
        data, 
      };
    } else {
      return {
        success: false,
        message: data?.message || "Błąd rejestracji",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Błąd połączenia z serwerem. Spróbuj ponownie później.",
    };
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
    //const data = await response.json();
    return 1;
  } catch (error) {
    console.error('Błąd:', error);
  }
}