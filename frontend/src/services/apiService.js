import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/data`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const apiService = {
  getFiles,
};
