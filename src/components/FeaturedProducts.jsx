import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import ProductCard from './ProductCard';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

const FeaturedProducts = () => {
  const { featuredProducts, wishlist, addToWishlist, removeFromWishlist, isLoading } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const handleWishlistToggle = (product) => {
    if (!user) {
      // Optionally redirect to login or show a message
      return;
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
                    wishlist.some(item => item.id === product.id)
                      ? 'bg-red-100 text-red-500'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={wishlist.some(item => item.id === product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlist.some(item => item.id === product.id) ? (
                    <FaHeart className="w-5 h-5" />
                  ) : (
                    <FaRegHeart className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured products available</p>
          </div>
        )}
        
        <div className="flex justify-center gap-4 mt-12">
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 transform hover:scale-105"
          >
            View All Products
          </Link>
          {user && (
            <Link
              to="/wishlist"
              className=" bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <FaHeart className="w-4 h-4" />
              View Wishlist
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;