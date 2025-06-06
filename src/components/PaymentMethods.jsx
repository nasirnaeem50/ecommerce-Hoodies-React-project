import { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('credit');

  const paymentMethods = [
    { id: 'credit', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🔵' },
    { id: 'apple', name: 'Apple Pay', icon: '' },
    { id: 'google', name: 'Google Pay', icon: 'G' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Payment Method</h2>
      
      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <div 
            key={method.id} 
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <span className="text-2xl mr-3">{method.icon}</span>
            <span className="font-medium">{method.name}</span>
            {selectedMethod === method.id && (
              <span className="ml-auto text-blue-500">✓</span>
            )}
          </div>
        ))}
      </div>

      {selectedMethod === 'credit' && (
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <input 
                type="text" 
                placeholder="MM/YY" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input 
                type="text" 
                placeholder="123" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t">
        <Link 
          to="/cart" 
          className="text-blue-600 hover:underline"
        >
          ← Back to cart
        </Link>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;