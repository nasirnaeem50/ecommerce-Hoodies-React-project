import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import OrderSummary from './OrderSummary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);

  const handleRemoveItem = (itemId, itemName) => {
    removeFromCart(itemId);
    toast.error(`${itemName} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity, itemName) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId, itemName);
      return;
    }
    updateQuantity(itemId, newQuantity);
    toast.info(`Quantity updated for ${itemName}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    clearCart();
    toast.warn('Cart cleared', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-12"
      />

      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay with left promotional content */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex">
          
          {/* Left hoodie-themed promotional section */}
          <div className="hidden md:flex flex-col justify-center items-center w-5/6 text-black px-6 bg-white">
            <h2 className="text-4xl font-extrabold mb-6 uppercase tracking-wide">
              Hoodies
            </h2>
            <p className="text-lg text-center max-w-md mb-6">
              Stay warm, stay stylish. Discover the coziest hoodies crafted just for you.
              <br />
              Limited-time offers. Don't miss out!
            </p>
            <img
              src="/assets/images/header2.jpeg"
              alt="Hoodie promotion"
              className="h-96 w-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Clickable area to close the cart */}
          <div className="flex-1" onClick={onClose}></div>
        </div>

        {/* Slide-out cart panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 px-4 sm:px-6 overflow-y-hidden">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Your Cart
                    {cartItems.length > 0 && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                      </span>
                    )}
                  </h2>
                  <button
                    type="button"
                    className="ml-3 h-7 flex items-center"
                    onClick={onClose}
                  >
                    <svg
                      className="h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Cart items */}
                <div className="mt-8">
                  <div className="flow-root">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
                        <div className="mt-6">
                          <button
                            onClick={onClose}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                          <li key={item.id} className="py-6 flex group">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="truncate max-w-xs">{item.name}</h3>
                                  <p className="ml-4 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-gray-500">${item.price} each</p>
                                )}
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center border border-gray-200 rounded-md">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                                    className="text-gray-500 px-3 py-1 hover:bg-gray-100 transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2 w-6 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                                    className="text-gray-500 px-3 py-1 hover:bg-gray-100 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500 transition-colors"
                                  onClick={() => handleRemoveItem(item.id, item.name)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <OrderSummary showCheckoutButton={false} />
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                    <button
                      type="button"
                      className="text-blue-600 font-medium hover:text-blue-500 transition-colors"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;