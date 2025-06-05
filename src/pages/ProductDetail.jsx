import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log("Product ID from URL:", id);
    console.log("All products:", products);
  }, [id, products]);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-4">Requested ID: {id}</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500?text=Product+Image";
              e.target.className =
                "w-full h-auto max-h-[500px] object-contain bg-gray-100";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-sm text-gray-500 uppercase tracking-wide">
            Category: {product.category || "N/A"}
          </div>

          <div
            className={`text-sm font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </div>

          <div>
            <span className="font-semibold">Brand:</span>{" "}
            {product.brand || "N/A"}
          </div>

          <div>
            <span className="font-semibold">SKU:</span> {product.sku || "N/A"}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <span>{product.rating ? product.rating.toFixed(1) : "N/A"}/5</span>
            <span>({product.reviewsCount || 0} reviews)</span>
          </div>

          <div>
            <span className="font-semibold">Colors:</span>{" "}
            {product.colors ? product.colors.join(", ") : "N/A"}
          </div>

          <div>
            <span className="font-semibold">Sizes:</span>{" "}
            {product.sizes ? product.sizes.join(", ") : "N/A"}
          </div>

          <div>
            <span className="font-semibold">Material:</span>{" "}
            {product.material || "N/A"}
          </div>

          <div>
            <span className="font-semibold">Weight:</span>{" "}
            {product.weight || "N/A"}
          </div>

          <div>
            <span className="font-semibold">Dimensions:</span>{" "}
            {product.dimensions || "N/A"}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-md hover:shadow-lg"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <Link
              to="/checkout"
              className={`px-6 py-3 rounded-lg text-white font-bold text-center transition-colors duration-200 ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md hover:shadow-lg"
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
