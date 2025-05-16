import { ipAddress, ipAddressNginx } from "../ipAddress.js";

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