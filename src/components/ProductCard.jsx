import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.info('Please login to manage your wishlist');
      navigate('/login');
      return;
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const price = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const isInWishlist = wishlist.some(item => item.id === product.id);

  // Render star ratings
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative group">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-2">
        {product.discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
        {product.featured && (
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${
          isInWishlist 
            ? 'text-red-500 bg-white shadow-md hover:bg-red-50' 
            : 'text-gray-400 bg-white shadow-md hover:bg-gray-100'
        }`}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isInWishlist ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
      </button>

      {/* Image container */}
      <Link to={`/products/${product.id}`} className="relative h-56 w-full flex items-center justify-center p-4 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      
      {/* Product info */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <span className="text-xs text-gray-500 uppercase">{product.category}</span>
        </div>
        
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-md font-semibold text-gray-800 mb-2 line-clamp-2" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewsCount})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.discount > 0 ? (
            <>
              <span className="text-lg text-gray-900 font-bold">${price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg text-gray-900 font-bold">${price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Buttons */}
        <div className="mt-auto flex flex-col space-y-2">
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              product.stock === 0 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FaShoppingCart className="mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          <button
            onClick={handleQuickView}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;