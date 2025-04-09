import axios from "axios";

export const getProduk = async () => {
  try {
    const response = await axios.get("/api/produk");
    return response.data;
  } catch (error) {
    console.error("Error fetching produk:", error);
    throw error;
  }
};

export const createProduk = async (produk) => {
  try {
    const response = await axios.post("/api/produk", produk);
    return response.data;
  } catch (error) {
    console.error("Error creating produk:", error);
    throw error;
  }
};

export const updateProduk = async (id, produk) => {
  try {
    const response = await axios.put(`/api/produk/${id}`, produk);
    return response.data;
  } catch (error) {
    console.error("Error updating produk:", error);
    throw error;
  }
};

export const deleteProduk = async (id) => {
  try {
    await axios.delete(`/api/produk/${id}`);
  } catch (error) {
    console.error("Error deleting produk:", error);
    throw error;
  }
};