import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };
  
  // Render stars for ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} fill="#FF9900" color="#FF9900" size={16} />);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star fill="#FF9900" color="#FF9900" size={16} className="absolute" />
          <Star fill="none" color="#FF9900" size={16} className="absolute ml-[8px]" />
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} fill="none" color="#FF9900" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative pt-[100%] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-1">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">
            ({product.ratingCount})
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="text-lg font-semibold text-amazon-orange-dark">
            {formatPrice(product.price)}
          </div>
          
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-medium bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          )}
        </div>
        
        <button className="mt-3 w-full bg-amazon-yellow hover:bg-amazon-yellow-dark text-gray-900 font-medium py-1 px-3 rounded-md text-sm transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;