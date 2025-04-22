import axios from "axios";

export const getProduk = async () => {
  try {
    const response = await axios.get("/produk");
    return response.data;
  } catch (error) {
    console.error("Error fetching produk:", error);
    throw error;
  }
};

export const createProduk = async (produk) => {
  try {
    const response = await axios.post("/produk", produk);
    return response.data;
  } catch (error) {
    console.error("Error creating produk:", error);
    throw error;
  }
};

export const updateProduk = async (id, produk) => {
  try {
    const response = await axios.put(`/produk/${id}`, produk);
    return response.data;
  } catch (error) {
    console.error("Error updating produk:", error);
    throw error;
  }
};

export const deleteProduk = async (id) => {
  try {
    await axios.delete(`/produk/${id}`);
  } catch (error) {
    console.error("Error deleting produk:", error);
    throw error;
  }
};