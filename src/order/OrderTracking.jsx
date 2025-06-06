import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderStatusStepper from "./OrderStatusStepper";
import OrderSummary from "../components/OrderSummary";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter a valid order ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        // Mock response - replace with actual API call
        const mockOrders = {
          12345: createMockOrder("12345", "shipped"),
          67890: createMockOrder("67890", "delivered"),
          54321: createMockOrder("54321", "processing"),
          98765: createMockOrder("98765", "cancelled"),
        };

        if (mockOrders[orderId]) {
          setOrder(mockOrders[orderId]);
        } else {
          throw new Error(
            "Order not found. Please check your order ID and try again."
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const createMockOrder = (id, status) => ({
    id: `ORD-${id}`,
    status,
    date: new Date().toISOString().split("T")[0],
    items: [
      {
        name: "Premium Hoodie",
        quantity: 1,
        price: 49.99,
        image: "/products/hoodie.jpg",
      },
      {
        name: "Basic T-Shirt",
        quantity: 2,
        price: 19.99,
        image: "/products/tshirt.jpg",
      },
    ],
    total: 89.97,
    shippingAddress: "123 Main St, Anytown, USA 12345",
    estimatedDelivery: "2023-05-22",
    shippingCost: 5.99,
    tax: 7.2,
    trackingNumber: `TRK${id}${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
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
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Track Your Order
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g. ORD-12345)"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Tracking..." : "Track Order"}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can find your order ID in your order confirmation email.
            </p>
          </form>

          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md flex items-center">
              <XCircleIcon className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {order && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <OrderDetailsCard order={order} />
              <OrderStatusStepper status={order.status} />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary
                items={order.items}
                subtotal={order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
                shipping={order.shippingCost}
                tax={order.tax}
                total={order.total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
