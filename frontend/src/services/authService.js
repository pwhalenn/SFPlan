import axios from "axios";

// REGISTER USER
export const registerUser = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/register", { username, password }, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// LOGIN USER
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post("/auth/login", { username, password }, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// LOGOUT USER
export const logoutUser = async () => {
  try {
    const response = await axios.get("/auth/logout", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};