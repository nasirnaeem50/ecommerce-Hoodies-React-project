import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Payment = () => {
  const { cartTotal } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    accountNumber: '',
    routingNumber: '',
    accountName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (method) => {
    alert(`Payment via ${method} would be processed here`);
    // In a real app: API call to payment gateway
  };

  // PayPal Form
  const renderPayPalForm = () => (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">PayPal Checkout</h3>
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="PayPal Email"
          className="w-full p-3 border rounded"
          required
        />
        <div className="bg-gray-100 p-4 rounded text-sm">
          <p className="font-medium">Note:</p>
          <p>• You'll be redirected to PayPal for secure login</p>
          <p>• No PayPal account? You can pay with credit/debit card</p>
        </div>
        <button
          onClick={() => handlePayment('PayPal')}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 flex items-center justify-center"
        >
          <img 
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
            alt="PayPal" 
            className="mr-2 h-6"
          />
          Pay ${cartTotal.toFixed(2)} with PayPal
        </button>
      </div>
    </div>
  );

  // Bank Transfer Form
  const renderBankTransferForm = () => (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Bank Transfer Details</h3>
      <div className="space-y-4">
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleInputChange}
          placeholder="Account Holder Name"
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
          placeholder="Account Number"
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="routingNumber"
          value={formData.routingNumber}
          onChange={handleInputChange}
          placeholder="Routing Number"
          className="w-full p-3 border rounded"
          required
        />
        <div className="bg-gray-100 p-4 rounded text-sm">
          <p className="font-medium">Our Bank Details:</p>
          <p>Bank: Example Bank International</p>
          <p>SWIFT/BIC: EXMPUS33</p>
          <p>Reference: Order #12345</p>
        </div>
        <button
          onClick={() => handlePayment('Bank Transfer')}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Confirm Bank Transfer
        </button>
      </div>
    </div>
  );

  // Credit/Debit Card Form
  const renderCreditCardForm = () => (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Card Details</h3>
      <div className="space-y-4">
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="Card Number (1234 5678 9012 3456)"
          className="w-full p-3 border rounded"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className="p-3 border rounded"
            required
          />
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            className="p-3 border rounded"
            required
          />
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name on Card"
          className="w-full p-3 border rounded"
          required
        />
        <div className="flex space-x-2">
          {['visa', 'mastercard', 'amex', 'discover'].map((card) => (
            <img 
              key={card}
              src={`https://logo.clearbit.com/${card}.com`} 
              alt={card} 
              className="h-8 opacity-70"
            />
          ))}
        </div>
        <button
          onClick={() => handlePayment('Credit Card')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Pay ${cartTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <p className="text-lg mb-6">Total: <span className="font-bold">${cartTotal.toFixed(2)}</span></p>
        
        <div className="space-y-4">
          <button
            onClick={() => setSelectedMethod('credit-card')}
            className={`w-full text-left p-4 rounded-lg border-2 flex items-center ${
              selectedMethod === 'credit-card' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Credit/Debit Card</h3>
              <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('paypal')}
            className={`w-full text-left p-4 rounded-lg border-2 flex items-center ${
              selectedMethod === 'paypal' 
                ? 'border-yellow-400 bg-yellow-50' 
                : 'border-gray-200 hover:border-yellow-300'
            }`}
          >
            <img 
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
              alt="PayPal" 
              className="w-8 h-8 object-contain mr-3"
            />
            <div>
              <h3 className="font-medium">PayPal</h3>
              <p className="text-sm text-gray-600">Pay with your PayPal account</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedMethod('bank-transfer')}
            className={`w-full text-left p-4 rounded-lg border-2 flex items-center ${
              selectedMethod === 'bank-transfer' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v3h16V6zm0 5H4v3h12v-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Bank Transfer</h3>
              <p className="text-sm text-gray-600">Direct transfer from your bank</p>
            </div>
          </button>
        </div>

        {selectedMethod === 'credit-card' && renderCreditCardForm()}
        {selectedMethod === 'paypal' && renderPayPalForm()}
        {selectedMethod === 'bank-transfer' && renderBankTransferForm()}
      </div>
    </div>
  );
};

export default Payment;