import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { RiInstagramFill, RiTwitterXFill, RiTiktokFill } from 'react-icons/ri';
import { BsDiscord, BsSnapchat } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8"> {/* Reduced padding */}
        
        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"> {/* Tighter gaps */}
          
          {/* Brand Column */}
          <div className="space-y-3"> {/* Reduced spacing */}
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-white tracking-tight"> {/* Smaller text */}
                <span className="text-blue-400">HOOD</span>.<span className="text-white">IES</span>
              </h3>
              <span className="ml-1 text-[10px] bg-blue-600 text-white px-1 py-0.5 rounded-full">EST. 2024</span>
            </div>
            <p className="text-gray-400 text-xs font-light">
              Urban streetwear redefined
            </p>
            
            <div className="flex space-x-1.5"> {/* Compact social icons */}
              {[RiInstagramFill, RiTwitterXFill, RiTiktokFill, BsSnapchat, BsDiscord].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-full transition-all duration-200">
                  <Icon className="text-base" /> {/* Smaller icons */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white uppercase text-xs tracking-wider font-bold">SHOP</h4>
            <ul className="space-y-1.5">
              {['New Arrivals', 'Best Sellers', 'Collections', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group text-xs">
                    <span className="w-1 h-0.5 bg-blue-400 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-2">
            <h4 className="text-white uppercase text-xs tracking-wider font-bold">HELP</h4>
            <ul className="space-y-1.5">
              {['Contact Us', 'Shipping', 'Returns', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group text-xs">
                    <span className="w-1 h-0.5 bg-blue-400 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <h4 className="text-white uppercase text-xs tracking-wider font-bold">NEWSLETTER</h4>
            <p className="text-gray-400 text-[11px]">
              Get updates on new drops
            </p>
            <form>
              <div className="flex flex-col space-y-1.5">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="px-2 py-1.5 text-xs bg-gray-700/50 border border-gray-600/50 focus:outline-none focus:border-blue-400 text-white placeholder-gray-400 rounded-sm transition-colors duration-200"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-1.5 px-3 text-xs font-medium rounded-sm transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-[11px]">
          <p className="text-gray-500 mb-1 md:mb-0">
            © {new Date().getFullYear()} HOOD.AF
          </p>
          <div className="flex flex-wrap justify-center gap-x-3">
            {['Privacy', 'Terms', 'Shipping'].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;