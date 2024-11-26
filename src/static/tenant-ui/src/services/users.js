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
    const response = await axiosInstance.get("/heartbeat");
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to fetch users" };
  } catch (error) {
    return { error: "failed to fetch users", ...error?.response?.data };
  }
};

const saveUser = async (user) => {
  try {
    const response = !user?.id
      ? await axiosInstance.post("/signup", user)
      : await axiosInstance.put(`/users/${user?.id}/`, user);
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to save user" };
  } catch (error) {
    return { error: "failed to save user", ...error?.response?.data };
  }
};

export { fetchUsers, fetchUserProfile, saveUser };
