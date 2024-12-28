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


export const saveCreditReportJson = async (creditReport) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save-report-json`, creditReport);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};

export const creditReportFetch = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-credit-report`);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};

export const getReportJson = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-report-json`);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};