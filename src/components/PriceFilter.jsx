import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const PriceFilter = () => {
  const { priceRange, setPriceFilter } = useContext(ProductContext);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  useEffect(() => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  }, [priceRange]);

  const handlePriceChange = () => {
    setPriceFilter({ min: minPrice, max: maxPrice });
  };

  const resetFilters = () => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setPriceFilter({ min: priceRange.min, max: priceRange.max });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">Price Range</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">$</span>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">$</span>
              <input
                type="number"
                min={priceRange.min}
                max={priceRange.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handlePriceChange}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;