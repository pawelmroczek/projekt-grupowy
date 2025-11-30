import { ipAddress, ipAddressNginx } from "../ipAddress.js";

export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  try {
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
        message: data 
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

export const changePassword = async (token, password) => {
  const body = {
    password: password,
  };
  try {
    const response = await fetch(ipAddress + "/fashion/users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return {
        success: true,
        message: "Hasło zostało zmienione pomyślnie!"
      };
    } else {
      return {
        success: false,
        message: "Błąd zmiany hasła",
      };
    } 
  } catch (error) {
    return {
      success: false,
      message: "Błąd połączenia z serwerem. Spróbuj ponownie później.",
    };
  }
}