import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '../types/Product';
import { searchProductsApi, getSuggestionsApi } from '../services/api';

interface ProductContextType {
  products: Product[];
  suggestions: string[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  tooManyRequests: boolean;
  searchProducts: (query: string) => Promise<void>;
  fetchSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  
  // Cache for recent searches
  const [searchCache, setSearchCache] = useState<Record<string, { products: Product[], timestamp: number }>>({});
  
  // Clear suggestions
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);
  
  // Fetch search suggestions
  const fetchSuggestions = useCallback(async (query: string) => {
    try {
      const suggestionsData = await getSuggestionsApi(query);
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Don't show error for suggestions
    }
  }, []);
  
  // Search products
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    setTooManyRequests(false);
    
    // Check cache first
    const cacheKey = query.toLowerCase().trim();
    const cachedResult = searchCache[cacheKey];
    
    // Use cache if it exists and is less than 5 minutes old
    if (cachedResult && Date.now() - cachedResult.timestamp < 5 * 60 * 1000) {
      setProducts(cachedResult.products);
      setIsLoading(false);
      return;
    }
    
    try {
      const data = await searchProductsApi(query);
      setProducts(data.products);
      
      // Update cache
      const newCache = { ...searchCache };
      
      // Limit cache to 10 entries
      if (Object.keys(newCache).length >= 10) {
        // Remove oldest entry
        const oldestKey = Object.keys(newCache).reduce((oldest, key) => {
          return newCache[key].timestamp < newCache[oldest].timestamp ? key : oldest;
        }, Object.keys(newCache)[0]);
        
        delete newCache[oldestKey];
      }
      
      // Add new entry to cache
      newCache[cacheKey] = {
        products: data.products,
        timestamp: Date.now()
      };
      
      setSearchCache(newCache);
    } catch (error: any) {
      if (error.message === 'Too many requests') {
        setTooManyRequests(true);
      } else {
        setError('Impossible de charger les résultats.');
      }
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchCache]);
  
  const value = {
    products,
    suggestions,
    searchQuery,
    isLoading,
    error,
    tooManyRequests,
    searchProducts,
    fetchSuggestions,
    clearSuggestions
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};