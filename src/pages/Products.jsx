import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products, activeCategory, setActiveCategory } = useContext(ProductContext);

  // Filter products based on category
  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'new') return product.category === 'new';
    if (activeCategory === 'top') return product.category === 'top';
    if (activeCategory === 'best') return product.category === 'best';
    return true;
  });

  // Apply limits/sorting based on category
  const displayedProducts = (() => {
    switch (activeCategory) {
      case 'new':
        // Show 8 products (pad with other products if needed)
        const newArrivals = products.filter(p => p.category === 'new');
        const needed = 8 - newArrivals.length;
        
        return [
          ...newArrivals,
          ...(needed > 0 
            ? products
                .filter(p => p.category !== 'new')
                .slice(0, needed)
            : [])
        ].slice(0, 8);
      
      case 'top':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      
      default:
        return filteredProducts;
    }
  })();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">OUR PRODUCTS</h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveCategory('new')}
          className={`px-4 py-2 rounded-md ${
            activeCategory === 'new' 
              ? 'bg-blue-600 text-white' 
              : 'border border-blue-600 text-blue-600'
          }`}
        >
          NEW ARRIVALS
        </button>
        <button
          onClick={() => setActiveCategory('top')}
          className={`px-4 py-2 rounded-md ${
            activeCategory === 'top' 
              ? 'bg-blue-600 text-white' 
              : 'border border-blue-600 text-blue-600'
          }`}
        >
          TOP RATING
        </button>
        <button
          onClick={() => setActiveCategory('best')}
          className={`px-4 py-2 rounded-md ${
            activeCategory === 'best' 
              ? 'bg-blue-600 text-white' 
              : 'border border-blue-600 text-blue-600'
          }`}
        >
          BEST SELLER
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;