import { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Black Hoodie",
      price: 55,
      image: "/src/assets/images/Black.jpeg",
      category: "new",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Yellow Hoodie",
      price: 57,
      image: "/src/assets/images/yellow.jpeg",
      category: "top",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Silver Hoodie",
      price: 77,
      image: "/src/assets/images/silver.jpeg",
      category: "best",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Blue Hoodie",
      price: 59,
      image: "/src/assets/images/blow.jpeg", // Using blow.jpeg for blue hoodie
      category: "new",
      rating: 3.9,
    },
    {
      id: 5,
      name: "White Hoodie",
      price: 66,
      image: "/src/assets/images/white.jpeg",
      category: "top",
      rating: 4.1,
    },
    {
      id: 6,
      name: "Black Bow Hoodie",
      price: 51,
      image: "/src/assets/images/blackbow.jpeg",
      category: "best",
      rating: 4.3,
    },
    {
      id: 7,
      name: "Red Hoodie",
      price: 60,
      image: "/src/assets/images/red.jpg", // Changed from .jpeg to .jpg
      category: "new",
      rating: 4.4,
    },
    {
      id: 8,
      name: "Gray Hoodie",
      price: 62,
      image: "/src/assets/images/header2.jpeg", // Using header image for blue hoodie alternative
      category: "top",
      rating: 4.6,
    },
    {
      id: 9,
      name: "Green Hoodie",
      price: 58,
      image: "/src/assets/images/green.jpeg", // Using person image for green hoodie alternative
      category: "best",
      rating: 4.7,
    },
    {
      id: 10,
      name: "Grey Hoodie",
      price: 54,
      image: "/src/assets/images/grey.jpeg",
      category: "new",
      rating: 4.0,
    },
    {
      id: 11,
      name: "Purple Hoodie",
      price: 70,
      image: "/src/assets/images/purple.jpeg",
      category: "best",
      rating: 4.5,
    },
    {
      id: 12,
      name: "Pink Hoodie",
      price: 63,
      image: "/src/assets/images/pink.jpeg",
      category: "new",
      rating: 4.2,
    },
    // Additional products using available images
    {
      id: 13,
      name: "Light red Hoodie",
      price: 65,
      image: "/src/assets/images/header3.jpeg",
      category: "top",
      rating: 4.3,
    },
    {
      id: 14,
      name: "Orange Hoodie",
      price: 68,
      image: "/src/assets/images/orange.jpg",
      category: "best",
      rating: 4.6,
    },
    {
      id: 15,
      name: "Premium Hoodie",
      price: 75,
      image: "/src/assets/images/header6.jpeg",
      category: "new",
      rating: 4.7,
    }
  ]);

  const [activeCategory, setActiveCategory] = useState("new");

  const addProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Helper function to get products by category
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        activeCategory,
        setActiveCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};