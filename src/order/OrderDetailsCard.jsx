import { TruckIcon, CheckCircleIcon, XCircleIcon, ClockIcon, MapPinIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const statusConfig = {
  processing: {
    icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Your order is being prepared for shipment'
  },
  shipped: {
    icon: <TruckIcon className="h-6 w-6 text-blue-500" />,
    color: 'bg-blue-100 text-blue-800',
    description: 'Your order is on its way'
  },
  delivered: {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    color: 'bg-green-100 text-green-800',
    description: 'Your order has been delivered'
  },
  cancelled: {
    icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
    color: 'bg-red-100 text-red-800',
    description: 'Your order has been cancelled'
  }
};

const OrderDetailsCard = ({ order }) => {
  const status = statusConfig[order.status] || statusConfig.processing;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className={`flex items-center justify-between p-4 rounded-md ${status.color} mb-6`}>
        <div className="flex items-center">
          <div className="mr-3">
            {status.icon}
          </div>
          <div>
            <h3 className="font-medium">
              Order #{order.id} - {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </h3>
            <p className="text-sm">{status.description}</p>
          </div>
        </div>
        <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
      </div>

      {order.status === 'shipped' && (
        <div className="mb-6 p-4 bg-blue-50 rounded-md">
          <h4 className="font-medium text-blue-800 flex items-center">
            <TruckIcon className="h-5 w-5 mr-2" />
            Tracking Information
          </h4>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Carrier</p>
              <p className="text-blue-600 font-medium">USPS</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="text-blue-600 font-medium">{order.trackingNumber}</p>
            </div>
          </div>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            Track Package
          </button>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-gray-500" />
          Shipping Information
        </h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-600">{order.shippingAddress}</p>
          {order.estimatedDelivery && (
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Estimated delivery:</span> {order.estimatedDelivery}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-3 flex items-center">
          <ShoppingBagIcon className="h-5 w-5 mr-2 text-gray-500" />
          Order Items
        </h3>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
              <div className="flex items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                )}
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;