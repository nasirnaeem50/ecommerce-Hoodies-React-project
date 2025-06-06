import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      cta: "Shop Now",
      link: "/products?category=summer",
      bgColor: "from-pink-500 to-orange-500",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Styles Just In",
      cta: "Explore",
      link: "/products?category=new",
      bgColor: "from-blue-500 to-purple-600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Limited Stock",
      subtitle: "Don't Miss Out",
      cta: "Grab Yours",
      link: "/products?category=limited",
      bgColor: "from-amber-500 to-red-500",
      textColor: "text-white"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-lg mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          } bg-gradient-to-r ${banner.bgColor}`}
        >
          <div className={`text-center px-6 ${banner.textColor}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-fadeIn">
              {banner.title}
            </h2>
            <p className="text-xl md:text-2xl mb-6 animate-fadeIn delay-100">
              {banner.subtitle}
            </p>
            <Link
              to={banner.link}
              className="inline-block bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-200"
            >
              {banner.cta}
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentBanner ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;