import React from 'react';
import ProductGrid from './ProductGrid';
import { useProductContext } from '../context/ProductContext';

const ProductSearch: React.FC = () => {
  const { 
    products, 
    isLoading, 
    error, 
    searchQuery,
    tooManyRequests
  } = useProductContext();

  return (
    <div className="w-full">
      {/* Search results header */}
      {searchQuery && (
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-800">
            Search results for "{searchQuery}"
          </h2>
        </div>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amazon-orange"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {/* Too many requests error */}
      {tooManyRequests && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Notice:</strong>
          <span className="block sm:inline"> Trop de requêtes, veuillez patienter.</span>
        </div>
      )}
      
      {/* Empty state - Initial */}
      {!searchQuery && !isLoading && !error && products.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Start searching for products</h3>
          <p className="text-gray-500">Use the search bar above to find products</p>
        </div>
      )}
      
      {/* Empty search results */}
      {searchQuery && !isLoading && !error && products.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      )}
      
      {/* Product grid */}
      {products.length > 0 && !isLoading && (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ProductSearch;