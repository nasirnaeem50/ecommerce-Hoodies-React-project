import { CheckCircleIcon, XCircleIcon, TruckIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const statusSteps = {
  processing: [
    { name: 'Order Placed', status: 'complete', icon: <ShoppingBagIcon className="h-5 w-5" /> },
    { name: 'Processing', status: 'current', icon: null },
    { name: 'Shipped', status: 'upcoming', icon: <TruckIcon className="h-5 w-5" /> },
    { name: 'Delivered', status: 'upcoming', icon: <CheckCircleIcon className="h-5 w-5" /> }
  ],
  shipped: [
    { name: 'Order Placed', status: 'complete', icon: <ShoppingBagIcon className="h-5 w-5" /> },
    { name: 'Processing', status: 'complete', icon: null },
    { name: 'Shipped', status: 'current', icon: <TruckIcon className="h-5 w-5" /> },
    { name: 'Delivered', status: 'upcoming', icon: <CheckCircleIcon className="h-5 w-5" /> }
  ],
  delivered: [
    { name: 'Order Placed', status: 'complete', icon: <ShoppingBagIcon className="h-5 w-5" /> },
    { name: 'Processing', status: 'complete', icon: null },
    { name: 'Shipped', status: 'complete', icon: <TruckIcon className="h-5 w-5" /> },
    { name: 'Delivered', status: 'complete', icon: <CheckCircleIcon className="h-5 w-5" /> }
  ],
  cancelled: [
    { name: 'Order Placed', status: 'complete', icon: <ShoppingBagIcon className="h-5 w-5" /> },
    { name: 'Cancelled', status: 'cancelled', icon: <XCircleIcon className="h-5 w-5" /> }
  ]
};

const OrderStatusStepper = ({ status }) => {
  const steps = statusSteps[status] || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-medium text-gray-700 mb-4">Order Status</h3>
      <div className="overflow-hidden">
        <nav aria-label="Progress">
          <ol className="flex overflow-x-auto pb-4">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`relative flex-shrink-0 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
                style={{ minWidth: '120px' }}
              >
                {step.status === 'complete' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-blue-600"></div>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                      {step.icon || (
                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="mt-2 block text-sm font-medium text-gray-700">{step.name}</span>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200"></div>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                      {step.icon || <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>}
                    </div>
                    <span className="mt-2 block text-sm font-medium text-blue-600">{step.name}</span>
                  </>
                ) : step.status === 'cancelled' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-red-600"></div>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
                      {step.icon}
                    </div>
                    <span className="mt-2 block text-sm font-medium text-gray-700">{step.name}</span>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200"></div>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      {step.icon || <span className="h-2.5 w-2.5 rounded-full bg-transparent"></span>}
                    </div>
                    <span className="mt-2 block text-sm font-medium text-gray-500">{step.name}</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default OrderStatusStepper;