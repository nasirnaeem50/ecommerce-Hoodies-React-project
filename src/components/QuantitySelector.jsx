import { useState, useEffect } from 'react';

const QuantitySelector = ({ initialQuantity = 1, maxQuantity = 10, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (onChange) {
      onChange(quantity);
    }
  }, [quantity, onChange]);

  const increment = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        type="button"
        onClick={decrement}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="px-4 py-1 text-center border-l border-r border-gray-300">
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;