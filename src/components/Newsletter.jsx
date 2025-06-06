import { useState } from 'react';
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 text-indigo-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest products, offers and news.
          </p>
          
          {isSubscribed ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-flex items-center space-x-2 animate-fadeIn">
              <CheckIcon className="h-6 w-6 text-green-300" />
              <span className="text-lg">Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl">
              <div className="relative flex-grow">
                <EnvelopeIcon className="h-5 w-5 text-indigo-200 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-200 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-white text-indigo-600 hover:bg-gray-100 font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : 'Subscribe'}
              </button>
            </form>
          )}
          
          <p className="mt-4 text-xs text-indigo-200 opacity-70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;