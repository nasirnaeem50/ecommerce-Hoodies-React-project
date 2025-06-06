const ShippingInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">Standard Shipping</h4>
          <p className="text-gray-600">3-5 business days - $5.99</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Express Shipping</h4>
          <p className="text-gray-600">1-2 business days - $12.99</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Free Shipping</h4>
          <p className="text-gray-600">Orders over $50 - 5-7 business days</p>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900">Returns</h4>
          <p className="text-gray-600">
            Easy 30-day returns. Items must be unused with tags attached.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;