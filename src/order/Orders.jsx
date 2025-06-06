import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderStatusStepper from "./OrderStatusStepper";
import OrderSummary from "../components/OrderSummary";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data with more details
  const mockOrders = [
    {
      id: "ORD-12345",
      date: "2025-05-25",
      status: "delivered",
      total: 125.99,
      items: [
        {
          name: "Premium Hoodie",
          quantity: 2,
          price: 49.99,
          image: "/products/hoodie.jpg",
        },
        {
          name: "Basic T-Shirt",
          quantity: 1,
          price: 19.99,
          image: "/products/tshirt.jpg",
        },
      ],
      shippingAddress: "123 Main St, Anytown, USA 12345",
      estimatedDelivery: "2025-05-30",
      trackingNumber: "USPS9348576345",
      shippingCost: 5.99,
      tax: 7.2,
    },
    {
      id: "ORD-12346",
      date: "2025-06-20",
      status: "shipped",
      total: 89.99,
      items: [
        {
          name: "Slim Fit Jeans",
          quantity: 1,
          price: 59.99,
          image: "/products/jeans.jpg",
        },
        {
          name: "Casual Socks",
          quantity: 2,
          price: 9.99,
          image: "/products/socks.jpg",
        },
      ],
      shippingAddress: "456 Oak Ave, Somewhere, USA 67890",
      estimatedDelivery: "2025-06-25",
      trackingNumber: "FEDEX7845632890",
      shippingCost: 0.0,
      tax: 5.4,
    },
    {
      id: "ORD-12347",
      date: "2025-07-05",
      status: "processing",
      total: 45.5,
      items: [
        {
          name: "Baseball Cap",
          quantity: 1,
          price: 24.99,
          image: "/products/cap.jpg",
        },
        {
          name: "Phone Case",
          quantity: 1,
          price: 15.99,
          image: "/products/case.jpg",
        },
      ],
      shippingAddress: "789 Pine Rd, Nowhere, USA 54321",
      estimatedDelivery: "2025-07-12",
      trackingNumber: "",
      shippingCost: 4.99,
      tax: 2.73,
    },
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        {user ? (
          <div className="space-y-6">
            {!selectedOrder ? (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    My Orders
                  </h1>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
                  >
                    Print Orders
                  </button>
                </div>

                {mockOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                View
                              </button>
                              {order.status === "shipped" && (
                                <button className="text-gray-600 hover:text-gray-800">
                                  Track
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No orders
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't placed any orders yet.
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={handleBackToList}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to orders
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <OrderDetailsCard order={selectedOrder} />
                    <OrderStatusStepper status={selectedOrder.status} />
                  </div>
                  <div className="lg:col-span-1">
                    <OrderSummary
                      items={selectedOrder.items}
                      subtotal={selectedOrder.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )}
                      shipping={selectedOrder.shippingCost}
                      tax={selectedOrder.tax}
                      total={selectedOrder.total}
                    />
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Need help with your order?
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Contact our customer support for assistance.
                      </p>
                      <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Please login to view your orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to access your order history and tracking information.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
