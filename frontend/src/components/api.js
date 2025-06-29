import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = async (amount) => {
  console.log('createOrder amount:', amount);
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('Invalid amount');
  }
  try {
    const response = await api.post('/createOrder', { amount });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to create order';
    console.error('createOrder error:', { message, status: error.response?.status, data: error.response?.data });
    throw new Error(message);
  }
};

export const purchaseCourse = async (payload) => {
  const { course, buyerId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = payload;
  console.log('purchaseCourse payload:', payload);
  if (!course?.id || !buyerId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    throw new Error('Missing required payment details');
  }
  try {
    const response = await api.post('/purchaseCourse', payload);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to process purchase';
    console.error('purchaseCourse error:', { message, status: error.response?.status, data: error.response?.data });
    throw new Error(message);
  }
};