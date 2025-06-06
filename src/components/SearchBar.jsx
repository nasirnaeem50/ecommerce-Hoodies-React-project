import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center w-full max-w-md mx-4 transition-all duration-300 ${
        isFocused ? 'ring-2 ring-blue-500' : ''
      } rounded-full bg-gray-100`}
    >
      <button 
        type="submit" 
        className="absolute left-3 text-gray-500 hover:text-blue-600"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for products..."
        className="w-full py-2 pl-10 pr-8 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 rounded-full"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 text-gray-500 hover:text-red-500"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;