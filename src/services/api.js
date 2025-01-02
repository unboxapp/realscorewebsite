import axios from 'axios';

const API_BASE_URL = 'https://api.realscore.in:5000';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-order`, orderData);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};

export const creditReportFetch = async (body) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fetch-credit-report`,body);
    return response.data;
  } catch (error) {
    console.error('API call error:', error.message);
    throw error;
  }
};

export const saveCustomerDetails = async(body)=>{
  try{
    const response = await axios.post(`${API_BASE_URL}/save-customer-details`,body);
    return response.data;
  }
  catch(error)
  {
    console.error('API call error:', error.message);
    throw error;
  }
}