import axios from "axios";

export const getPesanan = async () => {
  try {
    const response = await axios.get("/api/pesanan");
    return response.data;
  } catch (error) {
    console.error("Error fetching pesanan:", error);
    throw error;
  }
};

export const createPesanan = async (pesanan) => {
  try {
    const response = await axios.post("/api/pesanan", pesanan);
    return response.data;
  } catch (error) {
    console.error("Error creating pesanan:", error);
    throw error;
  }
};

export const updatePesanan = async (id, pesanan) => {
  try {
    const response = await axios.put(`/api/pesanan/${id}`, pesanan);
    return response.data;
  } catch (error) {
    console.error("Error updating pesanan:", error);
    throw error;
  }
};

export const deletePesanan = async (id) => {
  try {
    await axios.delete(`/api/pesanan/${id}`);
  } catch (error) {
    console.error("Error deleting pesanan:", error);
    throw error;
  }
};