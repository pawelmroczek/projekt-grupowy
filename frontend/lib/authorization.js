export const loginUser = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  try {
    const data = await fetch("http://localhost:8080/fashion/users/signIn", {
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
    return {
      status: "error",
      message: error,
    };
  }
};
