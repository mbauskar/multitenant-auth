import axiosInstance from "./axios";

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/");
    if (response.status == 200) {
      return { users: response?.data };
    }

    return { error: "failed to fetch users" };
  } catch (error) {
    return { error: "failed to fetch users", ...error?.response?.data };
  }
};

const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/me/");
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to fetch users" };
  } catch (error) {
    return { error: "failed to fetch users", ...error?.response?.data };
  }
};

export { fetchUsers, fetchUserProfile };
