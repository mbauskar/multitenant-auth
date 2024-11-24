import axiosInstance from "./axios";

const loginUser = async (username, password) => {
  let isLoggedIn = false;

  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    if (response.status == 200) {
      return { isLoggedIn: true, ...response.data };
    }

    return { isLoggedIn, error: "failed to login" };
  } catch (error) {
    return { isLoggedIn, error: "failed to login", ...error?.response?.data };
  }
};

export { loginUser };