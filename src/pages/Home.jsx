import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { useEffect } from "react";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [email, setEmail] = useState("");
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [gradientPos, setGradientPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 0.005) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    console.log("Offer claimed with email:", email);
    setOfferSubmitted(true);
    setTimeout(() => {
      setShowOfferModal(false);
      setOfferSubmitted(false);
      setEmail("");
    }, 3000);
  };

  const discountedProducts = products.filter((product) => product.discount > 0);
  const carouselImages = [
    "/assets/images/h14.jpg",
    "/assets/images/h15.jpg",
    "/assets/images/h16.jpg",
  ];

  const carouselTitles = [
    "New Collection Launch",
    "Limited Edition Colors",
    "Exclusive Member Discounts",
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 bg-gray-100 py-12 md:py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              New Collection <br />
              <span className="text-blue-600">Hodies</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover premium quality hoodies that combine comfort with style.
              Perfect for any season and any occasion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl"
              >
                Shop Now
              </Link>
              <button
                onClick={() => setShowOfferModal(true)}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse cursor-pointer"
              >
                Limited Offer
              </button>
            </div>
          </div>
          <div className="w-full md:w-[40%] flex justify-center">
            <div className="w-[250px] md:w-full max-w-md aspect-square rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                src="/assets/images/hero.jpeg"
                alt="Premium Hoodie Collection"
                className="w-full h-[250px] md:h-[540px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <div className="relative w-full h-screen max-h-[800px] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899, #f43f5e)`,
            backgroundSize: "400% 400%",
            backgroundPosition: `${gradientPos}% ${gradientPos}%`,
            transition: "background-position 1s ease-out",
          }}
        ></div>

        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentCarouselIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt={`Promotion ${index + 1}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    minWidth: "100vw",
                    minHeight: "100vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                {carouselTitles[index]}
              </h2>
              <Link
                to="/products"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCarouselIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentCarouselIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Special Offers Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
              Limited Time
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">Special Offers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Don't miss these exclusive deals on our most popular items
            </p>
          </div>

          {discountedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {discountedProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="relative group">
                  <div></div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No current special offers available
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => setShowOfferModal(true)}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse cursor-pointer"
            >
              Claim Your Exclusive Offer
            </button>
          </div>
        </div>
      </section>

      {/* Seasonal Collection Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-amber-50 to-pink-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 order-2 md:order-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Seasonal <span className="text-blue-600">Essentials</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Our curated collection for the current season features lightweight
              fabrics and versatile designs perfect for layering.
            </p>
            <Link
              to="/products?collection=seasonal"
              className="group bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-indigo-500/20 hover:border-indigo-400/40 inline-flex items-center gap-2"
            >
              View Collection
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center order-1 md:order-2">
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden border-8 border-white shadow-xl">
              <img
                src="/assets/images/h2.jpeg"
                alt="Seasonal Collection"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Customer Reviews
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/assets/images/person-01.jpg",
                name: "Alex Johnson",
                quote:
                  "The quality exceeded my expectations. Will definitely buy again!",
              },
              {
                img: "/assets/images/person-06.jpg",
                name: "Sarah Miller",
                quote: "Most comfortable hoodie I've ever worn. Perfect fit!",
              },
              {
                img: "/assets/images/person-07.jpg",
                name: "Michael Chen",
                quote: "Great customer service and fast shipping. 5 stars!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">
                    {testimonial.name}
                  </h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
            <div className="relative">
              <img
                src="/assets/images/special.webp"
                alt="Special Offer"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 p-2">
                <button
                  onClick={() => {
                    setShowOfferModal(false);
                    setOfferSubmitted(false);
                  }}
                  className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-2xl font-bold text-white">
                  Exclusive Offer!
                </h3>
              </div>
            </div>

            <div className="p-6">
              {!offerSubmitted ? (
                <>
                  <h3 className="text-xl font-bold mb-2">
                    Get 20% Off Your First Order!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Subscribe to our newsletter and receive an exclusive
                    discount code.
                  </p>
                  <form onSubmit={handleOfferSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-md font-medium transition duration-300"
                    >
                      Claim My 20% Discount
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">
                    By subscribing, you agree to our Terms and Privacy Policy.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Offer Claimed!</h3>
                  <p className="text-gray-600">
                    Check your email for your exclusive discount code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
