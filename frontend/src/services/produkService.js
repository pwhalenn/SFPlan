import axios from "axios";

const API_URL = "/produk"; // Bisa ganti ke `${process.env.REACT_APP_API_URL}/produk` kalau pakai env

export const getProduk = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data produk:", error.response?.data || error.message);
    throw error;
  }
};

export const createProduk = async (produkData) => {
  try {
    const response = await axios.post(API_URL, produkData);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal menambahkan produk:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProduk = async (id, produkData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, produkData);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal memperbarui produk:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduk = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("❌ Gagal menghapus produk:", error.response?.data || error.message);
    throw error;
  }
};