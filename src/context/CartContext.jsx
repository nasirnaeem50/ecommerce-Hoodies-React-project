import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [checkoutInfo, setCheckoutInfo] = useState({
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: null,
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const updateCheckoutInfo = (info) => {
    setCheckoutInfo(prev => ({
      ...prev,
      ...info
    }));
  };

  const completeCheckout = () => {
    // Here you would typically send the order to your backend
    const order = {
      items: cartItems,
      total: cartTotal,
      ...checkoutInfo,
      date: new Date().toISOString()
    };
    
    // Clear cart after successful checkout
    clearCart();
    
    // Clear checkout info
    setCheckoutInfo({
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: null,
    });
    
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        checkoutInfo,
        updateCheckoutInfo,
        completeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};