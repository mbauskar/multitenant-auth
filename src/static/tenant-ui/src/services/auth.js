import axiosInstance from "./axios";

const loginUser = async (username, password) => {
  let isLoggedIn = false;

  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    if (response.status == 200) {
      return { isLoggedIn: true, userProfile: response?.data?.profile };
    }

    return { isLoggedIn, error: "failed to login" };
  } catch (error) {
    return { isLoggedIn, error: "failed to login", ...error?.response?.data };
  }
};

const logoutUser = async () => {
  let isLoggedOut = false;
  try {
    const response = await axiosInstance.post("/logout");
    if (response.status == 200) {
      isLoggedOut = true;
    }
    return isLoggedOut;
  } catch (error) {
    return isLoggedOut;
  }
};

export { loginUser, logoutUser };
