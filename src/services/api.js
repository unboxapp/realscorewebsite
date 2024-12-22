import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-order`, orderData);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};