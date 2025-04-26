import axios from 'axios';
import { CryptoAsset } from '../types';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3001/api';

// Configure axios with default error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Fetch all crypto assets
export const fetchCryptoAssets = async (): Promise<CryptoAsset[]> => {
  try {
    const response = await api.get('/crypto');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Network error - Please ensure the backend server is running');
      }
      throw new Error(`API Error: ${error.response.data?.message || error.message}`);
    }
    throw error;
  }
};

// Fetch single crypto asset details
export const fetchCryptoAssetDetails = async (id: string): Promise<CryptoAsset> => {
  try {
    const response = await api.get(`/crypto/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Network error - Please ensure the backend server is running');
      }
      throw new Error(`API Error: ${error.response.data?.message || error.message}`);
    }
    throw error;
  }
};