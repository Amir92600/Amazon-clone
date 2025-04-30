import axios from 'axios';
import { ApiResponse } from '../types/Product';

// Mock data for development (since the Bolt API doesn't actually exist)
import { mockProducts } from './mockData';

// API base URL - in a real app, this would come from environment variables
const API_URL = 'https://api.bolt.com/v1/products';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_BOLT_API_KEY || 'mock-api-key';

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Search products API
 * @param query Search term
 * @returns Promise with search results
 */
export const searchProductsApi = async (query: string): Promise<ApiResponse> => {
  try {
    // In a real app, this would call the actual API
    // const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
    // return response.data;
    
    // For this demo, we'll simulate an API call using mock data
    return simulateApiCall(query);
  } catch (error: any) {
    if (error.response) {
      // Handle API error responses
      if (error.response.status === 429) {
        throw new Error('Too many requests');
      } else {
        throw new Error(`API error: ${error.response.status}`);
      }
    }
    throw new Error('Network error');
  }
};

/**
 * Get search suggestions API
 * @param query Partial search term
 * @returns Promise with suggestion strings
 */
export const getSuggestionsApi = async (query: string): Promise<string[]> => {
  try {
    // In a real app, this would call the actual API
    // const response = await apiClient.get(`/suggestions?q=${encodeURIComponent(query)}`);
    // return response.data;
    
    // For this demo, we'll simulate suggestions
    return simulateSuggestions(query);
  } catch (error) {
    console.error('Suggestion API error:', error);
    return []; // Return empty array on error to avoid breaking the UI
  }
};

// Simulate API call with mock data
const simulateApiCall = (query: string): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Randomly fail 10% of requests to demonstrate error handling
      if (Math.random() < 0.1) {
        reject(new Error('API error: 500'));
        return;
      }
      
      // Filter mock products based on query
      const filteredProducts = mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      resolve({
        products: filteredProducts,
        total: filteredProducts.length,
        page: 1,
        pageSize: 20
      });
    }, 800); // Simulate network delay
  });
};

// Simulate suggestions API
const simulateSuggestions = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = [
        `${query} headphones`,
        `${query} smartphone`,
        `${query} laptop`,
        `${query} accessories`,
        `${query} case`
      ].filter(s => s.length > query.length);
      
      resolve(suggestions);
    }, 300);
  });
};