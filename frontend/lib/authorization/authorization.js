export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  console.log("logowanie");

  try {
    // !!!!!! UWAGA !!!!!!
    //tu zamiast localhost podajecie adres IP swojego komputera

    const data = await fetch("http://localhost:8080/fashion/users/signIn", {
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
    const data = await fetch("http://localhost:8080/fashion/users/signUp", {
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
