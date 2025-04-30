import React from 'react';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import Footer from './components/Footer';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <ProductSearch />
        </main>
        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;