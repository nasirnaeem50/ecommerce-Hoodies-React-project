import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import OrderSummary from './OrderSummary';

const Checkout = () => {
  const { 
    cartItems, 
    removeFromCart,
    updateQuantity 
  } = useContext(CartContext);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="text-blue-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex border-b pb-4 items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-contain mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded-l"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <OrderSummary />
        </div>
      )}
    </div>
  );
};

export default Checkout;