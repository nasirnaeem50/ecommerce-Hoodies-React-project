import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const foundProduct = getProductById(id);
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }

        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const getImagePath = (img) => {
    if (!img) return "/assets/images/placeholder.jpg";
    if (img.startsWith('http')) return img;
    if (img.startsWith('/assets/')) return img;
    return `/assets/images/${img}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-4">Requested ID: {id}</p>
        <Link 
          to="/products" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <img
              src={getImagePath(product.image)}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
              onError={(e) => {
                e.target.src = "/assets/images/placeholder.jpg";
                e.target.className = "w-full h-auto max-h-[500px] object-contain bg-gray-100 mx-auto";
              }}
            />
          </div>
          
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={getImagePath(img)}
                  alt={`${product.name} ${index + 1}`}
                  className="w-20 h-20 object-cover border rounded cursor-pointer hover:border-blue-500"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-2xl text-blue-600 font-semibold">
                  ${product.price.toFixed(2)}
                  {product.discount > 0 && (
                    <span className="ml-2 text-sm text-red-500 line-through">
                      ${(product.price / (1 - product.discount/100)).toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
              {product.discount > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-700 text-lg">{product.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Category</span>
              <p className="font-medium capitalize">{product.category || "N/A"}</p>
            </div>
            
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Availability</span>
              <p className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">SKU</span>
              <p className="font-medium">{product.sku || "N/A"}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Rating</span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>
                  {product.rating?.toFixed(1) || 'N/A'} ({product.reviewsCount || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          {product.colors && (
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Colors</span>
              <div className="flex gap-2 mt-1">
                {product.colors.map((color, i) => (
                  <span 
                    key={i}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Sizes</span>
              <div className="flex gap-2 mt-1 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size} 
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Material</span>
              <p className="font-medium capitalize">{product.material || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Weight</span>
              <p className="font-medium">{product.weight || "N/A"}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md hover:shadow-lg"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <Link
              to="/checkout"
              state={{ product }}
              className={`flex-1 px-6 py-3 rounded-lg text-white font-bold text-center transition-colors ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-md hover:shadow-lg"
              }`}
              aria-disabled={product.stock === 0}
              onClick={(e) => product.stock === 0 && e.preventDefault()}
            >
              {product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;