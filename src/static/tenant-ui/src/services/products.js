import axiosInstance from "./axios";

const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/");
    if (response.status == 200) {
      return { items: response?.data };
    }

    return { error: "failed to fetch items" };
  } catch (error) {
    return { error: "failed to fetch items", ...error?.response?.data };
  }
};

const fetchProduct = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/products/${itemId}`);
    if (response.status == 200) {
      return response?.data;
    }

    return { error: "failed to fetch items" };
  } catch (error) {
    return { error: "failed to fetch items", ...error?.response?.data };
  }
};

const saveProduct = async (item) => {
  try {
    const response = !item?.id
      ? await axiosInstance.post("/products/", item)
      : await axiosInstance.put(`/products/${item?.id}/`, item);
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
    ? `/products/${itemId}/disable/`
    : `/products/${itemId}/enable/`;
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

export { fetchProducts, fetchProduct, saveProduct, enableDisableItem };
