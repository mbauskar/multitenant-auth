import axiosInstance from "./axios";

const fetchItems = async () => {
  try {
    const response = await axiosInstance.get("/items/");
    if (response.status == 200) {
      return { items: response?.data };
    }

    return { error: "failed to fetch items" };
  } catch (error) {
    return { error: "failed to fetch items", ...error?.response?.data };
  }
};

export { fetchItems };
