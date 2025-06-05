import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ProductContext = createContext();

const initialProducts = [
  {
    id: uuidv4(),
    name: "Black Hoodie",
    price: 55,
    image: "/assets/images/Black.jpeg",
    category: "new",
    rating: 4.5,
    stock: 15,
    colors: ["black", "gray"],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium black hoodie made with 100% cotton",
    discount: 0,
    material: "Cotton",
    weight: "0.5kg",
    dimensions: "30x40 inches",
    sku: "HOOD-BLK-001",
    reviewsCount: 24,
    additionalImages: [
      "/assets/images/Black.jpeg",
      "/assets/images/blackbow.jpeg"
    ]
  },
  {
    id: uuidv4(),
    name: "Yellow Hoodie",
    price: 57,
    image: "/assets/images/yellow.jpeg",
    category: "top",
    rating: 4.2,
    stock: 8,
    colors: ["yellow"],
    sizes: ["S", "M", "L"],
    description: "Bright yellow hoodie perfect for summer",
    discount: 10,
    material: "Polyester",
    weight: "0.45kg",
    dimensions: "28x38 inches",
    sku: "HOOD-YLW-002",
    reviewsCount: 18
  },
  {
    id: uuidv4(),
    name: "Silver Hoodie",
    price: 77,
    image: "/assets/images/silver.jpeg",
    category: "best",
    rating: 4.8,
    stock: 5,
    colors: ["silver", "gray"],
    sizes: ["M", "L", "XL"],
    description: "Metallic silver hoodie with premium finish",
    discount: 15,
    material: "Cotton-Polyester Blend",
    weight: "0.6kg",
    dimensions: "32x42 inches",
    sku: "HOOD-SLV-003",
    reviewsCount: 32
  },
  {
    id: uuidv4(),
    name: "Blue Hoodie",
    price: 59,
    image: "/assets/images/blow.jpeg",
    category: "new",
    rating: 3.9,
    stock: 12,
    colors: ["blue", "navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic blue hoodie for everyday wear",
    discount: 0,
    material: "Cotton",
    weight: "0.5kg",
    dimensions: "30x40 inches",
    sku: "HOOD-BLU-004",
    reviewsCount: 15
  },
  {
    id: uuidv4(),
    name: "White Hoodie",
    price: 66,
    image: "/assets/images/white.jpeg",
    category: "top",
    rating: 4.1,
    stock: 10,
    colors: ["white"],
    sizes: ["S", "M", "L"],
    description: "Crisp white hoodie that stays bright",
    discount: 5,
    material: "Organic Cotton",
    weight: "0.55kg",
    dimensions: "29x39 inches",
    sku: "HOOD-WHT-005",
    reviewsCount: 21
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Load products from localStorage if available
    const savedProducts = localStorage.getItem('ecommerce_products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ecommerce_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setIsLoading(true);
    try {
      const productToAdd = {
        ...newProduct,
        id: uuidv4(),
        rating: newProduct.rating || 4.0,
        stock: newProduct.stock || 10,
        discount: newProduct.discount || 0,
        reviewsCount: 0
      };
      setProducts([...products, productToAdd]);
      return productToAdd;
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = (id, updatedProduct) => {
    setIsLoading(true);
    try {
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      return true;
    } catch (err) {
      setError("Failed to update product");
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = (id) => {
    setIsLoading(true);
    try {
      setProducts(products.filter((product) => product.id !== id));
      return true;
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category) => {
    if (category === "all") return products;
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = (count = 3) => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  };

  const getDiscountedProducts = () => {
    return products.filter(product => product.discount > 0);
  };

  const searchProducts = (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getDiscountedProducts,
        searchProducts,
        clearError: () => setError(null)
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};