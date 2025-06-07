import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryFilter = () => {
  const { products, categories, activeCategory, setActiveCategory } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const allCategories = ['all', ...categories];

  // Sync category from URL on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlCategory = searchParams.get('category');
    
    if (isInitialLoad) {
      // On first load, set category to 'all' if no category is specified
      if (!urlCategory || !allCategories.includes(urlCategory)) {
        handleCategoryChange('all');
      } else if (urlCategory && allCategories.includes(urlCategory)) {
        setActiveCategory(urlCategory);
      }
      setIsInitialLoad(false);
    } else if (urlCategory && allCategories.includes(urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [location.search]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsMobileMenuOpen(false);
    
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', category);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const getProductCount = (category) => {
    if (category === 'all') return products.length;
    return products.filter(product => product.category === category).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Mobile Header */}
      <div 
        className="md:hidden flex justify-between items-center p-4 cursor-pointer bg-gray-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 text-blue-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          {activeCategory === 'all' ? 'All Products' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Categories List */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
        <div className="p-4 pt-0 md:pt-4 border-t md:border-t-0">
          <h3 className="hidden md:block font-bold text-lg mb-4 text-gray-800 border-b pb-2">
            Categories
          </h3>
          
          <ul className="space-y-2">
            {allCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {category === 'all' ? (
                      <>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path 
                            fillRule="evenodd" 
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        All Products
                      </>
                    ) : (
                      <>
                        <span 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            backgroundColor: 
                              category === 'new' ? '#3B82F6' : 
                              category === 'top' ? '#10B981' : 
                              category === 'best' ? '#F59E0B' : '#9CA3AF'
                          }}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </>
                    )}
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {getProductCount(category)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;