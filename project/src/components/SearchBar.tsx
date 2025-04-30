import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { 
    suggestions, 
    isLoading, 
    fetchSuggestions, 
    clearSuggestions 
  } = useProductContext();
  
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      fetchSuggestions(debouncedQuery);
    } else {
      clearSuggestions();
    }
  }, [debouncedQuery, fetchSuggestions, clearSuggestions]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsFocused(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };
  
  const handleClearSearch = () => {
    setQuery('');
    clearSuggestions();
    inputRef.current?.focus();
  };
  
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full py-2 px-10 rounded-md border border-gray-300 focus:border-amazon-orange focus:ring-2 focus:ring-amazon-orange focus:outline-none text-gray-900 bg-white"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-3 bg-amazon-orange text-white rounded-r-md hover:bg-amazon-orange-dark transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        
        {query && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </form>
      
      {isFocused && query.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;