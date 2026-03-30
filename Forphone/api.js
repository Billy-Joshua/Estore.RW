// api.js - Central API configuration for EstoreRW
const API_BASE = 'http://localhost:5000/api';   // Change to your production URL later

// Helper to add Authorization header when user is logged in
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth APIs
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return res.json();
};

// Products
export const getProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
};

// Orders (Checkout)
export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(orderData)
  });
  return res.json();
};

export const getMyOrders = async () => {
  const res = await fetch(`${API_BASE}/orders/myorders`, {
    method: 'GET',
    headers: getHeaders()
  });
  return res.json();
};

// Trade-in (Seller Portal)
export const submitTradeIn = async (tradeData) => {
  const res = await fetch(`${API_BASE}/tradeins`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(tradeData)
  });
  return res.json();
};

export const getMyTradeIns = async () => {
  const res = await fetch(`${API_BASE}/tradeins/my`, {
    method: 'GET',
    headers: getHeaders()
  });
  return res.json();
};

// Utility to check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.reload();
};