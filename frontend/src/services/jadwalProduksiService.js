import axios from "axios";

export const getJadwalProduksi = async () => {
  try {
    const response = await axios.get("/api/jadwal-produksi");
    return response.data;
  } catch (error) {
    console.error("Error fetching jadwal produksi:", error);
    throw error;
  }
};

export const createJadwalProduksi = async (jadwal) => {
  try {
    const response = await axios.post("/api/jadwal-produksi", jadwal);
    return response.data;
  } catch (error) {
    console.error("Error creating jadwal produksi:", error);
    throw error;
  }
};

export const updateJadwalProduksi = async (id, jadwal) => {
  try {
    const response = await axios.put(`/api/jadwal-produksi/${id}`, jadwal);
    return response.data;
  } catch (error) {
    console.error("Error updating jadwal produksi:", error);
    throw error;
  }
};

export const deleteJadwalProduksi = async (id) => {
  try {
    await axios.delete(`/api/jadwal-produksi/${id}`);
  } catch (error) {
    console.error("Error deleting jadwal produksi:", error);
    throw error;
  }
};