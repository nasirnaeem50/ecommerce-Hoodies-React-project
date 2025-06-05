import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import bgimg from "../assets/images/header2.jpeg";

const Cart = ({ onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useContext(CartContext);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay with left promotional content */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex">
          
          {/* Left hoodie-themed promotional section */}
          <div className="hidden md:flex flex-col justify-center items-center w-5/6 text-black px-6 bg-white">
            <h2 className="text-4xl font-extrabold mb-6 uppercase tracking-wide">
              Hoddies
            </h2>
            <p className="text-lg text-center max-w-md mb-6">
              Stay warm, stay stylish. Discover the coziest hoodies crafted just for you.
              <br />
              Limited-time offers. Don’t miss out!
            </p>
            <img
              src={bgimg}
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
              {/* Changed here: added overflow-y-hidden */}
              <div className="flex-1 py-6 px-4 sm:px-6 overflow-y-hidden">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Your Cart
                  </h2>
                  <button
                    type="button"
                    className="ml-3 h-7 flex items-center"
                    onClick={onClose}
                  >
                    <svg
                      className="h-6 w-6 text-gray-400"
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
                      <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="text-gray-500 px-2"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="text-gray-500 px-2"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500"
                                  onClick={() => removeFromCart(item.id)}
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
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                  <button
                    type="button"
                    className="text-blue-600 font-medium hover:text-blue-500"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div> {/* end absolute inset-0 */}
    </div>
  );
};

export default Cart;
