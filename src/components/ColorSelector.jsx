import { useState } from 'react';

const ColorSelector = ({ colors = [], selectedColor: propSelectedColor, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState(propSelectedColor || '');

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (onSelect) {
      onSelect(color);
    }
  };

  if (colors.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Color</h4>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleColorSelect(color)}
            className={`w-10 h-10 rounded-full border-2 ${
              selectedColor === color ? 'border-blue-600' : 'border-gray-200'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;