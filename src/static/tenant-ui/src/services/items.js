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

const fetchItem = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/items/${itemId}`);
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to fetch items" };
  } catch (error) {
    return { error: "failed to fetch items", ...error?.response?.data };
  }
};

const saveItem = async (item) => {
  try {
    const response = !item?.id
      ? await axiosInstance.post("/items/", item)
      : await axiosInstance.put(`/items/${item?.id}/`, item);
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to save item" };
  } catch (error) {
    return { error: "failed to save item", ...error?.response?.data };
  }
};

const enableDisableItem = async (itemId, shouldDisable = false) => {
  const url = shouldDisable
    ? `/items/${itemId}/disable/`
    : `/items/${itemId}/enable/`;
  try {
    const response = await axiosInstance.post(url);
    if (response.status == 200) {
      return response?.data;
    }

    return { error: `failed to ${shouldDisable ? "disable" : "enable"} items` };
  } catch (error) {
    return {
      error: `failed to ${shouldDisable ? "disable" : "enable"} items`,
      ...error?.response?.data,
    };
  }
};

export { fetchItems, fetchItem, saveItem, enableDisableItem };
