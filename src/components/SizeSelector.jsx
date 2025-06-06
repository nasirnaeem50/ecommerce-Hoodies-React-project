import { useState } from 'react';

const SizeSelector = ({ sizes = [], selectedSize: propSelectedSize, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState(propSelectedSize || '');

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (onSelect) {
      onSelect(size);
    }
  };

  if (sizes.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Size</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => handleSizeSelect(size)}
            className={`px-4 py-2 border rounded-md text-sm ${
              selectedSize === size
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;