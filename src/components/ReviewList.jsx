import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ReviewList = () => {
  const { id } = useParams();
  const { getProductById } = useContext(ProductContext);
  const product = getProductById(id);
  const reviews = product?.reviews || [];

  if (reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <div className="flex items-center">
          <span className="text-yellow-400 text-xl mr-1">★</span>
          <span>
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex justify-between mb-2">
              <div>
                <h4 className="font-medium">{review.name}</h4>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;