import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/checkout'); // Redirect to checkout after adding
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      {/* Image container */}
      <div className="relative h-64 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      
      {/* Product info */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-lg text-gray-900 font-bold mb-4">${product.price}</p>
        
        {/* Buttons */}
        <div className="mt-auto flex justify-between gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:scale-105 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;