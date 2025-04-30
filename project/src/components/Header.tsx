import React, { useState } from 'react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import SearchBar from './SearchBar';
import { useProductContext } from '../context/ProductContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchProducts } = useProductContext();
  
  const handleSearch = (query: string) => {
    searchProducts(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-amazon-dark text-white">
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-4">
          {/* Mobile menu button */}
          <button 
            className="md:hidden mr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
          
          {/* Logo */}
          <div className="flex-shrink-0 mr-4">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-amazon-orange">
                amazonClone
              </span>
            </a>
          </div>
          
          {/* Search bar */}
          <div className="flex-grow max-w-3xl mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-4">
            <a href="/account" className="flex items-center hover:text-amazon-orange transition-colors">
              <User size={20} className="mr-1" />
              <span className="text-sm">Account</span>
            </a>
            <a href="/cart" className="flex items-center hover:text-amazon-orange transition-colors">
              <ShoppingCart size={20} className="mr-1" />
              <span className="text-sm">Cart</span>
            </a>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amazon-dark-light p-4 border-t border-gray-700">
          <nav className="flex flex-col space-y-4">
            <a href="/account" className="flex items-center py-2 hover:text-amazon-orange transition-colors">
              <User size={20} className="mr-2" />
              <span>Account</span>
            </a>
            <a href="/cart" className="flex items-center py-2 hover:text-amazon-orange transition-colors">
              <ShoppingCart size={20} className="mr-2" />
              <span>Cart</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;