import { useContext, useMemo, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import ProductSort from '../components/ProductSort';
import ProductSearch from '../components/ProductSearch';

const Products = () => {
  const { 
    activeCategory,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    isLoading,
    error
  } = useContext(ProductContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [];
    
    if (searchQuery) {
      products = searchProducts(searchQuery);
    } else if (activeCategory === 'top') {
      products = getFeaturedProducts();
    } else {
      products = getProductsByCategory(activeCategory);
    }

    return products;
  }, [activeCategory, getProductsByCategory, getFeaturedProducts, searchProducts, searchQuery]);

  const displayedProducts = useMemo(() => {
    const products = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">
          Error loading products
        </div>
        <p className="text-gray-600">{error.message || 'Please try again later'}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile filter dialog */}
      <div className={`fixed inset-0 z-40 lg:hidden ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4 px-4">
            <CategoryFilter />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Discover Our Collection</h1>
            <p className="text-lg">
              Find the perfect products for your style. {activeCategory !== 'all' && 
              <span className="font-medium italic">Currently browsing: {activeCategory.replace('-', ' ')}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <ProductSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="lg:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <ProductSort 
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop filters */}
          <div className="hidden lg:block">
            <CategoryFilter />
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
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
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">
                  {searchQuery 
                    ? 'Try adjusting your search or filter to find what you are looking for.'
                    : 'There are currently no products in this category.'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Showing <span className="font-medium">{displayedProducts.length}</span> products
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;