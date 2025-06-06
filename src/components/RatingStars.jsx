import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { StarIcon } from '@heroicons/react/24/solid';

const RatingStars = () => {
  const { ratingFilter, setRatingFilter } = useContext(ProductContext);

  const handleRatingClick = (rating) => {
    setRatingFilter(rating === ratingFilter ? null : rating);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Customer Reviews</h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${
              ratingFilter === rating 
                ? 'bg-blue-100' 
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < rating 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating === 5 ? '' : '& Up'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingStars;