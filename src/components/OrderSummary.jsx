import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const OrderSummary = ({ showCheckoutButton = true }) => {
  const { cartTotal } = useContext(CartContext);

  return (
    <div className="bg-gray-50 p-6 rounded-lg h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      {showCheckoutButton && (
        <Link
          to="/checkout/payment"
          className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-center mt-4"
        >
          Proceed to Payment
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;